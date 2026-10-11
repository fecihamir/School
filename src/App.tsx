/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { SCHOOL_CONFIG } from './config/schoolConfig';
import { ar } from './locales/ar';
import { fr } from './locales/fr';
import { en } from './locales/en';

// Direct ESM asset imports guaranteed to bundle and resolve in Vite dev, preview & production
import schoolLogo from './assets/images/logo.jpg';
import schoolBuilding from './assets/images/school_building_facade.jpg';

import { REAL_GALLERY_ITEMS, GalleryItem } from './data/schoolGallery';

import { 
  Palette, 
  BookOpen, 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  Facebook, 
  Globe, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Check, 
  Award, 
  Users, 
  CheckCircle2, 
  FileText, 
  Download, 
  Instagram, 
  ExternalLink, 
  Bell, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  GraduationCap,
  Waves,
  Activity,
  Monitor,
  Drama,
  Building2,
  Calendar,
  Layers,
  UtensilsCrossed,
  Code2,
  Bot,
  Compass,
  Maximize2,
  MessageCircle,
  Bus,
  HeartPulse,
  Trophy,
  Play,
  Pause,
  ArrowUp,
  Mail,
  Map,
  Navigation
} from 'lucide-react';

type Language = 'ar' | 'fr' | 'en';
type ViewMode = 'home' | 'resources' | 'news';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/fr')) return 'fr';
    if (path.startsWith('/en')) return 'en';
    return 'ar';
  });

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const path = window.location.pathname;
    if (path.includes('/resources') || path.includes('/ressources')) return 'resources';
    if (path.includes('/news') || path.includes('/actualites')) return 'news';
    return 'home';
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [bacModalOpen, setBacModalOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Resource center search
  const [resourceSearch, setResourceSearch] = useState('');

  // Interactive Lightbox index
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Horizontal gallery slider state
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);

  const galleryItems = REAL_GALLERY_ITEMS;
  const currentLightboxItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  const showNextSlide = () => {
    if (galleryItems.length === 0) return;
    setActiveSlideIndex(prev => (prev + 1) % galleryItems.length);
  };

  const showPrevSlide = () => {
    if (galleryItems.length === 0) return;
    setActiveSlideIndex(prev => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  // Pure timer that ONLY increments activeSlideIndex in state - ZERO DOM scroll or side-effects!
  useEffect(() => {
    if (isHovered || galleryItems.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlideIndex(prev => (prev + 1) % galleryItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, galleryItems.length]);

  const showNextLightbox = () => {
    if (lightboxIndex !== null && galleryItems.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
    }
  };

  const showPrevLightbox = () => {
    if (lightboxIndex !== null && galleryItems.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        lang === 'ar' ? showPrevLightbox() : showNextLightbox();
      }
      if (e.key === 'ArrowLeft') {
        lang === 'ar' ? showNextLightbox() : showPrevLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryItems.length, lang]);

  // Sync document lang and dir attributes & URL paths
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    let subPath = '';
    if (viewMode === 'resources') {
      subPath = lang === 'fr' ? 'ressources' : 'resources';
    } else if (viewMode === 'news') {
      subPath = lang === 'fr' ? 'actualites' : 'news';
    }

    const newPath = subPath ? `/${lang}/${subPath}/` : `/${lang}/`;
    if (window.location.pathname !== newPath && window.location.pathname !== `/${lang}/${subPath}`) {
      window.history.replaceState({}, '', newPath);
    }
  }, [lang, viewMode]);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = lang === 'ar' ? ar : lang === 'fr' ? fr : en;

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const navigateTo = (mode: ViewMode) => {
    setViewMode(mode);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-600 selection:text-white">
      
      {/* Announcement Strip */}
      {announcementVisible && (
        <aside aria-label="Announcement" className="w-full bg-teal-950 text-teal-100 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-medium border-b border-teal-800 z-50 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-grow min-w-0 text-center flex-wrap sm:flex-nowrap">
              <span className="inline-flex items-center gap-1.5 text-teal-100 min-w-0">
                <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" aria-hidden="true" />
                <span className="leading-snug">{t.announcement.text}</span>
              </span>
              <button 
                onClick={() => setEnrollModalOpen(true)}
                className="underline font-bold text-amber-300 hover:text-white ms-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                {t.nav.enroll} →
              </button>
            </div>
            <button 
              onClick={() => setAnnouncementVisible(false)}
              className="p-1 rounded-lg text-teal-300 hover:text-white hover:bg-teal-900 transition-colors shrink-0"
              aria-label={t.announcement.dismiss}
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </aside>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Wordmark with Authentic Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 sm:gap-3 group min-w-0 max-w-[calc(100%-125px)] sm:max-w-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-xl p-0.5 sm:p-1 text-start"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-slate-200 group-hover:scale-105 transition-transform bg-white shrink-0">
              <img 
                src={schoolLogo} 
                alt="Hibr wa Alwan Official Logo" 
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base lg:text-lg font-black text-slate-950 tracking-tight group-hover:text-teal-700 transition-colors leading-tight truncate">
                {SCHOOL_CONFIG.name[lang]}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-teal-700 leading-tight truncate sm:whitespace-normal">
                Groupe Scolaire Encre & Pastel — Ouled Fayet
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button 
              onClick={() => navigateTo('home')} 
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${viewMode === 'home' ? 'text-teal-700 bg-teal-50' : 'text-slate-700 hover:text-teal-700 hover:bg-slate-100'}`}
            >
              {t.nav.home}
            </button>
            <a 
              href="#stages" 
              onClick={() => setViewMode('home')}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.nav.stages}
            </a>
            <a 
              href="#palmares" 
              onClick={() => setViewMode('home')}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.nav.palmares}
            </a>
            <a 
              href="#facilities" 
              onClick={() => setViewMode('home')}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.nav.facilities}
            </a>
            <a 
              href="#vie-scolaire" 
              onClick={() => setViewMode('home')}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.nav.services}
            </a>
            <a 
              href="#summer-school" 
              onClick={() => setViewMode('home')}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.nav.summerSchool}
            </a>
            <button 
              onClick={() => navigateTo('news')} 
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${viewMode === 'news' ? 'text-teal-700 bg-teal-50' : 'text-slate-700 hover:text-teal-700 hover:bg-slate-100'}`}
            >
              {t.nav.news}
            </button>
            <button 
              onClick={() => navigateTo('resources')} 
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${viewMode === 'resources' ? 'text-teal-700 bg-teal-50' : 'text-slate-700 hover:text-teal-700 hover:bg-slate-100'}`}
            >
              {t.nav.resources}
            </button>
            <a 
              href="#contact" 
              onClick={() => setViewMode('home')}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Actions: Language Dropdown + CTA + Mobile Hamburger Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Globe Language Selector Dropdown */}
            <div className="relative shrink-0" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all focus-visible:ring-2 focus-visible:ring-teal-600 shrink-0"
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
                aria-label={lang === 'ar' ? 'تغيير اللغة' : lang === 'fr' ? 'Changer de langue' : 'Change language'}
              >
                <Globe className="w-3.5 h-3.5 text-teal-700 shrink-0" aria-hidden="true" />
                <span className="uppercase text-[11px] font-black">{lang}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute end-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                  role="menu"
                >
                  <button
                    onClick={() => handleLangChange('ar')}
                    className={`w-full text-start px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors ${lang === 'ar' ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'}`}
                    role="menuitem"
                  >
                    <span>العربية (AR)</span>
                    {lang === 'ar' && <Check className="w-3.5 h-3.5 text-teal-700" />}
                  </button>
                  <button
                    onClick={() => handleLangChange('fr')}
                    className={`w-full text-start px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors ${lang === 'fr' ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'}`}
                    role="menuitem"
                  >
                    <span>Français (FR)</span>
                    {lang === 'fr' && <Check className="w-3.5 h-3.5 text-teal-700" />}
                  </button>
                  <button
                    onClick={() => handleLangChange('en')}
                    className={`w-full text-start px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors ${lang === 'en' ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'}`}
                    role="menuitem"
                  >
                    <span>English (EN)</span>
                    {lang === 'en' && <Check className="w-3.5 h-3.5 text-teal-700" />}
                  </button>
                </div>
              )}
            </div>

            {/* Inquire CTA Button */}
            <button
              onClick={() => setEnrollModalOpen(true)}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs hover:shadow transition-all focus-visible:ring-2 focus-visible:ring-teal-700 shrink-0"
            >
              {t.nav.enroll}
            </button>

            {/* Mobile Menu Toggle (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 hover:text-teal-900 transition-all shrink-0 border border-slate-200/90 focus-visible:ring-2 focus-visible:ring-teal-600 shadow-2xs"
              aria-label={mobileMenuOpen ? (lang === 'ar' ? 'إغلاق القائمة' : 'Close navigation menu') : (lang === 'ar' ? 'فتح القائمة الرئيسية' : 'Open navigation menu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-800" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-slate-800" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-lg">
            <button 
              onClick={() => navigateTo('home')} 
              className={`w-full text-start px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${viewMode === 'home' ? 'text-teal-800 bg-teal-50' : 'text-slate-800 hover:bg-slate-100'}`}
            >
              {t.nav.home}
            </button>
            <a 
              href="#stages" 
              onClick={() => { setViewMode('home'); setMobileMenuOpen(false); }}
              className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              {t.nav.stages}
            </a>
            <a 
              href="#palmares" 
              onClick={() => { setViewMode('home'); setMobileMenuOpen(false); }}
              className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              {t.nav.palmares}
            </a>
            <a 
              href="#facilities" 
              onClick={() => { setViewMode('home'); setMobileMenuOpen(false); }}
              className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              {t.nav.facilities}
            </a>
            <a 
              href="#vie-scolaire" 
              onClick={() => { setViewMode('home'); setMobileMenuOpen(false); }}
              className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              {t.nav.services}
            </a>
            <a 
              href="#summer-school" 
              onClick={() => { setViewMode('home'); setMobileMenuOpen(false); }}
              className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              {t.nav.summerSchool}
            </a>
            <button 
              onClick={() => navigateTo('news')} 
              className={`w-full text-start px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${viewMode === 'news' ? 'text-teal-800 bg-teal-50' : 'text-slate-800 hover:bg-slate-100'}`}
            >
              {t.nav.news}
            </button>
            <button 
              onClick={() => navigateTo('resources')} 
              className={`w-full text-start px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${viewMode === 'resources' ? 'text-teal-800 bg-teal-50' : 'text-slate-800 hover:bg-slate-100'}`}
            >
              {t.nav.resources}
            </button>
            <a 
              href="#contact" 
              onClick={() => { setViewMode('home'); setMobileMenuOpen(false); }}
              className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              {t.nav.contact}
            </a>
            <div className="pt-2">
              <button
                onClick={() => { setEnrollModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xs transition-colors"
              >
                {t.nav.enroll}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {viewMode === 'home' && (
          <>
            {/* Hero Section — Balanced vertical spacing, responsive font size, no excessive offset */}
            <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-slate-50 py-8 sm:py-12 lg:py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  
                  {/* Left Column (Hero Content) */}
                  <div className="lg:col-span-7 space-y-4 text-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200 text-teal-900 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" aria-hidden="true" />
                      <span>{t.hero.verifiedBadge}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-black text-slate-950 tracking-tight leading-tight max-w-2xl">
                      {t.hero.title}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal max-w-xl">
                      {t.hero.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setEnrollModalOpen(true)}
                        className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all"
                      >
                        {t.hero.ctaEnroll}
                      </button>
                      <a
                        href="#stages"
                        className="px-5 py-3 rounded-xl border border-slate-300 hover:border-teal-600 bg-white text-slate-800 font-bold text-xs sm:text-sm hover:text-teal-700 transition-all"
                      >
                        {t.hero.ctaExplore}
                      </a>
                    </div>

                    {/* Verified Quick Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                        <span className="block text-base sm:text-lg font-black text-teal-800">100%</span>
                        <span className="text-[11px] font-semibold text-slate-600">{t.hero.statStudents}</span>
                      </div>
                      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                        <span className="block text-base sm:text-lg font-black text-indigo-800">25m</span>
                        <span className="text-[11px] font-semibold text-slate-600">{t.hero.statRating}</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                        <span className="block text-xs sm:text-sm font-black text-amber-700 font-mono tracking-wide" dir="ltr">0557.72.28.45</span>
                        <span className="text-[11px] font-semibold text-slate-600">Ouled Fayet</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Hero Visual Composition — Authentic Campus Building) */}
                  <div className="lg:col-span-5">
                    <div 
                      onClick={() => {
                        const bIdx = REAL_GALLERY_ITEMS.findIndex(g => g.id === 'building-facade');
                        if (bIdx !== -1) {
                          setLightboxIndex(bIdx);
                        }
                      }}
                      className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 group aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] max-h-[520px] w-full mx-auto cursor-pointer transition-transform"
                    >
                      <img 
                        src={schoolBuilding} 
                        alt="Façade du Groupe Scolaire Encre & Pastel à Ouled Fayet" 
                        className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                        loading="eager"
                      />
                      <div className="absolute top-3.5 end-3.5 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Maximize2 className="w-3.5 h-3.5 text-teal-300" />
                        <span>{t.gallery.viewPhoto}</span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-5 text-white text-start z-10">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider mb-1.5 shadow-xs">
                          {SCHOOL_CONFIG.name[lang]}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold leading-tight break-words">
                          Groupe Scolaire Encre & Pastel — Ouled Fayet
                        </h3>
                        <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>طريق بوشاوي، بجانب بلدية أولاد فايت وإقامة النخيل</span>
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Story & Educational Vision */}
            <section className="py-10 sm:py-14 bg-white border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center space-y-3.5">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.story.eyebrow}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {t.story.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {t.story.text1}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {t.story.text2}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
                    <span className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                      ✓ {t.story.pill1}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                      ✓ {t.story.pill2}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                      ✓ {t.story.pill3}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Educational Stages Section */}
            <section id="stages" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2.5">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.stages.eyebrow}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {t.stages.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {t.stages.subtitle}
                  </p>
                </div>

                {/* Stages Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {SCHOOL_CONFIG.stages.map((stage) => (
                    <div 
                      key={stage.id} 
                      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-100">
                            {stage.tag[lang]}
                          </span>
                          <GraduationCap className="w-5 h-5 text-teal-700" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                          {stage.title[lang]}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {stage.description[lang]}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <button
                          onClick={() => setEnrollModalOpen(true)}
                          className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                        >
                          <span>{t.nav.enroll}</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Secondary Streams Deep Dive Card */}
                <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-teal-800">
                  <div className="max-w-3xl space-y-3">
                    <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
                      1AS • 2AS • 3AS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {t.secondaryStreams.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {t.secondaryStreams.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-6">
                    {[
                      t.secondaryStreams.s1,
                      t.secondaryStreams.s2,
                      t.secondaryStreams.s3,
                      t.secondaryStreams.s4,
                      t.secondaryStreams.s5,
                      t.secondaryStreams.s6,
                    ].map((stream, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white/10 hover:bg-white/15 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 transition-colors flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-100">{stream}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* Academic Honors & Palmarès Section */}
            <section id="palmares" className="py-12 sm:py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white border-y border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                <div className="text-center max-w-3xl mx-auto space-y-2.5">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                    {t.palmares.eyebrow}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {t.palmares.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    {t.palmares.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Authentic Ceremony Photo (Proper Portrait Framing with full face visibility) */}
                  <div className="lg:col-span-6 flex justify-center">
                    <div 
                      onClick={() => setBacModalOpen(true)}
                      className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-950 group aspect-[4/5] sm:aspect-[4/5] max-h-[580px] w-full max-w-md mx-auto cursor-pointer flex items-center justify-center"
                      title={t.gallery.viewPhoto}
                    >
                      <img 
                        src="/images/real/ceremony_excellence.jpg" 
                        alt="Cérémonie d'excellence du Baccalauréat 2026 — Groupe Scolaire Encre & Pastel" 
                        className="w-full h-full object-contain p-1.5 group-hover:scale-102 transition-transform duration-700 bg-slate-950"
                        loading="lazy"
                      />
                      <div className="absolute top-4 start-4 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-lg flex items-center gap-1.5 z-10">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>BAC 2026 • لوحة الشرف</span>
                      </div>
                      <div className="absolute top-4 end-4 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20 flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity z-10 shadow-sm">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>{t.gallery.viewPhoto}</span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-5 sm:p-6 text-white text-start z-10 pointer-events-none">
                        <h4 className="text-base sm:text-lg font-bold leading-tight text-white drop-shadow-xs">
                          {t.palmares.honorsTitle}
                        </h4>
                        <p className="text-xs text-slate-200 mt-1.5 leading-relaxed font-normal">
                          {t.palmares.honorsDesc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Key Metrics & Distinctions */}
                  <div className="lg:col-span-6 space-y-4 text-start">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                        <span className="block text-2xl sm:text-3xl font-black text-amber-300">
                          {t.palmares.stat1Val}
                        </span>
                        <span className="text-xs text-slate-300 mt-1 block font-medium">
                          {t.palmares.stat1Label}
                        </span>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                        <span className="block text-2xl sm:text-3xl font-black text-teal-300">
                          {t.palmares.stat2Val}
                        </span>
                        <span className="text-xs text-slate-300 mt-1 block font-medium">
                          {t.palmares.stat2Label}
                        </span>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                        <span className="block text-xl sm:text-2xl font-black text-white">
                          {t.palmares.stat3Val}
                        </span>
                        <span className="text-xs text-slate-300 mt-1 block font-medium">
                          {t.palmares.stat3Label}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-5 rounded-3xl border border-teal-500/30 space-y-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400 shrink-0" />
                        <h4 className="text-sm font-bold text-white">
                          {t.palmares.badgeLabel}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {t.newsSection.item1Desc}
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-teal-300 font-bold">
                          ✓ {lang === 'ar' ? 'نتائج موثقة رسمياً' : lang === 'fr' ? 'Résultats officiels certifiés' : 'Certified Official Results'}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-300">
                          {lang === 'ar' ? 'أولاد فايت، الجزائر العاصمة' : 'Ouled Fayet, Alger'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => setEnrollModalOpen(true)}
                        className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors inline-flex items-center gap-2 shadow-xs"
                      >
                        <span>{t.hero.ctaEnroll}</span>
                        <span>→</span>
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            </section>

            {/* Campus Facilities Section */}
            <section id="facilities" className="py-12 sm:py-16 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2.5">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.facilities.eyebrow}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {t.facilities.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {t.facilities.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SCHOOL_CONFIG.facilities.map((fac) => (
                    <div 
                      key={fac.id}
                      className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div 
                        className="relative aspect-16/10 overflow-hidden bg-slate-900 cursor-pointer"
                        onClick={() => {
                          const matchIdx = REAL_GALLERY_ITEMS.findIndex(g => g.image === fac.image);
                          if (matchIdx !== -1) {
                            setLightboxIndex(matchIdx);
                          }
                        }}
                      >
                        <img 
                          src={fac.image} 
                          alt={fac.title[lang]} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                          <span className="text-white text-xs font-bold inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-xl">
                            <Maximize2 className="w-3.5 h-3.5 text-teal-300" />
                            <span>{t.gallery.viewPhoto}</span>
                          </span>
                        </div>
                        <div className="absolute top-3 start-3 px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1.5 border border-white/20">
                          {fac.id === 'pool' && <Waves className="w-3.5 h-3.5 text-teal-400" />}
                          {fac.id === 'sports_hall' && <Activity className="w-3.5 h-3.5 text-teal-400" />}
                          {fac.id === 'smart_classes' && <Monitor className="w-3.5 h-3.5 text-teal-400" />}
                          {fac.id === 'art_kitchen_studios' && <Sparkles className="w-3.5 h-3.5 text-teal-400" />}
                          {fac.id === 'theater_hall' && <Drama className="w-3.5 h-3.5 text-teal-400" />}
                          {fac.id === 'building' && <Building2 className="w-3.5 h-3.5 text-teal-400" />}
                          <span>{fac.title[lang]}</span>
                        </div>
                      </div>
                      <div className="p-5 sm:p-6 space-y-2.5 text-start flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                            {fac.title[lang]}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {fac.description[lang]}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between">
                          <button
                            onClick={() => {
                              const matchIdx = REAL_GALLERY_ITEMS.findIndex(g => g.image === fac.image);
                              if (matchIdx !== -1) {
                                setLightboxIndex(matchIdx);
                              }
                            }}
                            className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                          >
                            <span>{t.gallery.viewPhoto}</span>
                            <span>→</span>
                          </button>
                          <span className="text-[11px] text-slate-400 font-medium">Ouled Fayet</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Campus Life & Family Services Section */}
            <section id="vie-scolaire" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                <div className="text-center max-w-2xl mx-auto space-y-2.5">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.vieScolaire.eyebrow}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {t.vieScolaire.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {t.vieScolaire.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Service 1: Safe Transportation */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-start space-y-3">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
                        <Bus className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {t.vieScolaire.transportTitle}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {t.vieScolaire.transportDesc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-teal-700">
                        ✓ {lang === 'ar' ? 'تغطية أولاد فايت والمناطق المجاورة' : lang === 'fr' ? 'Ouled Fayet & environs' : 'Ouled Fayet & surroundings'}
                      </span>
                    </div>
                  </div>

                  {/* Service 2: Healthy Dining */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-start space-y-3">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                        <UtensilsCrossed className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {t.vieScolaire.cantineTitle}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {t.vieScolaire.cantineDesc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-amber-700">
                        ✓ {lang === 'ar' ? 'وجبات ساخنة متوازنة يومياً' : lang === 'fr' ? 'Repas chauds équilibrés' : 'Fresh balanced hot meals'}
                      </span>
                    </div>
                  </div>

                  {/* Service 3: Security & Health */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-start space-y-3">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
                        <HeartPulse className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {t.vieScolaire.securityTitle}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {t.vieScolaire.securityDesc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-indigo-700">
                        ✓ {lang === 'ar' ? 'كاميرات مراقبة وخزائن خاصة' : lang === 'fr' ? 'Accès sécurisé & casiers' : 'Secure access & lockers'}
                      </span>
                    </div>
                  </div>

                  {/* Service 4: Clubs & Tutoring */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-start space-y-3">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-100">
                        <Trophy className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {t.vieScolaire.clubsTitle}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {t.vieScolaire.clubsDesc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-rose-700">
                        ✓ {lang === 'ar' ? 'متابعة بيداغوجية مستمرة' : lang === 'fr' ? 'Accompagnement continu' : 'Continuous academic tutoring'}
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* Summer School & Specialized Workshops */}
            <section id="summer-school" className="py-12 sm:py-16 bg-teal-950 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-3xl mx-auto space-y-2.5">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                    {t.summerSchool.eyebrow}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {t.summerSchool.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-100/90 font-normal">
                    {t.summerSchool.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {[
                    { title: t.summerSchool.item1, desc: t.summerSchool.item1Desc, icon: UtensilsCrossed },
                    { title: t.summerSchool.item2, desc: t.summerSchool.item2Desc, icon: Code2 },
                    { title: t.summerSchool.item3, desc: t.summerSchool.item3Desc, icon: Bot },
                    { title: t.summerSchool.item4, desc: t.summerSchool.item4Desc, icon: BookOpen },
                    { title: t.summerSchool.item5, desc: t.summerSchool.item5Desc, icon: Layers },
                    { title: t.summerSchool.item6, desc: t.summerSchool.item6Desc, icon: Palette },
                    { title: t.summerSchool.item7, desc: t.summerSchool.item7Desc, icon: Waves },
                    { title: t.summerSchool.item8, desc: t.summerSchool.item8Desc, icon: Compass },
                  ].map((ws, i) => {
                    const IconComp = ws.icon;
                    return (
                      <div 
                        key={i} 
                        className="bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-2xl p-4.5 border border-white/10 transition-colors space-y-2.5 text-start"
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
                          <IconComp className="w-4.5 h-4.5" />
                        </div>
                        <h4 className="text-sm font-bold text-white">{ws.title}</h4>
                        <p className="text-xs text-teal-100/80 leading-relaxed font-normal">{ws.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setEnrollModalOpen(true)}
                    className="px-7 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
                  >
                    {t.cta.button}
                  </button>
                </div>
              </div>
            </section>

            {/* Honors, Awards & News Showcase */}
            <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="space-y-1.5 text-start">
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                      {t.newsSection.eyebrow}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                      {t.newsSection.title}
                    </h2>
                  </div>
                  <button 
                    onClick={() => navigateTo('news')}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 underline"
                  >
                    {t.newsSection.viewAll} →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: t.newsSection.item1Title, date: t.newsSection.item1Date, desc: t.newsSection.item1Desc, badge: "BAC 2026", image: "/images/real/ceremony_excellence.jpg" },
                    { title: t.newsSection.item2Title, date: t.newsSection.item2Date, desc: t.newsSection.item2Desc, badge: "Tipaza", image: "/images/real/FB_IMG_1791624166575.jpg" },
                    { title: t.newsSection.item3Title, date: t.newsSection.item3Date, desc: t.newsSection.item3Desc, badge: "Echorouk", image: "/images/real/FB_IMG_1791624189505.jpg" },
                  ].map((post, idx) => (
                    <div 
                      key={idx} 
                      className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 start-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20">
                          {post.badge}
                        </div>
                      </div>
                      <div className="p-5 sm:p-6 space-y-2.5 text-start flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-xs text-slate-400 font-medium">{post.date}</span>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">{post.desc}</p>
                        </div>
                        <div className="pt-4 border-t border-slate-100 mt-4 text-start">
                          <button 
                            onClick={() => navigateTo('news')}
                            className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                          >
                            <span>{t.newsSection.readMore}</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Photo Gallery Showcase */}
            <section 
              id="gallery" 
              className="py-12 sm:py-16 bg-slate-900 text-white relative border-b border-slate-800"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                    {t.gallery.eyebrow}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {t.gallery.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {t.gallery.subtitle}
                  </p>
                </div>

                {/* Photo Display Stage - Large & Clean Frame where all photos are completely visible */}
                {galleryItems.length > 0 && (
                  <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl h-[400px] sm:h-[500px] md:h-[580px] flex items-center justify-center p-3 sm:p-5 group select-none">
                    
                    {/* Active Photo - Fully framed and visible with object-contain */}
                    <img 
                      key={activeSlideIndex}
                      src={galleryItems[activeSlideIndex]?.image}
                      alt={galleryItems[activeSlideIndex]?.title[lang]}
                      className="max-h-full max-w-full w-auto h-auto object-contain mx-auto rounded-2xl shadow-xl transition-opacity duration-300 pointer-events-none"
                      loading="eager"
                    />

                    {/* Previous Button Arrow (Left side) */}
                    <button
                      onClick={showPrevSlide}
                      className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-slate-900/80 hover:bg-teal-700 text-white border border-white/20 hover:border-teal-400 shadow-xl transition-all active:scale-95 cursor-pointer z-10"
                      aria-label={t.gallery.prev}
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Next Button Arrow (Right side) */}
                    <button
                      onClick={showNextSlide}
                      className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-slate-900/80 hover:bg-teal-700 text-white border border-white/20 hover:border-teal-400 shadow-xl transition-all active:scale-95 cursor-pointer z-10"
                      aria-label={t.gallery.next}
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                )}

                {/* Clean Caption & Slide Counter Underneath the Frame (Does NOT cover the picture) */}
                <div className="text-center max-w-2xl mx-auto space-y-1.5 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950/70 border border-teal-500/30 px-3 py-0.5 rounded-full">
                      {activeSlideIndex + 1} / {galleryItems.length}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {galleryItems[activeSlideIndex]?.title[lang]}
                    </h3>
                  </div>
                  {galleryItems[activeSlideIndex]?.description && (
                    <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                      {galleryItems[activeSlideIndex]?.description[lang]}
                    </p>
                  )}
                </div>

              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.faq.eyebrow}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                    {t.faq.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">{t.faq.subtitle}</p>
                </div>

                <div className="space-y-3">
                  {[
                    { q: t.faq.q1, a: t.faq.a1 },
                    { q: t.faq.q2, a: t.faq.a2 },
                    { q: t.faq.q3, a: t.faq.a3 },
                    { q: t.faq.q4, a: t.faq.a4 },
                  ].map((faqItem, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all text-start"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4.5 font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50"
                      >
                        <span>{faqItem.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-teal-700' : ''}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="px-4.5 pb-4.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                          {faqItem.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact & Geographic Location Section */}
            <section id="contact" className="py-12 sm:py-16 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2.5">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.contact.eyebrow}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {t.contact.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {t.contact.subtitle}
                  </p>
                </div>

                {/* Clean, Simple Geographic Map & Action Button */}
                <div className="space-y-5 max-w-5xl mx-auto">
                  {/* Clean Map Frame */}
                  <div className="w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                    <iframe
                      title="Ecole Encre et Pastel Ouled Fayet Location Map"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=2.930%2C36.726%2C2.970%2C36.746&layer=mapnik&marker=36.7358%2C2.9515"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>

                  {/* Simple, Normal Google Maps Button */}
                  <div className="flex justify-center">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Groupe+Scolaire+Encre+%26+Pastel+Ouled+Fayet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-sm hover:shadow transition-colors"
                    >
                      <MapPin className="w-5 h-5 text-teal-200" />
                      <span>{t.contact.openGoogleMaps}</span>
                      <ExternalLink className="w-4 h-4 text-white/80" />
                    </a>
                  </div>
                </div>

                {/* 4 Contact Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Address Card */}
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2.5 text-start hover:shadow-md transition-shadow">
                    <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.contact.addressTitle}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {t.contact.addressVal}
                    </p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Groupe+Scolaire+Encre+%26+Pastel+Ouled+Fayet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-teal-700 hover:underline block pt-1.5"
                    >
                      {t.contact.openGoogleMaps} →
                    </a>
                  </div>

                  {/* Phone Lines Card */}
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2.5 text-start hover:shadow-md transition-shadow">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.contact.phoneTitle}</h3>
                    <div className="space-y-1">
                      <a href="tel:0557722845" className="text-xs sm:text-sm font-bold text-indigo-700 hover:underline block font-mono tracking-wide" dir="ltr">
                        0557.72.28.45
                      </a>
                      <a href="tel:0550096934" className="text-xs sm:text-sm font-bold text-indigo-700 hover:underline block font-mono tracking-wide" dir="ltr">
                        0550.09.69.34
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {SCHOOL_CONFIG.contact.email}
                    </p>
                  </div>

                  {/* Office Hours */}
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2.5 text-start hover:shadow-md transition-shadow">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Clock className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.contact.hoursTitle}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {t.contact.hoursVal}
                    </p>
                    <span className="inline-block text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
                      {lang === 'ar' ? 'استقبال الأولياء يومياً' : 'Accueil ouvert tous les jours'}
                    </span>
                  </div>

                  {/* Social Channels */}
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2.5 text-start hover:shadow-md transition-shadow">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                      <Facebook className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.contact.facebookTitle}</h3>
                    <div className="flex flex-col gap-1.5 pt-1">
                      <a 
                        href={SCHOOL_CONFIG.location.facebookUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1.5"
                      >
                        <Facebook className="w-3.5 h-3.5 shrink-0" />
                        <span>Encre & Pastel حبر وألوان</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a 
                        href={SCHOOL_CONFIG.location.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-pink-600 hover:underline flex items-center gap-1.5"
                      >
                        <Instagram className="w-3.5 h-3.5 shrink-0" />
                        <span>ecole_encre_pastel</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </>
        )}

        {/* Resources View */}
        {viewMode === 'resources' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <button 
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:underline mb-1"
              >
                ← {lang === 'ar' ? 'العودة إلى الرئيسية' : 'Retour à l\'accueil'}
              </button>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                {t.resourcesSection.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                {t.resourcesSection.subtitle}
              </p>

              {/* Search bar */}
              <div className="pt-3 max-w-md mx-auto relative">
                <Search className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-slate-400" aria-hidden="true" />
                <input 
                  type="text"
                  value={resourceSearch}
                  onChange={(e) => setResourceSearch(e.target.value)}
                  placeholder={lang === 'ar' ? "بحث في الموارد والملخصات..." : "Rechercher un document..."}
                  className="w-full ps-10 pe-4 py-2.5 rounded-2xl border border-slate-200 text-xs bg-white shadow-2xs focus:outline-teal-600"
                />
              </div>
            </div>

            {/* Official Admissions Information Notice */}
            <div className="bg-gradient-to-r from-teal-900 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-teal-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-start max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
                  {lang === 'ar' ? 'إعلان إداري رسمي معتمد' : 'Avis Officiel d\'Admission'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {lang === 'ar' ? 'التسجيلات المدرسية المفتوحة لجميع الأطوار' : 'Inscriptions Scolaires Ouvertes'}
                </h2>
                <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed font-normal">
                  {lang === 'ar' 
                    ? 'نستقبل أبناءنا التلاميذ في الأطوار (تحضيري، ابتدائي، متوسط، ثانوي) بمقرنا الكائن بطريق بوشاوي، أولاد فايت. يرجى الاطلاع على جدول التخصصات والمستويات أدناه.'
                    : 'Nous accueillons les élèves du préscolaire au secondaire dans notre établissement à Ouled Fayet. Consultez les filières et programmes ci-dessous.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {[
                { title: t.resourcesSection.file1Title, desc: t.resourcesSection.file1Desc, meta: t.resourcesSection.file1Meta },
                { title: t.resourcesSection.file2Title, desc: t.resourcesSection.file2Desc, meta: t.resourcesSection.file2Meta },
                { title: t.resourcesSection.file3Title, desc: t.resourcesSection.file3Desc, meta: t.resourcesSection.file3Meta },
              ]
                .filter(item => item.title.toLowerCase().includes(resourceSearch.toLowerCase()) || item.desc.toLowerCase().includes(resourceSearch.toLowerCase()))
                .map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3.5 flex flex-col justify-between text-start">
                    <div className="space-y-2.5">
                      <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800">
                        <FileText className="w-4.5 h-4.5" aria-hidden="true" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-950">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                      <span className="inline-block text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{item.meta}</span>
                    </div>
                    <button 
                      onClick={() => setEnrollModalOpen(true)} 
                      className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.resourcesSection.downloadBtn}</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* News View */}
        {viewMode === 'news' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <button 
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:underline mb-1"
              >
                ← {lang === 'ar' ? 'العودة إلى الرئيسية' : 'Retour à l\'accueil'}
              </button>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                {t.newsSection.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                {t.newsSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {[
                { title: t.newsSection.item1Title, date: t.newsSection.item1Date, desc: t.newsSection.item1Desc, badge: "BAC 2026", image: "/images/real/ceremony_excellence.jpg" },
                { title: t.newsSection.item2Title, date: t.newsSection.item2Date, desc: t.newsSection.item2Desc, badge: "Tipaza", image: "/images/real/FB_IMG_1791624166575.jpg" },
                { title: t.newsSection.item3Title, date: t.newsSection.item3Date, desc: t.newsSection.item3Desc, badge: "Echorouk", image: "/images/real/FB_IMG_1791624189505.jpg" },
              ].map((item, idx) => (
                <div key={idx} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between text-start">
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 start-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold border border-white/20">
                      {item.badge}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button 
                        onClick={() => setEnrollModalOpen(true)} 
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                      >
                        <span>{t.newsSection.readMore}</span>
                        <span>→</span>
                      </button>
                      <span className="text-[10px] text-slate-400 font-medium">حبر وألوان</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Enhanced Institutional Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Main Footer 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 text-start">
            
            {/* Column 1: Identity & Accreditation (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-700 bg-white shadow-md shrink-0">
                  <img 
                    src={schoolLogo} 
                    alt="Groupe Scolaire Encre & Pastel Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-base font-black text-white tracking-tight">{SCHOOL_CONFIG.name[lang]}</span>
                  <span className="text-[11px] font-semibold text-teal-400">Groupe Scolaire Encre & Pastel — Ouled Fayet</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {t.footer.aboutText}
              </p>

              {/* Accreditation Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-950/80 border border-teal-800/80 text-teal-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.footer.accreditedBadge}</span>
              </div>

              {/* Social Channels Pills */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={SCHOOL_CONFIG.location.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 transition-colors shadow-xs"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={SCHOOL_CONFIG.location.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white border border-slate-800 transition-colors shadow-xs"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/213557722845`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white border border-slate-800 transition-colors shadow-xs"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-3.5">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                {t.footer.quickLinksTitle}
              </h4>
              <ul className="space-y-2 text-xs font-medium text-slate-300">
                <li>
                  <button onClick={() => navigateTo('home')} className="hover:text-teal-300 transition-colors cursor-pointer">
                    {t.nav.home}
                  </button>
                </li>
                <li>
                  <a href="#stages" onClick={() => setViewMode('home')} className="hover:text-teal-300 transition-colors">
                    {t.nav.stages}
                  </a>
                </li>
                <li>
                  <a href="#palmares" onClick={() => setViewMode('home')} className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                    <span>{t.nav.palmares}</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold">BAC</span>
                  </a>
                </li>
                <li>
                  <a href="#gallery" onClick={() => setViewMode('home')} className="hover:text-teal-300 transition-colors">
                    {t.gallery.title}
                  </a>
                </li>
                <li>
                  <button onClick={() => navigateTo('resources')} className="hover:text-teal-300 transition-colors cursor-pointer">
                    {t.nav.resources}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('news')} className="hover:text-teal-300 transition-colors cursor-pointer">
                    {t.nav.news}
                  </button>
                </li>
                <li>
                  <a href="#contact" onClick={() => setViewMode('home')} className="hover:text-teal-300 transition-colors">
                    {t.nav.contact}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Educational Cycles & Facilities (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                {t.footer.cyclesTitle}
              </h4>
              <ul className="space-y-2 text-xs font-medium text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>{t.footer.cycle1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>{t.footer.cycle2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>{t.footer.cycle3}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>{t.footer.cycle4}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>{t.footer.cycle5}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>{t.footer.cycle6}</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Reception, Contact & Direct Enroll (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                {t.footer.receptionTitle}
              </h4>
              <div className="space-y-2.5 text-xs text-slate-300 font-normal">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{t.contact.addressVal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                  <div className="flex items-center gap-2 font-mono font-bold" dir="ltr">
                    <a href="tel:0557722845" className="hover:text-white hover:underline">0557.72.28.45</a>
                    <span>•</span>
                    <a href="tel:0550096934" className="hover:text-white hover:underline">0550.09.69.34</a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="font-mono text-[11px] truncate">{SCHOOL_CONFIG.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{t.contact.hoursVal}</span>
                </div>
              </div>

              {/* Direct Enrollment Button */}
              <button
                onClick={() => setEnrollModalOpen(true)}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.nav.enroll}</span>
              </button>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-medium">
                {t.footer.rights}
              </p>
              <p className="text-[11px] text-slate-500">
                {t.footer.disclaimer}
              </p>
            </div>

            {/* Back to Top Smooth Scroll Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-800 transition-colors shadow-xs cursor-pointer group"
              title={t.footer.backToTop}
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </footer>

      {/* Baccalaureate 2026 Honors Full-Resolution Modal */}
      {bacModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
          onClick={() => setBacModalOpen(false)}
        >
          <div 
            className="relative max-w-3xl w-full bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 px-5 flex items-center justify-between border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  {lang === 'ar' ? 'تكريم أوائل شهادة البكالوريا 2026 — لوحة الشرف' : 'Cérémonie d\'Excellence du Baccalauréat 2026'}
                </span>
              </div>
              <button 
                onClick={() => setBacModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative flex-grow flex items-center justify-center bg-black overflow-hidden p-2 sm:p-4 min-h-[50vh] max-h-[75vh]">
              <img 
                src="/images/real/ceremony_excellence.jpg" 
                alt="BAC 2026 Excellence" 
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl select-none"
              />
            </div>

            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 text-start space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-white">
                {t.palmares.honorsTitle}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {t.palmares.honorsDesc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Lightbox Modal with Full-Res Photo & Controls */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
          onClick={() => setLightboxIndex(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="p-3.5 px-5 flex items-center justify-between border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-600/30 border border-teal-500/40 text-teal-300 text-[11px] font-bold">
                  {currentLightboxItem.title[lang]}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lightboxIndex + 1} / {galleryItems.length}
                </span>
              </div>
              <button 
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label={t.gallery.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photo viewport */}
            <div className="relative flex-grow flex items-center justify-center bg-black overflow-hidden p-2 sm:p-4 min-h-[45vh] max-h-[65vh]">
              <img 
                src={currentLightboxItem.image} 
                alt={currentLightboxItem.title[lang]} 
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl select-none"
              />

              {/* Prev/Next controls */}
              {galleryItems.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); showPrevLightbox(); }}
                    className="absolute start-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors border border-white/20"
                    aria-label={t.gallery.prev}
                  >
                    <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); showNextLightbox(); }}
                    className="absolute end-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors border border-white/20"
                    aria-label={t.gallery.next}
                  >
                    <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </button>
                </>
              )}
            </div>

            {/* Caption & details */}
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 text-start space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-white">
                {currentLightboxItem.title[lang]}
              </h3>
              {currentLightboxItem.description && (
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {currentLightboxItem.description[lang]}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Inquiry Modal with Authentic Institutional Details */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0">
                  <img src={schoolLogo} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{t.nav.enroll}</h3>
                  <p className="text-[11px] text-slate-500">مؤسسة حبر وألوان للتربية والتعليم الخاصة — أولاد فايت</p>
                </div>
              </div>
              <button 
                onClick={() => setEnrollModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Contact Banner */}
            <div className="rounded-2xl overflow-hidden border border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 p-4 space-y-2 text-start">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-700 text-white text-[10px] font-bold">
                {lang === 'ar' ? 'التسجيلات مفتوحة للموسم الجديد' : 'Inscriptions Ouvertes'}
              </span>
              <p className="text-xs font-bold text-teal-950">
                {lang === 'ar' ? 'الاتصال المباشر بالإدارة والاستقبال (أولاد فايت):' : 'Lignes directes de l\'accueil :'}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a href="tel:0557722845" className="text-xs font-mono font-bold text-teal-800 bg-white px-2.5 py-1 rounded-md border border-teal-200 shadow-2xs" dir="ltr">
                  0557.72.28.45
                </a>
                <a href="tel:0550096934" className="text-xs font-mono font-bold text-teal-800 bg-white px-2.5 py-1 rounded-md border border-teal-200 shadow-2xs" dir="ltr">
                  0550.09.69.34
                </a>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert(lang === 'ar' ? 'شكراً لكم! تم تسجيل طلبكم بنجاح، وسيتواصل معكم فريق الإدارة والاستقبال لتحديد موعد الزيارة وتأكيد الملف.' : 'Merci ! Votre demande a été enregistrée avec succès. Notre équipe prendra contact avec vous prochainement.'); setEnrollModalOpen(false); }} className="space-y-3 text-start">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم ولي الأمر الكامل' : 'Nom complet du parent'}
                </label>
                <input required type="text" className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-slate-50" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'}
                </label>
                <input required type="tel" placeholder="05XX XX XX XX" className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-slate-50" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الطور التعليمي المطلوب' : 'Cycle scolaire souhaité'}
                </label>
                <select className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-slate-50">
                  <option value="preschool">{lang === 'ar' ? 'الطور التحضيري والروضة (Petite Section)' : 'Préscolaire & Maternelle'}</option>
                  <option value="primary">{lang === 'ar' ? 'الطور الابتدائي (Primaire)' : 'Primaire'}</option>
                  <option value="middle">{lang === 'ar' ? 'الطور المتوسط (Moyen - BEM)' : 'Moyen (BEM)'}</option>
                  <option value="secondary">{lang === 'ar' ? 'الطور الثانوي (Secondaire - BAC)' : 'Secondaire (BAC)'}</option>
                  <option value="summer">{lang === 'ar' ? 'المدرسة الصيفية (Summer School)' : 'École d\'Été (Summer School)'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'ملاحظات أو استفسارات إضافية' : 'Message ou remarques'}
                </label>
                <textarea rows={2} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-slate-50"></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button 
                  type="button" 
                  onClick={() => setEnrollModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs"
                >
                  {lang === 'ar' ? 'تأكيد طلب التسجيل الأولي' : 'Confirmer la pré-inscription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Direct Contact Actions (WhatsApp & Direct Call) */}
      <div 
        className="fixed bottom-5 end-5 z-40 flex flex-col items-end gap-2.5 pointer-events-none"
        role="region"
        aria-label={t.quickContact.tooltip}
      >
        {/* Direct WhatsApp Chat */}
        <a
          href={`https://wa.me/213557722845?text=${encodeURIComponent(t.quickContact.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto group inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white ps-3.5 pe-3 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-400 border border-emerald-500/40"
          aria-label={t.quickContact.whatsappLabel}
        >
          <span className="hidden sm:inline text-xs font-bold whitespace-nowrap">
            {t.quickContact.whatsappLabel}
          </span>
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 fill-current text-white" aria-hidden="true" />
          </div>
        </a>

        {/* Direct Call Line */}
        <a
          href="tel:0557722845"
          className="pointer-events-auto group inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-900 text-white ps-3.5 pe-3 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-teal-400 border border-teal-700/50"
          aria-label={t.quickContact.callLabel}
        >
          <span className="hidden sm:inline text-xs font-bold whitespace-nowrap">
            {t.quickContact.callLabel}
          </span>
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <Phone className="w-4.5 h-4.5 text-white" aria-hidden="true" />
          </div>
        </a>
      </div>

    </div>
  );
}
