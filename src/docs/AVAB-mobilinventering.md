# AVAB – mobilinventering och QA-plan

**Status:** Arbetsplan för fullständig mobilgranskning  
**Gäller för:** Alla publika AVAB-sidor  
**Standard:** `src/docs/AVAB-standard-mobil.md`  
**Senast uppdaterad:** 2026-08-15

## Syfte

Det här dokumentet beskriver hur hela AVAB-webbplatsen ska inventeras, prioriteras, åtgärdas och verifieras för mobil. Målet är att hitta återkommande grundproblem och lösa dem centralt innan sidspecifika korrigeringar görs.

Inventeringen ska inte bli en jakt på pixelperfektion sida för sida. Den ska först identifiera mönster: global CSS, delade komponenter, sidtyper och därefter enskilda undantag.

---

# Fas 0 – verifiera rätt kod mot rätt deployment

**Detta måste göras först.**

Skärmbilden från `test2.avab.eu` visar en mobilheader med hamburgermeny, medan `SiteHeader.astro` på aktuell `main` inte innehåller motsvarande hamburgarkontroll. Det kan betyda att testmiljön och repots `main` inte är exakt samma version.

Innan någon massändring görs:

- [ ] fastställ vilken branch/commit som är deployad på `test2.avab.eu`,
- [ ] verifiera att den lokala arbetskopian och den branch som ska ändras motsvarar testmiljön,
- [ ] kontrollera att testmiljön inte innehåller opushade eller serverunika ändringar,
- [ ] inventera vilka routes som faktiskt finns i deployment respektive repo,
- [ ] notera eventuella skillnader innan mobilfixar påbörjas.

**Stopregel:** Om test2 och arbetsbranchen inte motsvarar varandra ska avvikelsen lösas eller dokumenteras innan visuell inventering fortsätter.

---

# Fas 1 – bygg en sann route-lista

Utgå från aktiva publika routes i `src/pages/` och testmiljön.

### Ta med

- startsidan,
- kontakt och övriga huvudsidor,
- samtliga miljösidor,
- samtliga tjänstesidor,
- kunskapssidor,
- referensindex och samtliga publika referenser,
- kalkylatorer och andra interaktiva routes,
- policy-/informationssidor som är publika.

### Ta inte med som publika sidor utan särskilt skäl

- `index-gammal.*`,
- `index-ny ... trasig.*`,
- preview-HTML,
- `.txt`-kopior,
- zip-filer,
- andra tydligt arkiverade eller experimentella filer.

Skapa en inventeringsmatris med minst:

| Route | Sidtyp | 360 | 390 | 430 | 768 | Problem | Scope | Prioritet | Status |
|---|---|---|---|---|---|---|---|---|---|
| `/.../` | Miljö | ⬜ | ⬜ | ⬜ | ⬜ | – | – | – | Ej granskad |

Matrisen får ligga i detta dokument under sektionen **Inventeringsresultat** när arbetet körs.

---

# Fas 2 – kodinventering före visuell finjustering

Sök efter återkommande mobilrisker i hela kodbasen.

## Kontrollera särskilt

- fasta `width`, `min-width`, `height` och `min-height`,
- `100vw` kombinerat med padding/marginal,
- absolut/fixed-positionerade element,
- sticky header och andra sticky element,
- `overflow:hidden` som kan klippa innehåll,
- horisontell `overflow`,
- `display:none` och särskilt `display:none !important` i mobil-media queries,
- upprepade lokala `@media`-regler,
- `.button`, `.hero-actions`, `.cta-actions` och sidspecifika CTA-varianter,
- grids med stora `minmax()`/`min-width`,
- tabeller, iframes, video och embeds,
- formulärkontroller under 16 px text,
- element vars funktion bygger på hover,
- sidspecifik CSS som duplicerar regler från `avab.css`.

### Klassificera varje fynd

- **Globalt** – bör lösas i `avab.css` eller global token.
- **Komponent** – hör till t.ex. header/footer/kortkomponent.
- **Sidtyp/mall** – återkommer på flera miljö-, tjänste- eller referenssidor.
- **Sidspecifikt** – verkligt unikt fel på en route.

**Regel:** börja inte med sidspecifik patch om samma rotproblem finns på flera routes.

---

# Fas 3 – visuell inventering

## Primära viewport-storlekar

Varje publik sidtyp ska minst kontrolleras i:

- **360 px** bredd,
- **390 px** bredd,
- **430 px** bredd,
- **768 px** bredd.

Dessutom görs **320 px** som gränstest för overflow på representativa sidor och alla problemkomponenter.

## Kontroll per sida

### Header/navigation

- [ ] logotyp och menyknapp ryms,
- [ ] menyknapp har tillräcklig touchyta,
- [ ] mobilmenyn öppnas/stängs korrekt,
- [ ] inga menyobjekt går utanför skärmen,
- [ ] sticky header täcker inte innehåll eller ankarmål.

### Hero

- [ ] H1 är fullt synlig,
- [ ] ingress är läsbar och inte onödigt bred/lång,
- [ ] bakgrundsbild är meningsfullt beskuren,
- [ ] textkontrast är tillräcklig,
- [ ] CTA-gruppen följer mobilstandarden,
- [ ] hero är content-driven och inte onödigt hög,
- [ ] ingen text eller knapp klipps.

### CTA och länkar

- [ ] tydlig primary/secondary/tertiary-hierarki,
- [ ] touchytor minst 44 px,
- [ ] primära etiketter är korta nog,
- [ ] inga oproportionerligt höga två-/treradiga knappar,
- [ ] konsekvent spacing mellan knappar,
- [ ] inga viktiga handlingar kräver hover.

### Innehåll och grids

- [ ] kort faller till rätt antal kolumner,
- [ ] inget kort blir smalare än innehållet klarar,
- [ ] padding är rimlig,
- [ ] ingen horisontell scroll,
- [ ] inga fasta höjder klipper text,
- [ ] dold mobilinformation är motiverad.

### Bilder/media

- [ ] bilder ryms,
- [ ] huvudmotiv är inte felbeskuret,
- [ ] video/embed är responsiv,
- [ ] inga mediaelement orsakar layout shift/overflow.

### Formulär/interaktivitet

- [ ] fält är användbara med touch,
- [ ] inputtext minst 16 px,
- [ ] labels och felmeddelanden fungerar,
- [ ] kalkylatorer och specialkontroller ryms,
- [ ] resultat och submit-knappar är synliga,
- [ ] mobilens tangentbord gör inte kritiska kontroller oåtkomliga.

### Footer

- [ ] kolumner stackar begripligt,
- [ ] länkar har bra touchytor,
- [ ] inga långa strängar skapar overflow,
- [ ] logotyp och kontaktuppgifter ryms.

---

# Fas 4 – prioritering av fel

## P0 – blockerande

- innehåll/CTA är inte åtkomligt,
- kritisk navigation fungerar inte,
- formulär/kalkylator kan inte användas,
- allvarlig overflow gör sidan obrukbar,
- text eller viktiga kontroller klipps bort.

## P1 – hög

- återkommande globalt mobilfel,
- otydlig CTA-hierarki i hero,
- sticky header överlappar innehåll,
- stora layoutproblem på flera sidor,
- viktiga touchytor är för små,
- väsentligt innehåll döljs som mobilfix.

## P2 – normal

- spacing/typografi behöver förbättras,
- bildbeskärning är mindre bra,
- lokalt inkonsekvent kortlayout,
- sekundära komponenter känns trånga.

## P3 – polish

- små visuella förbättringar utan funktionell påverkan,
- mikrojusteringar av spacing eller animation.

---

# Fas 5 – åtgärdsordning

Arbeta i denna ordning:

1. **Deployment-/branch-paritet.**
2. **P0-fel.**
3. **Globala grundregler** – container, typografi, knappar, hero, overflow.
4. **Delade komponenter** – header, footer, återkommande kort/CTA.
5. **Sidtyper/mallar.**
6. **Sidspecifika undantag.**
7. **P2/P3-polish.**
8. **Full regression på samtliga routes.**

Varje global ändring ska regressionstestas på minst:

- startsidan,
- en miljösida,
- en tjänstesida,
- en referenssida,
- kontakt/formulär,
- kalkylator/interaktiv sida om sådan finns.

---

# Fas 6 – första kända fokusområde: CTA i hero

Utgångsläget på sporthallssidan har tre fullstora CTA:er:

1. `Skicka ritningar eller boka genomgång`
2. `Räkna på din hall`
3. `Se referenser`

På mobil blir alla 100 % breda genom den globala responsiva regeln. Den långa primära etiketten bryts och gör första knappen betydligt högre än de andra.

## Inventera innan fix

- hur många sidor använder `.hero-actions`,
- hur många hero-sektioner har 3+ CTA:er,
- vilka CTA-etiketter bryts vid 360/390 px,
- om samma problem finns i `.cta-actions`,
- om lokala stilar överstyr den globala `.button`-standarden.

## Önskad global riktning

- 52–56 px normal mobilhöjd,
- 12–16 px gap,
- högst två fullstora knappformade CTA:er i normal mobilhero,
- tredje handling görs tertiär,
- kortare verbdrivna etiketter där betydelsen kan behållas,
- samma hierarki på alla sidtyper.

Ändra inte alla CTA-texter automatiskt. Textändringar ska göras med bibehållen betydelse och vid behov granskas sida för sida.

---

# Fas 7 – kontroll av dolt mobilinnehåll

Inventera samtliga mobilregler som döljer innehåll.

För varje dolt block, klassificera som:

- **Duplicerat** – får normalt döljas om informationen finns tydligt kvar.
- **Dekorativt** – får döljas.
- **Sekundärt men värdefullt** – bör normalt behållas och layoutas om.
- **Väsentligt** – får inte döljas som layoutlösning.

Sporthallssidan använder i nuläget `.sporthall-mobile-secondary { display:none !important; }` på flera innehållsblock. Dessa ska granskas enligt ovan i stället för att automatiskt accepteras som önskad mobilstrategi.

---

# Fas 8 – regression och godkännande

Arbetet är inte färdigt förrän:

- [ ] samtliga aktiva routes finns i inventeringsmatrisen,
- [ ] alla P0 och P1 är åtgärdade eller explicit blockerade,
- [ ] 320 px gränstest inte visar horisontell sidscroll,
- [ ] 360/390/430 px är visuellt godkända,
- [ ] 768 px inte har brytpunktsregressioner,
- [ ] mobilmeny och sticky header fungerar,
- [ ] CTA-hierarki är konsekvent,
- [ ] inga viktiga block döljs utan motivering,
- [ ] formulär/kalkylatorer fungerar på mobil,
- [ ] build passerar,
- [ ] visuella skärmbildskontroller är genomförda.

Om browserautomation inte fungerar får uppgiften **inte** markeras som fullt verifierad. Dokumentera då vad som testats i kod och vad som återstår att kontrollera manuellt.

---

# Inventeringsresultat

_Fylls på när den faktiska inventeringen körs. Håll resultaten konkreta: route, viewport, problem, scope, prioritet och status. Stora tekniska implementationer ska inte dokumenteras här i detalj – länka hellre till relevant commit/PR._

_Ingen fullständig inventering genomförd ännu._
