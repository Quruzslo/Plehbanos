export default function Adatvedelem() {
  return (
    <section className="w-full flex flex-col pt-[100px] lg:pt-[150px] pb-20 bg-stone-100 text-stone-800">
      <div className="w-[90%] max-w-4xl mx-auto flex flex-col gap-6 leading-relaxed">
        <h1 className="text-3xl lg:text-4xl font-bold text-stone-900">
          Adatkezelési Tájékoztató
        </h1>

        <p>
          A/Az <strong>József Zoltán Ev.</strong> (7431 Juta, Búzavirág utca
          21., adószám: [ADOSZAM], nyilvántartási szám:
          [EV_NYILVANTARTASI_SZAM]) (a továbbiakban: Szolgáltató, Adatkezelő)
          jelen adatkezeléseire az alábbi tájékoztatóban foglaltak szerint kerül
          sor.
        </p>

        <p>
          A természetes személyeknek a személyes adatok kezelése tekintetében
          történő védelméről és az ilyen adatok szabad áramlásáról, valamint a
          95/46/EK rendelet hatályon kívül helyezéséről (általános adatvédelmi
          rendelet) AZ EURÓPAI PARLAMENT ÉS A TANÁCS (EU) 2016/679 RENDELETE
          (GDPR) szerint az alábbi tájékoztatást adjuk.
        </p>

        <p>
          Jelen adatvédelmi tájékoztató az alábbi weboldal adatkezelését
          szabályozza: https://[DOMAIN_NEV]. Az adatkezelési tájékoztató
          folyamatosan elérhető a következő oldalról: [DOMAIN_NEV]/adatvedelem.
        </p>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          1. Az Adatkezelő és elérhetőségei
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Név:</strong> József Zoltán Ev.
          </li>
          <li>
            <strong>Székhely:</strong> 7431 Juta, Búzavirág utca 21.
          </li>
          <li>
            <strong>Egyéni vállalkozói nyilvántartási szám:</strong>{" "}
            [EV_NYILVANTARTASI_SZAM]
          </li>
          <li>
            <strong>Adószám:</strong> [ADOSZAM]
          </li>
          <li>
            <strong>E-mail:</strong> [UGYFELSZOLGALATI_EMAIL]
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          2. Fogalom meghatározások
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Személyes adat:</strong> azonosított vagy azonosítható
            természetes személyre („érintett”) vonatkozó bármely információ
            (például név, lakcím, telefonszám, e-mail cím, online azonosító).
          </li>
          <li>
            <strong>Adatkezelés:</strong> a személyes adatokon végzett bármely
            művelet (gyűjtés, rögzítés, tárolás, lekérdezés, továbbítás,
            törlés).
          </li>
          <li>
            <strong>Adatkezelő:</strong> az a személy, aki a személyes adatok
            kezelésének céljait és eszközeit meghatározza (jelen esetben József
            Zoltán Ev.).
          </li>
          <li>
            <strong>Adatfeldolgozó:</strong> az a személy vagy cég, aki az
            adatkezelő nevében személyes adatokat kezel (például
            tárhelyszolgáltató, számlázó rendszer).
          </li>
          <li>
            <strong>Harmadik fél:</strong> olyan szervezet, amely saját nevében
            kezeli a részére jogszerűen továbbított adatokat (például
            futárszolgálat).
          </li>
          <li>
            <strong>Adatvédelmi incidens:</strong> a biztonság olyan sérülése,
            amely a kezelt személyes adatok véletlen vagy jogellenes
            megsemmisítését, elvesztését vagy jogosulatlan közlését eredményezi.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          3. A személyes adatok kezelésére vonatkozó alapelvek
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Jogszerűség, tisztességes eljárás és átláthatóság:</strong>{" "}
            az adatkezelést jogszerűen és az érintett számára átlátható módon
            végezzük.
          </li>
          <li>
            <strong>Célhoz kötöttség:</strong> az adatok gyűjtése csak
            meghatározott, egyértelmű és jogszerű célból történik.
          </li>
          <li>
            <strong>Adattakarékosság:</strong> kizárólag a cél eléréséhez
            szükséges személyes adatokat kérjük el és kezeljük.
          </li>
          <li>
            <strong>Pontosság:</strong> minden észszerű intézkedést megteszünk a
            pontatlan adatok haladéktalan helyesbítése vagy törlése érdekében.
          </li>
          <li>
            <strong>Korlátozott tárolhatóság:</strong> az adatokat csak a
            kezelés céljának eléréséhez, illetve a jogszabályban előírt
            időtartamig tároljuk.
          </li>
          <li>
            <strong>Integritás és bizalmas jelleg:</strong> megfelelő technikai
            és szervezési intézkedésekkel (HTTPS titkosítás, jelszóvédelem)
            biztosítjuk az adatok biztonságát.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          4. A megrendelések teljesítéséhez kapcsolódó adatkezelés
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Vezeték- és keresztnév:</strong> kapcsolatfelvételhez, a
            vásárláshoz és a szabályszerű számla kiállításához szükséges.
            (Jogalap: szerződés teljesítése – GDPR 6. cikk (1) b) pont).
          </li>
          <li>
            <strong>E-mail cím és telefonszám:</strong> kapcsolattartás, a
            megrendelés visszaigazolása és a futárszolgálat kézbesítési
            értesítései. (Jogalap: szerződés teljesítése – GDPR 6. cikk (1) b)
            pont).
          </li>
          <li>
            <strong>Szállítási név és cím:</strong> a megrendelt termékek házhoz
            szállításának lehetővé tétele. (Jogalap: szerződés teljesítése –
            GDPR 6. cikk (1) b) pont).
          </li>
          <li>
            <strong>Számlázási név és cím (cég esetén adószám):</strong> a
            számviteli törvénynek megfelelő számla kiállítása és megőrzése.
            (Jogalap: jogi kötelezettség teljesítése – GDPR 6. cikk (1) c) pont,
            2000. évi C. törvény 169. § (2) bekezdés).
          </li>
          <li>
            <strong>A vásárlás időpontja és technikai adatok:</strong> a
            megrendelés technikai végrehajtása és bizonyíthatósága. (Jogalap:
            szerződés teljesítése – GDPR 6. cikk (1) b) pont).
          </li>
          <li>
            <strong>Adatkezelés időtartama:</strong> A számviteli bizonylatokat
            (számlákat) a számviteli törvény alapján <strong>8 évig</strong>{" "}
            kötelező megőrizni. A szerződéses rendelési adatokat a polgári jogi
            elévülési idő végéig (<strong>5 évig</strong>) tároljuk. Az
            adatszolgáltatás elmaradása esetén a megrendelést nem tudjuk
            feldolgozni és teljesíteni.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          5. Ajánlatkérés és kapcsolatfelvétel (bádogos szolgáltatások)
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Kezelt adatok köre:</strong> név, e-mail cím, telefonszám,
            valamint az üzenetben megadott helyszíni és műszaki adatok.
          </li>
          <li>
            <strong>Adatkezelés célja és jogalapja:</strong> helyszíni felmérés
            egyeztetése, egyedi árajánlat készítése és kérdések megválaszolása
            az érintett önkéntes hozzájárulása, illetve szerződéskötést megelőző
            lépések megtétele alapján (GDPR 6. cikk (1) a) és b) pont).
          </li>
          <li>
            <strong>Adatkezelés időtartama:</strong> amennyiben nem jön létre
            szerződés, az ajánlatkérés vagy kapcsolatfelvétel lezárását követő
            legfeljebb <strong>2 évig</strong>.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          6. Panaszkezeléshez kapcsolódó adatkezelés
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Kezelt adatok köre:</strong> vezeték- és keresztnév, e-mail
            cím, telefonszám, lakcím / számlázási cím, a panasz leírása.
          </li>
          <li>
            <strong>Jogalap és cél:</strong> minőségi kifogások, panaszok
            kivizsgálása és megválaszolása jogi kötelezettség teljesítése
            alapján (GDPR 6. cikk (1) c) pont; a fogyasztóvédelemről szóló 1997.
            évi CLV. törvény 17/A. § (7) bekezdése).
          </li>
          <li>
            <strong>Megőrzési idő:</strong> a panaszról felvett jegyzőkönyvet és
            az arra adott érdemi választ a törvény előírása alapján{" "}
            <strong>3 évig</strong> kötelesek vagyunk megőrizni.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          7. Sütik (Cookie-k), Google Search Console és Google Analytics
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>7.1. Működéshez elengedhetetlen tárolás:</strong> A webshop
            alapvető működéséhez (például a kosár tartalmának megőrzéséhez a
            pénztár folyamat végéig) technikailag szükséges böngészőbeli
            tárolást alkalmazunk. Ezekhez nem szükséges előzetes hozzájárulás,
            és nem továbbítanak személyes adatot harmadik félnek.
          </li>
          <li>
            <strong>7.2. Google Search Console:</strong> A weboldal
            keresőmotoros megjelenésének és technikai hibáinak ellenőrzésére a
            Google Search Console szolgáltatását használjuk (Google Ireland
            Limited, Gordon House, Barrow Street, Dublin 4, Írország). A
            szolgáltatás nem helyez el sütiket a látogatók eszközén, és nem
            gyűjt személyes adatokat.
          </li>
          <li>
            <strong>7.3. Google Analytics:</strong> A honlap látogatottsági
            statisztikáinak elemzésére a Google Analytics szolgáltatását
            alkalmazzuk (Google Ireland Limited). A szolgáltatás sütiket
            (cookie-kat) használ a weboldal használatának anonimizált
            elemzéséhez (statisztikai célú adatkezelés, amely kizárólag a
            látogató hozzájárulása alapján – GDPR 6. cikk (1) a) pont – lép
            működésbe). A sütik tárolását böngészője beállításaiban bármikor
            letilthatja vagy törölheti.
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          8. Címzettek, adatfeldolgozók és adattovábbítás
        </h2>
        <p>
          A megrendelések teljesítése és a weboldal üzemeltetése érdekében az
          alábbi partnerek részére kerülnek továbbításra a szükséges adatok:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Tárhely- és szerverszolgáltató (adatfeldolgozó):</strong>{" "}
            [VPS_SZOLGALTATO_NEVE_ES_CIM_EMAIL] – a weboldal és a rendelési
            adatok technikai tárolása.
          </li>
          <li>
            <strong>Online számlázás és könyvelés (adatfeldolgozó):</strong>{" "}
            [SZAMLAZO_PROGRAM_NEVE_CIM_EMAIL] – a számlák kiállítása és
            számviteli feldolgozása.
          </li>
          <li>
            <strong>
              Fuvarozás és utánvétkezelés (harmadik fél adatkezelő):
            </strong>{" "}
            GLS General Logistics Systems Hungary Csomag-Logisztikai Kft. (2351
            Alsónémedi, GLS Európa u. 2., info@gls-hungary.com) – a megrendelt
            termékek kiszállítása és az utánvét összegének beszedése érdekében
            (továbbított adatok: név, szállítási cím, telefonszám, e-mail cím,
            utánvét összege).
          </li>
        </ul>

        <h2 className="text-xl lg:text-2xl font-semibold text-stone-900 mt-4">
          9. Az érintettek jogai és jogorvoslati lehetőségek
        </h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong>Érintetti jogok:</strong> Ön jogosult tájékoztatást és
            hozzáférést kérni a kezelt személyes adataihoz, kérheti azok
            helyesbítését, törlését („elfeledtetéshez való jog”), az adatkezelés
            korlátozását, élhet az adathordozhatósághoz való jogával, illetve
            tiltakozhat az adatkezelés ellen, és bármikor visszavonhatja a
            hozzájárulását.
          </li>
          <li>
            <strong>Kérelmek benyújtása és határidő:</strong> Kérelmeit postai
            úton a 7431 Juta, Búzavirág utca 21. címen vagy e-mailben a
            [UGYFELSZOLGALATI_EMAIL] címen nyújthatja be. Kérelmére indokolatlan
            késedelem nélkül, de legkésőbb <strong>1 hónapon belül</strong>{" "}
            válaszolunk.
          </li>
          <li>
            <strong>Adatbiztonság és incidenskezelés:</strong> A személyes
            adatokat titkosított kapcsolaton (HTTPS) és jogosultságkezeléssel
            védett szerveren tároljuk. Esetleges magas kockázatú adatvédelmi
            incidens esetén 72 órán belül értesítjük a hatóságot és az
            érintetteket.
          </li>
          <li>
            <strong>Panasztételi lehetőség (NAIH):</strong> Jogainak megsértése
            esetén panasszal fordulhat a Nemzeti Adatvédelmi és
            Információszabadság Hatósághoz (1055 Budapest, Falk Miksa utca
            9-11., levelezési cím: 1363 Budapest, Pf. 9., telefon:
            +36-1-391-1400, e-mail: ugyfelszolgalat@naih.hu, web:
            https://www.naih.hu).
          </li>
        </ul>

        <p className="text-sm text-stone-600 mt-4">
          Hatályos: 2026. [HONAP_NAP]. napjától.
        </p>
      </div>
    </section>
  );
}
