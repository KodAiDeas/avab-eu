# AVAB-standard – mobil UI

**Status:** Gällande projektstandard  
**Gäller för:** Alla publika sidor och delade komponenter i AVAB-webbplatsen  
**Senast uppdaterad:** 2026-08-15

## Syfte

Den här standarden definierar hur AVAB:s webbplats ska fungera och upplevas på mobil och mindre skärmar. Målet är inte att skapa en separat mobildesign, utan att samma designsystem ska fungera konsekvent från liten mobil till desktop.

Standarden ska användas före sidspecifika mobilfixar. Om samma problem finns på flera sidor ska grundorsaken lösas i delad CSS, komponent eller mall i stället för att kopieras till varje sida.

---

## 1. Grundprinciper

1. **Global lösning före lokal patch.** Kontrollera `src/styles/avab.css` och delade komponenter innan sidspecifik CSS läggs till.
2. **Mobil får inte vara en nedbantad trasig desktop.** Layout, innehållshierarki och CTA ska fungera naturligt på liten skärm.
3. **Dölj inte problem.** Viktigt innehåll får inte tas bort med `display:none` bara för att layouten är svår. Döljning är bara acceptabel för tydligt duplicerat, dekorativt eller sekundärt innehåll när samma information finns kvar på annat sätt.
4. **Inga horisontella nödlösningar.** Sidan ska inte kräva horisontell scroll för normal text, kort, formulär, tabeller eller CTA.
5. **En tydlig primär handling per sektion.** Flera lika starka CTA:er skapar sämre hierarki på mobil.
6. **Tillgänglighet är en del av mobilstandarden.** Touchytor, fokus, kontrast, textstorlek och zoom ska fungera.
7. **Verifiera faktisk rendering.** En kodändring är inte klar förrän den har kontrollerats visuellt i relevanta viewport-storlekar.

---

## 2. Viewports och brytpunkter

AVAB har redan flera responsiva brytpunkter i det globala designsystemet. Nya sidspecifika brytpunkter ska inte skapas utan tydligt behov.

### Obligatoriska kontrollbredder

- **320 px** – minsta gränskontroll; ingen overflow eller klippt UI.
- **360 px** – liten vanlig mobil.
- **390 px** – primär iPhone-referens.
- **430 px** – större mobil.
- **768 px** – tablet/små skärmar och övergång till desktoplayout.

Vid problem med navigation eller komponentövergång ska även befintliga brytpunkter omkring 820, 900, 1024 och 1120 px verifieras.

**Regel:** Designa inte för en viss telefonmodell. Designa så att layouten fungerar kontinuerligt mellan brytpunkterna.

---

## 3. Mobil container och spacing

- På mobil ska huvudinnehåll normalt ha minst **16 px sidmarginal**.
- Undvik dubbla paddings där komponent + container tillsammans gör innehållet onödigt smalt.
- Sektioner ska vara luftiga men inte desktop-höga. Normal mobil vertikal sektion-padding bör ligga ungefär **48–64 px**, beroende på innehåll.
- Avstånd mellan tätt relaterade element: cirka **8–16 px**.
- Avstånd mellan större innehållsblock: cirka **24–40 px**.
- Använd gemensamma värden i designsystemet när samma spacing återkommer.

---

## 4. Knappar och CTA

### Storlek

- Minsta klick-/touchyta: **44 × 44 px**.
- Normal AVAB-CTA på mobil bör ha cirka **52–56 px minhöjd**.
- Knapptext ska normalt vara **16–18 px**, tydlig och fet.
- Mobil padding ska inte vara så stor att normala CTA-texter bryts i onödan.
- Text får brytas till två rader när det verkligen behövs, men en primär CTA bör helst få plats på en rad vid 360–390 px.

### Hierarki

I en CTA-grupp används:

1. **Primary** – viktigaste nästa steget, AVAB-grön.
2. **Secondary** – alternativ handling, ljus/neutral.
3. **Tertiary** – lägre prioritet; textlänk eller visuellt nedtonad knapp.

På mobil bör en hero normalt ha **högst två fullstora knappformade CTA:er**. En tredje handling ska normalt göras tertiär i stället för att konkurrera med huvudhandlingen.

### Text

CTA ska vara verbdrivna och korta. Exempel:

- `Skicka ritningar`
- `Räkna på din hall`
- `Se referenser`

Undvik att försöka pressa både handling och förklaring in i samma knapp. Hjälptext kan ligga bredvid/under CTA om den behövs.

### Mobillayout

- Full bredd inom innehållskolumn är tillåten och ofta bra, men knapparna ska inte bli onödigt höga.
- Rekommenderat gap mellan staplade CTA:er: **12–16 px**.
- Alla knappar i samma grupp ska ha konsekvent höjd, typografi, radius och alignment.
- Använd inte `!important` som normal lösning för CTA-layout.

---

## 5. Hero

- Hero ska vara **content-driven** på mobil; undvik hårda höjder som skapar stora tomrum eller kapar innehåll.
- Rubrik, ingress och primär CTA ska få en tydlig läsordning.
- Sticky header får aldrig dölja hero-rubrik vid initial laddning eller efter ankarlänk.
- H1 ska normalt ligga ungefär inom **36–48 px** på mobil beroende på textlängd.
- H1 ska inte klippas, gå utanför viewport eller skapa enstaka orimligt smala ordkolumner.
- Ingress bör normalt vara minst **16 px** och ha läsbar radlängd.
- Bakgrundsbildens `object-position`/positionering ska kontrolleras på mobil, inte bara desktop.
- Overlay måste ge tillräcklig kontrast bakom all text.
- Tre eller fler starka CTA:er i hero ska omprioriteras enligt CTA-reglerna ovan.

---

## 6. Sticky header och mobilmeny

- Mobilheader ska ha stabil höjd och inte hoppa mellan lägen.
- Logotyp får inte trycka undan menyknappen.
- Hamburger-/menyknapp ska ha minst **44 × 44 px** klickyta, helst cirka 48 px.
- Headern får inte täcka innehåll när sidan öppnas eller när användaren följer ankarlänkar.
- Mobilmenyn ska kunna användas med touch och tangentbord och ha tydlig fokusmarkering.
- Menyn ska inte skapa horisontell overflow.
- Body-scroll och meny-scroll ska fungera för långa menyer.

---

## 7. Typografi

- Brödtext: minst **16 px** på mobil.
- Formfält: minst **16 px** text för att undvika oönskad iOS-zoom.
- Rubriker ska skala med `clamp()` eller motsvarande, inte med hårda desktopstorlekar.
- Ingen text får klippas av `height`, `overflow:hidden` eller fasta minhöjder avsedda för desktop.
- Undvik långa obrutna strängar som kan skapa overflow.
- Länkar i löptext måste fortfarande vara tydligt identifierbara på touchskärm.

---

## 8. Kort, grids och innehållsblock

- Flerkolumnslayout ska falla till en kolumn innan korten blir för smala.
- Kort ska inte ha `min-width` som överstiger tillgänglig mobilbredd.
- Normal kortpadding på mobil bör vara ungefär **20–28 px**.
- Samma typ av kort ska ha konsekvent padding och typografi.
- Hover-effekter får aldrig vara enda sättet att visa viktig information.
- Innehåll som är dolt på mobil ska inventeras och motiveras.

---

## 9. Bilder och media

- Bilder ska normalt använda `max-width:100%` och behålla rimligt bildförhållande.
- Viktiga bilder ska ha definierade dimensioner eller aspect-ratio där det hjälper mot layout shift.
- `object-fit:cover` får inte kapa bort bildens viktiga motiv på mobil; kontrollera `object-position`.
- Video, iframe och embed ska vara responsiva och aldrig bredare än viewport.
- Bildtext och kontroller ska fungera på touchskärm.

---

## 10. Formulär

- Alla fält ska vara fullbredd eller naturligt mobilanpassade.
- Inputtext minst 16 px.
- Labels ska vara synliga och kopplade till rätt fält.
- Felmeddelanden ska ligga nära fältet och inte orsaka overflow.
- Checkbox/radio och tillhörande etikett ska ha tillräcklig touchyta.
- Submit-CTA följer samma knappstandard som övriga CTA:er.
- Tangentbordet på mobil får inte göra kritiska kontroller oåtkomliga.

---

## 11. Tabeller, kalkylatorer och specialkomponenter

- Tabeller ska omformas, scrollas inom en tydlig egen wrapper eller presenteras som kort/lista på mobil.
- Kalkylatorer ska kunna användas med en hand utan horisontell scroll.
- Sticky element får inte överlappa formulärkontroller.
- Resultat, pris och felstatus får inte försvinna utanför viewport.
- Alla interaktiva specialkomponenter ska testas med 320, 360 och 390 px bredd.

---

## 12. Tillgänglighet och interaktion

Följ minst följande:

- touchmål minst 44 × 44 px,
- tydlig `:focus-visible`,
- stöd för `prefers-reduced-motion`,
- ingen funktion som kräver hover,
- tillräcklig färgkontrast,
- sidan ska fungera vid zoom,
- meningsfull tabbordning,
- inga viktiga kontroller utanför viewport.

---

## 13. Regler för CSS och implementation

1. Återanvänd befintliga klasser och tokens innan nya skapas.
2. Om en mobilfix gäller flera sidor ska den normalt ligga i `src/styles/avab.css` eller delad komponent.
3. Sidspecifik CSS används endast när beteendet verkligen är unikt för sidan.
4. Undvik duplicerade media queries med nästan samma regler.
5. Undvik `!important` om inte ett dokumenterat arv/third-party-krav gör det nödvändigt.
6. Ta bort eller konsolidera gammal mobil-CSS när en global lösning ersätter den.
7. Gör inte en stor global CSS-ändring utan regressionstest på flera sidtyper.

---

## 14. Definition of Done – mobil

En sida är inte mobilgodkänd förrän:

- [ ] ingen horisontell sidscroll finns vid 320, 360, 390 och 430 px,
- [ ] header och meny fungerar och täcker inte innehåll,
- [ ] rubriker och brödtext är fullt läsbara,
- [ ] CTA-hierarkin är tydlig och knappar har korrekta touchytor,
- [ ] primära CTA:er är rimligt korta och inte onödigt höga,
- [ ] grids/kort faller ihop utan overflow,
- [ ] bilder/media är korrekt beskurna och responsiva,
- [ ] formulär kan användas utan iOS-zoom eller horisontell scroll,
- [ ] inget viktigt innehåll har dolts enbart för att lösa layoutproblem,
- [ ] visuella kontroller har gjorts på minst 360, 390 och 430 px,
- [ ] 768 px har kontrollerats för brytpunktsregression,
- [ ] build och relevanta tester passerar,
- [ ] resultatet har verifierats, inte bara antagits utifrån CSS-koden.

---

## 15. Exempel: sporthallens hero

Den nuvarande sporthallsvyn visar varför standarden behövs:

- tre fullbredda CTA:er konkurrerar på mobil,
- den primära CTA-texten är så lång att knappen blir två rader och oproportionerligt hög,
- de tre knapparna får nästan samma visuella tyngd,
- hero blir mycket lång innan nästa innehåll börjar,
- skärmbilden indikerar möjlig rubrik/header-överlappning som måste verifieras mot korrekt scrollposition och deploy-version.

**Önskad riktning:** behåll en tydlig primär CTA, en sekundär CTA och gör tredje valet tertiärt; korta primär CTA där det kan göras utan att förlora betydelse. Lös beteendet globalt när samma CTA-mönster används på fler sidor.
