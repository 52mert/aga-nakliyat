import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, Lock, ShieldCheck, FileText, MessageSquare, PhoneCall, 
  Trash2, Check, Plus, Settings, Send, LogOut, Save,
  Calendar, Star, ArrowLeft, DollarSign, Image, Upload,
  Home, Truck, Package, Building2, Box, Layers, Wrench, MapPin, CheckCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';

export default function AdminPage() {
  const navigate = useNavigate();
  const { 
    quoteRequests, deleteQuoteRequest, testimonials, approveTestimonial,
    deleteTestimonial, addTestimonial, companyInfo, updateCompanyInfo,
    pricingConfig, updatePricingConfig,
    services, addService, updateService, deleteService
  } = useApp();

  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('admin@aganakliyat.com');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'requests' | 'reviews' | 'settings' | 'pricing' | 'gallery' | 'services'>('requests');

  const [settingsForm, setSettingsForm] = useState(companyInfo);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [pricingForm, setPricingForm] = useState(pricingConfig);
  const [pricingSaved, setPricingSaved] = useState(false);
  const [pricingError, setPricingError] = useState(false);

  useEffect(() => {
    setPricingForm(pricingConfig);
  }, [pricingConfig]);

  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('tasima');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const loadGallery = async () => {
    setGalleryLoading(true);
    const { data } = await supabase.from('gallery').select('*').order('sort_order');
    if (data) setGalleryItems(data);
    setGalleryLoading(false);
  };

  useEffect(() => { if (authenticated) loadGallery(); }, [authenticated]);

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) return;
    setUploading(true);

    const fileExt = uploadFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(fileName, uploadFile);

    if (uploadError) {
      alert('Yükleme hatası: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const imageUrl = supabase.storage.from('gallery-images').getPublicUrl(fileName).data.publicUrl;

    const { error: insertError } = await supabase.from('gallery').insert({
      title: uploadTitle,
      image_url: imageUrl,
      category: uploadCategory,
      description: uploadDesc,
      sort_order: galleryItems.length + 1,
    });

    if (insertError) {
      alert('Veritabanı hatası: ' + insertError.message);
    } else {
      setUploadTitle('');
      setUploadDesc('');
      setUploadFile(null);
      loadGallery();
    }
    setUploading(false);
  };

  const handleDeleteGalleryItem = async (id: number, imageUrl: string) => {
    const fileName = imageUrl.split('/').pop();
    await supabase.storage.from('gallery-images').remove([fileName]);
    await supabase.from('gallery').delete().eq('id', id);
    loadGallery();
  };

  const [serviceForm, setServiceForm] = useState({
    title: '', description: '', iconName: 'Truck',
    imageUrl: '', features: ['', '', '', ''], popular: false, sortOrder: 0,
  });
  const [serviceUploadFile, setServiceUploadFile] = useState<File | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceSaving, setServiceSaving] = useState(false);

  const resetServiceForm = () => {
    setServiceForm({ title: '', description: '', iconName: 'Truck', imageUrl: '', features: ['', '', '', ''], popular: false, sortOrder: services.length + 1 });
    setServiceUploadFile(null);
    setEditingServiceId(null);
  };

  const handleEditService = (s: any) => {
    const feats = [...(s.features || []), '', '', '', ''].slice(0, 4);
    setServiceForm({
      title: s.title,
      description: s.description,
      iconName: s.iconName || 'Truck',
      imageUrl: s.image || '',
      features: feats,
      popular: s.popular || false,
      sortOrder: s.sort_order || 0,
    });
    setEditingServiceId(s.id);
    setShowServiceForm(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.description) return;
    setServiceSaving(true);

    let imageUrl = serviceForm.imageUrl;

    if (serviceUploadFile) {
      const fileExt = serviceUploadFile.name.split('.').pop();
      const fileName = `hizmetler/${Date.now()}.${fileExt}`;
      await supabase.storage.from('gallery-images').upload(fileName, serviceUploadFile);
      imageUrl = supabase.storage.from('gallery-images').getPublicUrl(fileName).data.publicUrl;
    }

    const features = serviceForm.features.filter((f) => f.trim() !== '');

    if (editingServiceId) {
      await updateService(editingServiceId, {
        title: serviceForm.title,
        description: serviceForm.description,
        iconName: serviceForm.iconName,
        image: imageUrl,
        features,
        popular: serviceForm.popular,
        sort_order: serviceForm.sortOrder,
      });
    } else {
      await addService({
        title: serviceForm.title,
        description: serviceForm.description,
        iconName: serviceForm.iconName,
        image: imageUrl,
        features,
        popular: serviceForm.popular,
        sort_order: serviceForm.sortOrder,
      });
    }

    setServiceSaving(false);
    setShowServiceForm(false);
    resetServiceForm();
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) {
      await deleteService(id);
    }
  };

  const [newReview, setNewReview] = useState({
    name: '', location: 'Fatsa, Ordu', rating: 5,
    serviceType: 'Asansörlü Evden Eve', comment: ''
  });
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(false);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setLoginError(true);
    } else {
      setAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCompanyInfo(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    setPricingError(false);
    const ok = await updatePricingConfig(pricingForm);
    if (ok) {
      setPricingSaved(true);
      setTimeout(() => setPricingSaved(false), 2000);
    } else {
      setPricingError(true);
      setTimeout(() => setPricingError(false), 3000);
    }
  };

  const handleCreateOfficialReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    await addTestimonial(newReview);
    setNewReview({ name: '', location: 'Fatsa, Ordu', rating: 5, serviceType: 'Asansörlü Evden Eve', comment: '' });
    setShowAddReviewForm(false);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </button>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h1 className="text-2xl font-black text-white">Yönetici Paneli</h1>
              <p className="text-sm text-slate-400 mt-1">AGA NAKLİYAT — Yetkili Erişim</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 text-left block">E-Posta</label>
                <input type="email" placeholder="admin@aganakliyat.com" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-center text-sm font-bold focus:border-red-500 focus:outline-none transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 text-left block">Şifre</label>
                <input type="password" placeholder="••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-center text-sm font-bold focus:border-red-500 focus:outline-none transition-colors" />
              </div>
              {loginError && <p className="text-xs text-red-500 font-bold">E-posta veya şifre hatalı!</p>}
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-bold text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-lg flex items-center gap-2">
                AGA NAKLİYAT / Yönetici Paneli
                <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded-full">Admin</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
              Siteye Dön
            </button>
            <button onClick={handleLogout} className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer">
              <LogOut className="w-3.5 h-3.5" />
              Çıkış
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'requests', label: 'Teklif Talepleri', count: quoteRequests.length, icon: FileText },
            { id: 'reviews', label: 'Müşteri Yorumları', count: testimonials.length, icon: MessageSquare },
            { id: 'pricing', label: 'Fiyatlandırma', icon: DollarSign },
            { id: 'gallery', label: 'Galeri', count: galleryItems.length, icon: Image },
            { id: 'services', label: 'Hizmetler', count: services.length, icon: Truck },
            { id: 'settings', label: 'Şirket Ayarları', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800'
                }`}>
                <Icon className="w-4 h-4" />
                <span>{tab.label}{tab.count !== undefined && ` (${tab.count})`}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* TAB 1: Quote Requests */}
          {activeTab === 'requests' && (
            <div className="space-y-3">
              {quoteRequests.length === 0 ? (
                <div className="p-8 text-center bg-slate-900 rounded-2xl border border-dashed border-slate-700 text-slate-500 text-sm">Henüz gelen teklif talebi yok.</div>
              ) : (
                quoteRequests.map((req) => (
                  <div key={req.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="font-black text-white text-base">{req.name}</span>
                        <span className="ml-2 text-xs font-bold text-red-400">{req.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />{req.createdAt}
                        </span>
                        <button onClick={() => req.id && deleteQuoteRequest(req.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-950/50 rounded-lg transition-colors cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block">Nereden → Nereye</span>
                        <span className="font-bold text-slate-200 block mt-0.5">{req.fromLocation} → {req.toLocation}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block">Eşya Tipi</span>
                        <span className="font-bold text-slate-200 block mt-0.5">{req.moveType}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block">Tarih</span>
                        <span className="font-bold text-slate-200 block mt-0.5">{req.moveDate || 'Belirtilmedi'}</span>
                      </div>
                    </div>
                    {req.note && (
                      <p className="text-xs text-slate-400 bg-amber-950/20 p-2.5 rounded-xl border border-amber-800/30">
                        <strong>Not:</strong> {req.note}
                      </p>
                    )}
                    <div className="flex items-center gap-2 pt-1">
                      <a href={`tel:${req.phone.replace(/\s+/g, '')}`}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm">
                        <PhoneCall className="w-3.5 h-3.5" />Müşteriyi Ara
                      </a>
                      <a href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Merhaba Sayın ${req.name}, Aga Nakliyat teklif talebiniz için iletişime geçiyorum.`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm">
                        <Send className="w-3.5 h-3.5" />WhatsApp
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">{testimonials.length} yorum bulunuyor</p>
                <button onClick={() => setShowAddReviewForm(!showAddReviewForm)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer">
                  <Plus className="w-4 h-4" />
                  {showAddReviewForm ? 'Kapat' : 'Yorum Ekle'}
                </button>
              </div>

              {showAddReviewForm && (
                <form onSubmit={handleCreateOfficialReview} className="p-5 bg-slate-900 border border-red-500/30 rounded-2xl space-y-3">
                  <h5 className="font-bold text-sm text-white">Yeni Yorum Ekle</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" required placeholder="Ad Soyad" value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs" />
                    <input type="text" placeholder="Lokasyon" value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select value={newReview.serviceType}
                      onChange={(e) => setNewReview({ ...newReview, serviceType: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs">
                      <option>Asansörlü Evden Eve</option>
                      <option>Evden Eve Nakliyat</option>
                      <option>Şehirlerarası Nakliyat</option>
                      <option>Ambalajlı Taşıma</option>
                    </select>
                    <div className="flex items-center gap-1 px-3 py-2 bg-slate-950 rounded-xl border border-slate-700">
                      <span className="text-xs text-slate-400 mr-2">Puan:</span>
                      {[1,2,3,4,5].map((s) => (
                        <button key={s} type="button" onClick={() => setNewReview({ ...newReview, rating: s })}
                          className="cursor-pointer">
                          <Star className={`w-4 h-4 ${s <= newReview.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea required rows={3} placeholder="Yorum metni..." value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs" />
                  <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer">
                    Yayınla
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(t.rating)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-amber-400" />))}
                        </div>
                        <span className="text-[10px] font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded-md">{t.serviceType}</span>
                      </div>
                      <p className="text-xs italic text-slate-300">"{t.comment}"</p>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white block">{t.name}</span>
                        <span className="text-[11px] text-slate-500">{t.location} · {t.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {t.status === 'pending' && (
                          <button onClick={() => approveTestimonial(t.id)}
                            className="p-1.5 text-emerald-400 hover:bg-emerald-950/50 rounded-lg transition-colors cursor-pointer" title="Onayla">
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => deleteTestimonial(t.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-950/50 rounded-lg transition-colors cursor-pointer" title="Sil">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Pricing */}
          {activeTab === 'pricing' && (
            <form onSubmit={handleSavePricing} className="space-y-4 max-w-2xl">
              {pricingSaved && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-800/50">
                  <Check className="w-4 h-4" />Fiyatlar kaydedildi!
                </div>
              )}
              {pricingError && (
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-950/40 px-4 py-2 rounded-xl border border-red-800/50">
                  <X className="w-4 h-4" />Fiyatlar kaydedilemedi!
                </div>
              )}

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white">Oda / Ev Tipi Baz Fiyatları</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['1+1', '2+1', '3+1', '4+1'].map((type) => (
                    <div key={type}>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">{type}</label>
                      <input type="number" required value={pricingForm.base_prices[type]}
                        onChange={(e) => setPricingForm({
                          ...pricingForm,
                          base_prices: { ...pricingForm.base_prices, [type]: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-bold" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white">Güzergah Bazlı Ek Ücretler</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'fatsa-fatsa', label: 'Fatsa Şehir İçi' },
                    { key: 'fatsa-unye', label: 'Fatsa - Ünye' },
                    { key: 'fatsa-ordu', label: 'Fatsa - Ordu' },
                    { key: 'sehirlerarasi', label: 'Şehirlerarası' },
                  ].map((r) => (
                    <div key={r.key}>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">{r.label}</label>
                      <input type="number" required value={pricingForm.route_costs[r.key]}
                        onChange={(e) => setPricingForm({
                          ...pricingForm,
                          route_costs: { ...pricingForm.route_costs, [r.key]: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-bold" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-bold text-slate-400">Kat Başı Maliyet (₺)</label>
                  <input type="number" required value={pricingForm.floor_cost_per_floor}
                    onChange={(e) => setPricingForm({ ...pricingForm, floor_cost_per_floor: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-bold" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-bold text-slate-400">Asansör Ücreti (₺)</label>
                  <input type="number" required value={pricingForm.elevator_cost}
                    onChange={(e) => setPricingForm({ ...pricingForm, elevator_cost: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-bold" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-bold text-slate-400">Maks. Kar Marjı (%)</label>
                  <input type="number" required value={pricingForm.markup_percent}
                    onChange={(e) => setPricingForm({ ...pricingForm, markup_percent: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-bold" />
                </div>
              </div>

              <button type="submit" className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer">
                <Save className="w-4 h-4" />Fiyatları Kaydet
              </button>
            </form>
          )}

          {/* TAB 4: Gallery */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-red-400" />Yeni Resim Ekle
                </h4>
                <form onSubmit={handleUploadImage} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" required placeholder="Başlık" value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs" />
                    <select value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs">
                      <option value="asansor">Asansörlü Taşıma</option>
                      <option value="ambalaj">Ambalajlama & Paketleme</option>
                      <option value="araclar">Araçlarımız</option>
                      <option value="tasima">Ev Taşıma Kareleri</option>
                    </select>
                  </div>
                  <input type="text" placeholder="Açıklama (opsiyonel)" value={uploadDesc}
                    onChange={(e) => setUploadDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs" />
                  <input type="file" required accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-600 file:text-white file:cursor-pointer" />
                  <button type="submit" disabled={uploading || !uploadFile}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2">
                    {uploading ? 'Yükleniyor...' : <><Upload className="w-3.5 h-3.5" /> Yükle</>}
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {galleryLoading ? (
                  <div className="col-span-full flex justify-center py-10">
                    <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : galleryItems.length === 0 ? (
                  <div className="col-span-full p-8 text-center bg-slate-900 rounded-2xl border border-dashed border-slate-700 text-slate-500 text-sm">Henüz resim eklenmemiş.</div>
                ) : (
                  galleryItems.map((item) => (
                    <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[4/3]">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[10px] font-bold text-white truncate">{item.title}</p>
                        <p className="text-[9px] text-slate-400 truncate">{item.category}</p>
                      </div>
                      <button onClick={() => handleDeleteGalleryItem(item.id, item.image_url)}
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-700">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: Services */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">{services.length} hizmet bulunuyor</p>
                <button onClick={() => { resetServiceForm(); setShowServiceForm(!showServiceForm); }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer">
                  {showServiceForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showServiceForm ? 'Kapat' : 'Hizmet Ekle'}
                </button>
              </div>

              {showServiceForm && (
                <form onSubmit={handleSaveService} className="p-5 rounded-2xl bg-slate-900 border border-red-500/30 space-y-4">
                  <h5 className="font-bold text-sm text-white">{editingServiceId ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}</h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Başlık</label>
                      <input type="text" required value={serviceForm.title}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">İkon</label>
                      <select value={serviceForm.iconName}
                        onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs">
                        <option value="Home">Home</option>
                        <option value="Truck">Truck</option>
                        <option value="Package">Package</option>
                        <option value="Building2">Building2</option>
                        <option value="Box">Box</option>
                        <option value="Layers">Layers</option>
                        <option value="Wrench">Wrench</option>
                        <option value="MapPin">MapPin</option>
                        <option value="Shield">Shield</option>
                        <option value="CheckCircle">CheckCircle</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Açıklama</label>
                    <textarea required rows={2} value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Görsel</label>
                      <input type="file" accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => setServiceUploadFile(e.target.files?.[0] || null)}
                        className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-600 file:text-white file:cursor-pointer" />
                      {serviceForm.imageUrl && !serviceUploadFile && (
                        <p className="text-[10px] text-slate-500 mt-1 truncate">Mevcut: {serviceForm.imageUrl.split('/').pop()}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Sıralama</label>
                      <input type="number" value={serviceForm.sortOrder}
                        onChange={(e) => setServiceForm({ ...serviceForm, sortOrder: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Özellikler</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[0, 1, 2, 3].map((i) => (
                        <input key={i} type="text" placeholder={`Özellik ${i + 1}`} value={serviceForm.features[i] || ''}
                          onChange={(e) => {
                            const feats = [...serviceForm.features];
                            feats[i] = e.target.value;
                            setServiceForm({ ...serviceForm, features: feats });
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="servicePopular" checked={serviceForm.popular}
                      onChange={(e) => setServiceForm({ ...serviceForm, popular: e.target.checked })}
                      className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-red-600" />
                    <label htmlFor="servicePopular" className="text-xs text-slate-300 font-bold">Öne Çıkan Hizmet</label>
                  </div>

                  <button type="submit" disabled={serviceSaving}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50">
                    {serviceSaving ? 'Kaydediliyor...' : <><Save className="w-3.5 h-3.5 inline mr-1" />Kaydet</>}
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-red-500 shrink-0">
                      {s.iconName === 'Home' ? <Home className="w-6 h-6" /> :
                       s.iconName === 'Truck' ? <Truck className="w-6 h-6" /> :
                       s.iconName === 'Package' ? <Package className="w-6 h-6" /> :
                       s.iconName === 'Building2' ? <Building2 className="w-6 h-6" /> :
                       s.iconName === 'Box' ? <Box className="w-6 h-6" /> :
                       s.iconName === 'Layers' ? <Layers className="w-6 h-6" /> :
                       s.iconName === 'Wrench' ? <Wrench className="w-6 h-6" /> :
                       s.iconName === 'MapPin' ? <MapPin className="w-6 h-6" /> :
                       <CheckCircle className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-white truncate">{s.title}</h4>
                        {s.popular && <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">Popüler</span>}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{s.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => handleEditService(s)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-bold transition-colors cursor-pointer">
                          Düzenle
                        </button>
                        <button onClick={() => handleDeleteService(s.id)}
                          className="px-3 py-1.5 bg-red-950 hover:bg-red-900 text-red-400 rounded-xl text-[10px] font-bold transition-colors cursor-pointer">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: Settings */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl">
              {settingsSaved && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-800/50">
                  <Check className="w-4 h-4" />Kaydedildi!
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Görünen Telefon</label>
                  <input type="text" required value={settingsForm.phonePrimary}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phonePrimary: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Arama Linki (Sadece Rakam)</label>
                  <input type="text" required value={settingsForm.phonePrimaryRaw}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phonePrimaryRaw: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp (Ülke Koduyla)</label>
                  <input type="text" required value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">E-Posta</label>
                  <input type="email" required value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Adres</label>
                <input type="text" required value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold" />
              </div>
              <button type="submit" className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer">
                <Save className="w-4 h-4" />Ayarları Kaydet
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
