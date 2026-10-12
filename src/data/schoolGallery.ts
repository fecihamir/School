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
    image: '/images/real/school_building_facade_wide.jpg',
    category: 'campus',
    title: {
      ar: 'الصرح المعماري والحرم المدرسي — مجمع حبر وألوان',
      fr: 'Façade Principale & Campus Moderne — Groupe Scolaire Encre & Pastel',
      en: 'Main Campus & Architecture — Encre & Pastel School'
    },
    description: {
      ar: 'صرح تربوي عصري متكامل مجهز بأحدث معايير الأمان والراحة والبيئة التعليمية المحفزة في أولاد فايت.',
      fr: 'Édifice moderne conçu selon les plus hauts standards pédagogiques et de confort à Ouled Fayet.',
      en: 'State-of-the-art educational building built for safety, comfort, and student flourishing in Ouled Fayet.'
    }
  },
  {
    id: 'swimming-pool',
    image: '/images/real/swimming_pool.jpg',
    category: 'sports_activities',
    title: {
      ar: 'المسبح المدرسي نصف أولمبي المغطى والمدفأ',
      fr: 'Piscine Semi-Olympique Couverte & Chauffée',
      en: 'Indoor Semi-Olympic Heated Pool'
    },
    description: {
      ar: 'حوض سباحة نصف أولمبي داخلي مجهز بأعلى معايير السلامة والتأطير الرياضي المعتمد على مدار السنة.',
      fr: 'Bassin semi-olympique intérieur avec encadrement de maîtres-nageurs qualifiés toute l’année.',
      en: 'Climate-controlled indoor semi-Olympic pool supervised by certified swim coaches year-round.'
    }
  },
  {
    id: 'sports-gym',
    image: '/images/real/sports_gym.jpg',
    category: 'sports_activities',
    title: {
      ar: 'قاعة الجمباز واللياقة والفنون القتالية (Dojo)',
      fr: 'Dojo & Salle Omnisports et Fitness',
      en: 'Gymnastics & Martial Arts Dojo'
    },
    description: {
      ar: 'أرضيات تاتامي واقية ومعدات تدريب لتعزيز الرشاقة البدنية واللياقة والانضباط.',
      fr: 'Espace sécurisé avec tatamis professionnels pour la motricité, la gymnastique et les arts martiaux.',
      en: 'Fully padded tatami floors dedicated to physical agility, gymnastics, and martial arts discipline.'
    }
  },
  {
    id: 'science-lab',
    image: '/images/real/science_lab.jpg',
    category: 'campus',
    title: {
      ar: 'مخبر العلوم الطبيعية والتجارب الفيزيائية',
      fr: 'Laboratoire Scientifique & Expérimentations',
      en: 'Modern Science Laboratory & Experiments'
    },
    description: {
      ar: 'معدات وتجهيزات مخبرية متطورة تتيح للتلاميذ إجراء التجارب العلمية واكتساب المنهج التجريبي العملي.',
      fr: 'Équipements de laboratoire modernes pour l’apprentissage pratique et la démarche scientifique.',
      en: 'Well-equipped laboratory supporting hands-on experimentation and scientific discovery.'
    }
  },
  {
    id: 'school-library',
    image: '/images/real/school_library_reading.jpg',
    category: 'campus',
    title: {
      ar: 'المكتبة المدرسية وفضاء المطالعة والبحوث',
      fr: 'Bibliothèque Scolaire & Espace de Lecture',
      en: 'School Library & Research Resource Center'
    },
    description: {
      ar: 'مجموعة ثرية من المراجع والقصص والموسوعات لتشجيع حب القراءة والبحث العلمي في أجواء هادئة.',
      fr: 'Fonds documentaire riche stimulant le goût de la lecture et la recherche documentaire.',
      en: 'Rich book collection and peaceful reading environment nurturing literary curiosity.'
    }
  },
  {
    id: 'robotics-ai',
    image: '/images/real/robotics_ai.jpg',
    category: 'academics',
    title: {
      ar: 'ورشة الروبوتيك والذكاء الاصطناعي والتكنولوجيا',
      fr: 'Atelier Robotique & Intelligence Artificielle',
      en: 'Robotics & AI Technology Workshop'
    },
    description: {
      ar: 'تدريب تفاعلي على البرمجة وتركيب الروبوتات وتنمية التفكير المنطقي والهندسي للجيل الجديد.',
      fr: 'Initiation à la programmation et à la robotique développant la logique et l’esprit d’ingénierie.',
      en: 'Hands-on coding, logic, and robotics engineering fostering tomorrow’s technological thinkers.'
    }
  },
  {
    id: 'junior-chef',
    image: '/images/real/junior_chef.jpg',
    category: 'sports_activities',
    title: {
      ar: 'ورشات الشاف الصغير — فنون الطبخ والحلويات',
      fr: 'Atelier Cuisine Pédagogique — Chef Junior',
      en: 'Junior Chef Culinary Workshop'
    },
    description: {
      ar: 'ورشة حية ومبهجة يتعلم فيها الأطفال تحضير وجبات صحية واكتساب الاستقلالية وروح الفريق.',
      fr: 'Apprentissage ludique des saveurs, de l’hygiène alimentaire et de l’autonomie culinaire.',
      en: 'Hands-on culinary education empowering children with healthy cooking habits and teamwork.'
    }
  },
  {
    id: 'soroban-mental',
    image: '/images/real/soroban_math.jpg',
    category: 'academics',
    title: {
      ar: 'برنامج الحساب الذهني والسوربان (Soroban)',
      fr: 'Calcul Mental & Boulier Japonais (Soroban)',
      en: 'Mental Arithmetic & Soroban Program'
    },
    description: {
      ar: 'جلسات تدريب متخصصة بالعداد اليدوي لتطوير سرعة التركيز وتنشيط الذاكرة الصورية والبديهة.',
      fr: 'Renforcement de la concentration, de la rapidité de calcul et de la mémoire visuelle.',
      en: 'Boosting rapid computation, mental concentration, and visual memory through abacus techniques.'
    }
  },
  {
    id: 'interactive-datashow',
    image: '/images/real/interactive_class.jpg',
    category: 'academics',
    title: {
      ar: 'التعليم التفاعلي بالعوارض الرقمية (Data Show)',
      fr: 'Apprentissage Interactif par Vidéoprojecteur',
      en: 'Interactive Smart Board & Video Lessons'
    },
    description: {
      ar: 'شروح تعليمية ودروس مرئية عبر العوارض الرقمية الحديثة لترسيخ المفاهيم وتحفيز المشاركة.',
      fr: 'Séances enrichies de projections multimédias pour une assimilation vivante et durable.',
      en: 'Multimedia-enriched visual lessons designed for high engagement and conceptual mastery.'
    }
  },
  {
    id: 'classroom-learning',
    image: '/images/real/classroom_learning.jpg',
    category: 'campus',
    title: {
      ar: 'فضاءات التدريس النظامي الحديثة والمجهزة',
      fr: 'Salles de Classe Modernes & Ergonomiques',
      en: 'Spacious Ergonomic & Modern Classrooms'
    },
    description: {
      ar: 'حجرات دراسية مضيئة ومجهزة بطاولات مريحة وتكييف مناسب يوفر بيئة استيعاب مثالية للطلاب.',
      fr: 'Salles climatisées et lumineuses offrant un environnement propice à l’apprentissage continu.',
      en: 'Bright, air-conditioned learning spaces tailored for focus, comfort, and collaborative learning.'
    }
  },
  {
    id: 'art-studio',
    image: '/images/real/art_workshop.jpg',
    category: 'sports_activities',
    title: {
      ar: 'ورشة الفنون التشكيلية والرسم بالألوان المائية',
      fr: 'Atelier d’Arts Plastiques & Peinture',
      en: 'Fine Arts & Creative Painting Studio'
    },
    description: {
      ar: 'إبداعات فنية وتعبير حر للأطفال عبر تقنيات الرسم والألوان المائية والأشغال اليدوية.',
      fr: 'Développement de la créativité et expression libre à travers la peinture et le modelage.',
      en: 'Nurturing artistic expression through watercolor painting, crafts, and mixed media.'
    }
  },
  {
    id: 'theater-auditorium',
    image: '/images/real/theater_auditorium.jpg',
    category: 'campus',
    title: {
      ar: 'المسرح المدرسي والمدرج التربوي للعروض',
      fr: 'Auditorium & Théâtre Scolaire',
      en: 'School Auditorium & Performance Stage'
    },
    description: {
      ar: 'فضاء متكامل للخطابة والمناظرات والعروض المسرحية لبناء الثقة والطلاقة اللغوية أمام الجمهور.',
      fr: 'Espace scénique pour l’art oratoire, les débats et l’expression théâtrale en public.',
      en: 'Dedicated hall for drama, public speaking, and assemblies strengthening presentation confidence.'
    }
  },
  {
    id: 'preschool-corner',
    image: '/images/real/preschool_early_childhood.jpg',
    category: 'academics',
    title: {
      ar: 'فضاء التعليم المبكر وأنشطة الطور التحضيري',
      fr: 'Espace d’Éveil & Petite Section (Maternelle)',
      en: 'Early Childhood & Kindergarten Discovery'
    },
    description: {
      ar: 'أنشطة حركية وتربوية ممتعة في بيئة ملونة مصممة خصيصاً لتنمية التفكير المنطقي والاجتماعي.',
      fr: 'Activités d’éveil sensoriel et développement de la motricité fine dans un cadre chaleureux.',
      en: 'Sensory and motor skill activities promoting early logical thinking and creative discovery.'
    }
  },
  {
    id: 'kindergarten-play',
    image: '/images/real/kindergarten_activity.jpg',
    category: 'sports_activities',
    title: {
      ar: 'أنشطة براعم الروضة والألعاب الحركية البيداغوجية',
      fr: 'Activités Psychomotrices & Jeux d’Éveil',
      en: 'Kindergarten Psychomotor & Educational Play'
    },
    description: {
      ar: 'ألعاب حركية ومسارات ترفيهية تهدف لتطوير التوازن والتعاون بين الأطفال من الأعمار الأولى.',
      fr: 'Parcours psychomoteurs ludiques favorisant la coordination et l’esprit d’équipe dès le jeune âge.',
      en: 'Fun psychomotor courses fostering physical balance, team spirit, and coordination.'
    }
  },
  {
    id: 'quran-club',
    image: '/images/real/quran_recitation.jpg',
    category: 'academics',
    title: {
      ar: 'نادي ترتيل وحفظ القرآن الكريم والآداب',
      fr: 'Club de Récitation & Mémorisation du Coran',
      en: 'Quran Recitation & Tajweed Study Circle'
    },
    description: {
      ar: 'حلقات أسبوعية لتعليم مخارج الحروف وقواعد التجويد وغرس القيم والأخلاق الفاضلة في نفوس التلاميذ.',
      fr: 'Séances hebdomadaires d’apprentissage des règles de récitation et d’éthique noble.',
      en: 'Weekly Tajweed recitation sessions cultivating moral values and eloquence.'
    }
  },
  {
    id: 'ceremony-honors',
    image: '/images/real/ceremony_awards.jpg',
    category: 'trips_events',
    title: {
      ar: 'حفل تكريم النجباء وتوزيع الجوائز السنوية',
      fr: 'Cérémonie Annuelle des Prix & Palmarès',
      en: 'Annual Awards & Student Distinction Gala'
    },
    description: {
      ar: 'توزيع شهادات الامتياز والجوائز التقديرية تشجيعاً للاجتهاد والتألق طوال الموسم الدراسي.',
      fr: 'Remise officielle des diplômes et prix d’excellence récompensant le travail méritant des élèves.',
      en: 'Annual celebration honoring outstanding students with certificates of distinction and awards.'
    }
  },
  {
    id: 'trip-tipaza',
    image: '/images/real/trip_tipaza_ruins.jpg',
    category: 'trips_events',
    title: {
      ar: 'الخرجة البيداغوجية إلى الآثار الرومانية بتيبازة',
      fr: 'Sortie Pédagogique aux Ruines Romaines de Tipaza',
      en: 'Educational Field Trip to Tipaza Ruins'
    },
    description: {
      ar: 'استكشاف التراث التاريخي الجزائري والآثار القديمة على ضفاف البحر الأبيض المتوسط.',
      fr: 'Découverte du patrimoine historique national et des vestiges antiques au bord de la Méditerranée.',
      en: 'Historical exploration of ancient Algerian archaeological heritage along the Mediterranean coast.'
    }
  },
  {
    id: 'trip-echorouk',
    image: '/images/real/trip_echorouk_tv.jpg',
    category: 'trips_events',
    title: {
      ar: 'زيارة استوديوهات الشروق نيوز التلفزيونية',
      fr: 'Visite des Studios Télévisés d’Echorouk News',
      en: 'Field Trip to Echorouk News Broadcast Studios'
    },
    description: {
      ar: 'معايشة واقعية للعمل الإعلامي وتقديم الأخبار والتعرف على غرف التحكم وكاميرات البث.',
      fr: 'Immersion dans le journalisme audiovisuel, présentation sur plateau et régies de diffusion.',
      en: 'Hands-on broadcast journalism experience exploring TV newsrooms, control suites, and studio cameras.'
    }
  },
  {
    id: 'student-creativity',
    image: '/images/real/FB_IMG_1791624305474.jpg',
    category: 'academics',
    title: {
      ar: 'معرض الإنتاجات الإبداعية والمشاريع المدرسية',
      fr: 'Exposition des Projets & Dessins Créatifs',
      en: 'Student Projects & Creative Showcase'
    },
    description: {
      ar: 'عرض رسومات ومشاريع التلاميذ لتشجيع الثقة بالنفس والاعتزاز بالعمل المنجز والمشاركة.',
      fr: 'Valorisation des talents des élèves à travers l’exposition de leurs œuvres et réalisations.',
      en: 'Showcasing student artwork and interactive class projects boosting self-confidence and pride.'
    }
  }
];
