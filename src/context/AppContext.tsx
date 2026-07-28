import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Service, Testimonial, QuoteFormData, CompanySettings, PricingConfig } from '../types';
import { supabase } from '../lib/supabase';

export type ThemeMode = 'dark' | 'light';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  companyInfo: CompanySettings;
  updateCompanyInfo: (newInfo: Partial<CompanySettings>) => void;
  testimonials: Testimonial[];
  addTestimonial: (review: Omit<Testimonial, 'id' | 'date'>) => void;
  approveTestimonial: (id: string) => void;
  deleteTestimonial: (id: string) => void;
  quoteRequests: QuoteFormData[];
  addQuoteRequest: (req: Omit<QuoteFormData, 'id' | 'createdAt'>) => void;
  deleteQuoteRequest: (id: string) => void;
  isAddReviewOpen: boolean;
  setIsAddReviewOpen: (open: boolean) => void;
  pricingConfig: PricingConfig;
  updatePricingConfig: (config: PricingConfig) => Promise<boolean>;
  services: Service[];
  fetchServices: () => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, data: Partial<Service>) => void;
  deleteService: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_COMPANY: CompanySettings = {
  phonePrimary: '0542 437 52 52',
  phonePrimaryRaw: '05424375252',
  whatsappNumber: '905355991572',
  address: 'Sakarya Mah. Evren Cad. No: 14/A, Fatsa / Ordu',
  email: 'info@aganakliyat.com',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('aga_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('aga_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const [companyInfo, setCompanyInfo] = useState<CompanySettings>(DEFAULT_COMPANY);

  useEffect(() => {
    supabase.from('company_settings').select('*').eq('id', 1).single()
      .then(({ data, error }) => {
        if (!error && data) {
          setCompanyInfo({
            phonePrimary: data.phoneprimary,
            phonePrimaryRaw: data.phoneprimaryraw,
            whatsappNumber: data.whatsappnumber,
            address: data.address,
            email: data.email,
          });
        }
      });
  }, []);

  const updateCompanyInfo = async (newInfo: Partial<CompanySettings>) => {
    const updated = { ...companyInfo, ...newInfo };
    setCompanyInfo(updated);
    await supabase.from('company_settings').update({
      phoneprimary: updated.phonePrimary,
      phoneprimaryraw: updated.phonePrimaryRaw,
      whatsappnumber: updated.whatsappNumber,
      address: updated.address,
      email: updated.email,
    }).eq('id', 1);
  };

  const DEFAULT_PRICING: PricingConfig = {
    base_prices: { '1+1': 5500, '2+1': 7500, '3+1': 9800, '4+1': 12500 },
    floor_cost_per_floor: 250,
    route_costs: { 'fatsa-fatsa': 0, 'fatsa-unye': 1500, 'fatsa-ordu': 2200, 'sehirlerarasi': 8000 },
    elevator_cost: 1000,
    markup_percent: 20,
  };

  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(DEFAULT_PRICING);

  useEffect(() => {
    supabase.from('pricing_config').select('*').eq('id', 1).single()
      .then(({ data, error }) => {
        if (!error && data) {
          setPricingConfig({
            base_prices: data.base_prices,
            floor_cost_per_floor: data.floor_cost_per_floor,
            route_costs: data.route_costs,
            elevator_cost: data.elevator_cost,
            markup_percent: data.markup_percent,
          });
        }
      });
  }, []);

  const updatePricingConfig = async (config: PricingConfig): Promise<boolean> => {
    const prev = pricingConfig;
    setPricingConfig(config);
    const { error } = await supabase.from('pricing_config').update({
      base_prices: config.base_prices,
      floor_cost_per_floor: config.floor_cost_per_floor,
      route_costs: config.route_costs,
      elevator_cost: config.elevator_cost,
      markup_percent: config.markup_percent,
    }).eq('id', 1);
    if (error) {
      console.error('Pricing update failed:', error.message);
      setPricingConfig(prev);
      return false;
    }
    return true;
  };

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const loadTestimonials = useCallback(async () => {
    const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setTestimonials(data.map((t: any) => ({
        id: String(t.id),
        name: t.name,
        location: t.location,
        rating: t.rating,
        comment: t.comment,
        date: t.date,
        serviceType: t.servicetype,
        status: t.status,
      })));
    }
  }, []);

  useEffect(() => { loadTestimonials(); }, [loadTestimonials]);

  const addTestimonial = async (review: Omit<Testimonial, 'id' | 'date'>) => {
    const date = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    const { data } = await supabase.from('testimonials').insert({
      name: review.name,
      location: review.location,
      rating: review.rating,
      comment: review.comment,
      servicetype: review.serviceType,
      date,
      status: 'approved',
    }).select().single();

    if (data) {
      setTestimonials((prev) => [{
        id: String(data.id),
        name: data.name,
        location: data.location,
        rating: data.rating,
        comment: data.comment,
        date: data.date,
        serviceType: data.servicetype,
        status: data.status,
      }, ...prev]);
    }
  };

  const approveTestimonial = async (id: string) => {
    await supabase.from('testimonials').update({ status: 'approved' }).eq('id', Number(id));
    setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, status: 'approved' as const } : t));
  };

  const deleteTestimonial = async (id: string) => {
    await supabase.from('testimonials').delete().eq('id', Number(id));
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const [quoteRequests, setQuoteRequests] = useState<QuoteFormData[]>([]);

  const loadQuoteRequests = useCallback(async () => {
    const { data, error } = await supabase.from('quote_requests').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setQuoteRequests(data.map((q: any) => ({
        id: String(q.id),
        name: q.name,
        phone: q.phone,
        fromLocation: q.fromlocation,
        toLocation: q.tolocation,
        moveType: q.movetype,
        moveDate: q.movedate || '',
        note: q.note || '',
        createdAt: q.createdat,
      })));
    }
  }, []);

  useEffect(() => { loadQuoteRequests(); }, [loadQuoteRequests]);

  const addQuoteRequest = async (req: Omit<QuoteFormData, 'id' | 'createdAt'>) => {
    const createdAt = new Date().toLocaleString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
    const { data } = await supabase.from('quote_requests').insert({
      name: req.name,
      phone: req.phone,
      fromlocation: req.fromLocation,
      tolocation: req.toLocation,
      movetype: req.moveType,
      movedate: req.moveDate,
      note: req.note,
      createdat: createdAt,
    }).select().single();

    if (data) {
      setQuoteRequests((prev) => [{
        id: String(data.id),
        name: data.name,
        phone: data.phone,
        fromLocation: data.fromlocation,
        toLocation: data.tolocation,
        moveType: data.movetype,
        moveDate: data.movedate || '',
        note: data.note || '',
        createdAt: data.createdat,
      }, ...prev]);
    }
  };

  const deleteQuoteRequest = async (id: string) => {
    await supabase.from('quote_requests').delete().eq('id', Number(id));
    setQuoteRequests((prev) => prev.filter((q) => q.id !== id));
  };

  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = useCallback(async () => {
    const { data, error } = await supabase.from('services').select('*').order('sort_order');
    if (!error && data) {
      setServices(data.map((s: any) => ({
        id: String(s.id),
        title: s.title,
        description: s.description,
        iconName: s.icon_name,
        image: s.image_url,
        features: s.features || [],
        popular: s.popular || false,
        sort_order: s.sort_order || 0,
      })));
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const addService = async (service: Omit<Service, 'id'>) => {
    const { data } = await supabase.from('services').insert({
      title: service.title,
      description: service.description,
      icon_name: service.iconName,
      image_url: service.image,
      features: service.features,
      popular: service.popular || false,
      sort_order: service.sort_order || 0,
    }).select().single();

    if (data) {
      setServices((prev) => [...prev, {
        id: String(data.id),
        title: data.title,
        description: data.description,
        iconName: data.icon_name,
        image: data.image_url,
        features: data.features || [],
        popular: data.popular || false,
        sort_order: data.sort_order || 0,
      }]);
    }
  };

  const updateService = async (id: string, data: Partial<Service>) => {
    const updates: any = {};
    if (data.title !== undefined) updates.title = data.title;
    if (data.description !== undefined) updates.description = data.description;
    if (data.iconName !== undefined) updates.icon_name = data.iconName;
    if (data.image !== undefined) updates.image_url = data.image;
    if (data.features !== undefined) updates.features = data.features;
    if (data.popular !== undefined) updates.popular = data.popular;
    if (data.sort_order !== undefined) updates.sort_order = data.sort_order;

    await supabase.from('services').update(updates).eq('id', Number(id));
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, ...data } : s));
  };

  const deleteService = async (id: string) => {
    await supabase.from('services').delete().eq('id', Number(id));
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      companyInfo, updateCompanyInfo,
      testimonials, addTestimonial, approveTestimonial, deleteTestimonial,
      quoteRequests, addQuoteRequest, deleteQuoteRequest,
      isAddReviewOpen, setIsAddReviewOpen,
      pricingConfig, updatePricingConfig,
      services, fetchServices, addService, updateService, deleteService,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
