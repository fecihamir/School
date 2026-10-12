import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  X, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Users,
  Compass,
  ArrowRight,
  Printer,
  Check
} from 'lucide-react';
import schoolLogo from '../assets/images/logo.jpg';
import { SCHOOL_CONFIG } from '../config/schoolConfig';

export interface TourBookingData {
  id: string;
  cycle: string;
  focusAreas: string[];
  date: string;
  timeSlot: 'morning' | 'afternoon';
  parentName: string;
  parentPhone: string;
  studentName?: string;
  attendeesCount: string;
  notes?: string;
  createdAt: string;
}

interface CampusTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'fr' | 'en';
  t: any;
  onBookingConfirmed?: (booking: TourBookingData) => void;
}

export const CampusTourModal: React.FC<CampusTourModalProps> = ({
  isOpen,
  onClose,
  lang,
  t,
  onBookingConfirmed
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [existingBooking, setExistingBooking] = useState<TourBookingData | null>(null);

  // Form states
  const [cycle, setCycle] = useState('preschool');
  const [focusAreas, setFocusAreas] = useState<string[]>(['pool', 'smart_classes', 'labs']);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<'morning' | 'afternoon'>('morning');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [attendeesCount, setAttendeesCount] = useState('2');
  const [notes, setNotes] = useState('');

  // Generate real upcoming available school days (Saturdays to Thursdays, skipping Fridays)
  const [availableDays, setAvailableDays] = useState<{ id: string; label: string; subLabel: string }[]>([]);

  useEffect(() => {
    // Generate next 6 valid school days
    const days: { id: string; label: string; subLabel: string }[] = [];
    const dateCursor = new Date();
    // Start from tomorrow
    dateCursor.setDate(dateCursor.getDate() + 1);

    const arabicDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const frenchDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const arabicMonths = ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const frenchMonths = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const englishMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    while (days.length < 6) {
      const dayOfWeek = dateCursor.getDay(); // 0 is Sunday, 5 is Friday
      // Skip Friday (day 5)
      if (dayOfWeek !== 5) {
        const dayNumber = dateCursor.getDate();
        const monthIdx = dateCursor.getMonth();
        const year = dateCursor.getFullYear();
        
        const dayName = lang === 'ar' 
          ? arabicDays[dayOfWeek] 
          : lang === 'fr' 
            ? frenchDays[dayOfWeek] 
            : englishDays[dayOfWeek];

        const monthName = lang === 'ar'
          ? arabicMonths[monthIdx]
          : lang === 'fr'
            ? frenchMonths[monthIdx]
            : englishMonths[monthIdx];

        const dateStr = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
        
        days.push({
          id: dateStr,
          label: `${dayName} ${dayNumber} ${monthName}`,
          subLabel: dayOfWeek === 6 
            ? (lang === 'ar' ? 'السبت • متاح بالكامل' : lang === 'fr' ? 'Samedi • Très demandé' : 'Saturday • Highly Requested')
            : (lang === 'ar' ? 'يوم دراسي متاح' : lang === 'fr' ? 'Jour d\'école' : 'School Day')
        });
      }
      dateCursor.setDate(dateCursor.getDate() + 1);
    }

    setAvailableDays(days);
    if (days.length > 0 && !selectedDate) {
      setSelectedDate(days[0].id);
    }
  }, [lang]);

  // Load existing booking from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('encre_pastel_tour_booking');
      if (saved) {
        const parsed = JSON.parse(saved);
        setExistingBooking(parsed);
        // If opened and has booking, go to pass step directly
        setStep(4);
      }
    } catch {
      // Ignore parse errors
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleFocusArea = (areaId: string) => {
    if (focusAreas.includes(areaId)) {
      if (focusAreas.length > 1) {
        setFocusAreas(focusAreas.filter(a => a !== areaId));
      }
    } else {
      setFocusAreas([...focusAreas, areaId]);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !parentPhone.trim() || !selectedDate) {
      return;
    }

    // Generate random 4-digit reference
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newBooking: TourBookingData = {
      id: `TOUR-2026-EP${randomDigits}`,
      cycle,
      focusAreas,
      date: selectedDate,
      timeSlot,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      studentName: studentName.trim() || undefined,
      attendeesCount,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('encre_pastel_tour_booking', JSON.stringify(newBooking));
    } catch {
      // Storage fallback
    }

    setExistingBooking(newBooking);
    setStep(4);
    if (onBookingConfirmed) {
      onBookingConfirmed(newBooking);
    }
  };

  const handleCancelOrReschedule = () => {
    try {
      localStorage.removeItem('encre_pastel_tour_booking');
    } catch {
      // Ignore
    }
    setExistingBooking(null);
    setStep(1);
  };

  const activeDayObj = availableDays.find(d => d.id === (existingBooking?.date || selectedDate));
  const activeDateFormatted = activeDayObj ? activeDayObj.label : (existingBooking?.date || selectedDate);

  const getCycleLabel = (cycleKey: string) => {
    switch (cycleKey) {
      case 'preschool':
        return lang === 'ar' ? 'الطور التحضيري والروضة' : lang === 'fr' ? 'Préscolaire & Maternelle' : 'Preschool & Kindergarten';
      case 'primary':
        return lang === 'ar' ? 'الطور الابتدائي' : lang === 'fr' ? 'Cycle Primaire' : 'Primary School';
      case 'middle':
        return lang === 'ar' ? 'الطور المتوسط (BEM)' : lang === 'fr' ? 'Cycle Moyen (BEM)' : 'Middle School (BEM)';
      case 'secondary':
        return lang === 'ar' ? 'الطور الثانوي (البكالوريا)' : lang === 'fr' ? 'Secondaire (BAC)' : 'Secondary (BAC)';
      default:
        return cycleKey;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl border border-slate-100 flex flex-col my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-slate-200 bg-white shrink-0 shadow-2xs">
              <img src={schoolLogo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  {t.tourBooking.modalTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold border border-teal-200">
                  Ouled Fayet
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal">
                {t.tourBooking.modalSubtitle}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress bar (shown during steps 1-3) */}
        {step < 4 && (
          <div className="py-3 border-b border-slate-100 mb-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-teal-700 font-black' : step > 1 ? 'text-teal-600' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-teal-700 text-white' : step > 1 ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-500'}`}>
                  {step > 1 ? '✓' : '1'}
                </span>
                <span className="hidden sm:inline">{t.tourBooking.step1Title}</span>
              </div>
              <div className="h-0.5 flex-grow mx-2 bg-slate-100">
                <div className={`h-full bg-teal-600 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
              </div>
              <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-teal-700 font-black' : step > 2 ? 'text-teal-600' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-teal-700 text-white' : step > 2 ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-500'}`}>
                  {step > 2 ? '✓' : '2'}
                </span>
                <span className="hidden sm:inline">{t.tourBooking.step2Title}</span>
              </div>
              <div className="h-0.5 flex-grow mx-2 bg-slate-100">
                <div className={`h-full bg-teal-600 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`} />
              </div>
              <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-teal-700 font-black' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  3
                </span>
                <span className="hidden sm:inline">{t.tourBooking.step3Title}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Academic Cycle & Facilities of Interest */}
        {step === 1 && (
          <div className="space-y-5 py-2 text-start animate-in fade-in duration-150">
            {/* Cycle Selector */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-slate-900">
                {t.tourBooking.selectCycle}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'preschool', label: t.stages.preschoolTitle || (lang === 'ar' ? 'التحضيري والروضة' : 'Maternelle') },
                  { id: 'primary', label: t.stages.primaryTitle || (lang === 'ar' ? 'الطور الابتدائي' : 'Primaire') },
                  { id: 'middle', label: t.stages.middleTitle || (lang === 'ar' ? 'الطور المتوسط' : 'Moyen (BEM)') },
                  { id: 'secondary', label: t.stages.secondaryTitle || (lang === 'ar' ? 'الطور الثانوي' : 'Secondaire (BAC)') }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCycle(item.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      cycle === item.id 
                        ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-2xs ring-1 ring-teal-600' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {cycle === item.id && (
                      <span className="text-[10px] text-teal-700 font-semibold">✓ {lang === 'ar' ? 'محدد' : 'Sélectionné'}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Facilities Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-bold text-slate-900">
                  {t.tourBooking.selectFocusAreas}
                </label>
                <span className="text-[11px] text-slate-400">
                  {focusAreas.length} {lang === 'ar' ? 'مرافق محددة' : 'espaces choisis'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'pool', label: t.tourBooking.focusPool, icon: '🏊' },
                  { id: 'gym', label: t.tourBooking.focusGym, icon: '🥋' },
                  { id: 'labs', label: t.tourBooking.focusLab, icon: '🔬' },
                  { id: 'smart_classes', label: t.tourBooking.focusSmart, icon: '💻' },
                  { id: 'robotics', label: t.tourBooking.focusRobotics, icon: '🤖' },
                  { id: 'library', label: t.tourBooking.focusLibrary, icon: '📚' }
                ].map((area) => {
                  const isChecked = focusAreas.includes(area.id);
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => toggleFocusArea(area.id)}
                      className={`p-3 rounded-2xl border text-xs text-start flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                        isChecked 
                          ? 'border-teal-500 bg-teal-50/70 text-slate-900 font-bold' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base shrink-0">{area.icon}</span>
                        <span className="truncate">{area.label}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${isChecked ? 'bg-teal-700 border-teal-700 text-white' : 'border-slate-300'}`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-slate-400">
                {lang === 'ar' ? 'الخطوة 1 من 3' : 'Étape 1 sur 3'}
              </span>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <span>{t.tourBooking.nextStep}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Preferred Date and Time Slot */}
        {step === 2 && (
          <div className="space-y-5 py-2 text-start animate-in fade-in duration-150">
            {/* Date Selection */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-slate-900">
                {t.tourBooking.selectDate}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {availableDays.map((day) => (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => setSelectedDate(day.id)}
                    className={`p-3 rounded-2xl border text-xs text-start transition-all cursor-pointer flex flex-col justify-between ${
                      selectedDate === day.id 
                        ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-600' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span className="truncate">{day.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-normal mt-1">
                      {day.subLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-2.5">
              <label className="block text-xs sm:text-sm font-bold text-slate-900">
                {t.tourBooking.selectTimeSlot}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTimeSlot('morning')}
                  className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer space-y-1 ${
                    timeSlot === 'morning' 
                      ? 'border-teal-600 bg-teal-50 text-slate-950 font-bold ring-1 ring-teal-600' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🌅</span>
                      <span className="text-xs font-bold text-slate-900">
                        09:30 — 11:00
                      </span>
                    </div>
                    {timeSlot === 'morning' && (
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">✓</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 font-normal">
                    {lang === 'ar' ? 'الفترة الصباحية • معايشة الأجواء الدراسية في الحجرات' : 'Matinée • Immersion dans les cours actifs'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setTimeSlot('afternoon')}
                  className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer space-y-1 ${
                    timeSlot === 'afternoon' 
                      ? 'border-teal-600 bg-teal-50 text-slate-950 font-bold ring-1 ring-teal-600' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">☀️</span>
                      <span className="text-xs font-bold text-slate-900">
                        14:00 — 15:30
                      </span>
                    </div>
                    {timeSlot === 'afternoon' && (
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">✓</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 font-normal">
                    {lang === 'ar' ? 'فترة الظهيرة • معاينة أنشطة المسبح والرياضات' : 'Après-midi • Découverte natation & sports'}
                  </p>
                </button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{t.tourBooking.prevStep}</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <span>{t.tourBooking.nextStep}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Parent & Family Contact Information */}
        {step === 3 && (
          <form onSubmit={handleConfirmBooking} className="space-y-4 py-2 text-start animate-in fade-in duration-150">
            {/* Summary Tag */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="font-bold text-slate-900">{activeDateFormatted}</span>
                <span>•</span>
                <span className="text-teal-800 font-bold">{timeSlot === 'morning' ? '09:30 - 11:00' : '14:00 - 15:30'}</span>
              </div>
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="text-[11px] font-bold text-teal-700 hover:underline"
              >
                {lang === 'ar' ? 'تعديل الموعد' : 'Modifier'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.tourBooking.parentName} *
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: محمد بن علي' : 'Ex: Karim Benali'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-white shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.tourBooking.parentPhone} *
                </label>
                <input
                  type="tel"
                  required
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="05XX XX XX XX / 06XX..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-white shadow-2xs font-mono"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.tourBooking.studentName}
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: يونس (9 سنوات)' : 'Ex: Younes (9 ans)'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-white shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.tourBooking.attendeesCount}
                </label>
                <select
                  value={attendeesCount}
                  onChange={(e) => setAttendeesCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-white shadow-2xs"
                >
                  <option value="1">{lang === 'ar' ? 'شخص واحد (ولي الأمر)' : '1 personne (Parent seul)'}</option>
                  <option value="2">{lang === 'ar' ? 'شخصان (الولي + التلميذ)' : '2 personnes (Parent + Enfant)'}</option>
                  <option value="3">{lang === 'ar' ? '3 أشخاص (الوالدان + التلميذ)' : '3 personnes (Parents + Enfant)'}</option>
                  <option value="4+">{lang === 'ar' ? 'عائلة (4 أشخاص أو أكثر)' : 'Famille (4 personnes ou plus)'}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t.tourBooking.specialNotes}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={lang === 'ar' ? 'هل لديكم أي استفسار حول النقل، الإطعام، أو شعب البكالوريا؟' : 'Questions sur le transport, la demi-pension ou les filières ?'}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-teal-600 bg-white shadow-2xs"
              />
            </div>

            {/* Bottom Controls */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{t.tourBooking.prevStep}</span>
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer hover:shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-300" />
                <span>{t.tourBooking.confirmButton}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Confirmed VIP Digital Campus Pass */}
        {step === 4 && (existingBooking || { id: 'TOUR-2026-EP784', cycle, date: selectedDate, timeSlot, parentName, parentPhone }) && (
          <div className="py-2 space-y-4 animate-in fade-in zoom-in-95 duration-200 text-start">
            
            {/* Success notification banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-teal-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Check className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-teal-950">
                  {t.tourBooking.passConfirmedTitle}
                </h4>
                <p className="text-xs text-teal-800 leading-relaxed font-normal">
                  {t.tourBooking.passSubtitle}
                </p>
              </div>
            </div>

            {/* Official VIP Campus Tour Digital Pass Card */}
            <div className="rounded-3xl border-2 border-teal-600/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-5 sm:p-6 shadow-xl relative overflow-hidden space-y-4">
              
              {/* Card Watermark Glow */}
              <div className="absolute top-0 end-0 -mt-8 -me-8 w-32 h-32 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

              {/* Pass Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white p-0.5 border border-white/20 shrink-0">
                    <img src={schoolLogo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white tracking-wide">
                      {SCHOOL_CONFIG.name[lang]}
                    </h5>
                    <span className="text-[10px] text-teal-400 font-mono block">
                      Groupe Scolaire Encre & Pastel — Ouled Fayet
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    {t.tourBooking.bookingRef}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-black text-amber-400">
                    {existingBooking?.id || 'TOUR-2026-EP842'}
                  </span>
                </div>
              </div>

              {/* Pass Main Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {/* Scheduled Date & Time */}
                <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    <span>{t.tourBooking.dateScheduled}</span>
                  </span>
                  <p className="font-bold text-white text-xs sm:text-sm">
                    {activeDateFormatted}
                  </p>
                  <p className="text-[11px] text-teal-300 font-mono font-medium">
                    {existingBooking?.timeSlot === 'morning' ? '09:30 - 11:00' : '14:00 - 15:30'}
                  </p>
                </div>

                {/* Family Information */}
                <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-teal-400" />
                    <span>{lang === 'ar' ? 'العائلة الزائرة والطور' : 'Famille & Cycle'}</span>
                  </span>
                  <p className="font-bold text-white truncate">
                    {existingBooking?.parentName || parentName}
                  </p>
                  <p className="text-[11px] text-slate-300 truncate">
                    {getCycleLabel(existingBooking?.cycle || cycle)}
                    {existingBooking?.studentName ? ` • ${existingBooking.studentName}` : ''}
                  </p>
                </div>

                {/* Assigned Guide */}
                <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-teal-400" />
                    <span>{t.tourBooking.assignedGuide}</span>
                  </span>
                  <p className="font-bold text-white text-xs">
                    {t.tourBooking.guideName}
                  </p>
                  <p className="text-[10px] text-emerald-400 font-semibold">
                    ✓ {lang === 'ar' ? 'مخصص حصرياً لعائلتكم (35 دقيقة)' : 'Accompagnement privé (35 min)'}
                  </p>
                </div>

                {/* Reception Meeting Point */}
                <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>{t.tourBooking.locationTarget}</span>
                  </span>
                  <p className="font-bold text-white text-xs truncate">
                    طريق بوشاوي، أولاد فايت (بجانب البلدية)
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Groupe+Scolaire+Encre+%26+Pastel+Ouled+Fayet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-teal-300 hover:text-white underline inline-flex items-center gap-1 pt-0.5"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Verified School Stamp Footer */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-teal-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تصريح زيارة رسمي معتمد' : 'Passeport de visite certifié'}</span>
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  {SCHOOL_CONFIG.contact.phones[0]}
                </span>
              </div>
            </div>

            {/* Visit Guidelines */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 block">
                {t.tourBooking.instructionsTitle}
              </span>
              <ul className="space-y-1 text-slate-600 text-[11px] list-disc list-inside">
                <li>{t.tourBooking.instruction1}</li>
                <li>{t.tourBooking.instruction2}</li>
                <li>{t.tourBooking.instruction3}</li>
              </ul>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCancelOrReschedule}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 underline cursor-pointer"
              >
                {t.tourBooking.cancelBooking}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Groupe+Scolaire+Encre+%26+Pastel+Ouled+Fayet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-700" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  {t.tourBooking.closePass}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
