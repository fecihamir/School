/**
 * Authentic School Gallery & Real Photographs
 * Source: École Encre & Pastel / مؤسسة حبر وألوان للتربية والتعليم الخاصة
 */

export interface GalleryItem {
  id: string;
  image: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  category: 'campus' | 'academics' | 'sports_activities' | 'trips_events';
  description?: {
    ar: string;
    fr: string;
    en: string;
  };
}

export const REAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'building-facade',
    image: '/images/real/20261010_100643.jpg',
    category: 'campus',
    title: {
      ar: 'المبنى المدرسي الحديث — أولاد فايت',
      fr: 'Façade du Groupe Scolaire — Ouled Fayet',
      en: 'Modern School Campus — Ouled Fayet'
    },
    description: {
      ar: 'بناية معمارية حديثة بواجهة زجاجية عاكسة، مجهزة بأحدث معايير الأمان والراحة للتلاميذ.',
      fr: 'Bâtiment contemporain avec façade vitrée sécurisée, conçu selon les normes éducatives modernes.',
      en: 'Contemporary facility with architectural glass facade designed to modern educational safety standards.'
    }
  },
  {
    id: 'classroom-primary',
    image: '/images/real/744109120_1609573121168113_7635609828020162030_n.jpg',
    category: 'academics',
    title: {
      ar: 'جلسة تعليمية تفاعلية — الطور الابتدائي',
      fr: 'Séance d’apprentissage interactive — Primaire',
      en: 'Interactive Classroom Learning — Primary'
    },
    description: {
      ar: 'أفواج دراسية نموذجية بطاولات تفاعلية مستديرة وتأطير بيداغوجي يشجع على المشاركة والإبداع.',
      fr: 'Classes à effectif réduit avec tables modulaires favorisant l’échange et l’apprentissage actif.',
      en: 'Optimized class sizes with modular collaborative seating fostering student participation.'
    }
  },
  {
    id: 'robotics-ai',
    image: '/images/real/FB_IMG_1791623974166.jpg',
    category: 'academics',
    title: {
      ar: 'ورشة البرمجة والروبوتيك والذكاء الاصطناعي',
      fr: 'Atelier Robotique, Codage & IA',
      en: 'Robotics, Coding & AI Workshop'
    },
    description: {
      ar: 'تعليم المهارات المستقبلية وتركيب الدوائر الإلكترونية والبرمجة بالكتل للأطفال.',
      fr: 'Initiation aux technologies d’avenir : montage de circuits électroniques et programmation par blocs.',
      en: 'Hands-on future tech skills: electronic circuit assembly and block-based programming.'
    }
  },
  {
    id: 'science-lab',
    image: '/images/real/FB_IMG_1791623994404.jpg',
    category: 'academics',
    title: {
      ar: 'مخبر العلوم والتجارب العلمية',
      fr: 'Laboratoire de Sciences & Expérimentations',
      en: 'Science & Chemistry Laboratory'
    },
    description: {
      ar: 'تجارب علمية حية وملموسة تقرب المفاهيم الفيزيائية والكيميائية لتلاميذ المتوسط والثانوي.',
      fr: 'Expériences pratiques en physique et chimie pour les collégiens et lycéens.',
      en: 'Practical physical and chemical experiments solidifying middle and high school scientific concepts.'
    }
  },
  {
    id: 'swimming-pool',
    image: '/images/real/FB_IMG_1791624060420.jpg',
    category: 'sports_activities',
    title: {
      ar: 'المسبح المدرسي المغطى والمدفأ',
      fr: 'Piscine Intérieure Chauffée & Sécurisée',
      en: 'Indoor Heated Swimming Pool'
    },
    description: {
      ar: 'حصص سباحة منتظمة بإشراف مدربين مؤهلين وأحزمة سلامة للأعمار المختلفة.',
      fr: 'Séances de natation encadrées par des maîtres-nageurs certifiés dans un environnement tempéré.',
      en: 'Structured swimming lessons overseen by qualified coaches in a climate-controlled setting.'
    }
  },
  {
    id: 'sports-gym',
    image: '/images/real/FB_IMG_1791624076114.jpg',
    category: 'sports_activities',
    title: {
      ar: 'قاعة الجمباز والفنون القتالية (Dojo)',
      fr: 'Dojo & Salle Omnisports',
      en: 'Gymnastics & Martial Arts Dojo'
    },
    description: {
      ar: 'أرضيات تاتامي واقية ومعدات لياقة لبناء الرشاقة والانضباط والثقة بالنفس.',
      fr: 'Espace sécurisé avec tatamis professionnels pour la motricité, la gymnastique et les arts martiaux.',
      en: 'Fully padded tatami floors dedicated to physical agility, gymnastics, and martial arts discipline.'
    }
  },
  {
    id: 'junior-chef',
    image: '/images/real/FB_IMG_1791624083472.jpg',
    category: 'sports_activities',
    title: {
      ar: 'مطبخ الشاف الصغير — ورشة فنون الطبخ',
      fr: 'Atelier Cuisine Pédagogique — Chef Junior',
      en: 'Junior Chef Culinary Workshop'
    },
    description: {
      ar: 'تعليم الأطفال تحضير وجبات صحية واكتساب مهارات الاستقلالية والنظافة والعمل الجماعي.',
      fr: 'Apprentissage ludique des saveurs, de l’hygiène alimentaire et de l’autonomie culinaire.',
      en: 'Culinary education empowering children with healthy cooking habits, hygiene, and teamwork.'
    }
  },
  {
    id: 'theater-auditorium',
    image: '/images/real/FB_IMG_1791624091978.jpg',
    category: 'trips_events',
    title: {
      ar: 'قاعة المسرح والعروض الثقافية',
      fr: 'Auditorium & Salle de Spectacles',
      en: 'Auditorium & Theatrical Stage'
    },
    description: {
      ar: 'خشبة مسرح مجهزة للعروض المدرسية والإنشاد وتنمية مهارات الخطابة والتحدث أمام الجمهور.',
      fr: 'Scène équipée pour les pièces théâtrales d’élèves, chorales et prises de parole en public.',
      en: 'Equipped performance stage for student theatrical plays, recitals, and public speaking.'
    }
  },
  {
    id: 'quran-tajweed',
    image: '/images/real/FB_IMG_1791624114476.jpg',
    category: 'academics',
    title: {
      ar: 'حلقة حفظ وتلاوة القرآن الكريم بالتجويد',
      fr: 'Cercle de Mémorisation & Récitation du Coran',
      en: 'Quran Memorization & Tajweed Circle'
    },
    description: {
      ar: 'غرس القيم الأخلاقية وتلقين أحكام التلاوة الصحيحة بأصوات ندية.',
      fr: 'Enseignement des règles de psalmodie (Tajweed) et consolidation des valeurs éducatives.',
      en: 'Quranic recitation rules (Tajweed) and character-building moral education.'
    }
  },
  {
    id: 'trip-tipaza',
    image: '/images/real/FB_IMG_1791624166575.jpg',
    category: 'trips_events',
    title: {
      ar: 'خرجة بيداغوجية إلى الآثار الرومانية بتيبازة',
      fr: 'Sortie Pédagogique aux Ruines Romaines de Tipaza',
      en: 'Field Trip to Tipaza Roman Ruins'
    },
    description: {
      ar: 'استكشاف التراث التاريخي الجزائري والآثار القديمة على ضفاف البحر الأبيض المتوسط.',
      fr: 'Découverte du patrimoine historique national et des vestiges antiques au bord de la Méditerranée.',
      en: 'Historical exploration of ancient Algerian archaeological heritage along the Mediterranean coast.'
    }
  },
  {
    id: 'trip-echorouk',
    image: '/images/real/FB_IMG_1791624189505.jpg',
    category: 'trips_events',
    title: {
      ar: 'زيارة استوديوهات الشروق نيوز التلفزيونية',
      fr: 'Visite des Studios Télévisés d’Echorouk News',
      en: 'Field Trip to Echorouk News Broadcast Studios'
    },
    description: {
      ar: 'معايشة واقعية للعمل الإعلامي، تقديم الأخبار، والتعرف على غرف التحكم وكاميرات البث.',
      fr: 'Immersion dans le journalisme audiovisuel, présentation sur plateau et régies de diffusion.',
      en: 'Hands-on broadcast journalism experience exploring TV newsrooms, control suites, and studio cameras.'
    }
  },
  {
    id: 'ceremony-honors',
    image: '/images/real/FB_IMG_1791624234882.jpg',
    category: 'trips_events',
    title: {
      ar: 'حفل تكريم النجباء ولوحة الشرف (Tableau d’Honneur)',
      fr: 'Cérémonie d’Excellence & Tableau d’Honneur',
      en: 'Honor Roll & Academic Excellence Ceremony'
    },
    description: {
      ar: 'تكريم المتفوقين وتوزيع الشهادات والجوائز تقديراً للاجتهاد والتألق طوال الموسم الدراسي.',
      fr: 'Remise officielle des diplômes et prix d’excellence récompensant le travail méritant des élèves.',
      en: 'Annual celebration honoring outstanding students with certificates of distinction and awards.'
    }
  },
  {
    id: 'preschool-corner',
    image: '/images/real/FB_IMG_1791624010104.jpg',
    category: 'academics',
    title: {
      ar: 'فضاء الألعاب التربوية والتعليم المبكر (الروضة)',
      fr: 'Espace d’Éveil & Petite Section (Maternelle)',
      en: 'Early Childhood & Sensory Development Corner'
    },
    description: {
      ar: 'أنشطة حركية وحسية لتطوير التفكير المنطقي والتعرف على الألوان والأشكال.',
      fr: 'Activités d’éveil sensoriel et développement de la motricité fine dans un cadre chaleureux.',
      en: 'Sensory and motor skill activities promoting early logical thinking and creative discovery.'
    }
  },
  {
    id: 'art-studio',
    image: '/images/real/FB_IMG_1791624021845.jpg',
    category: 'sports_activities',
    title: {
      ar: 'ورشة الفنون التشكيلية والرسم بالألوان المائية',
      fr: 'Atelier d’Arts Plastiques & Aquarelle',
      en: 'Fine Arts & Watercolor Painting Studio'
    },
    description: {
      ar: 'تحفيز الخيال الفني وتعبير التلاميذ عبر تقنيات الرسم والأوريغامي والألوان المائية.',
      fr: 'Développement de la créativité et expression libre à travers la peinture et le modelage.',
      en: 'Nurturing artistic expression through watercolor painting, origami, and mixed media.'
    }
  },
  {
    id: 'soroban-mental',
    image: '/images/real/FB_IMG_1791624051768.jpg',
    category: 'academics',
    title: {
      ar: 'برنامج الحساب الذهني والسوربان (Soroban)',
      fr: 'Calcul Mental & Boulier Japonais (Soroban)',
      en: 'Mental Arithmetic & Soroban Program'
    },
    description: {
      ar: 'تدريبات سرعة التركيز وتنشيط الذاكرة الصورية عبر العداد اليدوي الصيني.',
      fr: 'Renforcement de la concentration, de la rapidité et de la mémoire visuelle.',
      en: 'Boosting rapid computation, mental concentration, and visual memory through abacus techniques.'
    }
  },
  {
    id: 'interactive-datashow',
    image: '/images/real/FB_IMG_1791624296395.jpg',
    category: 'academics',
    title: {
      ar: 'التعليم التفاعلي بالعوارض الرقمية (Data Show)',
      fr: 'Apprentissage Interactif par Vidéoprojecteur',
      en: 'Interactive Smart Board & Projector Lessons'
    },
    description: {
      ar: 'دروس بصرية تفاعلية تدعم الفهم العميق وتجعل التعليم ممتعاً وجذاباً.',
      fr: 'Séances enrichies de contenus multimédias pour une assimilation vivante et durable.',
      en: 'Multimedia-enriched visual lessons designed for high engagement and conceptual mastery.'
    }
  },
  {
    id: 'admissions-official-poster',
    image: '/images/real/FB_IMG_1791622735626.jpg',
    category: 'campus',
    title: {
      ar: 'الملصق الإداري الرسمي للتسجيلات المدرسية',
      fr: 'Affiche Officielle des Inscriptions Scolaires',
      en: 'Official School Admissions & Registration Poster'
    },
    description: {
      ar: 'إعلان فتح التسجيلات لجميع الأطوار مع أرقام التواصل والعنوان الرسمي بأولاد فايت.',
      fr: 'Annonce officielle d’ouverture des inscriptions avec coordonnées complètes de l’école.',
      en: 'Official institutional notice detailing enrollment across all academic cycles with verified contact details.'
    }
  }
];
