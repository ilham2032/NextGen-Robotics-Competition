import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip: move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      // Navbar
      "Home": "Home",
      "About": "About",
      "Standings": "Standings",
      "News": "News",
      "Participants": "Participants",
      "Regulations": "Regulations",
      "Partners": "Partners",
      "Awards": "Awards",
      "FAQ": "FAQ",
      "Contact": "Contact",
      "Sign Up": "Sign Up",
      "NextGen Robotics": "NextGen Robotics",
      "COMPETITION": "COMPETITION",

      // Home page
      "Empowering the Next Generation": "Empowering the Next Generation",
      "Join the ultimate robotics competition": "Join the ultimate robotics competition",
      "Register Now": "Register Now",
      "Learn More": "Learn More",
      "1st Edition": "1st Edition",
      "NextGen Robotics Competition": "NextGen Robotics Competition",
      "July 23-24 - Build, Battle, and Innovate": "July 23-24 - Build, Battle, and Innovate",
      "Register Team": "Register Team",

      // Home page additional content
      "View Regulations": "View Regulations",
      "Expected Participants": "Expected Participants",
      "Schools and Teams": "Schools and Teams",
      "Competition and Exhibition": "Competition and Exhibition",
      "What is NextGen Competition?": "What is NextGen Competition?",
      "The NextGen Robotics Competition brings together students and robotics enthusiasts to design, program, and test robots in a collaborative and competitive environment. It is where innovation, creativity, and teamwork turn ideas into real engineering solutions.": "The NextGen Robotics Competition brings together students and robotics enthusiasts to design, program, and test robots in a collaborative and competitive environment. It is where innovation, creativity, and teamwork turn ideas into real engineering solutions.",
      "Why Join?": "Why Join?",
      "Build practical robotics and coding skills.": "Build practical robotics and coding skills.",
      "Solve real-world challenges with your team.": "Solve real-world challenges with your team.",
      "Present your work to judges and industry mentors.": "Present your work to judges and industry mentors.",
      "Connect with a community of young innovators.": "Connect with a community of young innovators.",
      "Our Mission": "Our Mission",
      "Innovating for Real-World Impact": "Innovating for Real-World Impact",
      "We challenge teams to create smart and efficient robots that address everyday problems while sharpening critical thinking and engineering discipline.": "We challenge teams to create smart and efficient robots that address everyday problems while sharpening critical thinking and engineering discipline.",
      "Inspiring Future Technologists": "Inspiring Future Technologists",
      "Through competition and collaboration, participants gain confidence, teamwork experience, and a stronger foundation to shape tomorrow's technology.": "Through competition and collaboration, participants gain confidence, teamwork experience, and a stronger foundation to shape tomorrow's technology.",
      "Categories": "Categories",
      "See all details": "See all details",
      "Learn category": "Learn category",

      // Home page footer section
      "Ready to Compete?": "Ready to Compete?",
      "Gather your team, review the regulations, and take your place in the first edition of the NextGen Robotics Competition.": "Gather your team, review the regulations, and take your place in the first edition of the NextGen Robotics Competition.",

      // About page
      "About NextGen Robotics": "About NextGen Robotics",
      "General": "General",
      "Competition Dates": "Competition Dates",

      // Privacy Policy
      "Privacy Policy": "Privacy Policy",
      "Effective Date": "Effective Date",
      "Introduction": "Introduction",
      "Information We Collect": "Information We Collect",
      "Personal Information": "Personal Information",
      "Usage Data": "Usage Data",
      "How We Use Your Information": "How We Use Your Information",
      "Information Sharing": "Information Sharing",
      "Data Security": "Data Security",
      "Your Rights": "Your Rights",
      "Changes to This Policy": "Changes to This Policy",
      "Contact Us": "Contact Us",

      // Terms of Service
      "Terms of Service": "Terms of Service",
      "Acceptance of Terms": "Acceptance of Terms",
      "Description of Service": "Description of Service",
      "User Responsibilities": "User Responsibilities",
      "Intellectual Property": "Intellectual Property",
      "Limitation of Liability": "Limitation of Liability",
      "Termination": "Termination",
      "Governing Law": "Governing Law",
      "Contact Information": "Contact Information",
    }
  },
  az: {
    translation: {
      // Navbar
      "Home": "Ana səhifə",
      "About": "Haqqımızda",
      "Standings": "Sıralama",
      "News": "Xəbərlər",
      "Participants": "İştirakçılar",
      "Regulations": "Qaydalar",
      "Partners": "Tərəfdaşlar",
      "Awards": "Mükafatlar",
      "FAQ": "FAQ",
      "Contact": "Əlaqə",
      "Sign Up": "Qeydiyyat",
      "NextGen Robotics": "NextGen Robotics",
      "COMPETITION": "YARIŞ",

      // Home page
      "Empowering the Next Generation": "Növbəti Nəsli Gücləndirmək",
      "Join the ultimate robotics competition": "Ən yaxşı robot texnikası yarışmasına qoşulun",
      "Register Now": "İndi Qeydiyyatdan Keçin",
      "Learn More": "Daha Çox Məlumat",
      "1st Edition": "1-ci Buraxılış",
      "NextGen Robotics Competition": "NextGen Robot Texnikası Yarışması",
      "July 23-24 - Build, Battle, and Innovate": "23-24 İyul - Qur, Döyüş və İnnovasiya Et",
      "Register Team": "Komanda Qeydiyyatı",

      // Home page additional content
      "View Regulations": "Qaydaları Görün",
      "Expected Participants": "Gözlənilən İştirakçılar",
      "Schools and Teams": "Məktəblər və Komandalar",
      "Competition and Exhibition": "Yarış və Sərgi",
      "What is NextGen Competition?": "NextGen Yarışması Nədir?",
      "The NextGen Robotics Competition brings together students and robotics enthusiasts to design, program, and test robots in a collaborative and competitive environment. It is where innovation, creativity, and teamwork turn ideas into real engineering solutions.": "NextGen Robot Texnikası Yarışması tələbələri və robot texnikası həvəskarlarını birlikdə gətirərək, əməkdaşlıq və rəqabət mühitində robotları dizayn etmək, proqramlaşdırmaq və sınaqdan keçirmək üçün bir araya gətirir. Bu, innovasiyanın, yaradıcılığın və komanda işinin ideyaları real mühəndislik həllərinə çevirdiyi yerdir.",
      "Why Join?": "Niyə Qoşulmalısınız?",
      "Build practical robotics and coding skills.": "Praktiki robot texnikası və kodlaşdırma bacarıqları qurun.",
      "Solve real-world challenges with your team.": "Komandanızla real dünya problemlərini həll edin.",
      "Present your work to judges and industry mentors.": "İşinizi hakim və sənaye mentorlarına təqdim edin.",
      "Connect with a community of young innovators.": "Gənc innovatorlar icması ilə əlaqə yaradın.",
      "Our Mission": "Missiyamız",
      "Innovating for Real-World Impact": "Real Dünya Təsiri üçün İnnovasiya",
      "We challenge teams to create smart and efficient robots that address everyday problems while sharpening critical thinking and engineering discipline.": "Biz komandaları hər gün problemlərini həll edən ağıllı və səmərəli robotlar yaratmağa çağırırıq, eyni zamanda tənqidi düşünmə və mühəndislik intizamını kəskinləşdiririk.",
      "Inspiring Future Technologists": "Gələcək Texnoloqları İlhamlandırmaq",
      "Through competition and collaboration, participants gain confidence, teamwork experience, and a stronger foundation to shape tomorrow's technology.": "Rəqabət və əməkdaşlıq vasitəsilə iştirakçılar özünəinam, komanda iş təcrübəsi qazanır və sabahın texnologiyasını formalaşdırmaq üçün daha güclü təməl əldə edirlər.",
      "Categories": "Kateqoriyalar",
      "See all details": "Bütün detalları görün",
      "Learn category": "Kateqoriyanı öyrənin",

      // Home page footer section
      "Ready to Compete?": "Rəqabətə Hazırsınız?",
      "Gather your team, review the regulations, and take your place in the first edition of the NextGen Robotics Competition.": "Komandanızı toplayın, qaydaları nəzərdən keçirin və NextGen Robot Texnikası Yarışmasının ilk buraxılışında yerinizi tutun.",

      // Home page categories
      "Mini Sumo": "Mini Sumo",
      "Autonomous robots face off in an intense arena challenge where strategy and mechanical precision decide the winner.": "Muxtar robotlar strategiya və mexaniki dəqiqliyin qalibi müəyyən etdiyi intensiv arena yarışmasında üz-üzə gəlirlər.",
      "Mini Sumo Kids": "Mini Sumo Uşaqlar",
      "A beginner-friendly category for younger innovators to learn engineering, coding, and teamwork through competition.": "Gənc innovatorların yarışma vasitəsilə mühəndislik, kodlaşdırma və komanda işini öyrəndiyi başlanğıc dostu kateqoriya.",
      "Innovation Showcase": "İnnovasiya Sərgisi",
      "Teams present creative robotics projects that solve everyday problems with practical and impactful solutions.": "Komandalar hər gün problemlərini praktiki və təsirli həllərlə həll edən yaradıcı robot texnikası layihələrini təqdim edirlər.",

      // About page
      "About NextGen Robotics": "NextGen Robotics Haqqında",
      "General": "Ümumi",
      "Competition Dates": "Yarış Tarixləri",

      // Privacy Policy
      "Privacy Policy": "Gizlilik Siyasəti",
      "Effective Date": "Etibarlı Tarix",
      "Introduction": "Giriş",
      "Information We Collect": "Topladığımız Məlumatlar",
      "Personal Information": "Şəxsi Məlumatlar",
      "Usage Data": "İstifadə Məlumatları",
      "How We Use Your Information": "Məlumatlarınızı Necə İstifadə Edirik",
      "Information Sharing": "Məlumat Paylaşımı",
      "Data Security": "Məlumat Təhlükəsizliyi",
      "Your Rights": "Sizin Hüquqlarınız",
      "Changes to This Policy": "Bu Siyasətdə Dəyişikliklər",
      "Contact Us": "Bizimlə Əlaqə",

      // Contact page
      "Support": "Dəstək",
      "We would love to hear from you. Reach out for competition questions, sponsorship, volunteering, or general support.": "Sizdən eşitmək istərdik. Yarış sualları, sponsorluq, könüllülük və ya ümumi dəstək üçün bizimlə əlaqə saxlayın.",
      "Get in Touch": "Əlaqə Saxlayın",
      "Email": "E-poçt",
      "Phone": "Telefon",
      "Address": "Ünvan",
      "Want to become a volunteer?": "Könüllü olmaq istəyirsiniz?",
      "Volunteer Registration": "Könüllü Qeydiyyatı",

      // FAQ page
      "Frequently Asked Questions": "Tez-tez Verilən Suallar",
      "Who can join the NextGen Robotics Competition?": "NextGen Robot Texnikası Yarışına kim qoşula bilər?",
      "Students and young innovators can participate through school teams, clubs, or independent groups based on the category requirements.": "Tələbələr və gənc innovasiyalar məktəb komandaları, klublar və ya kateqoriya tələblərinə əsasən müstəqil qruplar vasitəsilə iştirak edə bilərlər.",
      "How do we register a team?": "Komandanı necə qeydiyyatdan keçirək?",
      "Go to Teams Zone and use the registration form. Fill in team details, member information, and select the competition category.": "Komandalar Zonasına gedin və qeydiyyat formasından istifadə edin. Komanda detallarını, üzv məlumatlarını doldurun və yarış kateqoriyasını seçin.",
      "Can we participate in multiple categories?": "Birdən çox kateqoriyada iştirak edə bilərik?",
      "Yes. A team can register in multiple categories, but each category should have a clear submission and meet all technical rules.": "Bəli. Bir komanda birdən çox kateqoriyada qeydiyyatdan keçə bilər, lakin hər kateqoriya aydın təqdimat olmalı və bütün texniki qaydalara riayət etməlidir.",
      "Where can we find rules and technical requirements?": "Qaydaları və texniki tələbləri haradan tapa bilərik?",
      "All regulations are available on the Regulations page, including category-specific details, restrictions, and judging criteria.": "Bütün qaydalar Qaydalar səhifəsində mövcuddur, o cümlədən kateqoriya xüsusi detallar, məhdudiyyətlər və qiymətləndirmə meyarları.",
      "How are winners selected?": "Qaliblər necə seçilir?",
      "Winners are selected by a judging panel and referees based on category scoring systems, technical performance, and innovation quality.": "Qaliblər qiymətləndirmə paneli və hakimlər tərəfindən kateqoriya qiymətləndirmə sistemlərinə, texniki performans və innovasiya keyfiyyətinə əsasən seçilir.",
      "What are the competition dates?": "Yarış tarixləri nədir?",
      "The competition will be held on July 23-24, 2026.": "Yarış 2026-cı il iyulun 23-24-də keçiriləcək.",
      "Is there an entry fee?": "Giriş haqqı varmı?",
      "No, participation is completely free for all teams.": "Xeyr, bütün komandalar üçün iştirak tamamilə pulsuzdur.",
      "Can individuals participate?": "Fərdlər iştirak edə bilər?",
      "No, all participants must be part of a team with at least 2 members.": "Xeyr, bütün iştirakçılar ən azı 2 üzvdən ibarət komandanın hissəsi olmalıdır.",

      // Awards page
      "Awards & Prizes": "Mükafatlar və Prizlər",
      "Every category celebrates innovation, teamwork, and engineering excellence. Top-performing teams will receive cash prizes and recognition on the main stage.": "Hər kateqoriya innovasiyanı, komanda işini və mühəndislik mükəmməlliyini qeyd edir. Ən yaxşı performans göstərən komandalar nağd prizlər və əsas səhnədə tanınma alacaqlar.",
      "1st Place Winner": "1-ci Yer Qalibi",
      "Awarded to the champion team in each category.": "Hər kateqoriyada çempion komandaya verilir.",
      "2nd Place Winner": "2-ci Yer Qalibi",
      "Given to the runner-up team in each category.": "Hər kateqoriyada ikinci komandaya verilir.",
      "3rd Place Winner": "3-cü Yer Qalibi",
      "Presented to the third best team in each category.": "Hər kateqoriyada üçüncü ən yaxşı komandaya təqdim edilir.",

      // Sponsors page
      "Network & Support": "Şəbəkə və Dəstək",
      "We are grateful to organizations that support NextGen Robotics Competition and help us build a stronger innovation ecosystem.": "NextGen Robot Texnikası Yarışmasını dəstəkləyən və daha güclü innovasiya ekosistemi qurmağa kömək edən təşkilatlara minnətdarıq.",
      "For sponsorship inquiries, contact": "Sponsorluq sorğuları üçün əlaqə saxlayın",
      "All Japan Robot Sumo Tournament": "Bütün Yaponiya Robot Sumo Turniri",
      "RoboChallenge Romania": "RoboChallenge Rumıniya",
      "JSUMO Ultimate Robot Parts": "JSUMO Ultimate Robot Hissələri",

      // Standing page
      "Competition Rankings": "Yarış Sıralamaları",
      "Official rankings and category scoreboards will appear here after referee verification.": "Rəsmi sıralamalar və kateqoriya hesab lövhələri hakim yoxlanışından sonra burada görünəcək.",
      "Standings are not published yet.": "Sıralamalar hələ dərc olunmayıb.",
      "Please check back after match results are finalized.": "Zəhmət olmasa, oyun nəticələri yekunlaşdıqdan sonra yoxlayın.",

      // News page
      "Event Updates": "Tədbir Yeniləmələri",
      "Stay updated with the latest announcements from NextGen Robotics Competition.": "NextGen Robot Texnikası Yarışmasından ən son elanlarla yenilənmiş qalın.",
      "NextGen Robotics Competition 1st Edition in Azerbaijan": "Azərbaycanda NextGen Robot Texnikası Yarışması 1-ci Buraxılış",

      // Regulations page
      "Competition Guide": "Yarış Bələdçisi",
      "Review each category requirements, official details, and downloadable regulation files.": "Hər kateqoriya tələblərini, rəsmi detalları və yüklənə bilən qayda fayllarını nəzərdən keçirin.",

      // Participants page
      "Competition Overview": "Yarış İcmalı",
      "Explore registered teams by category and see the growing international robotics community joining NextGen.": "Qeydiyyatdan keçmiş komandaları kateqoriyaya görə kəşf edin və NextGen-ə qoşulan böyüyən beynəlxalq robot texnikası icmasını görün.",
      "Total Teams": "Ümumi Komandalar",
      "Countries": "Ölkələr",
    }
  }
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: 'en', // language to use, more info here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already does escaping
    }
  });

export default i18n;