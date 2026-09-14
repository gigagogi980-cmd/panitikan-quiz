/* Question bank - Tagalog lahat, galing sa notes-transcription.md */
const TOPICS = {
  tula: "Tula",
  manunulat: "Manunulat",
  cordillera: "Cordillera",
  karunungan: "Karunungang Bayan"
};

const QUESTION_BANK = [
  // ============ TULA ============
  { id: "t01", topic: "tula", type: "mc", q: "Sino ang may-akda ng tulang Ang Diyos Ko?", choices: ["Benigno Ramos", "Leona Florentino", "Carlos Romulo", "Amador T. Daguio"], answer: "Benigno Ramos", explain: "Ang Diyos Ko ay kay Benigno Ramos, dating politikal na lider." },
  { id: "t02", topic: "tula", type: "mc", q: "Ilang sukat mayroon ang tulang Ang Diyos Ko?", choices: ["12 sukat", "7 sukat", "Malayang taludturan", "12 pantig"], answer: "12 sukat", explain: "Ang Diyos Ko ay may 12 sukat." },
  { id: "t03", topic: "tula", type: "id", q: "Ano ang paksa ng tulang Ang Diyos Ko?", answers: ["kung saan natatagpuan ang diyos", "saan natatagpuan ang diyos", "pinagmulan ng diyos", "kinaroroonan ng diyos"], explain: "Patungkol ito sa kung saan natatagpuan ang Diyos." },
  { id: "t04", topic: "tula", type: "mc", q: "Sino ang may-akda ng Ang Pagpapaalam?", choices: ["Leona Florentino", "Benigno Ramos", "Virginia Llamas", "Beth Day Romulo"], answer: "Leona Florentino", explain: "Ang Pagpapaalam ay kay Leona Florentino." },
  { id: "t05", topic: "tula", type: "mc", q: "Ano ang tawag kay Leona Florentino?", choices: ["Ina ng Panitikang Kababaihan sa Pilipinas", "Pambansang Alagad ng Sining", "Culture hero sa Bontoc", "Ina ng Hudhud"], answer: "Ina ng Panitikang Kababaihan sa Pilipinas", explain: "Siya ang ina ng Panitikang Kababaihan sa Pilipinas." },
  { id: "t06", topic: "tula", type: "mc", q: "Anong anyo ang tulang Ang Pagpapaalam?", choices: ["Malayang taludturan", "12 sukat", "Epiko", "Oda"], answer: "Malayang taludturan", explain: "Ito ay malayang taludturan na may 12 pantig." },
  { id: "t07", topic: "tula", type: "id", q: "Ilang pantig mayroon ang tulang Ang Pagpapaalam?", answers: ["12", "12 pantig", "labindalawa", "labindalawang pantig"], explain: "May 12 pantig ito." },
  { id: "t08", topic: "tula", type: "id", q: "Sino ang Heneral at diplomatikong mamamahayag na ipinanganak noong Enero 14, 1899 sa Camiling?", answers: ["carlos romulo", "carlos p. romulo"], explain: "Si Carlos Romulo." },
  { id: "t09", topic: "tula", type: "mc", q: "Ano ang akda ni Carlos Romulo noong 1941?", choices: ["Voice of Freedom", "His Native Soil", "The Barangay", "Kiangan"], answer: "Voice of Freedom", explain: "Voice of Freedom, 1941." },
  { id: "t10", topic: "tula", type: "mc", q: "Kailan ginawaran si Carlos Romulo ng Pambansang Alagad ng Sining sa Panitikan?", choices: ["1982", "1941", "1975", "1950"], answer: "1982", explain: "1982, Pambansang Alagad ng Sining sa Panitikan." },
  { id: "t11", topic: "tula", type: "id", q: "Sino ang unang asawa ni Carlos Romulo?", answers: ["virginia llamas"], explain: "Virginia Llamas ang unang asawa, Beth Day Romulo ang ikalawa." },
  { id: "t12", topic: "tula", type: "enum", q: "Ibigay ang 2 tulang tinalakay: tungkol sa Diyos at tungkol sa paghihiwalay.", answers: ["Ang Diyos Ko", "Ang Pagpapaalam"], explain: "Ang Diyos Ko at Ang Pagpapaalam." },

  // ============ MANUNULAT ============
  { id: "m01", topic: "manunulat", type: "mc", q: "Kailan ipinanganak si Juan Cabreros Laya?", choices: ["Hulyo 12, 1911", "Enero 16, 1928", "Enero 14, 1899", "Hulyo 12, 1950"], answer: "Hulyo 12, 1911", explain: "Hulyo 12, 1911, San Miguel." },
  { id: "m02", topic: "manunulat", type: "mc", q: "Ano ang akda ni Juan Cabreros Laya noong 1941?", choices: ["His Native Soil", "The Barangay", "Lalaki sa Dilim", "Ang Kalupi"], answer: "His Native Soil", explain: "His Native Soil (1941) tungkol sa ibang bansa." },
  { id: "m03", topic: "manunulat", type: "mc", q: "Ano ang akda ni Juan Cabreros Laya noong 1950?", choices: ["The Barangay", "His Native Soil", "Voice of Freedom", "Tanabata's Wife"], answer: "The Barangay", explain: "The Barangay (1950) tungkol sa barangay." },
  { id: "m04", topic: "manunulat", type: "id", q: "Sino ang napakasal kay Juan Cabreros Laya?", answers: ["silvina del carmen", "silvina"], explain: "Silvina del Carmen." },
  { id: "m05", topic: "manunulat", type: "id", q: "Ilang pangunahing aklat ang isinulat ni Juan Cabreros Laya?", answers: ["7", "pito", "pitong aklat", "7 pangunahing aklat"], explain: "7 pangunahing aklat." },
  { id: "m06", topic: "manunulat", type: "mc", q: "Saan ipinanganak si Benjamin Pascual?", choices: ["Laoag City, Ilocos Norte", "Camiling", "San Miguel", "Benguet"], answer: "Laoag City, Ilocos Norte", explain: "Enero 16, 1928, Laoag City, Ilocos Norte." },
  { id: "m07", topic: "manunulat", type: "mc", q: "Ano ang tawag kay Benjamin Pascual?", choices: ["Bantog na manunulat sa Panitikan ng PH", "Ina ng Panitikang Kababaihan", "Culture hero sa Bontoc", "Pambansang Alagad ng Sining"], answer: "Bantog na manunulat sa Panitikan ng PH", explain: "Bantog na manunulat, higit sa isang dosenang nobela at maikling kwento." },
  { id: "m08", topic: "manunulat", type: "id", q: "Sino ang asawa ni Benjamin Pascual?", answers: ["erminda besabe"], explain: "Erminda Besabe." },
  { id: "m09", topic: "manunulat", type: "enum", q: "Ibigay ang 2 akda ni Benjamin Pascual: ang tungkol sa bar at pitaka.", answers: ["Lalaki sa Dilim", "Ang Kalupi"], explain: "Lalaki sa Dilim (bar) at Ang Kalupi (pitaka)." },
  { id: "m10", topic: "manunulat", type: "mc", q: "Alin ang HINDI akda ni Juan Cabreros Laya?", choices: ["Ang Kalupi", "His Native Soil", "The Barangay"], answer: "Ang Kalupi", explain: "Ang Kalupi ay kay Benjamin Pascual." },

  // ============ CORDILLERA ============
  { id: "c01", topic: "cordillera", type: "mc", q: "Saan mula ang salitang Cordillera?", choices: ["Cuerda na ang ibig sabihin ay lubid o tanikala", "Lumawig na culture hero", "Kiangan na bayan", "Ullalim na tradisyon"], answer: "Cuerda na ang ibig sabihin ay lubid o tanikala", explain: "Espanyol na cuerda = lubid o tanikala." },
  { id: "c02", topic: "cordillera", type: "id", q: "Sino ang culture hero sa Bontoc?", answers: ["lumawig"], explain: "Si Lumawig." },
  { id: "c03", topic: "cordillera", type: "mc", q: "Ano ang tawag sa tradisyong naipapasa sa pagkukwento, pag-awit, ritwal, salawikain at bugtong?", choices: ["Oral Tradisyon (pasalindila)", "Dokumentasyon", "Formal education", "Aesthetic influence"], answer: "Oral Tradisyon (pasalindila)", explain: "Oral tradisyon o pasalindila." },
  { id: "c04", topic: "cordillera", type: "mc", q: "Alin ang kinilala ng UNESCO na mahabang tulang pasalaysay ng mga Ifugao?", choices: ["Hudhud Chants of the Ifugao", "Ullalim", "Pamulinawen", "Kiangan"], answer: "Hudhud Chants of the Ifugao", explain: "Hudhud Chants of the Ifugao." },
  { id: "c05", topic: "cordillera", type: "enum", q: "Ibigay ang 3 okasyon ng pag-awit ng Hudhud.", answers: ["Pagtatanim ng palay", "Pag-aani ng palay", "Lamay o burol"], explain: "Pagtatanim, pag-aani, at lamay o burol. Inaawit ng matatandang babae." },
  { id: "c06", topic: "cordillera", type: "id", q: "Sino ang karaniwang umaawit ng Hudhud?", answers: ["matatandang babae", "matatanda", "babae", "nakatatandang babae"], explain: "Matatandang babae." },
  { id: "c07", topic: "cordillera", type: "mc", q: "Ano ang naging ambag ng mga Amerikano sa Cordillera?", choices: ["Lumawak ang formal education", "Relihiyon", "Aesthetic influence", "Dokumentasyon"], answer: "Lumawak ang formal education", explain: "Lumawak ang formal education, hal. Bua School sa Benguet." },
  { id: "c08", topic: "cordillera", type: "mc", q: "Sino ang manunulat na may Ibaloi-Jap heritage na nagsulat ng short stories noong 1975?", choices: ["Sinai C. Hamada", "Luis I. Pawid", "Scott Magkachi Saboy", "Amador T. Daguio"], answer: "Sinai C. Hamada", explain: "Sinai C. Hamada." },
  { id: "c09", topic: "cordillera", type: "mc", q: "Ano ang impluwensya ng mga Hapon sa panitikan?", choices: ["Aesthetic influence", "Formal education", "Relihiyon", "Oral tradisyon"], answer: "Aesthetic influence", explain: "Aesthetic influence, hal. Tanabata's Wife (2018)." },
  { id: "c10", topic: "cordillera", type: "id", q: "Ano ang pelikula noong 2018 tungkol sa Japanese immigrant at babae sa Benguet?", answers: ["tanabata's wife", "tanabatas wife", "tanabata"], explain: "Tanabata's Wife." },
  { id: "c11", topic: "cordillera", type: "id", q: "Kailan naganap ang Japanese Occupation sa Pilipinas?", answers: ["1942-1945", "1942 hanggang 1945"], explain: "1942-1945." },
  { id: "c12", topic: "cordillera", type: "mc", q: "Sino ang may-akda ng Kiangan na may 247 leaves?", choices: ["Luis I. Pawid", "Sinai C. Hamada", "Mabel Cook Cole", "Jose A. Bragado"], answer: "Luis I. Pawid", explain: "Kiangan ni Luis I. Pawid." },
  { id: "c13", topic: "cordillera", type: "mc", q: "Ano ang Ullalim?", choices: ["Pasalitang tradisyon sa Kalinga tungkol sa bayani", "Epiko ng Ifugao", "Awit ng pagliligaw", "Sayaw ng Benguet"], answer: "Pasalitang tradisyon sa Kalinga tungkol sa bayani", explain: "Salaysay tungkol sa bayaning tulad nina Banna o Dulliyaw." },
  { id: "c14", topic: "cordillera", type: "enum", q: "Ibigay ang 2 bayani sa Ullalim.", answers: ["Banna", "Dulliyaw"], explain: "Sina Banna at Dulliyaw." },
  { id: "c15", topic: "cordillera", type: "id", q: "Sino ang kilala sa music tradition ng Cordillera ayon sa notes?", answers: ["scott magkachi saboy", "saboy", "magkachi"], explain: "Scott Magkachi Saboy." },

  // ============ KARUNUNGANG BAYAN ============
  { id: "k01", topic: "karunungan", type: "mc", q: "Sino ang Amerikanong antropolohista na nagsulat ng Ang Araw at Buwan?", choices: ["Mabel Cook Cole", "Sinai C. Hamada", "Amador T. Daguio", "Jose A. Bragado"], answer: "Mabel Cook Cole", explain: "Mabel Cook Cole, mitolohiya / alamat." },
  { id: "k02", topic: "karunungan", type: "mc", q: "Sino ang may-akda ng Hudhud ni Aliguyon?", choices: ["Amador T. Daguio", "Jose A. Bragado", "Mabel Cook Cole", "Luis I. Pawid"], answer: "Amador T. Daguio", explain: "Amador T. Daguio, manunulat noong Pre-World War II." },
  { id: "k03", topic: "karunungan", type: "mc", q: "Anong anyo ang Hudhud ni Aliguyon?", choices: ["Epiko", "Oda", "Bugtong", "Bulong"], answer: "Epiko", explain: "Ito ay epiko." },
  { id: "k04", topic: "karunungan", type: "id", q: "Sino ang katunggali ni Aliguyon?", answers: ["pumbakhayon", "pumbak hayon"], explain: "Si Pumbakhayon." },
  { id: "k05", topic: "karunungan", type: "enum", q: "Ibigay ang ama ni Aliguyon at ama ni Pumbakhayon.", answers: ["Amatalao", "Pangaiwan"], explain: "Amatalao (ama ni Aliguyon), Pangaiwan (ama ni Pumbakhayon)." },
  { id: "k06", topic: "karunungan", type: "enum", q: "Ibigay ang ina ni Aliguyon at ina ni Pumbakhayon.", answers: ["Dumalao", "Dungunay"], explain: "Dumalao (ina ni Aliguyon), Dungunay (ina ni Pumbakhayon)." },
  { id: "k07", topic: "karunungan", type: "id", q: "Sino ang kapatid ni Pumbakhayon?", answers: ["bugan"], explain: "Si Bugan." },
  { id: "k08", topic: "karunungan", type: "mc", q: "Ano ang Pamulinawen?", choices: ["Tradisyunal na katutubong awit (folk song)", "Epiko", "Bugtong", "Salawikain"], answer: "Tradisyunal na katutubong awit (folk song)", explain: "Awit ng manliligaw na nagsusumamo sa dalagang matigas ang puso." },
  { id: "k09", topic: "karunungan", type: "id", q: "Sino ang nagsulat ng Pamulinawen?", answers: ["jose a. bragado", "jose bragado", "bragado"], explain: "Jose A. Bragado. Ito ay oda." },
  { id: "k10", topic: "karunungan", type: "mc", q: "Ano ang Burburia o Burtia?", choices: ["Bugtong - pahulaan na may doble o nakatagong kahulugan", "Salawikain - butil ng karunungan", "Bulong - permiso sa di nakikita", "Epiko - mahabang salaysay"], answer: "Bugtong - pahulaan na may doble o nakatagong kahulugan", explain: "Bugtong ito." },
  { id: "k11", topic: "karunungan", type: "mc", q: "Ano ang Pagsasao?", choices: ["Salawikain - butil ng karunungan hango sa karanasan ng matatanda", "Bugtong - pahulaan", "Bulong - permiso", "Oda - awit"], answer: "Salawikain - butil ng karunungan hango sa karanasan ng matatanda", explain: "Hal: Habang maiksi ang kumot, matutong mamaluktot." },
  { id: "k12", topic: "karunungan", type: "mc", q: "Ano ang Arasaas?", choices: ["Bulong - permiso o respeto sa di nakikita", "Bugtong - pahulaan", "Salawikain - karunungan", "Alamat - pinagmulan"], answer: "Bulong - permiso o respeto sa di nakikita", explain: "Hal: bari, bari." },
  { id: "k13", topic: "karunungan", type: "id", q: "Kumpletuhin ang salawikain: Habang maiksi ang kumot, ____.", answers: ["matutong mamaluktot"], explain: "Habang maiksi ang kumot, matutong mamaluktot." }
];
