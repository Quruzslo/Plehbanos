export default function Aszf() {
  return (
    <section className="w-full flex flex-col pt-[100px] lg:pt-[150px] pb-20 bg-stone-100 text-stone-800">
      <div className="w-[90%] max-w-4xl mx-auto flex flex-col gap-6 leading-relaxed">
        <h1 className="text-3xl lg:text-4xl font-bold text-stone-900">
          Általános Szerződési Feltételek
        </h1>

        <p>
          Jelen dokumentum alapján létrejött szerződés nem kerül iktatásra
          (utólag nem hozzáférhető, a szerződés megkötését a rendelési adatok
          bizonyítják), ráutaló magatartással tett jognyilatkozattal jön létre,
          nem minősül írásbeli szerződésnek, magyar nyelven íródik, magatartási
          kódexre nem utal. A webshop működésével, megrendelési és szállítási
          folyamatával kapcsolatosan felmerülő kérdések esetén a megadott
          elérhetőségeinken rendelkezésére állunk.
        </p>

        <p>
          Jelen ÁSZF hatálya Szolgáltató weblapján (https://[DOMAIN_NEV]) és
          aldomainjein történő jogviszonyokra terjed ki. Jelen ÁSZF folyamatosan
          elérhető (és letölthető, bármikor kinyomtatható) a következő
          weboldalról: [DOMAIN_NEV]/aszf.
        </p>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          Definíciók
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Felhasználó:</strong> Bármely természetes, jogi személy,
            vagy szervezet, aki Szolgáltató weboldalát látogatja,
            szolgáltatásait igénybe veszi, vagy Szolgáltatóval szerződést köt.
          </li>
          <li>
            <strong>Fogyasztó:</strong> Olyan Felhasználó, aki a szakmája,
            önálló foglalkozása vagy üzleti tevékenysége körén kívül eljáró
            természetes személy.
          </li>
          <li>
            <strong>Vállalkozás:</strong> A szakmája, önálló foglalkozása vagy
            üzleti tevékenysége körében eljáró személy.
          </li>
          <li>
            <strong>Szolgáltató:</strong> Az információs társadalommal
            összefüggő szolgáltatást nyújtó egyéni vállalkozó, aki a Felhasználó
            részére terméket értékesít, illetve szolgáltatást nyújt.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          1. Szolgáltató adatai
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>A szolgáltató neve:</strong> József Zoltán Ev.
          </li>
          <li>
            <strong>
              A szolgáltató székhelye (és a panaszügyintézés helye):
            </strong>{" "}
            7431 Juta, Búzavirág utca 21.
          </li>
          <li>
            <strong>Kapcsolattartásra szolgáló e-mail cím:</strong>{" "}
            [UGYFELSZOLGALATI_EMAIL]
          </li>
          <li>
            <strong>Egyéni vállalkozói nyilvántartási szám:</strong>{" "}
            [EV_NYILVANTARTASI_SZAM]
          </li>
          <li>
            <strong>Adószám:</strong> [ADOSZAM]
          </li>
          <li>
            <strong>Nyilvántartásba bejegyző hatóság neve:</strong> Nemzeti Adó-
            és Vámhivatal (NAV) / Egyéni Vállalkozói Nyilvántartás
          </li>
          <li>
            <strong>A szerződés nyelve:</strong> magyar
          </li>
          <li>
            <strong>A tárhely-szolgáltató neve, címe, e-mail címe:</strong>{" "}
            [VPS_SZOLGALTATO_NEVE_ES_CIM_EMAIL]
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          2. Alapvető rendelkezések és a weboldal jellege
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>2.1.</strong> A jelen ÁSZF-ben nem szabályozott kérdésekre a
            magyar jog az irányadó, különös tekintettel a Polgári
            Törvénykönyvről szóló 2013. évi V. törvény („Ptk.”), a 2001. évi
            CVIII. (Elker. tv.) törvény, valamint a fogyasztó és a vállalkozás
            közötti szerződések részletes szabályairól szóló 45/2014. (II. 26.)
            Korm. rendelet rendelkezéseire.
          </li>
          <li>
            <strong>2.2. Webáruház termékek:</strong> A webshop felületén
            kosárba helyezhető, kézzel készített bádogos dísz- és használati
            tárgyak (pl. szélkakasok, bádog figurák, kerti díszek)
            megrendelésére és adásvételére jelen ÁSZF rendelkezései irányadók.
          </li>
          <li>
            <strong>2.3. Épületbádogos és kivitelezési szolgáltatások:</strong>{" "}
            A weboldalon bemutatott helyszíni bádogos munkák és kivitelezési
            szolgáltatások nem rendelhetők meg közvetlenül a webshop
            kosárrendszerén keresztül; azok megjelenítése tájékoztató és
            ajánlatkérési célt szolgál. Ezen szolgáltatásokra egyedi helyszíni
            felmérést követően, külön írásbeli árajánlat vagy vállalkozási
            szerződés alapján jön létre szerződés.
          </li>
          <li>
            <strong>2.4.</strong> A jelen ÁSZF 2026. [HONAP_NAP] napjától
            hatályos és visszavonásig hatályban marad. A módosításoknak nincs
            visszaható hatálya a korábban megkötött szerződésekre.
          </li>
          <li>
            <strong>2.5.</strong> Szolgáltató fenntart magának minden szerzői és
            egyéb jogot a weboldalon megjelenő valamennyi tartalomra, különösen
            a saját készítésű bádogos termékekről készült fotókra és
            tervrajzokra.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          3. Rendelés menete és vásárlás
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>3.1.</strong> A webshopban történő vásárláshoz nem szükséges
            előzetes regisztráció. A Felhasználó a kiválasztott termék(ek)
            darabszámának beállítása után a termékeket a kosárba helyezi.
          </li>
          <li>
            <strong>3.2.</strong> A kosár tartalma a pénztár folyamat
            véglegesítéséig bármikor ellenőrizhető, a darabszámok módosíthatók,
            illetve a tételek törölhetők. A pénztár oldalon a Felhasználó
            megadja a számlázási és szállítási adatait (név, szállítási cím,
            telefonszám a futárszolgálat értesítéseihez, e-mail cím).
          </li>
          <li>
            <strong>3.3.</strong> A Szolgáltatót a Felhasználó által tévesen
            vagy pontatlanul megadott adatokra visszavezethető szállítási
            késedelemért felelősség nem terheli.
          </li>
          <li>
            <strong>3.4. Adatbeviteli hibák javítása:</strong> A megrendelés
            elküldése előtt a Felhasználónak folyamatosan lehetősége van a kosár
            tartalmának és a megadott szállítási/számlázási adatoknak az
            ellenőrzésére és javítására.
          </li>
          <li>
            <strong>3.5.</strong> A megrendelés véglegesítése a{" "}
            <strong>„Megrendelés fizetési kötelezettséggel”</strong> gombra
            kattintással történik, amelyet a Felhasználó a jelen ÁSZF és az
            Adatkezelési Tájékoztató elfogadásával együtt tesz meg. Felhasználó
            tudomásul veszi, hogy a gomb megnyomásával fizetési kötelezettsége
            keletkezik.
          </li>
          <li>
            <strong>3.6.</strong> A megrendelés elküldését követően a rendszer
            automatikus visszaigazoló e-mailt küld a Felhasználó részére.
            Amennyiben ez 48 órán belül nem érkezik meg, a Felhasználó mentesül
            az ajánlati kötöttség alól. Az automata visszaigazolás a megrendelés
            beérkezését nyugtázza; a szerződés akkor jön létre, amikor
            Szolgáltató külön e-mailben visszaigazolja a megrendelés elfogadását
            és teljesítését.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          4. Árak, fizetési és szállítási feltételek
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>4.1.</strong> A termékek mellett feltüntetett árak forintban
            (Ft) értendő bruttó árak (az egyéni vállalkozó adózási státuszának
            megfelelően a végső fizetendő összeget jelentik). Az árak nem
            tartalmazzák a szállítási díjat.
          </li>
          <li>
            <strong>4.2. Hibás ár:</strong> Nyilvánvalóan hibás ár (pl. 0 Ft, 1
            Ft vagy rendszerhiba miatti aránytalanul alacsony ár) feltüntetése
            esetén Szolgáltató nem köteles a terméket a hibás áron leszállítani,
            hanem felajánlhatja a helyes áron történő teljesítést, amelynek
            ismeretében a Felhasználó elállhat a megrendeléstől.
          </li>
          <li>
            <strong>4.3. Fizetési mód (Kizárólag utánvét):</strong> A webshop
            felületén online fizetés nem történik. A megrendelés végösszegének
            (termékek ára + szállítási díj) kiegyenlítése kizárólag{" "}
            <strong>utánvéttel</strong>, a csomag átvételekor történik a
            futárszolgálat munkatársánál készpénzzel (illetve amennyiben a
            futárnál rendelkezésre áll POS terminál, bankkártyával). A számlát a
            csomag tartalmazza.
          </li>
          <li>
            <strong>4.4. Szállítás és szállítási költség:</strong> A termékek
            kiszállítása futárszolgálattal (GLS General Logistics Systems
            Hungary Csomag-Logisztikai Kft.) történik munkanapokon 8:00 és 17:00
            óra között. Szállítási díj: [SZALLITASI_DIJ_STRUKTURA]. A fizetendő
            teljes végösszeg a pénztár oldalon a megrendelés leadása előtt
            egyértelműen megjelenítésre kerül.
          </li>
          <li>
            <strong>4.5. Átvételkori ellenőrzés:</strong> A Felhasználó köteles
            a csomag sértetlenségét a futár jelenlétében átvételkor ellenőrizni.
            Sérült csomagolás vagy termék esetén a futárral jegyzőkönyvet kell
            felvetetni, és a sérült csomag átvétele megtagadható.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          5. Teljesítés, lemondás és át nem vett csomagok
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>5.1. Teljesítési határidő:</strong> Készleten lévő termékek
            esetén a megrendelés visszaigazolásától számított [PL. 3-5]
            munkanap. Egyedi megrendelésre, kézzel készített bádogos termékek
            esetén a gyártási és szállítási határidő a termékoldalon
            feltüntetett, illetve a visszaigazoló e-mailben egyeztetett
            időtartam (jellemzően [PL. 5-10] munkanap).
          </li>
          <li>
            <strong>5.2. Rendelés lemondása a feladás előtt:</strong> A
            megrendelő a csomag futárszolgálatnak (GLS) történő átadásáig a
            megrendelést díjmentesen lemondhatja a Szolgáltató e-mail címére
            küldött értesítéssel. A csomag futárnak történő átadását követően a
            Fogyasztót a 6. fejezet szerinti elállási jog illeti meg.
          </li>
          <li>
            <strong>5.3. Át nem vett csomagok (Szerződésszegés):</strong>{" "}
            Amennyiben a Fogyasztó előzetes elállási nyilatkozat nélkül, alapos
            ok nélkül nem veszi át a szerződésszerűen kiküldött utánvétes
            csomagot, ezzel a Ptk. 6:156. § (1) bekezdése szerint átvételi
            késedelembe esik és szerződésszegést követ el. Ilyen esetben a
            Szolgáltató jogosult a sikertelen kézbesítéssel és a csomag
            visszaszállításával felmerült igazolt szállítási és utánvét-kezelési
            költségeit a Felhasználóval szemben érvényesíteni.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          6. Elállás joga (Fogyasztók esetén)
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>6.1.</strong> A 45/2014. (II. 26.) Korm. rendelet értelmében
            a Fogyasztót a készletről vásárolt, előre gyártott termékek esetén a
            termék átvételének napjától számított{" "}
            <strong>14 napon belül</strong> indokolás nélküli elállási jog
            illeti meg (amelyet a szerződés megkötése és az átvétel közötti
            időszakban is gyakorolhat). Az elállási jog kizárólag a Fogyasztónak
            minősülő természetes személyeket illeti meg, vállalkozásokat nem.
          </li>
          <li>
            <strong>
              6.2. Kivétel az elállási jog alól (Egyedi kézműves bádogos
              termékek):
            </strong>{" "}
            A 45/2014. (II. 26.) Korm. rendelet 29. § (1) bekezdés c) pontja
            alapján <strong>nem illeti meg a Fogyasztót az elállási jog</strong>{" "}
            olyan nem előre gyártott áru esetében, amelyet a Fogyasztó utasítása
            alapján vagy kifejezett kérésére állítottak elő, illetve olyan
            termék esetében, amelyet egyértelműen a Fogyasztó személyére szabtak
            (így különösen az egyedi méretben, egyedi felirattal/évszámmal,
            egyedi mintával vagy kifejezetten a megrendelő kérésére gyártott
            bádogos termékek esetében).
          </li>
          <li>
            <strong>6.3. Elállás jelzése:</strong> Elállási szándékát a
            Fogyasztó a 14 napos határidőn belül e-mailben vagy postai úton
            (akár a jelen ÁSZF végén található elállási nyilatkozat-minta
            felhasználásával) jelezheti.
          </li>
          <li>
            <strong>6.4. Termék visszaküldése:</strong> Elállás esetén a
            Fogyasztó köteles a terméket indokolatlan késedelem nélkül, de
            legkésőbb az elállás közlésétől számított 14 napon belül saját
            költségén visszaküldeni a Szolgáltató székhelyére (7431 Juta,
            Búzavirág utca 21.). Utánvéttel visszaküldött csomagot Szolgáltató
            nem vesz át.
          </li>
          <li>
            <strong>6.5. Visszatérítés:</strong> A Szolgáltató a visszaküldött
            termék beérkezését követően legkésőbb 14 napon belül visszatéríti a
            termék vételárát és az odaszállítás díját a Fogyasztó által megadott
            bankszámlaszámra történő átutalással. A Fogyasztó felel a termék
            jellegének, tulajdonságainak és működésének megállapításához
            szükséges használatot meghaladó használatból eredő
            értékcsökkenésért.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          7. Kellékszavatosság, termékszavatosság és jótállás
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>7.1. Kellékszavatosság:</strong> A Felhasználó a Szolgáltató
            hibás teljesítése esetén a Ptk. szabályai szerint kellékszavatossági
            igényt érvényesíthet (kijavítás, kicserélés, árleszállítás vagy
            elállás). Fogyasztói szerződés esetén a teljesítéstől számított 2
            éven belül (vállalkozások esetén 1 éven belül) érvényesíthető. Az
            első 1 évben a Szolgáltatónak kell bizonyítania, hogy a hiba a
            teljesítés után keletkezett.
          </li>
          <li>
            <strong>7.2. Termékszavatosság:</strong> Ingó dolog hibája esetén a
            Fogyasztó – választása szerint – kellékszavatossági vagy
            termékszavatossági igényt (kijavítás vagy kicserélés) érvényesíthet
            a gyártóval szemben a forgalomba hozataltól számított 2 éven belül.
          </li>
          <li>
            <strong>7.3. Kötelező jótállás:</strong> A 10/2024. (VI. 28.) IM
            rendelet mellékletében meghatározott tartós fogyasztási cikkek
            körébe nem tartozó kézműves és dísztárgyakra jogszabályon alapuló
            kötelező jótállás nem vonatkozik; ezekre a 7.1. pont szerinti 2 éves
            kellékszavatosság irányadó.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          8. Panaszkezelés és jogérvényesítés
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>8.1. Panasz benyújtása:</strong> A Fogyasztó a termékkel
            vagy a Szolgáltató tevékenységével kapcsolatos panaszait írásban
            (e-mailben vagy a 7431 Juta, Búzavirág utca 21. címre küldött
            levélben) terjesztheti elő. Az írásbeli panaszt Szolgáltató 30 napon
            belül érdemben megválaszolja, és a panaszról felvett jegyzőkönyvet
            és a választ 3 évig megőrzi.
          </li>
          <li>
            <strong>8.2. Fogyasztóvédelmi hatóság:</strong> Panasz elutasítása
            esetén a Fogyasztó a lakóhelye vagy a vállalkozás székhelye szerinti
            illetékes Kormányhivatalhoz fordulhat (https://kormanyhivatalok.hu).
          </li>
          <li>
            <strong>8.3. Békéltető testület:</strong> Fogyasztói jogvita esetén
            a Fogyasztó a lakóhelye vagy tartózkodási helye szerinti illetékes
            békéltető testülethez, illetve a Szolgáltató székhelye szerint
            illetékes testülethez fordulhat (általános alávetési nyilatkozatot
            Szolgáltató nem tett): Baranya Vármegyei Békéltető Testület (Somogy
            vármegye illetékességi területe), 7625 Pécs, Majorossy Imre u. 36.,
            e-mail: info@baranyabekeltetes.hu, honlap: www.baranyabekeltetes.hu.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          9. Adatvédelem és vegyes rendelkezések
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>9.1.</strong> A weboldal Adatkezelési Tájékoztatója elérhető
            a [DOMAIN_NEV]/adatvedelem oldalon.
          </li>
          <li>
            <strong>9.2.</strong> A jelen ÁSZF-re a magyar jog az irányadó.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          Elállási nyilatkozat minta
        </h2>
        <p className="text-sm text-stone-600">
          (Csak a szerződéstől való elállási szándék esetén töltse ki és
          juttassa vissza.)
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Címzett:</strong> József Zoltán Ev., 7431 Juta, Búzavirág
            utca 21., [UGYFELSZOLGALATI_EMAIL]
          </li>
          <li>
            Alulírott kijelentem, hogy gyakorlom elállási/felmondási jogomat az
            alábbi termék(ek) adásvételére: [TERMÉK NEVE]
          </li>
          <li>Megrendelés időpontja / átvétel időpontja: [DÁTUM]</li>
          <li>Fogyasztó(k) neve: [NÉV]</li>
          <li>Fogyasztó(k) címe: [CÍM]</li>
          <li>
            Fogyasztó(k) aláírása (kizárólag papír alapú értesítés esetén):
            ______________________
          </li>
          <li>Dátum: [DÁTUM]</li>
        </ul>
      </div>
    </section>
  );
}
