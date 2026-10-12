import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  ShieldCheck,
  Compass
} from 'lucide-react';

interface CampusTourBannerProps {
  onOpenTourModal: () => void;
  hasBooking: boolean;
  bookingData?: {
    date: string;
    timeSlot: string;
    id: string;
  } | null;
  lang: 'ar' | 'fr' | 'en';
  t: any;
}

export const CampusTourBanner: React.FC<CampusTourBannerProps> = ({
  onOpenTourModal,
  hasBooking,
  bookingData,
  lang,
  t
}) => {
  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-slate-50 via-teal-50/40 to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Showcase Container */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-teal-800/60">
          
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute top-0 end-0 -mt-12 -me-12 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 start-0 -mb-12 -ms-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content (Text & Trust Points) */}
            <div className="lg:col-span-7 space-y-4 text-start">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold">
                <Compass className="w-3.5 h-3.5 text-teal-300 animate-spin-slow" />
                <span>{t.tourBooking.bannerBadge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {t.tourBooking.bannerTitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl">
                {t.tourBooking.bannerSubtitle}
              </p>

              {/* 3 Core Trust Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 leading-snug">
                    {t.tourBooking.bannerFeature1}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 leading-snug">
                    {t.tourBooking.bannerFeature2}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 leading-snug">
                    {t.tourBooking.bannerFeature3}
                  </span>
                </div>
              </div>

            </div>

            {/* Right Action Card */}
            <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end">
              
              <div className="w-full sm:max-w-md p-6 rounded-3xl bg-slate-900/90 border border-teal-500/40 backdrop-blur-md shadow-2xl space-y-4 text-start">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'مواعيد هذا الأسبوع' : 'Créneaux disponibles'}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    ● {lang === 'ar' ? 'الحجز مفتوح فوراً' : 'Ouvert'}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {lang === 'ar' 
                      ? 'اختر اليوم والوقت الأنسب لك، وسيقوم مرشد تربوي خاص بمرافقتك وعائلتك للإجابة عن كافة التساؤلات البيداغوجية والمالية.'
                      : 'Choisissez la date et l\'horaire qui vous conviennent. Un conseiller dédié vous accueillera pour une visite complète.'}
                  </p>
                </div>

                {hasBooking ? (
                  <div className="space-y-2.5 pt-1">
                    <div className="p-3 rounded-2xl bg-teal-950/80 border border-teal-500/40 text-xs">
                      <span className="text-[10px] text-teal-300 font-bold block uppercase tracking-wider">
                        {t.tourBooking.alreadyBookedBadge}
                      </span>
                      <span className="font-mono text-xs font-bold text-white block mt-0.5">
                        {bookingData?.id}
                      </span>
                    </div>

                    <button
                      onClick={onOpenTourModal}
                      className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>{t.tourBooking.viewMyPass}</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-1">
                    <button
                      onClick={onOpenTourModal}
                      className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Calendar className="w-4 h-4 text-slate-950" />
                      <span>{t.tourBooking.bannerCta}</span>
                      {lang === 'ar' ? (
                        <ArrowLeft className="w-4 h-4 text-slate-950" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-slate-950" />
                      )}
                    </button>

                    <p className="text-[10px] text-center text-slate-400 mt-2 font-normal">
                      ✓ {lang === 'ar' ? 'خدمة مجانية بالكامل ومتاحة لجميع أولياء الأمور' : 'Service entièrement gratuit et sans engagement'}
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
