/**
 * Official School Configuration & Research Findings (100% Verified from Institutional Evidence)
 * Hibr wa Alwan — حبر وألوان (Groupe Scolaire Encre & Pastel)
 * Ouled Fayet, Algiers, Algeria
 */

export interface SchoolConfig {
  name: {
    ar: string;
    fr: string;
    en: string;
  };
  slogan: {
    ar: string;
    fr: string;
    en: string;
  };
  subtitle: {
    ar: string;
    fr: string;
    en: string;
  };
  location: {
    address: string;
    city: string;
    province: string;
    country: string;
    googleSearchUrl: string;
    facebookUrl: string;
    instagramUrl: string;
    wazeUrl: string;
    coordinates?: { lat: number; lng: number };
  };
  contact: {
    phones: string[];
    email: string;
    workingHours: {
      ar: string;
      fr: string;
      en: string;
    };
  };
  stages: Array<{
    id: string;
    title: { ar: string; fr: string; en: string };
    tag: { ar: string; fr: string; en: string };
    description: { ar: string; fr: string; en: string };
    streams?: Array<{ ar: string; fr: string; en: string }>;
    iconName: string;
  }>;
  facilities: Array<{
    id: string;
    title: { ar: string; fr: string; en: string };
    description: { ar: string; fr: string; en: string };
    iconName: string;
    image: string;
  }>;
  programs: Array<{
    id: string;
    title: { ar: string; fr: string; en: string };
    subtitle: { ar: string; fr: string; en: string };
    description: { ar: string; fr: string; en: string };
    highlights: Array<{ ar: string; fr: string; en: string }>;
  }>;
}

export const SCHOOL_CONFIG: SchoolConfig = {
  name: {
    ar: "المجمع المدرسي حبر وألوان",
    fr: "Groupe Scolaire Encre & Pastel",
    en: "Hibr wa Alwan Educational Complex"
  },
  slogan: {
    ar: "معاً نحو مستقبل أفضل",
    fr: "We can help you — Ensemble vers un avenir meilleur",
    en: "We can help you — Together towards a brighter future"
  },
  subtitle: {
    ar: "مؤسسة التربية والتعليم الخاصة • روضة، ابتدائي، متوسط، ثانوي، دروس دعم ولغات",
    fr: "Établissement Privé d'Enseignement et d'Éducation — Préscolaire, Primaire, Moyen, Secondaire",
    en: "Private Educational Institution — Preschool, Primary, Middle School & Secondary"
  },
  location: {
    address: "طريق بوشاوي، بالقرب من مقر بلدية أولاد فايت (بجانب إقامة النخيل و INOOF)",
    city: "أولاد فايت",
    province: "الجزائر العاصمة",
    country: "الجزائر",
    googleSearchUrl: "https://www.google.com/search?q=مدرسة+حبر+والوان+أولاد+فايت",
    facebookUrl: "https://www.facebook.com/share/1Ctcmtej5E/",
    instagramUrl: "https://www.instagram.com/ecole_encre_pastel/",
    wazeUrl: "https://www.waze.com/live-map/directions/dz/algiers-province/ouled-fayet/ecole-encre-and-pastel?to=place.ChIJP72qHrGvjxIR9KSF31oabRA"
  },
  contact: {
    phones: ["0557.72.28.45", "0550.09.69.34"],
    email: "Encrepastel.school@gmail.com",
    workingHours: {
      ar: "من السبت إلى الخميس: 08:00 صباحاً - 17:00 مساءً",
      fr: "Du Samedi au Jeudi : 08h00 - 17h00",
      en: "Saturday to Thursday: 8:00 AM - 5:00 PM"
    }
  },
  stages: [
    {
      id: "preschool",
      title: { ar: "الطور التحضيري والروضة", fr: "Préscolaire & Petite Section", en: "Preschool & Kindergarten" },
      tag: { ar: "الطفولة المبكرة", fr: "Petite Section", en: "Early Childhood" },
      description: {
        ar: "فضاءات تعليمية مجهزة بطاولات ملونة مستديرة، خزائن مخصصة، وأنشطة تنمية الحواس واللغات الأولى والأرقام والحساب بالألعاب الهادفة.",
        fr: "Espaces aménagés avec mobilier modulaire coloré, casiers individuels et programmes d'éveil sensoriel, linguistique et pré-calcul.",
        en: "Classrooms equipped with colorful modular tables, lockers, and sensory learning programs in early literacy and numeracy."
      },
      iconName: "Palette"
    },
    {
      id: "primary",
      title: { ar: "الطور الابتدائي", fr: "Enseignement Primaire", en: "Primary Education" },
      tag: { ar: "التعليم الأساسي", fr: "Cycle Fondamental", en: "Fundamental Cycle" },
      description: {
        ar: "تعليم نوعي يجمع بين المناهج الرسمية واستعمال العوارض الرقمية التفاعلية (Data Show) وورشات الرسم والأعمال اليدوية واللغات الحية.",
        fr: "Enseignement de haute qualité alliant programmes officiels, vidéoprojection interactive (Data Show), ateliers manuels et renforcement linguistique.",
        en: "Quality primary curriculum integrating interactive projection (Data Show), creative art workshops, and intensive language support."
      },
      iconName: "BookOpen"
    },
    {
      id: "middle",
      title: { ar: "الطور المتوسط", fr: "Enseignement Moyen (BEM)", en: "Middle School (BEM Prep)" },
      tag: { ar: "مرافقة وإعداد BEM", fr: "Préparation BEM", en: "BEM Preparation" },
      description: {
        ar: "تأطير بيداغوجي مكثف يركز على المنهجية، حل التمارين النموذجية، والتحضير المتفوق لشهادة التعليم المتوسط مع مرافقة فردية مستمرة.",
        fr: "Encadrement pédagogique rigoureux axé sur la méthodologie, les synthèses de cours et la préparation active au BEM.",
        en: "Rigorous academic coaching focused on methodology, comprehensive study guides, and high-performance preparation for the BEM."
      },
      iconName: "Award"
    },
    {
      id: "secondary",
      title: { ar: "الطور الثانوي", fr: "Enseignement Secondaire (BAC)", en: "Secondary Education (BAC Prep)" },
      tag: { ar: "جميع الشعب العلمية والأدبية", fr: "Toutes Filières", en: "All Academic Streams" },
      description: {
        ar: "مرافقة متكاملة في السنين 1AS و 2AS و 3AS في جميع التخصصات لتتويج المسار بنسب نجاح عالية في شهادة البكالوريا.",
        fr: "Accompagnement complet de la 1AS à la 3AS pour toutes les filières, menant à l'excellence aux épreuves du Baccalauréat.",
        en: "Comprehensive secondary education from 1AS to 3AS across all academic streams, paving the way for top Baccalaureate achievements."
      },
      streams: [
        { ar: "علوم تجريبية", fr: "Sciences Expérimentales", en: "Experimental Sciences" },
        { ar: "رياضيات", fr: "Mathématiques", en: "Mathematics" },
        { ar: "تقني رياضي (هندسة مدنية وميكانيكية)", fr: "Technique Mathématique", en: "Mathematical Technical" },
        { ar: "تسيير واقتصاد", fr: "Gestion et Économie", en: "Management & Economics" },
        { ar: "لغات أجنبية (إسبانية، ألمانية، إيطالية)", fr: "Langues Étrangères", en: "Foreign Languages" },
        { ar: "آداب وفلسفة", fr: "Lettres et Philosophie", en: "Literature & Philosophy" }
      ],
      iconName: "GraduationCap"
    }
  ],
  facilities: [
    {
      id: "pool",
      title: { ar: "المسبح نصف أولمبي المغطى والمدفأ", fr: "Piscine Semi-Olympique Couverte & Chauffée", en: "Indoor Semi-Olympic Heated Pool" },
      description: {
        ar: "حوض سباحة نصف أولمبي متطور مع حوض تدريب خاص بالصغار لممارسة الأنشطة المائية في بيئة صحية وآمنة على مدار السنة.",
        fr: "Bassin semi-olympique intérieur avec bassin d'apprentissage pour enfants, assurant un entraînement aquatique sécurisé toute l'année.",
        en: "Advanced indoor semi-Olympic swimming pool with children's training pool for year-round aquatic development in safe conditions."
      },
      iconName: "Waves",
      image: "/images/real/swimming_pool.jpg"
    },
    {
      id: "sports_hall",
      title: { ar: "قاعة الجمباز والفنون القتالية", fr: "Dojo, Gymnastique & Fitness", en: "Martial Arts & Fitness Gymnasium" },
      description: {
        ar: "قاعة رياضية مغطاة مجهزة بأرضيات التاتامي الإسفنجية ومعدات اللياقة لتعزيز اللياقة البدنية والروح الرياضية والانضباط.",
        fr: "Salle omnisports équipée de tapis de tatami protecteurs et d'équipements cardio pour le développement physique et la motricité.",
        en: "Indoor martial arts and gymnastics hall outfitted with tatami mats and fitness equipment for physical discipline and stamina."
      },
      iconName: "Activity",
      image: "/images/real/sports_gym.jpg"
    },
    {
      id: "smart_classes",
      title: { ar: "القاعات الدراسية التفاعلية (Data Show)", fr: "Salles de Classe Multimédia & Data Show", en: "Interactive Smart Classrooms" },
      description: {
        ar: "حجرات دراسية فسيحة ومجهزة بعواكس رقمية تفاعلية لعرض الدروس المرئية والتفاعلية في مختلف المواد.",
        fr: "Salles lumineuses équipées de vidéoprojecteurs interactifs pour un apprentissage numérique vivant et captivant.",
        en: "Spacious classrooms featuring interactive video projection systems for engaging and multimedia-driven lessons."
      },
      iconName: "Monitor",
      image: "/images/real/interactive_class.jpg"
    },
    {
      id: "art_kitchen_studios",
      title: { ar: "ورشات الفنون ومطبخ الشاف الصغير", fr: "Ateliers d'Art & Cuisine Pédagogique", en: "Fine Arts & Junior Chef Kitchen" },
      description: {
        ar: "فضاءات خاصة للتعبير الفني، الرسم بالألوان المائية، الأوريغامي، وورشات الطبخ لإكساب التلاميذ مهارات عملية وحياتية مبكرة.",
        fr: "Espaces créatifs pour la peinture à l'eau, l'origami et la cuisine ludique pour développer la créativité et l'autonomie.",
        en: "Dedicated creative spaces for watercolor painting, origami, and culinary workshops fostering hands-on life skills."
      },
      iconName: "Sparkles",
      image: "/images/real/junior_chef.jpg"
    },
    {
      id: "theater_hall",
      title: { ar: "قاعة المسرح والاحتفالات المدرسية", fr: "Auditorium & Salle de Cérémonie", en: "Auditorium & Celebration Hall" },
      description: {
        ar: "فضاء احتفالي مخصص لتقديم العروض المسرحية، إلقاء الأناشيد، وتكريم المتفوقين في مناسبات النجاح والتميز المدرسي.",
        fr: "Espace polyvalent dédié aux représentations théâtrales, chorales et remises officielles des tableaux d'honneur et diplômes.",
        en: "Multipurpose hall for student theatrical performances, choirs, and official ceremonies honoring academic top achievers."
      },
      iconName: "Drama",
      image: "/images/real/ceremony_excellence.jpg"
    },
    {
      id: "building",
      title: { ar: "المجمع المدرسي العصري بأولاد فايت", fr: "Groupe Scolaire Moderne à Ouled Fayet", en: "Modern Educational Complex in Ouled Fayet" },
      description: {
        ar: "بناية مدرسية حديثة متعددة الطوابق بواجهة زجاجية عاكسة، مداخل مؤمنة، وخزائن فردية للتلاميذ، ومكاتب استقبال أولياء الأمور.",
        fr: "Bâtiment moderne à étages avec façade vitrée contemporaine, accès sécurisé, casiers individuels et espace d'accueil des familles.",
        en: "Multi-story contemporary facility featuring reflective architectural glass, secured entrances, student lockers, and parent reception suites."
      },
      iconName: "Building2",
      image: "/images/real/school_building_facade.jpg"
    }
  ],
  programs: [
    {
      id: "summer_school",
      title: { ar: "المدرسة الصيفية (Summer School)", fr: "École d'Été (Summer School)", en: "Summer School Program" },
      subtitle: { ar: "8 ورشات نوعية: تعلم • تذوق • استمتع", fr: "8 Ateliers Spécialisés", en: "8 Enriched Modules" },
      description: {
        ar: "برنامج صيفي متميز يشمل: فنون الأوريغامي، القرآن الكريم والتلاوة، البرمجة والذكاء الاصطناعي، الفنون التشكيلية، الألعاب الرياضية، الروبوتيك، الخرجات البيداغوجية، ومطبخ الشاف الصغير.",
        fr: "Programme d'été combinant : Origami, Coran et psalmodie, Programmation et IA, Arts plastiques, Sports, Robotique, Sorties pédagogiques et Ateliers cuisine.",
        en: "Signature summer program integrating: Origami, Quran recitation, Coding & AI, Fine Arts, Sports, Robotics, Field Trips, and Junior Chef Cooking."
      },
      highlights: [
        { ar: "ورشات الطبخ والشاف الصغير (Chef's Kitchen)", fr: "Atelier Chef's Kitchen", en: "Chef's Kitchen Workshop" },
        { ar: "برمجة وروبوتيك وذكاء اصطناعي", fr: "Programmation, Robotique & IA", en: "Coding, Robotics & AI" },
        { ar: "حفظ وتلاوة القرآن الكريم بأصوات ندية", fr: "Mémorisation et récitation du Coran", en: "Quran Memorization & Recitation" },
        { ar: "خرجات بيداغوجية استكشافية", fr: "Sorties pédagogiques découvertes", en: "Exploratory Educational Trips" }
      ]
    },
    {
      id: "soroban",
      title: { ar: "برنامج الحساب الذهني والسوربان", fr: "Calcul Mental & Soroban", en: "Soroban & Mental Arithmetic" },
      subtitle: { ar: "تنمية الذكاء والتركيز وقدرات الحساب السريع", fr: "Développement de la concentration", en: "Cognitive Focus & Rapid Math" },
      description: {
        ar: "تدريب متخصص باستخدام العداد الصيني (السوربان) ينمي التخيل المكاني وسرعة البديهة والتركيز لدى الأطفال منذ سن مبكرة.",
        fr: "Formation par le boulier japonais (Soroban) favorisant la concentration, l'agilité mentale et la mémoire visuelle.",
        en: "Specialized training using the Soroban abacus boosting spatial imagination, concentration, and mental agility."
      },
      highlights: [
        { ar: "طاولات تعليمية تفاعلية مدورة", fr: "Tables rondes modulaires", en: "Round modular study tables" },
        { ar: "تمارين تركيز وسرعة يومية", fr: "Exercices quotidiens de rapidité", en: "Daily focus & calculation drills" },
        { ar: "متابعة تطور كل تلميذ", fr: "Suivi personnalisé des acquis", en: "Individual progress tracking" }
      ]
    },
    {
      id: "trips_events",
      title: { ar: "الخرجات البيداغوجية والزيارات الميدانية", fr: "Sorties Pédagogiques & Visites", en: "Educational Field Trips" },
      subtitle: { ar: "ربط المعرفة النظرية بالواقع والميدان", fr: "Apprentissage sur le terrain", en: "Real-world experiential learning" },
      description: {
        ar: "رحلات ميدانية منتظمة مثل زيارة الآثار الرومانية بتيبازة وزيارة استوديوهات قناة الشروق نيوز لفتح آفاق الاستكشاف والمعرفة أمام التلاميذ.",
        fr: "Excursions culturelles et éducatives (Ruines Romaines de Tipaza, plateaux de télévision Echorouk News) pour élargir les horizons.",
        en: "Regular cultural and educational excursions (Roman ruins of Tipaza, Echorouk News television studios) broadening students' perspectives."
      },
      highlights: [
        { ar: "زيارة الآثار التاريخية الرومانية بتيبازة", fr: "Visite des Ruines Romaines de Tipaza", en: "Trip to Tipaza Roman Ruins" },
        { ar: "زيارة استوديوهات الشروق نيوز الإعلامية", fr: "Visite des studios d'Echorouk News", en: "Trip to Echorouk News Studios" },
        { ar: "مرافقة تربوية وتأطير أمني متكامل", fr: "Encadrement et sécurité garantis", en: "Comprehensive safety & guidance" }
      ]
    }
  ]
};
