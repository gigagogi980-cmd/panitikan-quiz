/* Flashcards reviewer - Panitikang Rehiyon (58 cards, user-approved per topic) */
const REVIEW_PANITIKAN_TOPICS = {
  tula: "Tula",
  manunulat: "Manunulat",
  cordillera: "Cordillera",
  karunungan: "Karunungang Bayan"
};
const PAH1 = "Pahina 1: Tula at Manunulat";
const PAH2 = "Pahina 2: Cordillera";
const PAH3 = "Pahina 3: Karunungang Bayan";

const REVIEW_PANITIKAN = [
  // ---- Topic 1: Tula (12) ----
  { term: "Ang Diyos Ko", def: "Tula ni Benigno Ramos; 12 sukat; kung saan natatagpuan ang Diyos", topic: "tula", ppt: PAH1 },
  { term: "Benigno Ramos", def: "Dating politikal na lider; may-akda ng Ang Diyos Ko", topic: "tula", ppt: PAH1 },
  { term: "Ang Pagpapaalam", def: "Tula ni Leona Florentino; malayang taludturan, 12 pantig; paghihiwalay ng minamahal", topic: "tula", ppt: PAH1 },
  { term: "Leona Florentino", def: "Ina ng Panitikang Kababaihan sa Pilipinas", topic: "tula", ppt: PAH1 },
  { term: "Malayang taludturan", def: "Anyo ng tulang Ang Pagpapaalam", topic: "tula", ppt: PAH1 },
  { term: "Carlos Romulo", def: "Heneral/Diplomatiko/mamamahayag; ipinanganak Enero 14, 1899 sa Camiling", topic: "tula", ppt: PAH1 },
  { term: "Voice of Freedom", def: "Akda ni Romulo, 1941", topic: "tula", ppt: PAH1 },
  { term: "Virginia Llamas / Beth Day Romulo", def: "Una at ikalawang asawa ni Romulo", topic: "tula", ppt: PAH1 },
  { term: "Pambansang Alagad ng Sining 1982", def: "Parangal kay Romulo sa Panitikan", topic: "tula", ppt: PAH1 },
  { term: "Enero 14, 1899", def: "Kapanganakan ni Romulo (Camiling)", topic: "tula", ppt: PAH1 },
  { term: "12 sukat vs 12 pantig", def: "Sukat ng Diyos Ko vs pantig ng Pagpapaalam", topic: "tula", ppt: PAH1 },
  { term: "Paksa ng dalawang tula", def: "Diyos (natatagpuan) vs paghihiwalay ng minamahal", topic: "tula", ppt: PAH1 },
  // ---- Topic 2: Manunulat (12) ----
  { term: "Juan Cabreros Laya", def: "Ipinanganak Hulyo 12, 1911; 7 pangunahing aklat", topic: "manunulat", ppt: PAH1 },
  { term: "Hulyo 12, 1911", def: "Kapanganakan ni Laya (San Miguel) + Juan Laya Day", topic: "manunulat", ppt: PAH1 },
  { term: "Silvina del Carmen", def: "Napakasal kay Juan Cabreros Laya", topic: "manunulat", ppt: PAH1 },
  { term: "His Native Soil", def: "Akda ni Laya, 1941; tungkol sa ibang bansa", topic: "manunulat", ppt: PAH1 },
  { term: "The Barangay", def: "Akda ni Laya, 1950; tungkol sa barangay", topic: "manunulat", ppt: PAH1 },
  { term: "Benjamin Pascual", def: "Bantog na manunulat; higit sa isang dosenang nobela at maikling kwento", topic: "manunulat", ppt: PAH1 },
  { term: "Enero 16, 1928", def: "Kapanganakan ni Pascual (Laoag City, Ilocos Norte)", topic: "manunulat", ppt: PAH1 },
  { term: "Erminda Besabe", def: "Asawa ni Benjamin Pascual", topic: "manunulat", ppt: PAH1 },
  { term: "Lalaki sa Dilim", def: "Akda ni Pascual (bar)", topic: "manunulat", ppt: PAH1 },
  { term: "Ang Kalupi", def: "Akda ni Pascual (pitaka)", topic: "manunulat", ppt: PAH1 },
  { term: "Bantog na manunulat sa Panitikan ng PH", def: "Tawag kay Benjamin Pascual", topic: "manunulat", ppt: PAH1 },
  { term: "7 pangunahing aklat", def: "Bilang ng aklat ni Laya", topic: "manunulat", ppt: PAH1 },
  // ---- Topic 3: Cordillera (18) ----
  { term: "Cordillera (cuerda)", def: "Espanyol na lubid o tanikala; sentro ng katutubong kultura", topic: "cordillera", ppt: PAH2 },
  { term: "Lumawig", def: "Culture hero sa Bontoc", topic: "cordillera", ppt: PAH2 },
  { term: "Oral Tradisyon (pasalindila)", def: "Pagkukwento, pag-awit, ritwal, salawikain, bugtong", topic: "cordillera", ppt: PAH2 },
  { term: "Ambag ng Kastila", def: "Relihiyon, ugnayan sa lowland, dokumentasyon (oral hindi napalitan)", topic: "cordillera", ppt: PAH2 },
  { term: "Hudhud Chants of the Ifugao", def: "UNESCO; epiko; inaawit ng matatandang babae", topic: "cordillera", ppt: PAH2 },
  { term: "3 okasyon ng Hudhud", def: "Pagtatanim, pag-aani ng palay, lamay o burol", topic: "cordillera", ppt: PAH2 },
  { term: "Ika-7 siglo", def: "Panahon ng Hudhud", topic: "cordillera", ppt: PAH2 },
  { term: "Ullalim", def: "Pasalitang tradisyon sa Kalinga; Banna o Dulliyaw", topic: "cordillera", ppt: PAH2 },
  { term: "Sinai C. Hamada", def: "Ibaloi-Jap heritage; short stories noong 1975", topic: "cordillera", ppt: PAH2 },
  { term: "Tanabata's Wife (2018)", def: "Japanese immigrant at babae sa Benguet (aesthetic influence)", topic: "cordillera", ppt: PAH2 },
  { term: "Japanese Occupation", def: "1942–1945", topic: "cordillera", ppt: PAH2 },
  { term: "Kiangan / Luis I. Pawid", def: "247 leaves", topic: "cordillera", ppt: PAH2 },
  { term: "Banna o Dulliyaw", def: "Mga bayani ng Ullalim", topic: "cordillera", ppt: PAH2 },
  { term: "Scott Magkachi Saboy", def: "Music tradition", topic: "cordillera", ppt: PAH2 },
  { term: "Bua School sa Benguet", def: "Amerikano; lumawak ang formal education", topic: "cordillera", ppt: PAH2 },
  { term: "1901–1906 / 1904–1940", def: "Formal educ. / Industrial School para sa girls", topic: "cordillera", ppt: PAH2 },
  { term: "Aesthetic influence", def: "Impluwensya ng Hapon sa panitikan", topic: "cordillera", ppt: PAH2 },
  { term: "Yaman ng Kordilyera quote", def: "Hindi nasusukat sa dami ng nakalimbag sa libro", topic: "cordillera", ppt: PAH2 },
  // ---- Topic 4: Karunungang Bayan (16) ----
  { term: "Ang Araw at Buwan", def: "Mitolohiya/alamat na isinulat ni Mabel Cook Cole", topic: "karunungan", ppt: PAH3 },
  { term: "Mabel Cook Cole", def: "Amerikanong antropolohista", topic: "karunungan", ppt: PAH3 },
  { term: "Oyovi / Uwawi", def: "Pagtatanim / pang-kultural (malabo sa notes)", topic: "karunungan", ppt: PAH3 },
  { term: "Hudhud ni Aliguyon", def: "Epiko ni Amador T. Daguio (Pre-World War II)", topic: "karunungan", ppt: PAH3 },
  { term: "Pumbakhayon", def: "Katunggali ni Aliguyon", topic: "karunungan", ppt: PAH3 },
  { term: "Amatalao / Pangaiwan", def: "Ama ni Aliguyon / Ama ni Pumbakhayon", topic: "karunungan", ppt: PAH3 },
  { term: "Dumalao / Dungunay", def: "Ina ni Aliguyon / Ina ni Pumbakhayon", topic: "karunungan", ppt: PAH3 },
  { term: "Bugan", def: "Kapatid ni Pumbakhayon", topic: "karunungan", ppt: PAH3 },
  { term: "Pamulinawen", def: "Folk song ng manliligaw; matigas na puso + tiyaga; Jose A. Bragado; oda", topic: "karunungan", ppt: PAH3 },
  { term: "Burburia / Burtia", def: "Bugtong: pahulaan na may doble o nakatagong kahulugan", topic: "karunungan", ppt: PAH3 },
  { term: "3 bugtong + sagot", def: "Prinsesa sa tasa (kasoy), matandang lalaki (pugita), langit sa itaas (niyog)", topic: "karunungan", ppt: PAH3 },
  { term: "Pagsasao", def: "Salawikain: butil ng karunungan mula sa matatanda", topic: "karunungan", ppt: PAH3 },
  { term: "Habang maiksi ang kumot...", def: "...matutong mamaluktot", topic: "karunungan", ppt: PAH3 },
  { term: "Arasaas", def: "Bulong: permiso o respeto sa di nakikita", topic: "karunungan", ppt: PAH3 },
  { term: "Bari, bari", def: "Halimbawa ng bulong", topic: "karunungan", ppt: PAH3 },
  { term: "Jose A. Bragado", def: "Nagsulat ng Pamulinawen", topic: "karunungan", ppt: PAH3 }
];
