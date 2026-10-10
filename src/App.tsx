/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { SCHOOL_CONFIG } from './config/schoolConfig';
import { ar } from './locales/ar';
import { fr } from './locales/fr';
import { en } from './locales/en';
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
  Compass
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
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedSecondaryStream, setSelectedSecondaryStream] = useState<number>(0);
  
  // Resource center search
  const [resourceSearch, setResourceSearch] = useState('');

  // Lightbox modal for gallery images
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string } | null>(null);

  const langDropdownRef = useRef<HTMLDivElement>(null);

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
        <aside aria-label="Announcement" className="bg-teal-950 text-teal-100 px-4 py-2.5 text-xs font-medium flex items-center justify-between gap-4 z-50 border-b border-teal-800">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center flex-grow">
            <Bell className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" aria-hidden="true" />
            <span>{t.announcement.text}</span>
            <button 
              onClick={() => setEnrollModalOpen(true)}
              className="underline font-bold text-amber-300 hover:text-white ms-2 whitespace-nowrap"
            >
              {t.nav.enroll} →
            </button>
          </div>
          <button 
            onClick={() => setAnnouncementVisible(false)}
            className="p-1 rounded-lg text-teal-300 hover:text-white hover:bg-teal-900 transition-colors shrink-0"
            aria-label={t.announcement.dismiss}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </aside>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark with Authentic Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 group shrink-0 focus-visible:ring-2 focus-visible:ring-teal-600 rounded-xl p-1 text-start"
          >
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-slate-200 group-hover:scale-105 transition-transform bg-white shrink-0">
              <img 
                src="/src/assets/images/school_logo_1791622274760.jpg" 
                alt="Hibr wa Alwan Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-950 tracking-tight group-hover:text-teal-700 transition-colors">
                {SCHOOL_CONFIG.name[lang]}
              </span>
              <span className="text-xs font-semibold text-teal-700">
                Groupe Scolaire Encre & Pastel — Ouled Fayet
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button 
              onClick={() => navigateTo('home')} 
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors ${viewMode === 'home' ? 'text-teal-700 bg-teal-50' : 'text-slate-700 hover:text-teal-700 hover:bg-slate-100'}`}
            >
              {t.nav.home}
            </button>
            <a 
              href="#stages" 
              onClick={() => setViewMode('home')}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.nav.stages}
            </a>
            <a 
              href="#facilities" 
              onClick={() => setViewMode('home')}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.nav.facilities}
            </a>
            <a 
              href="#summer-school" 
              onClick={() => setViewMode('home')}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.nav.summerSchool}
            </a>
            <button 
              onClick={() => navigateTo('news')} 
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors ${viewMode === 'news' ? 'text-teal-700 bg-teal-50' : 'text-slate-700 hover:text-teal-700 hover:bg-slate-100'}`}
            >
              {t.nav.news}
            </button>
            <button 
              onClick={() => navigateTo('resources')} 
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors ${viewMode === 'resources' ? 'text-teal-700 bg-teal-50' : 'text-slate-700 hover:text-teal-700 hover:bg-slate-100'}`}
            >
              {t.nav.resources}
            </button>
            <a 
              href="#contact" 
              onClick={() => setViewMode('home')}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Actions: Language Dropdown + CTA */}
          <div className="flex items-center gap-3">
            
            {/* Globe Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all focus-visible:ring-2 focus-visible:ring-teal-600"
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
              >
                <Globe className="w-4 h-4 text-teal-700" aria-hidden="true" />
                <span className="uppercase font-bold">{lang}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute end-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  role="menu"
                >
                  <button
                    onClick={() => handleLangChange('ar')}
                    className={`w-full text-start px-4 py-2.5 text-xs font-bold flex items-center justify-between transition-colors ${lang === 'ar' ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'}`}
                    role="menuitem"
                  >
                    <span>العربية (AR)</span>
                    {lang === 'ar' && <Check className="w-4 h-4 text-teal-700" />}
                  </button>
                  <button
                    onClick={() => handleLangChange('fr')}
                    className={`w-full text-start px-4 py-2.5 text-xs font-bold flex items-center justify-between transition-colors ${lang === 'fr' ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'}`}
                    role="menuitem"
                  >
                    <span>Français (FR)</span>
                    {lang === 'fr' && <Check className="w-4 h-4 text-teal-700" />}
                  </button>
                  <button
                    onClick={() => handleLangChange('en')}
                    className={`w-full text-start px-4 py-2.5 text-xs font-bold flex items-center justify-between transition-colors ${lang === 'en' ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'}`}
                    role="menuitem"
                  >
                    <span>English (EN)</span>
                    {lang === 'en' && <Check className="w-4 h-4 text-teal-700" />}
                  </button>
                </div>
              )}
            </div>

            {/* Inquire CTA Button */}
            <button
              onClick={() => setEnrollModalOpen(true)}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm hover:shadow transition-all focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              {t.nav.enroll}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
            <button 
              onClick={() => navigateTo('home')} 
              className="w-full text-start px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
            >
              {t.nav.home}
            </button>
            <a 
              href="#stages" 
              onClick={() => { setViewMode('home'); setMobileMenuOpen(false); }}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
            >
              {t.nav.stages}
            </a>
            <a 
              href="#facilities" 
              onClick={() => { setViewMode('home'); setMobileMenuOpen(false); }}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
            >
              {t.nav.facilities}
            </a>
            <a 
              href="#summer-school" 
              onClick={() => { setViewMode('home'); setMobileMenuOpen(false); }}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
            >
              {t.nav.summerSchool}
            </a>
            <button 
              onClick={() => navigateTo('news')} 
              className="w-full text-start px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
            >
              {t.nav.news}
            </button>
            <button 
              onClick={() => navigateTo('resources')} 
              className="w-full text-start px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
            >
              {t.nav.resources}
            </button>
            <a 
              href="#contact" 
              onClick={() => { setViewMode('home'); setMobileMenuOpen(false); }}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100"
            >
              {t.nav.contact}
            </a>
            <div className="pt-2">
              <button
                onClick={() => { setEnrollModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-xl bg-teal-700 text-white font-bold text-sm shadow-sm"
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
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-28">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column (Hero Content) */}
                  <div className="lg:col-span-7 space-y-6 text-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-bold">
                      <ShieldCheck className="w-4 h-4 text-teal-700" aria-hidden="true" />
                      <span>{t.hero.verifiedBadge}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.2]">
                      {t.hero.title}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                      {t.hero.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={() => setEnrollModalOpen(true)}
                        className="px-7 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                      >
                        {t.hero.ctaEnroll}
                      </button>
                      <a
                        href="#stages"
                        className="px-6 py-3.5 rounded-xl border border-slate-300 hover:border-teal-600 bg-white text-slate-800 font-bold text-sm hover:text-teal-700 transition-all"
                      >
                        {t.hero.ctaExplore}
                      </a>
                    </div>

                    {/* Verified Quick Stats / Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                        <span className="block text-lg font-black text-teal-800">100%</span>
                        <span className="text-xs font-semibold text-slate-600">{t.hero.statStudents}</span>
                      </div>
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                        <span className="block text-lg font-black text-indigo-800">25m</span>
                        <span className="text-xs font-semibold text-slate-600">{t.hero.statRating}</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                        <span className="block text-lg font-black text-amber-700">0557.72.28.45</span>
                        <span className="text-xs font-semibold text-slate-600">Ouled Fayet</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Hero Visual Composition) */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                      <img 
                        src="/src/assets/images/school_reception_building_1791583141779.jpg" 
                        alt="Façade du Groupe Scolaire Encre & Pastel" 
                        className="w-full h-96 lg:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 text-white text-start">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                          المجمع المدرسي حبر وألوان
                        </span>
                        <h3 className="text-lg font-bold leading-tight">
                          Groupe Scolaire Encre & Pastel — Ouled Fayet
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
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
            <section className="py-16 lg:py-24 bg-white border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.story.eyebrow}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    {t.story.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {t.story.text1}
                  </p>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {t.story.text2}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <span className="px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                      ✓ {t.story.pill1}
                    </span>
                    <span className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                      ✓ {t.story.pill2}
                    </span>
                    <span className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                      ✓ {t.story.pill3}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Educational Stages Section */}
            <section id="stages" className="py-20 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.stages.eyebrow}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    {t.stages.title}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {t.stages.subtitle}
                  </p>
                </div>

                {/* Stages Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SCHOOL_CONFIG.stages.map((stage) => (
                    <div 
                      key={stage.id} 
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-100">
                            {stage.tag[lang]}
                          </span>
                          <GraduationCap className="w-5 h-5 text-teal-700" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {stage.title[lang]}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {stage.description[lang]}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-slate-100 mt-4">
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
                <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-indigo-950 text-white rounded-3xl p-8 lg:p-10 shadow-xl border border-teal-800">
                  <div className="max-w-3xl space-y-4">
                    <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
                      1AS • 2AS • 3AS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {t.secondaryStreams.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {t.secondaryStreams.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
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
                        className="bg-white/10 hover:bg-white/15 backdrop-blur-sm p-4 rounded-2xl border border-white/10 transition-colors flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-100">{stream}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* Campus Facilities Section */}
            <section id="facilities" className="py-20 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.facilities.eyebrow}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    {t.facilities.title}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {t.facilities.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SCHOOL_CONFIG.facilities.map((fac) => (
                    <div 
                      key={fac.id}
                      className="group bg-slate-50 hover:bg-white rounded-3xl p-7 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                        {fac.id === 'pool' && <Waves className="w-6 h-6" />}
                        {fac.id === 'sports_hall' && <Activity className="w-6 h-6" />}
                        {fac.id === 'smart_classes' && <Monitor className="w-6 h-6" />}
                        {fac.id === 'art_kitchen_studios' && <Sparkles className="w-6 h-6" />}
                        {fac.id === 'theater_hall' && <Drama className="w-6 h-6" />}
                        {fac.id === 'building' && <Building2 className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {fac.title[lang]}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {fac.description[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Summer School & Specialized Workshops */}
            <section id="summer-school" className="py-20 bg-teal-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                    {t.summerSchool.eyebrow}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {t.summerSchool.title}
                  </h2>
                  <p className="text-sm text-teal-100">
                    {t.summerSchool.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/10 transition-colors space-y-3 text-start"
                      >
                        <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white">{ws.title}</h4>
                        <p className="text-xs text-teal-100/90 leading-relaxed">{ws.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={() => setEnrollModalOpen(true)}
                    className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg transition-transform hover:scale-105"
                  >
                    {t.cta.button}
                  </button>
                </div>
              </div>
            </section>

            {/* Honors, Awards & News Showcase */}
            <section className="py-20 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="space-y-2 text-start">
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                      {t.newsSection.eyebrow}
                    </span>
                    <h2 className="text-3xl font-black text-slate-950">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: t.newsSection.item1Title, date: t.newsSection.item1Date, desc: t.newsSection.item1Desc, badge: "BAC 2026" },
                    { title: t.newsSection.item2Title, date: t.newsSection.item2Date, desc: t.newsSection.item2Desc, badge: "Tipaza" },
                    { title: t.newsSection.item3Title, date: t.newsSection.item3Date, desc: t.newsSection.item3Desc, badge: "Echorouk" },
                  ].map((post, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold">
                            {post.badge}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{post.date}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900">{post.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{post.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <button 
                          onClick={() => navigateTo('news')}
                          className="text-xs font-bold text-teal-700 hover:text-teal-900"
                        >
                          {t.newsSection.readMore} →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Photo Gallery Showcase */}
            <section className="py-20 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    معرض الصور والمنشآت
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    جولة بصرية في رحاب المجمع المدرسي
                  </h2>
                  <p className="text-sm text-slate-600">
                    صور حقيقية توثق مرافق المدرسة وأجواء الأنشطة التربوية والرياضية في أولاد فايت
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      src: "/src/assets/images/school_reception_building_1791583141779.jpg",
                      title: "المجمع المدرسي حبر وألوان بأولاد فايت",
                      subtitle: "الواجهة المعمارية الرئيسية بطريق بوشاوي"
                    },
                    {
                      src: "/src/assets/images/school_classroom_1791583121118.jpg",
                      title: "القاعات الدراسية التفاعلية",
                      subtitle: "تجهيزات بيداغوجية حديثة وعوارض رقمية"
                    },
                    {
                      src: "/src/assets/images/school_art_studio_1791583110184.jpg",
                      title: "استوديو الفنون والأشغال",
                      subtitle: "فضاء التعبير الفني والأوريغامي والرسم"
                    },
                    {
                      src: "/src/assets/images/school_activity_yard_1791583130944.jpg",
                      title: "الفضاءات المدرسية والساحات",
                      subtitle: "أجواء ترفيهية ورياضية آمنة للتلاميذ"
                    }
                  ].map((imgItem, i) => (
                    <div 
                      key={i}
                      onClick={() => setLightboxImage({ src: imgItem.src, caption: imgItem.title })}
                      className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200 cursor-pointer bg-slate-900"
                    >
                      <img 
                        src={imgItem.src} 
                        alt={imgItem.title} 
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-5 flex flex-col justify-end text-white text-start">
                        <h4 className="text-sm font-bold leading-tight">{imgItem.title}</h4>
                        <p className="text-[11px] text-slate-300 mt-1">{imgItem.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-slate-50 border-b border-slate-200">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.faq.eyebrow}
                  </span>
                  <h2 className="text-3xl font-black text-slate-950">
                    {t.faq.title}
                  </h2>
                  <p className="text-sm text-slate-600">{t.faq.subtitle}</p>
                </div>

                <div className="space-y-4">
                  {[
                    { q: t.faq.q1, a: t.faq.a1 },
                    { q: t.faq.q2, a: t.faq.a2 },
                    { q: t.faq.q3, a: t.faq.a3 },
                    { q: t.faq.q4, a: t.faq.a4 },
                  ].map((faqItem, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-start p-5 font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50"
                      >
                        <span>{faqItem.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-teal-700' : ''}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faqItem.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact & Location Section */}
            <section id="contact" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                    {t.contact.eyebrow}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    {t.contact.title}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {t.contact.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Address Card */}
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3 text-start">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{t.contact.addressTitle}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {t.contact.addressVal}
                    </p>
                    <a 
                      href={SCHOOL_CONFIG.location.wazeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-teal-700 hover:underline block pt-2"
                    >
                      {t.contact.wazeVal} →
                    </a>
                  </div>

                  {/* Phone Lines Card */}
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3 text-start">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{t.contact.phoneTitle}</h3>
                    <p className="text-sm font-bold text-slate-900 font-mono tracking-wide" dir="ltr">
                      0557.72.28.45
                    </p>
                    <p className="text-sm font-bold text-slate-900 font-mono tracking-wide" dir="ltr">
                      0550.09.69.34
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {SCHOOL_CONFIG.contact.email}
                    </p>
                  </div>

                  {/* Office Hours */}
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3 text-start">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{t.contact.hoursTitle}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {t.contact.hoursVal}
                    </p>
                  </div>

                  {/* Social Channels */}
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3 text-start">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{t.contact.facebookTitle}</h3>
                    <div className="flex flex-col gap-2 pt-1">
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
          <div className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <button 
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:underline mb-2"
              >
                ← {lang === 'ar' ? 'العودة إلى الرئيسية' : 'Retour à l\'accueil'}
              </button>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                {t.resourcesSection.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                {t.resourcesSection.subtitle}
              </p>

              {/* Search bar */}
              <div className="pt-4 max-w-md mx-auto relative">
                <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-slate-400" aria-hidden="true" />
                <input 
                  type="text"
                  value={resourceSearch}
                  onChange={(e) => setResourceSearch(e.target.value)}
                  placeholder={lang === 'ar' ? "بحث في الموارد والملخصات..." : "Rechercher un document..."}
                  className="w-full ps-11 pe-4 py-3 rounded-2xl border border-slate-200 text-sm bg-white shadow-2xs focus:outline-teal-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              {[
                { title: t.resourcesSection.file1Title, desc: t.resourcesSection.file1Desc, meta: t.resourcesSection.file1Meta },
                { title: t.resourcesSection.file2Title, desc: t.resourcesSection.file2Desc, meta: t.resourcesSection.file2Meta },
                { title: t.resourcesSection.file3Title, desc: t.resourcesSection.file3Desc, meta: t.resourcesSection.file3Meta },
              ]
                .filter(item => item.title.toLowerCase().includes(resourceSearch.toLowerCase()) || item.desc.toLowerCase().includes(resourceSearch.toLowerCase()))
                .map((item, idx) => (
                  <div key={idx} className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800">
                        <FileText className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-bold text-slate-950">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                      <span className="inline-block text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">{item.meta}</span>
                    </div>
                    <button 
                      onClick={() => setEnrollModalOpen(true)} 
                      className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      <span>{t.resourcesSection.downloadBtn}</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* News View */}
        {viewMode === 'news' && (
          <div className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <button 
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:underline mb-2"
              >
                ← {lang === 'ar' ? 'العودة إلى الرئيسية' : 'Retour à l\'accueil'}
              </button>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                {t.newsSection.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                {t.newsSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              {[
                { title: t.newsSection.item1Title, date: t.newsSection.item1Date, desc: t.newsSection.item1Desc, badge: "BAC 2026" },
                { title: t.newsSection.item2Title, date: t.newsSection.item2Date, desc: t.newsSection.item2Desc, badge: "Tipaza" },
                { title: t.newsSection.item3Title, date: t.newsSection.item3Date, desc: t.newsSection.item3Desc, badge: "Echorouk" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold">
                        {item.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => setEnrollModalOpen(true)} 
                    className="text-xs font-bold text-teal-700 hover:underline pt-4 border-t border-slate-100 flex items-center gap-1"
                  >
                    <span>{t.newsSection.readMore}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-2xs shrink-0">
              <img 
                src="/src/assets/images/school_logo_1791622274760.jpg" 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900">{SCHOOL_CONFIG.name[lang]}</span>
              <span className="text-[11px] text-slate-500">Groupe Scolaire Encre & Pastel — Ouled Fayet</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {t.footer.rights}
          </p>
          <div className="text-xs text-slate-400">
            {t.footer.disclaimer}
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-2" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 end-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.caption} 
              className="max-h-[75vh] w-auto object-contain mx-auto rounded-2xl"
            />
            <p className="p-4 text-center text-sm font-bold text-slate-800">
              {lightboxImage.caption}
            </p>
          </div>
        </div>
      )}

      {/* Enrollment Inquiry Modal */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{t.nav.enroll}</h3>
                <p className="text-xs text-slate-500">المجمع المدرسي حبر وألوان (Groupe Scolaire Encre & Pastel)</p>
              </div>
              <button 
                onClick={() => setEnrollModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert(lang === 'ar' ? 'شكراً لكم! تم إرسال استعلامكم بنجاح وسيتواصل معكم فريق الاستقبال.' : 'Merci ! Votre demande a été transmise.'); setEnrollModalOpen(false); }} className="space-y-4 text-start">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'اسم ولي الأمر الكامل' : 'Nom complet du parent'}
                </label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-slate-50" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'}
                </label>
                <input required type="tel" placeholder="05XX XX XX XX" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-slate-50" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الطور التعليمي المطلوب' : 'Cycle scolaire souhaité'}
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-slate-50">
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
                <textarea rows={3} className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-slate-50"></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setEnrollModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm"
                >
                  {lang === 'ar' ? 'إرسال الاستعلام' : 'Envoyer la demande'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
