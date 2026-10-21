import type { Icon } from "@phosphor-icons/react";
import {
  AnchorIcon,
  ArrowsClockwiseIcon,
  CalendarCheckIcon,
  CheckCircleIcon,
  ClipboardTextIcon,
  CloudRainIcon,
  DoorIcon,
  DropIcon,
  FeatherIcon,
  FrameCornersIcon,
  HourglassIcon,
  HouseIcon,
  HouseLineIcon,
  LeafIcon,
  LightningIcon,
  LockIcon,
  MagnifyingGlassIcon,
  PaletteIcon,
  PiggyBankIcon,
  PuzzlePieceIcon,
  RulerIcon,
  ShieldCheckIcon,
  ShieldIcon,
  SnowflakeIcon,
  SparkleIcon,
  StackIcon,
  SunIcon,
  ThermometerIcon,
  TimerIcon,
  TreeIcon,
  UmbrellaIcon,
  WarningIcon,
  WindIcon,
  WrenchIcon,
} from "@phosphor-icons/react/ssr";

/* ============================================================
   TÍPUSOK
   ============================================================ */

export interface ImageData {
  /** Kép elérési útja, pl. "/images/services/ereszcsatorna.webp" – később töltendő */
  src: string;
  /** Alt szöveg: SEO + akadálymentesség, akkor is számít, ha még nincs kép */
  alt: string;
}

export interface Benefit {
  title: string;
  desc: string;
  icon: Icon;
}

export interface ProcessStep {
  title: string;
  desc: string;
}

export interface Material {
  id: string;
  name: string;
  desc: string;
  img: ImageData;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ServiceSeo {
  /** <title> – max. ~60 karakter */
  metaTitle: string;
  /** meta description – max. ~155 karakter */
  metaDescription: string;
  keywords: string[];
}

export interface Service {
  /** URL: /szolgaltatasok/[slug] */
  slug: string;
  title: string;
  /** Kártyára: 1–2 mondat */
  shortDesc: string;
  /** Részletes oldalra: bekezdésenként egy elem */
  desc: string[];
  img: ImageData;
  benefits: Benefit[];
  process: ProcessStep[];
  materials: Material[];
  faq: Faq[];
  seo: ServiceSeo;
}

/* ============================================================
   ANYAGOK – egyszer definiálva, a szolgáltatások hivatkoznak rájuk
   ============================================================ */

export const MATERIALS = {
  horganyzott: {
    id: "horganyzott-acel",
    name: "Horganyzott acéllemez",
    desc: "Cinkréteggel védett acél. Kedvező árú, megbízható alapanyag ereszcsatornához, szegélyekhez és fedésekhez.",
    img: {
      src: "/materials/horganyzott-acel.webp",
      alt: "Horganyzott acél bádoglemez",
    },
  },
  szinesAcel: {
    id: "szines-bevonatos-acel",
    name: "Színes bevonatos acéllemez",
    desc: "Horganyzott acél gyári színes bevonattal, például antracit, csokibarna, vörösbarna vagy fehér színben. Nem kell festeni, és a tetőhöz, nyílászárókhoz igazítható.",
    img: {
      src: "/materials/szines-bevonatos-acel.webp",
      alt: "Színes bevonatos acél bádoglemez téglavörös színben",
    },
  },
  aluminium: {
    id: "aluminium",
    name: "Alumínium",
    desc: "Könnyű, nem rozsdásodó anyag, színes bevonattal is elérhető. Különösen ablakpárkányokhoz és szegélyekhez kedvelt.",
    img: {
      src: "/materials/aluminium.webp",
      alt: "Szálcsiszolt natúr alumínium lemez",
    },
  },
  titancink: {
    id: "titancink",
    name: "Titáncink",
    desc: "Cink alapú ötvözet réz- és titántartalommal. Idővel természetes, matt szürke patinát kap, rendkívül hosszú élettartamú, és alig igényel karbantartást.",
    img: {
      src: "/materials/titancink.webp",
      alt: "Titáncink lemez matt szürke patinával",
    },
  },
  rez: {
    id: "vorosrez",
    name: "Vörösréz",
    desc: "Prémium bádogos anyag, amely az évek során barnás, majd zöldes patinát kap. Különösen tartós, igényes lakóházakon és műemlék épületeken is alkalmazzák.",
    img: { src: "/materials/vorosrez.webp", alt: "Fényes vörösréz bádoglemez" },
  },
  trapezlemez: {
    id: "trapezlemez",
    name: "Trapézlemez",
    desc: "Trapéz keresztmetszetű, bordázott acéllemez. Nagy felületet fed gyorsan, ezért garázsokon, gazdasági és ipari épületeken népszerű.",
    img: {
      src: "/materials/trapezlemez.webp",
      alt: "Antracit színű bevonatos trapézlemez",
    },
  },
  cserepeslemez: {
    id: "cserepeslemez",
    name: "Cserepes lemez",
    desc: "Cserépfedést formázó profilú acéllemez. A cserép megjelenését adja, de annak töredéke a súlya, így könnyebb tetőszerkezet is elbírja.",
    img: {
      src: "/materials/cserepeslemez.webp",
      alt: "Csokibarna cserepes lemez cserépsorokat formázó profillal",
    },
  },
  hofogo: {
    id: "hofogo-elemek",
    name: "Hófogó rácsok és csövek",
    desc: "Acél hófogó elemek a tetőfedés típusához illő tartókkal, a fedés színéhez igazítva.",
    img: {
      src: "/materials/hofogo-elemek.webp",
      alt: "Barna csöves hófogó tartókonzolokkal",
    },
  },
  lombfogo: {
    id: "lombfogo",
    name: "Lombfogó rács és kosár",
    desc: "A csatornára vagy a vízgyűjtő üstbe helyezett rács, amely kiszűri a falevelet és a nagyobb hordalékot.",
    img: {
      src: "/materials/lombfogo.webp",
      alt: "Lombfogó rács ereszcsatornán",
    },
  },
  tomito: {
    id: "tomito-szegelyszalag",
    name: "Tömítőanyagok és szegélyszalagok",
    desc: "Időjárásálló tömítők és hajlítható szegélyszalagok a csatlakozások, toldások vízzáró lezárásához.",
    img: {
      src: "/materials/tomito-szegelyszalag.webp",
      alt: "Bádogos tömítőanyag és szegélyszalag",
    },
  },
} satisfies Record<string, Material>;

/* ============================================================
   SZOLGÁLTATÁSOK
   ============================================================ */

export const services: Service[] = [
  /* ---------- 1. Ereszcsatorna-szerelés ---------- */
  {
    slug: "ereszcsatorna-szereles",
    title: "Ereszcsatorna-szerelés",
    shortDesc:
      "Új függő és fekvő ereszcsatorna-rendszer szerelése családi házakra, új építéshez és felújításhoz, a tetőhöz illő anyagból és színben.",
    desc: [
      "Az ereszcsatorna a tetőről lefolyó csapadékvizet gyűjti össze, és a lefolyócsöveken keresztül elvezeti a háztól. Ha hiányzik vagy rosszul működik, a víz a homlokzatra, a lábazatra és az alapozás mellé folyik, ami idővel vizesedést, vakolatleválást és penészedést okoz.",
      "Kaposváron és környékén új építésnél és felújításnál egyaránt vállaljuk teljes ereszcsatorna-rendszerek kiépítését. Függő csatornát szerelünk az eresz alá, és fekvő (párkány-) csatornát ott, ahol a homlokzathoz rejtettebb megoldás illik. A csatorna méretét a tetőfelülethez, a tartók osztását a várható hóterheléshez igazítjuk.",
      "A csatornát egyenletes lejtéssel szereljük a vízgyűjtő üstök felé, hogy ne álljon meg benne a víz. Horganyzott, színes bevonatos acél, alumínium, titáncink és vörösréz rendszerek közül választhat, így a csatorna a tetőfedéshez és a nyílászárókhoz is illeszkedik.",
    ],
    img: {
      src: "/service-images/eresz.svg",
      alt: "Antracit színű függő ereszcsatorna családi házon, Kaposvár",
    },
    benefits: [
      {
        title: "Védett homlokzat",
        desc: "A víz nem folyik végig a falon, így a vakolat és a festés hosszú évekig ép marad.",
        icon: HouseLineIcon,
      },
      {
        title: "Száraz lábazat és alapozás",
        desc: "Az elvezetett csapadék nem áztatja a fal tövét, ezzel megelőzhető a lábazat vizesedése és a pince beázása.",
        icon: DropIcon,
      },
      {
        title: "Hosszú élettartam",
        desc: "Minőségi anyagból, szakszerű lejtéssel és tartóosztással szerelve a rendszer évtizedekig, kevés karbantartással működik.",
        icon: ShieldCheckIcon,
      },
      {
        title: "Az épülethez illő megjelenés",
        desc: "A csatorna színe és anyaga a tetőhöz és a nyílászárókhoz igazítható, így a ház összképét is javítja.",
        icon: PaletteIcon,
      },
    ],
    process: [
      {
        title: "Helyszíni felmérés",
        desc: "Megnézzük a tetőt, lemérjük az eresz hosszát, és kijelöljük a lefolyók helyét.",
      },
      {
        title: "Méretezés és anyagválasztás",
        desc: "A tetőfelület alapján meghatározzuk a csatorna méretét és a lefolyók számát, majd együtt kiválasztjuk az anyagot és a színt.",
      },
      {
        title: "Tartók és csatorna szerelése",
        desc: "A tartókat lejtésre állítjuk, felszereljük a csatornát, és vízzáróan lezárjuk a toldásokat és a végelzárókat.",
      },
      {
        title: "Lefolyók bekötése és vízpróba",
        desc: "Bekötjük a lefolyócsöveket, majd vízpróbával ellenőrizzük, hogy a víz akadálytalanul távozik.",
      },
    ],
    materials: [
      MATERIALS.horganyzott,
      MATERIALS.szinesAcel,
      MATERIALS.aluminium,
      MATERIALS.titancink,
      MATERIALS.rez,
    ],
    faq: [
      {
        question: "Függő vagy fekvő ereszcsatornát válasszak?",
        answer:
          "A függő csatorna az eresz alatt, tartókon lóg. Ez a legelterjedtebb, könnyen tisztítható és javítható megoldás. A fekvő (párkány-) csatorna a tetőn vagy a párkányon fekszik, ezért kevésbé látszik, de pontosabb kivitelezést igényel. Felméréskor megmutatjuk, melyik illik jobban az épülethez.",
      },
      {
        question: "Mennyi idő alatt készül el egy családi ház ereszcsatornája?",
        answer:
          "Egy átlagos családi háznál a szerelés jellemzően egy-két nap, ha az anyag rendelkezésre áll. A pontos időt a tető mérete, a lefolyók száma és az időjárás befolyásolja.",
      },
    ],
    seo: {
      metaTitle: "Ereszcsatorna-szerelés Kaposvár | Bádogos mester",
      metaDescription:
        "Függő és fekvő ereszcsatorna szerelése Kaposváron és környékén. Horganyzott, színes, titáncink és réz rendszerek, szakszerű lejtéssel.",
      keywords: [
        "ereszcsatorna szerelés",
        "ereszcsatorna Kaposvár",
        "függő ereszcsatorna",
        "fekvő ereszcsatorna",
        "bádogos Kaposvár",
      ],
    },
  },

  /* ---------- 2. Ereszcsatorna-javítás ---------- */
  {
    slug: "ereszcsatorna-javitas",
    title: "Ereszcsatorna-javítás",
    shortDesc:
      "Szivárgó toldások, lyukadt vagy elhajlott csatornák és megereszkedett tartók javítása, hogy a víz újra oda folyjon, ahová kell.",
    desc: [
      "Az ereszcsatorna hibái ritkán jelentkeznek egyik napról a másikra. Csöpögés a toldásoknál, a csatorna szélén átbukó víz, sötét csíkok a homlokzaton vagy elhajlott tartók – ezek mind azt jelzik, hogy a rendszer már nem vezeti el rendesen a csapadékot.",
      "A javítás során felkutatjuk a hiba okát, és csak azt cseréljük, amit valóban szükséges. Újratömítjük a szivárgó toldásokat, kicseréljük a sérült szakaszokat, utánállítjuk a megereszkedett tartókat, és visszaállítjuk a csatorna helyes lejtését, hogy ne álljon meg benne a víz.",
      "Ha a csatorna már annyira elhasználódott, hogy a javítás nem éri meg, ezt őszintén megmondjuk, és ajánlatot adunk a cseréjére. Kaposváron és környékén rövid határidővel vállaljuk a javítást, mert egy kis szivárgás is komoly falkárt okozhat, ha hónapokig marad.",
    ],
    img: {
      src: "/service-images/eresz.svg",
      alt: "Ereszcsatorna toldásának javítása bádogos által",
    },
    benefits: [
      {
        title: "Megelőzi a nagyobb kárt",
        desc: "Egy szivárgó toldásból évek alatt falvizesedés, vakolatleválás és penész lesz. A korai javítás ennek töredékébe kerül.",
        icon: WarningIcon,
      },
      {
        title: "Költséghatékony",
        desc: "Csak a hibás elemeket cseréljük, a még ép rendszert megtartjuk.",
        icon: PiggyBankIcon,
      },
      {
        title: "Gyors megoldás",
        desc: "A legtöbb javítás néhány óra alatt elvégezhető, bontás és felfordulás nélkül.",
        icon: TimerIcon,
      },
      {
        title: "Újra működő vízelvezetés",
        desc: "A helyes lejtés visszaállításával a víz nem áll meg a csatornában, és nem bukik át a szélén.",
        icon: CheckCircleIcon,
      },
    ],
    process: [
      {
        title: "Hibafeltárás",
        desc: "Átvizsgáljuk a csatornát, a toldásokat, a tartókat és a lefolyókat, és megkeressük a szivárgás valódi okát.",
      },
      {
        title: "Javítási javaslat",
        desc: "Elmondjuk, mi javítható és mi szorul cserére, és erre adunk árajánlatot.",
      },
      {
        title: "Javítás",
        desc: "Tömítjük a toldásokat, cseréljük a sérült szakaszokat, utánállítjuk a tartókat és a lejtést.",
      },
      {
        title: "Vízpróba",
        desc: "Vízzel ellenőrizzük, hogy a csatorna szivárgásmentes, és a víz a lefolyók felé távozik.",
      },
    ],
    materials: [MATERIALS.horganyzott, MATERIALS.szinesAcel, MATERIALS.tomito],
    faq: [
      {
        question: "Megéri javítani az ereszcsatornát, vagy cserélni kell?",
        answer:
          "Ha a csatorna anyaga ép, és csak a toldások, tartók vagy egy-egy szakasz hibásak, a javítás gazdaságos. Ha a lemez több helyen átrozsdásodott vagy elvékonyodott, a csere hosszabb távon olcsóbb. Ezt a felméréskor egyértelműen megmondjuk.",
      },
      {
        question: "Miért áll meg a víz az ereszcsatornában?",
        answer:
          "Leggyakrabban azért, mert a tartók megereszkedtek, és a csatorna elvesztette a lejtését, vagy mert a lefolyó eldugult. Mindkettő javítható a csatorna cseréje nélkül.",
      },
    ],
    seo: {
      metaTitle: "Ereszcsatorna-javítás Kaposvár | Gyors bádogos javítás",
      metaDescription:
        "Szivárgó, lyukadt vagy elhajlott ereszcsatorna javítása Kaposváron és környékén. Toldások tömítése, tartók és lejtés helyreállítása.",
      keywords: [
        "ereszcsatorna javítás",
        "szivárgó ereszcsatorna",
        "ereszcsatorna tömítés",
        "csatorna javítás Kaposvár",
      ],
    },
  },

  /* ---------- 3. Ereszcsatorna-tisztítás és lombfogó ---------- */
  {
    slug: "ereszcsatorna-tisztitas",
    title: "Ereszcsatorna-tisztítás és lombfogó",
    shortDesc:
      "Falevél, moha és hordalék eltávolítása a csatornából és a lefolyókból, lombfogó felszerelésével, hogy ne dugulhasson el újra.",
    desc: [
      "A fák közelében álló házaknál az ereszcsatorna ősszel hetek alatt megtelhet falevéllel, tűlevéllel és hordalékkal. Az eldugult csatornából a víz átbukik a homlokzatra, télen pedig megfagy, és a jég súlya elhajlíthatja vagy le is szakíthatja a tartókat.",
      "A tisztítás során kézzel eltávolítjuk a lerakódást a csatornából, átmossuk a lefolyócsöveket, és közben átvizsgáljuk a rendszert. Ha laza tartót, szivárgó toldást vagy sérült szakaszt találunk, jelezzük, és ha kéri, helyben javítjuk.",
      "A visszatérő dugulás ellen lombfogó rácsot vagy a vízgyűjtő üstökbe helyezett lombfogó kosarat ajánlunk. Ez nem váltja ki teljesen a tisztítást, de jelentősen ritkítja, és megakadályozza, hogy a lefolyócsőbe jusson a falevél.",
    ],
    img: {
      src: "/service-images/eresz.svg",
      alt: "Falevéllel eltömődött ereszcsatorna tisztítása",
    },
    benefits: [
      {
        title: "Nincs túlcsorduló víz",
        desc: "A tiszta csatorna nagy esőben is elvezeti a vizet, nem bukik át a homlokzatra.",
        icon: CloudRainIcon,
      },
      {
        title: "Védelem a fagykár ellen",
        desc: "A csatornában álló víz télen megfagy, és szétfeszítheti a toldásokat. A tisztítás ezt előzi meg.",
        icon: SnowflakeIcon,
      },
      {
        title: "Ritkább dugulás",
        desc: "A lombfogóval a falevél nem jut a csatornába és a lefolyóba, így jóval ritkábban kell tisztítani.",
        icon: LeafIcon,
      },
      {
        title: "Állapotfelmérés egyben",
        desc: "Tisztítás közben átnézzük a teljes rendszert, így a kis hibák időben kiderülnek.",
        icon: MagnifyingGlassIcon,
      },
    ],
    process: [
      {
        title: "Csatorna tisztítása",
        desc: "Eltávolítjuk a falevelet, mohát és hordalékot a teljes csatornahosszon.",
      },
      {
        title: "Lefolyók átmosása",
        desc: "Átmossuk a lefolyócsöveket, és megszüntetjük a dugulásokat.",
      },
      {
        title: "Átvizsgálás",
        desc: "Ellenőrizzük a tartókat, toldásokat és a lejtést, és jelezzük, ha javítás szükséges.",
      },
      {
        title: "Lombfogó felszerelése",
        desc: "Igény szerint lombfogó rácsot vagy kosarat szerelünk a csatornára és az üstökbe.",
      },
    ],
    materials: [MATERIALS.lombfogo],
    faq: [
      {
        question: "Milyen gyakran kell tisztítani az ereszcsatornát?",
        answer:
          "Évente legalább egyszer, késő ősszel a lombhullás után. Ha a ház közvetlenül fák mellett áll, tavasszal is érdemes, mert a virágzás és a termések is eltömíthetik a csatornát.",
      },
      {
        question: "Kiváltja a lombfogó a tisztítást?",
        answer:
          "Teljesen nem, mert a finom hordalék és a moha a rácson is átjut. A lombfogó viszont a nagyobb leveleket kiszűri, így a tisztítás ritkábban szükséges, és a lefolyócső sem dugul el.",
      },
    ],
    seo: {
      metaTitle: "Ereszcsatorna-tisztítás és lombfogó Kaposvár",
      metaDescription:
        "Ereszcsatorna és lefolyók tisztítása Kaposváron és környékén, lombfogó felszerelésével. Előzze meg a túlcsordulást és a fagykárt.",
      keywords: [
        "ereszcsatorna tisztítás",
        "lombfogó",
        "eldugult ereszcsatorna",
        "csatornatisztítás Kaposvár",
      ],
    },
  },

  /* ---------- 4. Lefolyócső ---------- */
  {
    slug: "lefolyocso-szereles",
    title: "Lefolyócső-szerelés és -csere",
    shortDesc:
      "Lefolyócsövek, vízgyűjtő üstök és könyökök szerelése és cseréje, stabil rögzítéssel és szakszerű alsó kifolyóval.",
    desc: [
      "A lefolyócső (ejtőcső) vezeti le a vizet az ereszcsatornából a talajszintre vagy a csapadékvíz-elvezető rendszerbe. Ha elmozdul, eldugul vagy rosszul van kialakítva az alja, a víz pont oda kerül, ahová a legkevésbé szeretnénk: a fal tövébe.",
      "Gyakori hiba a kilazult bilincs, a szétcsúszott könyök, az eldugult vízgyűjtő üst, vagy az, hogy a cső közvetlenül a lábazat mellé ürít. A szerelés során a vízgyűjtő üsttől a könyökön át az alsó kifolyóig az egész szakaszt rendbe tesszük, és a csövet a falhoz rögzítő bilincsekkel stabilan felfogatjuk.",
      "Az alsó végen a helyi adottságokhoz igazítjuk a kialakítást: kifolyóval a talajra, esővízgyűjtő tartályba vagy a csapadékvíz-elvezetésbe kötve. A cső anyagát és színét a csatornához választjuk, hogy egységes legyen a rendszer.",
    ],
    img: {
      src: "/service-images/eresz.svg",
      alt: "Lefolyócső vízgyűjtő üsttel és bilincsekkel házfalon",
    },
    benefits: [
      {
        title: "Víz távol az alaptól",
        desc: "A jól kialakított alsó kifolyó elvezeti a vizet a fal tövétől, így nem ázik a lábazat és az alapozás.",
        icon: DropIcon,
      },
      {
        title: "Stabil rögzítés",
        desc: "A falhoz rögzített bilincsek miatt a cső szélviharban sem mozdul el és nem csörög.",
        icon: AnchorIcon,
      },
      {
        title: "Dugulásmentes működés",
        desc: "A megfelelő üst és könyök kialakítással a hordalék nem akad meg a csőben.",
        icon: CheckCircleIcon,
      },
      {
        title: "Egységes megjelenés",
        desc: "A cső anyaga és színe a csatornához illik, így a rendszer egységes képet ad.",
        icon: PaletteIcon,
      },
    ],
    process: [
      {
        title: "Felmérés",
        desc: "Megnézzük a csatorna kifolyóit, a falat és azt, hová vezethető el a víz.",
      },
      {
        title: "Nyomvonal kijelölése",
        desc: "Meghatározzuk a cső helyét, a könyökök és a bilincsek pozícióját.",
      },
      {
        title: "Szerelés",
        desc: "Felszereljük az üstöt, a könyököket és a csövet, majd a bilincsekkel a falhoz rögzítjük.",
      },
      {
        title: "Vízpróba",
        desc: "Ellenőrizzük, hogy a víz akadálytalanul lefolyik, és a kifolyó a helyén van.",
      },
    ],
    materials: [
      MATERIALS.horganyzott,
      MATERIALS.szinesAcel,
      MATERIALS.titancink,
      MATERIALS.rez,
    ],
    faq: [
      {
        question: "Hová vezessem a lefolyócsőből kifolyó vizet?",
        answer:
          "A talajra kifolyóval, a faltól távolabb, esővízgyűjtő tartályba, szikkasztóba vagy a csapadékvíz-elvezető rendszerbe. A megfelelő megoldás a telek adottságaitól és a helyi előírásoktól függ, ezt felméréskor egyeztetjük.",
      },
      {
        question: "Mitől dugul el a lefolyócső?",
        answer:
          "Leggyakrabban a csatornából bemosott falevéltől és hordaléktól, főleg a könyököknél. Lombfogó kosárral a vízgyűjtő üstben ez jól megelőzhető.",
      },
    ],
    seo: {
      metaTitle: "Lefolyócső-szerelés és csere Kaposvár | Bádogos",
      metaDescription:
        "Lefolyócső, vízgyűjtő üst és könyök szerelése, cseréje Kaposváron és környékén. Stabil rögzítés, a csatornához illő anyag és szín.",
      keywords: [
        "lefolyócső szerelés",
        "lefolyócső csere",
        "ejtőcső",
        "vízgyűjtő üst",
        "bádogos Kaposvár",
      ],
    },
  },

  /* ---------- 5. Kéményszegély ---------- */
  {
    slug: "kemenyszegely",
    title: "Kéményszegély és kéménybádogozás",
    shortDesc:
      "Vízzáró bádog szegély a kémény körül – a tetőbeázások egyik leggyakoribb okának végleges megszüntetése.",
    desc: [
      "A kémény és a tetősík találkozása a tető egyik legkritikusabb pontja. A két szerkezet eltérően mozog és tágul, a csatlakozásnál pedig nagy mennyiségű víz halad el. Ha itt nincs szakszerű bádogszegély, a víz a tetőtérbe és a födémbe szivárog, gyakran úgy, hogy a folt máshol jelenik meg.",
      "A szakszerű kéményszegély több részből áll: alul a vizet a fedésre vezető homlokszegély, oldalt a tetősíkhoz illeszkedő oldalszegélyek, felül pedig a vizet a kémény két oldala felé terelő szegély. A felső szélét a kémény falába vágott horonyba fordítjuk, vagy takarószegéllyel fedjük, így a víz nem tud a szegély mögé jutni.",
      "Régi, kitöredezett vagy csak szilikonnal javított kéményszegélyeknél elbontjuk a sérült részt, és méretre hajlított új szegélyt készítünk. Kaposváron és környékén a beázási panaszok jelentős része erre a pontra vezethető vissza, ezért felméréskor mindig ezt nézzük meg elsőként.",
    ],
    img: {
      src: "/service-images/kemeny.svg",
      alt: "Bádog kéményszegély cseréptetőn",
    },
    benefits: [
      {
        title: "Megszűnő beázás",
        desc: "A szakszerű szegély megszünteti a kémény melletti beázást, és nem csak átmenetileg tünteti el.",
        icon: UmbrellaIcon,
      },
      {
        title: "Védett födém és tetőtér",
        desc: "A padlás, a födém és a tetőszerkezet faanyaga nem kap vizet, így nem korhad és nem penészedik.",
        icon: HouseIcon,
      },
      {
        title: "Tartós vízzárás",
        desc: "A bádogszegély évtizedekig zár, szemben a szilikonos javítással, amely néhány év alatt elöregszik.",
        icon: ShieldCheckIcon,
      },
      {
        title: "Bírja a hőmozgást",
        desc: "A szegély úgy készül, hogy a kémény és a tető eltérő mozgását repedés nélkül kövesse.",
        icon: ThermometerIcon,
      },
    ],
    process: [
      {
        title: "Feltárás",
        desc: "Átvizsgáljuk a kémény környezetét, és megkeressük, hol jut be a víz.",
      },
      {
        title: "Régi szegély bontása",
        desc: "Eltávolítjuk a sérült vagy elöregedett szegélyt és a régi tömítést.",
      },
      {
        title: "Méretre hajlítás",
        desc: "A kémény pontos méretei alapján elkészítjük a homlok-, oldal- és felső szegélyeket.",
      },
      {
        title: "Beépítés és lezárás",
        desc: "Beépítjük a szegélyt, a felső szélét horonyba fordítjuk vagy takarószegéllyel zárjuk, majd ellenőrizzük a vízzárást.",
      },
    ],
    materials: [
      MATERIALS.szinesAcel,
      MATERIALS.aluminium,
      MATERIALS.titancink,
      MATERIALS.rez,
      MATERIALS.tomito,
    ],
    faq: [
      {
        question: "Honnan tudom, hogy a kémény mellett ázik be a tető?",
        answer:
          "Jellemző jel a kémény körüli nedves folt a padláson vagy a mennyezeten, a kéményen lefutó vizes csík, vagy a beázás, ami főleg ferde, szeles esőnél jelentkezik. Mivel a víz a szerkezetben vándorolhat, a pontos helyet helyszíni feltárással lehet megállapítani.",
      },
      {
        question: "Elég a kémény mellé szilikonos tömítés?",
        answer:
          "Csak átmeneti megoldásként. A szilikon a napsugárzástól és a hőmozgástól néhány év alatt elválik, és a beázás visszatér. Tartós megoldást a megfelelően kialakított bádogszegély ad.",
      },
    ],
    seo: {
      metaTitle: "Kéményszegély készítése Kaposvár | Beázás ellen",
      metaDescription:
        "Kéményszegély és kéménybádogozás Kaposváron és környékén. Megszüntetjük a kémény melletti beázást méretre hajlított bádogszegéllyel.",
      keywords: [
        "kéményszegély",
        "kémény bádogozás",
        "kémény mellett beázik",
        "kéményszegély csere",
        "bádogos Kaposvár",
      ],
    },
  },

  /* ---------- 6. Kéményfedés ---------- */
  {
    slug: "kemenyfedes-kemenykalap",
    title: "Kéményfedés és kéménykalap",
    shortDesc:
      "Kéményfej-fedés és kéménykalap készítése egyedi méretben, amely megóvja a kéményt a csapadéktól és a fagykártól.",
    desc: [
      "A kéményfej felső síkja egész évben ki van téve az esőnek, a hónak és a fagynak. A beszivárgó víz télen megfagy, és szétfeszíti a téglát és a vakolatot. Ez az oka, hogy sok kéményfej idővel morzsolódni, repedezni kezd.",
      "A bádog kéményfedés lezárja a kéményfej tetejét, és csepegtető peremmel a falsík elé vezeti a vizet. Igény szerint kéménykalapot is készítünk, amely a kürtőbe jutó csapadékot csökkenti. Mindkettő méretre készül, így bármilyen kéményformához illeszthető.",
      "A kéménykalap kialakítását mindig a kéményhez csatlakozó tüzelőberendezéshez igazítjuk, és megtartjuk a szükséges szabad keresztmetszetet. Ha a kémény használatban van, a kalap felszerelése előtt érdemes egyeztetni a kéményseprővel is.",
    ],
    img: {
      src: "/service-images/kemeny.svg",
      alt: "Bádog kéményfedés és kéménykalap",
    },
    benefits: [
      {
        title: "Fagykár megelőzése",
        desc: "A kéményfejbe nem szivárog víz, így a fagy nem feszíti szét a téglát és a vakolatot.",
        icon: SnowflakeIcon,
      },
      {
        title: "Tartósabb kémény",
        desc: "A lezárt kéményfej sokkal lassabban öregszik, és ritkábban szorul javításra.",
        icon: ShieldCheckIcon,
      },
      {
        title: "Kevesebb csapadék a kürtőben",
        desc: "A kéménykalap csökkenti a kürtőbe jutó esőt és havat.",
        icon: CloudRainIcon,
      },
      {
        title: "Egyedi méret",
        desc: "Minden fedés és kalap a kémény pontos méreteihez készül.",
        icon: RulerIcon,
      },
    ],
    process: [
      {
        title: "Felmérés",
        desc: "Lemérjük a kéményfejet, és megnézzük, milyen tüzelőberendezés csatlakozik hozzá.",
      },
      {
        title: "Méretre gyártás",
        desc: "Műhelyben elkészítjük a fedést csepegtető peremmel, és igény szerint a kalapot.",
      },
      {
        title: "Felszerelés",
        desc: "Rögzítjük a fedést és a kalapot a kéményfejen.",
      },
      {
        title: "Ellenőrzés",
        desc: "Ellenőrizzük a rögzítést és a szabad keresztmetszetet.",
      },
    ],
    materials: [
      MATERIALS.horganyzott,
      MATERIALS.szinesAcel,
      MATERIALS.titancink,
      MATERIALS.rez,
    ],
    faq: [
      {
        question: "Mi a különbség a kéményfedés és a kéményszegély között?",
        answer:
          "A kéményfedés a kéményfej tetejét zárja le felülről. A kéményszegély ott van, ahol a kémény kilép a tetőből, és a tető és a kémény közti csatlakozást teszi vízzáróvá. A kettő együtt védi a kéményt a teljes magasságában.",
      },
      {
        question: "Rátehető kéménykalap bármilyen kéményre?",
        answer:
          "A legtöbbre igen, de a kialakítást a csatlakozó tüzelőberendezéshez kell igazítani, hogy a füstelvezetés ne romoljon. Használatban lévő kéménynél ezt a kéményseprővel is érdemes egyeztetni.",
      },
    ],
    seo: {
      metaTitle: "Kéményfedés és kéménykalap Kaposvár | Bádogos",
      metaDescription:
        "Bádog kéményfedés és kéménykalap egyedi méretben Kaposváron és környékén. Védje kéményét a csapadéktól és a fagykártól.",
      keywords: [
        "kéményfedés",
        "kéménykalap",
        "kéményfej fedés",
        "bádog kéménykalap",
        "bádogos Kaposvár",
      ],
    },
  },

  /* ---------- 7. Állókorcos lemezfedés ---------- */
  {
    slug: "allokorcos-lemezfedes",
    title: "Állókorcos lemezfedés",
    shortDesc:
      "Hagyományos, korcolt fémtető rejtett rögzítéssel – tartós, elegáns, és kis hajlásszögű tetőkre is alkalmas.",
    desc: [
      "Az állókorcos fedés hosszú lemezsávokból áll, amelyek hosszanti széleit felhajtjuk, és egymásba korcolva kapcsoljuk össze. A sávokat rejtett rögzítő lemezekkel (korcolókkal) fogjuk az aljzathoz, így a fedést sehol nem kell átfúrni, és nincs olyan csavarfej, ahol a víz bejuthatna.",
      "A fémtető hőmérséklet hatására tágul és összehúzódik. Ezt a szerkezet fix és csúszó korcolókkal követi, így a lemez nem hullámosodik és nem reped. A fedés folytonos aljzatra, elválasztó réteggel kerül, ami a tartósságot és a csendesebb működést is szolgálja.",
      "Az állókorcos fedést családi házakon, toldalékokon, tetőtéri bővítéseken és előtetőkön egyaránt alkalmazzuk. A modern építészet kedvelt megoldása, de régi épületeken is jól mutat. Színes bevonatos acélból, alumíniumból, titáncinkből és vörösrézből is készülhet.",
    ],
    img: {
      src: "/service-images/allokorc.svg",
      alt: "Antracit állókorcos lemeztető modern családi házon",
    },
    benefits: [
      {
        title: "Évtizedes élettartam",
        desc: "Megfelelő anyagból és szakszerűen szerelve a korcolt fémtető több évtizedig szolgál.",
        icon: HourglassIcon,
      },
      {
        title: "Nincs átfúrt fedés",
        desc: "A rejtett rögzítés miatt nincs csavarfej a fedésen, ahol a víz bejuthatna.",
        icon: ShieldCheckIcon,
      },
      {
        title: "Könnyű szerkezet",
        desc: "A fémtető töredéke a cserép súlyának, ezért a tetőszerkezetet kevésbé terheli.",
        icon: FeatherIcon,
      },
      {
        title: "Elegáns megjelenés",
        desc: "A tiszta, egyenes korcvonalak modern és klasszikus épületen is igényes összképet adnak.",
        icon: SparkleIcon,
      },
    ],
    process: [
      {
        title: "Felmérés és aljzat",
        desc: "Ellenőrizzük a tetőszerkezetet és az aljzatot, szükség esetén javaslatot teszünk a deszkázatra és az elválasztó rétegre.",
      },
      {
        title: "Sávok előkészítése",
        desc: "A lemezsávokat a tető méretére szabjuk, és kialakítjuk a korc széleit.",
      },
      {
        title: "Fedés korcolással",
        desc: "Fix és csúszó korcolókkal rögzítjük a sávokat, majd összekorcoljuk őket.",
      },
      {
        title: "Szegélyek és csatlakozások",
        desc: "Elkészítjük a gerinc-, orom-, eresz- és falszegélyeket, és lezárjuk a tetőáttöréseket.",
      },
    ],
    materials: [
      MATERIALS.szinesAcel,
      MATERIALS.aluminium,
      MATERIALS.titancink,
      MATERIALS.rez,
    ],
    faq: [
      {
        question: "Hangos esőben az állókorcos fémtető?",
        answer:
          "Folytonos aljzatra, elválasztó réteggel és megfelelő hőszigeteléssel szerelve az eső hangja nem zavaró. A dobolás főleg akkor erős, ha a lemez szigetelés nélküli lécezésen fekszik.",
      },
      {
        question: "Milyen hajlásszögű tetőre készülhet állókorcos fedés?",
        answer:
          "Kis hajlásszögű tetőkre is alkalmas, ezért sok más fedésnél szélesebb körben használható. A pontos minimum a korc kialakításától és az anyag gyártójától függ, ezt felméréskor megadjuk.",
      },
    ],
    seo: {
      metaTitle: "Állókorcos lemezfedés Kaposvár | Korcolt fémtető",
      metaDescription:
        "Állókorcos fémtető rejtett rögzítéssel Kaposváron és környékén. Színes acél, alumínium, titáncink és réz fedés, évtizedes élettartammal.",
      keywords: [
        "állókorcos lemezfedés",
        "állókorcos tető",
        "korcolt fémtető",
        "fémtető Kaposvár",
        "lemeztető",
      ],
    },
  },

  /* ---------- 8. Trapézlemez és cserepes lemez ---------- */
  {
    slug: "trapezlemez-cserepeslemez-fedes",
    title: "Trapézlemez és cserepes lemez fedés",
    shortDesc:
      "Gyors, gazdaságos fémfedés lakóházra, garázsra és gazdasági épületre, cserép megjelenésű vagy bordázott kivitelben.",
    desc: [
      "A trapézlemez és a cserepes lemez nagy táblás acélfedés, amely gyorsan és kedvező költséggel kerül a tetőre. A trapézlemez bordázott profilja nagy felületet fed le, ezért garázsokon, tárolókon, gazdasági és ipari épületeken népszerű. A cserepes lemez a cserép megjelenését utánozza, így lakóházakon is jól mutat.",
      "A táblákat tömítő alátétes csavarokkal rögzítjük a lécezéshez, a gyártó által előírt átfedéssel. A fedés a gerinc-, orom-, eresz- és falszegélyekkel együtt lesz teljes, ezeket a lemez színében készítjük.",
      "A lemeztetőknél fontos kérdés a páralecsapódás: a lemez belső oldalán hideg időben kicsapódhat a pára. Ezt páraáteresztő alátétfóliával és a tető megfelelő átszellőztetésével előzzük meg, hogy a tetőtér száraz maradjon.",
    ],
    img: {
      src: "/service-images/trapezlemez.svg",
      alt: "Cserepes lemez tetőfedés családi házon",
    },
    benefits: [
      {
        title: "Gyors kivitelezés",
        desc: "A nagy táblák miatt a fedés rövid idő alatt elkészül, kevesebb ideig áll nyitva a tető.",
        icon: TimerIcon,
      },
      {
        title: "Kedvező költség",
        desc: "Anyagában és munkadíjában is gazdaságos megoldás, különösen nagy felületeken.",
        icon: PiggyBankIcon,
      },
      {
        title: "Könnyű súly",
        desc: "A lemezfedés jóval könnyebb a cserépnél, ezért régebbi vagy gyengébb tetőszerkezetre is kerülhet.",
        icon: FeatherIcon,
      },
      {
        title: "Széles színválaszték",
        desc: "Több gyári színben elérhető, így a házhoz és a környezethez illeszthető.",
        icon: PaletteIcon,
      },
    ],
    process: [
      {
        title: "Felmérés",
        desc: "Megnézzük a tetőszerkezetet, lemérjük a felületeket, és meghatározzuk a szükséges anyagmennyiséget.",
      },
      {
        title: "Anyag és szín kiválasztása",
        desc: "Együtt kiválasztjuk a profilt (trapéz vagy cserepes) és a színt.",
      },
      {
        title: "Alátétfólia és lécezés",
        desc: "Páraáteresztő fóliát és szellőző lécezést készítünk a lemez alá.",
      },
      {
        title: "Fedés és szegélyek",
        desc: "Felszereljük a táblákat, majd elkészítjük a szegélyeket és a csatlakozásokat.",
      },
    ],
    materials: [
      MATERIALS.trapezlemez,
      MATERIALS.cserepeslemez,
      MATERIALS.tomito,
    ],
    faq: [
      {
        question: "Mi a különbség a trapézlemez és a cserepes lemez között?",
        answer:
          "A trapézlemez egyenes, trapéz keresztmetszetű bordákkal készül, és inkább funkcionális épületekre való. A cserepes lemez profilja a cserépfedést utánozza, ezért lakóházakon gyakoribb. Szerkezetileg mindkettő acéllemez, hasonló rögzítéssel.",
      },
      {
        question: "Csöpöghet belülről a lemeztető?",
        answer:
          "Igen, ha a lemez belső oldalán kicsapódik a pára. Ez nem beázás, hanem páralecsapódás, amit páraáteresztő alátétfóliával és a tető megfelelő szellőzésével lehet megelőzni.",
      },
    ],
    seo: {
      metaTitle: "Trapézlemez és cserepes lemez fedés Kaposvár",
      metaDescription:
        "Trapézlemez és cserepes lemez tetőfedés Kaposváron és környékén lakóházra, garázsra, gazdasági épületre. Gyors és gazdaságos fémtető.",
      keywords: [
        "trapézlemez fedés",
        "cserepes lemez",
        "lemeztető",
        "garázs tetőfedés",
        "fémtető Kaposvár",
      ],
    },
  },

  /* ---------- 9. Tetőszegélyek ---------- */
  {
    slug: "tetoszegelyek",
    title: "Tetőszegélyek: vápa, oromszegély, falszegély",
    shortDesc:
      "A tető csatlakozásainak és széleinek bádogozása, a vápától az oromszegélyen és az ereszszegélyen át a falcsatlakozásig.",
    desc: [
      "A tető leggyakrabban ott ázik be, ahol két sík találkozik, vagy ahol a fedés véget ér. Ezeken a pontokon a fedés önmagában nem tud vízzáró lenni, ezért bádogszegély kell, amely a vizet biztonságosan a fedésre és a csatornába vezeti.",
      "A vápa két tetősík belső találkozása, ahol a két oldal vize összegyűlik, ezért itt halad el a legtöbb víz. Az oromszegély a tető oldalsó szélét zárja le, és megvédi a fedés szélét a széltől és a beverő esőtől. A falszegély ott kell, ahol a tető falhoz csatlakozik, az ereszszegély (csepegtető) pedig gondoskodik arról, hogy a víz a csatornába jusson, és ne a deszkázatra.",
      "Minden szegélyt méretre hajlítunk, a tetőfedés anyagához és színéhez igazítva. Felújításnál a régi, rozsdás vagy deformálódott szegélyeket is cseréljük, a fedés teljes bontása nélkül, ahol ez megoldható.",
    ],
    img: {
      src: "/service-images/tetoszegely.svg",
      alt: "Bádog vápa és oromszegély cseréptetőn",
    },
    benefits: [
      {
        title: "Beázásmentes csatlakozások",
        desc: "A vápa, a falcsatlakozás és a tetőszél a legtöbb beázás kiindulópontja. A szakszerű szegély ezeket zárja le.",
        icon: UmbrellaIcon,
      },
      {
        title: "Szél elleni védelem",
        desc: "Az oromszegély megakadályozza, hogy a szél a fedés széle alá kapjon, és megbontsa azt.",
        icon: WindIcon,
      },
      {
        title: "Védett faszerkezet",
        desc: "A szarufák, lécek és a deszkázat nem kapnak vizet, így nem korhadnak.",
        icon: TreeIcon,
      },
      {
        title: "Rendezett tetőszél",
        desc: "Az egyenes, méretre hajlított szegélyek esztétikusan keretezik a tetőt.",
        icon: RulerIcon,
      },
    ],
    process: [
      {
        title: "Felmérés",
        desc: "Átnézzük a tető csatlakozásait, és felmérjük, hol szükséges új vagy javított szegély.",
      },
      {
        title: "Méretvétel",
        desc: "Pontosan lemérjük a csatlakozásokat és a szükséges profilokat.",
      },
      {
        title: "Hajlítás",
        desc: "Műhelyben, élhajlítón méretre készítjük a szegélyeket.",
      },
      {
        title: "Szerelés",
        desc: "Beépítjük és rögzítjük a szegélyeket, és ellenőrizzük a vízzárást.",
      },
    ],
    materials: [
      MATERIALS.horganyzott,
      MATERIALS.szinesAcel,
      MATERIALS.aluminium,
      MATERIALS.titancink,
      MATERIALS.rez,
    ],
    faq: [
      {
        question: "Mi az a vápa a tetőn?",
        answer:
          "A vápa két tetősík belső, befelé hajló találkozási vonala, például ahol egy keresztszárny csatlakozik a főtetőhöz. Itt gyűlik össze a két oldal vize, ezért a vápába vízzáró bádog vápalemez kerül.",
      },
      {
        question: "Mire való az ereszszegély (csepegtető)?",
        answer:
          "Az eresz szélére kerülő szegély, amely a fedésről lefolyó vizet a csatornába vezeti. Nélküle a víz visszafuthat a deszkázatra és a homlokdeszkára, és azok idővel elkorhadnak.",
      },
    ],
    seo: {
      metaTitle: "Tetőszegélyek: vápa, oromszegély Kaposvár | Bádogos",
      metaDescription:
        "Vápa, oromszegély, falszegély és ereszszegély készítése Kaposváron és környékén. Méretre hajlított bádogszegélyek beázás ellen.",
      keywords: [
        "tetőszegély",
        "vápa bádogozás",
        "oromszegély",
        "falszegély",
        "ereszszegély",
        "csepegtető",
      ],
    },
  },

  /* ---------- 10. Tetőáttörések ---------- */
  {
    slug: "tetoattoresek-badogozasa",
    title: "Tetőáttörések bádogozása",
    shortDesc:
      "Szellőzők, tetőablakok, antennák és napelem-tartók körüli vízzáró lezárás, hogy minden áttörés száraz maradjon.",
    desc: [
      "Minden pont, ahol valami átmegy a tetőn, potenciális beázási hely. Szellőzőcsövek, tetőablakok, antennatartók, napelem-rögzítések vagy klímavezetékek körül a fedés megszakad, és ha ezt nem zárják le szakszerűen, a víz a tetőszerkezetbe jut.",
      "Az áttörések köré méretre készített bádoggallért, szegélyt vagy mandzsettát szerelünk, amely a vizet a fedésre vezeti, és nem engedi az áttörés mellé. Ahol a gyári burkolókeret nem elég, például egyedi méretű tetőablaknál, kiegészítő szegéllyel tesszük teljessé a lezárást.",
      "Gyakori eset, hogy egy utólagos szerelés után, például napelem vagy antenna felrakásakor kezd beázni a tető. Ezeket a hibákat utólag is feltárjuk és javítjuk, így a beépített berendezést nem kell leszerelni.",
    ],
    img: {
      src: "/service-images/tetoattoresek.svg",
      alt: "Szellőzőcső körüli bádog gallér a tetőn",
    },
    benefits: [
      {
        title: "Száraz tetőtér",
        desc: "A lezárt áttörések mellett nem jut víz a tetőszerkezetbe és a tetőtérbe.",
        icon: HouseIcon,
      },
      {
        title: "Utólag is megoldható",
        desc: "Meglévő áttöréseket is lezárunk, a berendezés leszerelése nélkül.",
        icon: WrenchIcon,
      },
      {
        title: "Napelem mellett is biztonságos",
        desc: "A napelem-tartók környezete is vízzáró marad, így a rendszer nem okoz beázást.",
        icon: SunIcon,
      },
      {
        title: "Tartós megoldás",
        desc: "A bádog lezárás évekig tart, szemben a csak tömítőanyaggal kent áttörésekkel.",
        icon: ShieldCheckIcon,
      },
    ],
    process: [
      {
        title: "Feltárás",
        desc: "Megkeressük, melyik áttörés mellett jut be a víz.",
      },
      {
        title: "Megoldás kidolgozása",
        desc: "Az áttörés típusához és a fedéshez illő lezárást választunk.",
      },
      {
        title: "Gyártás",
        desc: "Méretre elkészítjük a gallért, szegélyt vagy mandzsettát.",
      },
      {
        title: "Beépítés és ellenőrzés",
        desc: "Beépítjük a lezárást, és ellenőrizzük a vízzárást.",
      },
    ],
    materials: [MATERIALS.szinesAcel, MATERIALS.aluminium, MATERIALS.tomito],
    faq: [
      {
        question: "Beázik a tető a napelem felszerelése óta. Mit tehetek?",
        answer:
          "Ilyenkor általában a tartók rögzítési pontjainál vagy a vezeték átvezetésénél sérült a fedés vízzárása. Helyszíni feltárással megkeressük a hibás pontot, és bádog lezárással javítjuk, a napelemek leszerelése nélkül, ahol ez megoldható.",
      },
      {
        question: "Mire kell figyelni tetőablak beépítésekor?",
        answer:
          "A tetőablakhoz a fedéshez illő gyári burkolókeret tartozik, ezt a gyártó előírása szerint kell beépíteni. Ahol a csatlakozás nem szabványos, kiegészítő bádogszegélyre van szükség.",
      },
    ],
    seo: {
      metaTitle: "Tetőáttörések bádogozása Kaposvár | Beázás ellen",
      metaDescription:
        "Szellőzők, tetőablakok, antennák és napelem-tartók körüli vízzáró bádogozás Kaposváron és környékén, utólag is.",
      keywords: [
        "tetőáttörés",
        "szellőző gallér",
        "napelem beázás",
        "tetőablak szegély",
        "bádogos Kaposvár",
      ],
    },
  },

  /* ---------- 11. Hófogó ---------- */
  {
    slug: "hofogo-felszerelese",
    title: "Hófogó felszerelése",
    shortDesc:
      "Hófogó rácsok és csövek szerelése, hogy a lecsúszó hó ne tegyen kárt az ereszcsatornában, az autóban vagy a járókelőkben.",
    desc: [
      "Sima felületű tetőkről, különösen lemeztetőről és mázas cserépről, a hó olvadáskor egyszerre, nagy tömegben csúszhat le. Ez letépheti az ereszcsatornát, megrongálhatja az alatta álló autót, és veszélyes a bejáratnál vagy a járdán közlekedőkre.",
      "A hófogó megtartja a havat a tetőn, és lehetővé teszi, hogy fokozatosan olvadjon el. Rácsos vagy csöves kivitelben szereljük, a tetősík alsó részén, nagyobb tetőknél több sorban. A tartókat a fedés típusához illően, a tetőszerkezethez rögzítjük.",
      "Hófogó új tetőre és meglévő tetőre is felszerelhető. Különösen ajánlott a bejáratok, teraszok, kocsibeállók és járdák fölötti tetőszakaszokra.",
    ],
    img: {
      src: "/service-images/hofogo.svg",
      alt: "Hófogó rács lemeztetőn hóval",
    },
    benefits: [
      {
        title: "Biztonságos bejárat",
        desc: "Nem zúdul le hirtelen hótömeg a bejáratra, a járdára vagy az autóbeállóra.",
        icon: ShieldIcon,
      },
      {
        title: "Ép ereszcsatorna",
        desc: "A lecsúszó hó nem tépi le és nem hajlítja el a csatornát.",
        icon: CheckCircleIcon,
      },
      {
        title: "Fokozatos olvadás",
        desc: "A hó a tetőn marad, és lassan olvad el, a csatorna pedig el tudja vezetni a vizet.",
        icon: SnowflakeIcon,
      },
      {
        title: "Minden tetőtípusra",
        desc: "Lemeztetőhöz, cserépfedéshez és állókorcos fedéshez is van megfelelő rögzítés.",
        icon: StackIcon,
      },
    ],
    process: [
      {
        title: "Felmérés",
        desc: "Megnézzük a tető hosszát, hajlásszögét és a fedés típusát.",
      },
      {
        title: "Kiosztás",
        desc: "Meghatározzuk a hófogók helyét és a sorok számát.",
      },
      {
        title: "Tartók rögzítése",
        desc: "A tartókat a fedéshez illő módon, a tetőszerkezethez rögzítjük.",
      },
      {
        title: "Rácsok, csövek szerelése",
        desc: "Felszereljük a hófogó elemeket, és ellenőrizzük a rögzítést.",
      },
    ],
    materials: [MATERIALS.hofogo, MATERIALS.szinesAcel],
    faq: [
      {
        question: "Melyik tetőre kell hófogó?",
        answer:
          "Elsősorban a sima felületű tetőkre: lemeztetőre, állókorcos fedésre és mázas cserépre, ahol a hó könnyen megcsúszik. Bármilyen tetőnél ajánlott, ha alatta bejárat, járda, terasz vagy autóbeálló van.",
      },
      {
        question: "Fel lehet utólag szerelni a hófogót?",
        answer:
          "Igen, a legtöbb fedéstípushoz van utólag szerelhető tartó, így a tetőt nem kell megbontani.",
      },
    ],
    seo: {
      metaTitle: "Hófogó felszerelése Kaposvár | Lemeztetőre, cserépre",
      metaDescription:
        "Hófogó rács és cső szerelése Kaposváron és környékén lemeztetőre, cserépre, állókorcos fedésre. Védje a csatornát és a bejáratot.",
      keywords: [
        "hófogó",
        "hófogó szerelés",
        "hófogó rács",
        "hófogó lemeztetőre",
        "bádogos Kaposvár",
      ],
    },
  },

  /* ---------- 12. Ablakpárkány ---------- */
  {
    slug: "kulso-ablakparkany",
    title: "Külső ablakpárkány",
    shortDesc:
      "Méretre hajlított külső ablakpárkány csepegtetővel és oldalzáróval, hogy a víz ne folyjon a falra az ablak alatt.",
    desc: [
      "A külső ablakpárkány elvezeti az ablakra futó esővizet a homlokzattól. Ha hiányzik vagy rosszul van beépítve, az ablak alatt jellegzetes szürke csíkok jelennek meg, a vakolat felázik, és hőszigetelt falnál a szigetelés is nedvességet kaphat.",
      "A jó párkány kifelé lejt, a fal síkja előtt csepegtető orral végződik, és két oldalt felhajtott vagy véglezáróval zárt, hogy a víz ne folyjon le a sarkoknál. Hőszigetelt homlokzatnál a párkánynak a szigetelés síkján is túl kell nyúlnia.",
      "Minden párkányt az ablak pontos méretére hajlítunk, az ablakkerethez illő színben. Felújításnál és utólagos homlokzati hőszigetelés után a régi, rövid párkányok cseréjét is vállaljuk.",
    ],
    img: {
      src: "/service-images/ablakparkany.svg",
      alt: "Antracit külső alumínium ablakpárkány",
    },
    benefits: [
      {
        title: "Tiszta homlokzat",
        desc: "Nem futnak le szürke csíkok az ablak alatt, a vakolat és a festés ép marad.",
        icon: HouseLineIcon,
      },
      {
        title: "Védett hőszigetelés",
        desc: "A szigetelés nem kap vizet a párkány alatt, így megtartja a hőszigetelő képességét.",
        icon: ThermometerIcon,
      },
      {
        title: "Pontos illesztés",
        desc: "Minden párkány az ablak és a fal méretére készül, nem gyári méretből vágva.",
        icon: RulerIcon,
      },
      {
        title: "Az ablakhoz illő szín",
        desc: "A párkány színe az ablakkerethez vagy a homlokzathoz igazítható.",
        icon: PaletteIcon,
      },
    ],
    process: [
      {
        title: "Méretvétel",
        desc: "Lemérjük az ablakot, a falvastagságot és a szigetelés síkját.",
      },
      {
        title: "Hajlítás",
        desc: "Elkészítjük a párkányt csepegtető orral és oldalsó felhajtással.",
      },
      {
        title: "Beépítés lejtéssel",
        desc: "Kifelé lejtéssel, rezgéscsillapító alátéttel építjük be.",
      },
      {
        title: "Oldalzárás és tömítés",
        desc: "Lezárjuk az oldalakat és az ablakkeret melletti csatlakozást.",
      },
    ],
    materials: [
      MATERIALS.aluminium,
      MATERIALS.szinesAcel,
      MATERIALS.titancink,
      MATERIALS.rez,
    ],
    faq: [
      {
        question: "Mennyire lógjon ki a párkány a falból?",
        answer:
          "Annyira, hogy a csepegtető orr a homlokzat síkja elé kerüljön, hőszigetelt falnál a szigetelés síkja elé is. Így a lecsöpögő víz nem éri a falat.",
      },
      {
        question: "Miért kopog az eső a párkányon?",
        answer:
          "Ha a párkány alatt nincs csillapító réteg, a lemez rezonál. Beépítéskor rezgéscsillapító alátétet teszünk alá, ami jelentősen csökkenti a zajt.",
      },
    ],
    seo: {
      metaTitle: "Külső ablakpárkány készítése Kaposvár | Bádogos",
      metaDescription:
        "Méretre hajlított külső ablakpárkány alumíniumból vagy színes acélból Kaposváron és környékén, csepegtetővel, az ablakhoz illő színben.",
      keywords: [
        "külső ablakpárkány",
        "alumínium párkány",
        "ablakpárkány bádog",
        "párkány csere",
        "bádogos Kaposvár",
      ],
    },
  },

  /* ---------- 13. Attika-, fal- és kerítésfedés ---------- */
  {
    slug: "attika-fal-keritesfedes",
    title: "Attika-, fal- és kerítésfedés",
    shortDesc:
      "Bádog fedés attikafalra, kerítésre, kerti falra és oszlopra, amely megóvja a falazat tetejét a beázástól és a fagytól.",
    desc: [
      "A falak és kerítések vízszintes teteje (falkorona) az egyik leginkább kitett felület. A ráhulló eső beszivárog a falazatba, télen megfagy, és szétfeszíti a téglát, a betont és a vakolatot. Ezért morzsolódik és repedezik sok kerítés és attikafal teteje.",
      "A bádog falfedés lejtéssel vezeti le a vizet, és mindkét oldalon csepegtető peremmel a falsík elé juttatja. Rejtett rögzítő pántokkal fogjuk le, a hosszabb szakaszokon a hőtágulást is figyelembe vevő toldásokkal. Kerítésoszlopokra egyedi méretű oszlopsapkát készítünk.",
      "Lapostetős házak attikafalánál a fedés a tetőszigetelés csatlakozását is lezárja, így a falkorona és a tető egyaránt védett. Az egységes színű fedés a homlokzat és a kerítés összképét is rendezi.",
    ],
    img: {
      src: "/service-images/attika.svg",
      alt: "Bádog kerítésfedés és oszlopsapka",
    },
    benefits: [
      {
        title: "Fagyálló falkorona",
        desc: "A falazatba nem szivárog víz, így a fagy nem repeszti szét a fal tetejét.",
        icon: SnowflakeIcon,
      },
      {
        title: "Tiszta falfelület",
        desc: "A csepegtető perem a falsík elé vezeti a vizet, nem folyik le a falon.",
        icon: DropIcon,
      },
      {
        title: "Egységes megjelenés",
        desc: "Az egyforma színű, egyenes fedés rendezett keretet ad a kerítésnek és a homlokzatnak.",
        icon: FrameCornersIcon,
      },
      {
        title: "Rejtett rögzítés",
        desc: "A fedést rejtett pántokkal fogjuk le, így szélben sem mozdul el, és nem látszik a rögzítés.",
        icon: LockIcon,
      },
    ],
    process: [
      {
        title: "Méretvétel",
        desc: "Lemérjük a fal szélességét, hosszát, a sarkokat és az oszlopokat.",
      },
      {
        title: "Gyártás",
        desc: "Méretre hajlítjuk a fedéseket, sarokelemeket és oszlopsapkákat.",
      },
      {
        title: "Rögzítés",
        desc: "Felszereljük a rögzítő pántokat, majd ráhúzzuk és rögzítjük a fedést.",
      },
      {
        title: "Toldások lezárása",
        desc: "Hőtágulást engedő toldásokkal zárjuk le a hosszabb szakaszokat.",
      },
    ],
    materials: [
      MATERIALS.horganyzott,
      MATERIALS.szinesAcel,
      MATERIALS.aluminium,
      MATERIALS.titancink,
    ],
    faq: [
      {
        question: "Kell lejtés a falfedésnek?",
        answer:
          "Igen. A fedés a vizet egyik vagy mindkét oldal felé vezeti el, hogy ne álljon meg rajta. Attikafalnál jellemzően a tető felé lejt, hogy a homlokzatra ne folyjon víz.",
      },
      {
        question: "Kerítésoszlopra is készül bádogsapka?",
        answer:
          "Igen, minden oszlopra méretre készítünk oszlopsapkát, a kerítésfedéssel azonos anyagból és színben.",
      },
    ],
    seo: {
      metaTitle: "Attika-, fal- és kerítésfedés Kaposvár | Bádogos",
      metaDescription:
        "Bádog attikafedés, kerítésfedés és oszlopsapka Kaposváron és környékén. Védje a falkoronát a beázástól és a fagykártól.",
      keywords: [
        "attikafedés",
        "kerítésfedés",
        "falfedés bádog",
        "oszlopsapka",
        "bádogos Kaposvár",
      ],
    },
  },

  /* ---------- 14. Előtető ---------- */
  {
    slug: "eloteto-lemezszerkezetek",
    title: "Előtető és kisebb lemezszerkezetek",
    shortDesc:
      "Bejárati előtető, tároló, kukatároló vagy tüzifatároló fedése bádogból, egyedi méretben, vízelvezetéssel együtt.",
    desc: [
      "A bejárat feletti előtető és a kisebb kerti szerkezetek, például tárolók, kukatárolók vagy tüzifatárolók, gyakran kimaradnak a tető felújításából, pedig ezek is folyamatosan ázó felületek.",
      "Ezekre a szerkezetekre bádog fedést készítünk, állókorcos, sík vagy lemezfedéses kivitelben, a háztetőhöz illő anyagból és színben. A fedéshez szükség szerint kis ereszcsatornát és lefolyót is szerelünk, hogy a víz ne a bejárat elé folyjon.",
      "Elsősorban a fedést és a bádogos munkákat végezzük. A tartószerkezetről, legyen az új vagy meglévő, felméréskor egyeztetünk.",
    ],
    img: {
      src: "/service-images/eloteto.svg",
      alt: "Bádog fedésű bejárati előtető",
    },
    benefits: [
      {
        title: "Védett bejárat",
        desc: "Az ajtó és a lépcső nem ázik, és esőben is száraz helyen lehet belépni.",
        icon: DoorIcon,
      },
      {
        title: "Egyedi méret",
        desc: "A fedés a szerkezet pontos méretére készül, bármilyen formához.",
        icon: RulerIcon,
      },
      {
        title: "Illik a házhoz",
        desc: "Anyagban és színben a háztetőhöz és a nyílászárókhoz igazodik.",
        icon: PaletteIcon,
      },
      {
        title: "Tartós fedés",
        desc: "A bádog fedés évekig karbantartás nélkül véd, nem korhad, mint a fa vagy a bitumenes lemez.",
        icon: ShieldCheckIcon,
      },
    ],
    process: [
      {
        title: "Felmérés",
        desc: "Megnézzük a szerkezetet, és egyeztetjük a fedés kialakítását.",
      },
      {
        title: "Anyagválasztás",
        desc: "Kiválasztjuk a házhoz illő anyagot és színt.",
      },
      {
        title: "Gyártás",
        desc: "Méretre elkészítjük a fedést és a szegélyeket.",
      },
      {
        title: "Szerelés és vízelvezetés",
        desc: "Felszereljük a fedést, és szükség esetén a csatornát és a lefolyót.",
      },
    ],
    materials: [
      MATERIALS.szinesAcel,
      MATERIALS.titancink,
      MATERIALS.rez,
      MATERIALS.trapezlemez,
    ],
    faq: [
      {
        question: "Az előtető vázát is elkészítik?",
        answer:
          "Elsősorban a fedést és a bádogos munkákat végezzük. A tartószerkezetről felméréskor egyeztetünk.",
      },
      {
        question: "Kell csatorna egy kis előtetőre?",
        answer:
          "Ha a víz a bejárat, a lépcső vagy a járda elé folyna, igen. Egy kis csatorna és lefolyó megakadályozza, hogy a bejárat előtt tócsa vagy télen jég képződjön.",
      },
    ],
    seo: {
      metaTitle: "Előtető bádogfedés Kaposvár | Egyedi méretben",
      metaDescription:
        "Bejárati előtető, tároló és kerti szerkezetek bádog fedése Kaposváron és környékén, egyedi méretben, csatornával együtt.",
      keywords: [
        "előtető fedés",
        "bádog előtető",
        "előtető lemezfedés",
        "tároló tetőfedés",
        "bádogos Kaposvár",
      ],
    },
  },

  /* ---------- 15. Beázás-elhárítás ---------- */
  {
    slug: "beazas-elharitas-viharkar",
    title: "Beázás-elhárítás és viharkár-javítás",
    shortDesc:
      "Beázó tetők hibafeltárása és javítása, viharban megrongálódott bádogszerkezetek gyors helyreállítása.",
    desc: [
      "A beázás oka ritkán ott van, ahol a folt látszik. A víz a fedés alatt a szarufák, a fólia vagy a födém mentén méterekre is elvándorolhat, mielőtt megjelenik a mennyezeten. Ezért a javítás a hiba pontos feltárásával kezdődik.",
      "A leggyakoribb okok a kéményszegély, a vápa, a tetőáttörések, a sérült vagy elmozdult szegélyek és az eldugult ereszcsatorna. Ezeket sorra átvizsgáljuk, és nem csak a tünetet kezeljük, hanem a hiba forrását szüntetjük meg.",
      "Vihar után, ha szegély, csatorna vagy fedés szakadt le, először ideiglenesen lezárjuk a tetőt, hogy ne ázzon tovább, majd elvégezzük a végleges javítást. A kárt és a javítást fotókkal dokumentáljuk, amit a biztosítónak is be tud adni.",
    ],
    img: {
      src: "/service-images/bados-haz.svg",
      alt: "Beázott tető javítása bádogossal",
    },
    benefits: [
      {
        title: "Gyors reagálás",
        desc: "Beázásnál minden nap számít, ezért a lehető leghamarabb kimegyünk felmérni.",
        icon: LightningIcon,
      },
      {
        title: "Valódi ok feltárása",
        desc: "Nem csak a foltot nézzük, hanem megkeressük, honnan jut be a víz.",
        icon: MagnifyingGlassIcon,
      },
      {
        title: "Dokumentáció a biztosítónak",
        desc: "A kárról és a javításról fotódokumentációt készítünk.",
        icon: ClipboardTextIcon,
      },
      {
        title: "Kisebb következménykár",
        desc: "A gyors lezárással megelőzhető a födém, a vakolat és a berendezés további ázása.",
        icon: WarningIcon,
      },
    ],
    process: [
      {
        title: "Helyszíni bejárás",
        desc: "Megnézzük a beázás helyét kívül és belül, és feltárjuk a lehetséges okokat.",
      },
      {
        title: "Ideiglenes védelem",
        desc: "Ha szükséges, azonnal lezárjuk a sérült részt, hogy ne ázzon tovább.",
      },
      {
        title: "Végleges javítás",
        desc: "Kijavítjuk vagy pótoljuk a sérült szegélyt, csatornát vagy fedést.",
      },
      {
        title: "Dokumentálás",
        desc: "Fotókkal rögzítjük a kárt és az elvégzett javítást.",
      },
    ],
    materials: [MATERIALS.szinesAcel, MATERIALS.aluminium, MATERIALS.tomito],
    faq: [
      {
        question: "Miért nem ott ázik be a tető, ahol a folt van?",
        answer:
          "Mert a víz a fedés alatt a szerkezet mentén elvándorol, és ott csöpög le, ahol akadályba ütközik. A tényleges hiba gyakran egy-két méterrel feljebb van, például a kéménynél vagy a vápánál.",
      },
      {
        question: "Segítenek a biztosítási ügyintézésben?",
        answer:
          "A kárt és a javítást fotókkal dokumentáljuk, és részletes számlát adunk. Ezeket a biztosítóhoz be tudja nyújtani.",
      },
    ],
    seo: {
      metaTitle: "Beázás-elhárítás és viharkár Kaposvár | Bádogos",
      metaDescription:
        "Beázó tető hibafeltárása és javítása, viharkár utáni bádogos helyreállítás Kaposváron és környékén, fotódokumentációval.",
      keywords: [
        "beázás elhárítás",
        "beázik a tető",
        "viharkár javítás",
        "tetőjavítás Kaposvár",
        "bádogos Kaposvár",
      ],
    },
  },

  /* ---------- 16. Karbantartás ---------- */
  {
    slug: "badogos-atvizsgalas-karbantartas",
    title: "Bádogos átvizsgálás és karbantartás",
    shortDesc:
      "Rendszeres átvizsgálás a csatornától a kéményszegélyig, hogy a kis hibák még javítható állapotban kiderüljenek.",
    desc: [
      "A tető bádogszerkezetei egész évben ki vannak téve az esőnek, a fagynak, a napsütésnek és a szélnek. A legtöbb komoly beázás egy apró, időben észre nem vett hibából indul: egy kilazult szegélyből, egy elöregedett tömítésből vagy egy eldugult lefolyóból.",
      "Az átvizsgálás során végignézzük a csatornákat, a tartókat és a toldásokat, a lefolyókat, a kémény- és tetőszegélyeket, a tetőáttöréseket és a hófogókat. Az apró hibákat, például laza rögzítést vagy kisebb tömítést, helyben javítjuk.",
      "Az átvizsgálásról fotós összefoglalót adunk, amelyből látszik a szerkezetek állapota, és az, ha valami a közeljövőben javítást igényel. Így a költségek tervezhetők, és nem egy beázás dönt helyette.",
    ],
    img: {
      src: "/service-images/bados-haz.svg",
      alt: "Bádogos tetőátvizsgálás ereszcsatornánál",
    },
    benefits: [
      {
        title: "Megelőzés",
        desc: "A kis hibák még azelőtt kiderülnek, hogy beázást vagy komoly kárt okoznának.",
        icon: ShieldCheckIcon,
      },
      {
        title: "Tervezhető költségek",
        desc: "Előre látható, mi szorul javításra, így nem érik váratlan kiadások.",
        icon: CalendarCheckIcon,
      },
      {
        title: "Hosszabb élettartam",
        desc: "A rendszeresen karbantartott bádogszerkezetek jóval tovább szolgálnak.",
        icon: HourglassIcon,
      },
      {
        title: "Fotós állapotjelentés",
        desc: "Képekkel dokumentáljuk a szerkezetek állapotát és a javasolt teendőket.",
        icon: ClipboardTextIcon,
      },
    ],
    process: [
      {
        title: "Időpont egyeztetése",
        desc: "Egyeztetünk egy alkalmas időpontot, ideálisan késő ősszel vagy kora tavasszal.",
      },
      {
        title: "Átvizsgálás",
        desc: "Végignézzük a csatornákat, lefolyókat, szegélyeket, áttöréseket és hófogókat.",
      },
      {
        title: "Apró javítások",
        desc: "A kisebb hibákat helyben javítjuk.",
      },
      {
        title: "Összefoglaló",
        desc: "Fotós összefoglalót adunk az állapotról és a javasolt munkákról.",
      },
    ],
    materials: [MATERIALS.tomito],
    faq: [
      {
        question: "Mikor érdemes átvizsgáltatni a bádogszerkezeteket?",
        answer:
          "Évente egyszer, késő ősszel a lombhullás után vagy kora tavasszal a téli időszak végén. Nagy vihar után soron kívül is érdemes.",
      },
      {
        question: "Mit tartalmaz az átvizsgálás?",
        answer:
          "Az ereszcsatornák, tartók, toldások és lefolyók, a kémény- és tetőszegélyek, a tetőáttörések és a hófogók ellenőrzését, az apró hibák helyszíni javítását és egy fotós összefoglalót.",
      },
    ],
    seo: {
      metaTitle: "Bádogos átvizsgálás és karbantartás Kaposvár",
      metaDescription:
        "Ereszcsatorna, szegélyek és tetőáttörések éves átvizsgálása Kaposváron és környékén, apró javításokkal és fotós összefoglalóval.",
      keywords: [
        "tető átvizsgálás",
        "ereszcsatorna karbantartás",
        "bádogos karbantartás",
        "tetőellenőrzés Kaposvár",
      ],
    },
  },

  /* ---------- 17. Egyedi idomok ---------- */
  {
    slug: "egyedi-badogos-idomok",
    title: "Egyedi bádogos idomok hajlítása",
    shortDesc:
      "Méretre hajlított szegélyek, profilok és idomok műhelyben gyártva, egyedi és régi épületekhez is.",
    desc: [
      "Nem minden épületre illik a gyári elem. Régi házaknál, egyedi párkányoknál, eltérő szögeknél vagy különleges csatlakozásoknál a megoldás az, ha a bádogelemet az adott helyre, pontos méretre hajlítjuk.",
      "Műhelyünkben élhajlítón készítjük a szegélyeket, párkányokat, takaróprofilokat és idomokat, a megrendelő által választott anyagból és színben. Régi, elrozsdált vagy hiányzó elemeket is pótolunk az eredeti formának megfelelően.",
      "Az idomokat helyszíni méretvétel vagy pontos rajz alapján készítjük, és kérésre a beépítést is elvégezzük.",
    ],
    img: {
      src: "/service-images/egyediidomok.svg",
      alt: "Egyedi bádogos idomok élhajlítás után",
    },
    benefits: [
      {
        title: "Pontos illesztés",
        desc: "Az elem pontosan oda készül, ahová kerül, nem kell a helyszínen igazítgatni.",
        icon: RulerIcon,
      },
      {
        title: "Bármilyen forma",
        desc: "Egyedi szögek, profilok és csatlakozások is megoldhatók.",
        icon: PuzzlePieceIcon,
      },
      {
        title: "Régi elemek pótlása",
        desc: "Hiányzó vagy tönkrement elemeket az eredeti formában készítünk újra.",
        icon: ArrowsClockwiseIcon,
      },
      {
        title: "Egységes anyag és szín",
        desc: "Az idom a többi bádogszerkezettel azonos anyagból és színben készül.",
        icon: PaletteIcon,
      },
    ],
    process: [
      {
        title: "Méret vagy rajz",
        desc: "Helyszínen lemérjük az elemet, vagy pontos rajz alapján dolgozunk.",
      },
      {
        title: "Anyagválasztás",
        desc: "Kiválasztjuk az anyagot és a színt.",
      },
      {
        title: "Hajlítás",
        desc: "Élhajlítón elkészítjük az idomot.",
      },
      {
        title: "Átadás vagy beépítés",
        desc: "Átadjuk az elemet, vagy kérésre beépítjük.",
      },
    ],
    materials: [
      MATERIALS.horganyzott,
      MATERIALS.szinesAcel,
      MATERIALS.aluminium,
      MATERIALS.titancink,
      MATERIALS.rez,
    ],
    faq: [
      {
        question: "Hozott méret alapján is készítenek idomot?",
        answer:
          "Igen, pontos méretek vagy rajz alapján. Bonyolultabb csatlakozásnál helyszíni méretvételt javaslunk, hogy az elem biztosan illeszkedjen.",
      },
      {
        question: "Milyen anyagból készülhet az idom?",
        answer:
          "Horganyzott és színes bevonatos acélból, alumíniumból, titáncinkből és vörösrézből, a többi bádogszerkezethez igazodva.",
      },
    ],
    seo: {
      metaTitle: "Egyedi bádogos idomok, élhajlítás Kaposvár",
      metaDescription:
        "Méretre hajlított bádog szegélyek, profilok és idomok Kaposváron és környékén, egyedi és régi épületekhez, beépítéssel is.",
      keywords: [
        "bádogos idom",
        "élhajlítás",
        "egyedi bádog szegély",
        "lemezhajlítás Kaposvár",
      ],
    },
  },
];

/* ============================================================
   SEGÉDFÜGGVÉNYEK
   ============================================================ */

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const getAllServiceSlugs = (): string[] =>
  services.map((service) => service.slug);
