# AVAB-standard – mobil och responsiv UI

**Status:** Active  
**Owner:** AVAB-projektet  
**Scope:** Alla publika sidor och delade komponenter  
**Last reviewed:** 2026-08-17  
**Replaces:** `src/docs/AVAB-standard-mobil.md`

## Syfte

AVAB ska ha ett sammanhängande responsivt designsystem, inte en separat och nedbantad mobildesign. Denna standard ska användas före sidspecifika mobilfixar. Om samma problem finns på flera sidor ska grundorsaken lösas i delad CSS, komponent eller mall.

## Grundprinciper

1. **Global lösning före lokal patch.** Kontrollera `src/styles/avab.css` och delade komponenter innan sidspecifik CSS läggs till.
2. **Mobil får inte vara en trasig desktop.** Layout, innehållshierarki och CTA ska fungera naturligt på liten skärm.
3. **Dölj inte problem.** Viktigt innehåll får inte tas bort med `display:none` bara för att layouten är svår.
4. **Ingen horisontell sidscroll** för normal text, kort, formulär, tabeller eller CTA.
5. **En tydlig primär handling per sektion.**
6. **Tillgänglighet är en del av mobilstandarden.**
7. **Verifiera faktisk rendering.** Kodändring är inte klar utan visuell kontroll.

## Obligatoriska kontrollbredder

- **320 px** – gränstest; ingen overflow eller klippt UI.
- **360 px** – liten mobil.
- **390 px** – primär mobilreferens.
- **430 px** – större mobil.
- **768 px** – tablet/övergång.

Vid problem med navigation eller komponentövergång ska även befintliga brytpunkter omkring 820, 900, 1024 och 1120 px verifieras. Designa inte för en särskild telefonmodell; layouten ska fungera kontinuerligt.

## Container och spacing

- Huvudinnehåll ska normalt ha minst **16 px** sidmarginal på mobil.
- Undvik dubbla paddings som gör innehållet onödigt smalt.
- Normal vertikal sektionspadding på mobil: cirka **48–64 px**.
- Relaterade element: cirka **8–16 px** mellanrum.
- Större innehållsblock: cirka **24–40 px**.
- Återkommande spacing ska centraliseras i designsystemet.

## Knappar och CTA

- Minsta klick-/touchyta: **44 × 44 px**.
- Normal AVAB-CTA på mobil bör ha cirka **52–56 px minhöjd**.
- Knapptext normalt **16–18 px**.
- Primär CTA bör helst rymmas på en rad vid 360–390 px.
- CTA-grupp: **Primary**, **Secondary**, **Tertiary**.
- Hero bör normalt ha högst **två fullstora knappformade CTA:er**; tredje handling görs tertiär.
- CTA ska vara kort och verbdriven, t.ex. `Skicka ritningar`, `Räkna på din hall`, `Se referenser`.
- Rekommenderat gap mellan staplade CTA:er: **12–16 px**.
- Använd inte `!important` som normal layoutlösning.

## Hero

- Hero ska vara content-driven; undvik hårda höjder.
- H1, ingress och primär CTA ska ha tydlig läsordning.
- Sticky header får inte dölja H1 eller ankarmål.
- H1 bör normalt ligga ungefär **36–48 px** på mobil beroende på textlängd.
- Ingress bör normalt vara minst **16 px**.
- Bakgrundsbildens beskärning och kontrast ska verifieras på mobil.
- Tre eller fler starka CTA:er ska omprioriteras.

## Header och mobilmeny

- Mobilheader ska ha stabil höjd.
- Logotyp får inte trycka undan menyknapp.
- Menyknapp minst **44 × 44 px**, helst cirka 48 px.
- Header får inte täcka innehåll.
- Menyn ska fungera med touch och tangentbord, ha tydligt fokus och inte skapa overflow.
- Body-scroll och meny-scroll ska fungera för långa menyer.

## Typografi

- Brödtext minst **16 px**.
- Formfält minst **16 px** för att undvika oönskad iOS-zoom.
- Rubriker ska skala responsivt, t.ex. med `clamp()`.
- Text får inte klippas av fasta höjder eller `overflow:hidden`.
- Långa obrutna strängar får inte skapa overflow.

## Kort, grids och innehållsblock

- Flerkolumnslayout ska falla ihop innan kort blir för smala.
- Kort får inte ha `min-width` större än mobilbredden.
- Normal kortpadding på mobil bör vara cirka **20–28 px**.
- Samma korttyp ska ha konsekvent padding och typografi.
- Hover får aldrig vara enda sättet att visa viktig information.
- Dold mobilinformation ska kunna motiveras.
- För standardiserade innehållskort är **en kolumn på mobil default**; två kolumner får användas endast när innehållet fortfarande är läsbart och touchvänligt.

## Bilder och media

- Bilder ska vara responsiva och behålla rimligt bildförhållande.
- Viktiga bilder bör ha dimensioner/aspect-ratio där det minskar layout shift.
- `object-fit: cover` får inte kapa huvudmotivet fel.
- Video, iframe och embeds får aldrig bli bredare än viewport.

## Formulär

- Fält ska vara naturligt mobilanpassade, normalt fullbredd.
- Inputtext minst 16 px.
- Labels ska vara synliga och korrekt kopplade.
- Felmeddelanden ska ligga nära fältet utan overflow.
- Checkbox/radio med label ska ha tillräcklig touchyta.
- Tangentbordet får inte göra kritiska kontroller oåtkomliga.

## Tabeller, kalkylatorer och specialkomponenter

- Tabeller ska omformas, ligga i tydlig egen scroll-wrapper eller presenteras som kort/lista.
- Kalkylatorer ska kunna användas utan horisontell sidscroll.
- Sticky element får inte överlappa kontroller.
- Resultat, pris och felstatus måste vara synliga.
- Specialkomponenter testas minst på 320, 360 och 390 px.

## Tillgänglighet och interaktion

- touchmål minst 44 × 44 px
- tydlig `:focus-visible`
- stöd för `prefers-reduced-motion`
- ingen funktion som kräver hover
- tillräcklig kontrast
- sidan ska fungera vid zoom
- meningsfull tabbordning
- inga viktiga kontroller utanför viewport

## CSS och implementation

1. Återanvänd klasser och tokens innan nya skapas.
2. Mobilfix som gäller flera sidor hör normalt hemma i `src/styles/avab.css` eller delad komponent.
3. Sidspecifik CSS används endast för verkligt unikt beteende.
4. Undvik duplicerade media queries med nästan samma regler.
5. Undvik `!important` om inte ett dokumenterat arv/third-party-krav kräver det.
6. Ta bort/konsolidera gammal mobil-CSS när en global lösning ersätter den.
7. Stor global CSS-ändring kräver regressionstest på flera sidtyper.

## Definition of Done

En sida är inte mobilgodkänd förrän:

- [ ] ingen horisontell sidscroll finns vid 320, 360, 390 och 430 px
- [ ] header/meny fungerar utan att täcka innehåll
- [ ] rubriker och brödtext är fullt läsbara
- [ ] CTA-hierarki och touchytor är korrekta
- [ ] grids/kort faller ihop utan overflow
- [ ] bilder/media är responsiva och korrekt beskurna
- [ ] formulär fungerar utan oönskad zoom/overflow
- [ ] inget viktigt innehåll har dolts som layoutlösning
- [ ] 360, 390, 430 och 768 px är visuellt kontrollerade
- [ ] build och relevanta tester passerar
- [ ] resultatet är faktiskt verifierat

## Känt exempel: sporthallens hero

Sporthallens mobilhero har visat typiska problem: tre konkurrerande CTA:er, lång primär knapptext och möjlig header/rubrik-överlappning. Rätt riktning är en primary, en secondary och vid behov en tertiär handling. Lösningen ska göras global när samma mönster återkommer.
