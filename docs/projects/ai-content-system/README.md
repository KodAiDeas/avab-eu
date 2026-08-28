# Projekt: AI-baserat innehållssystem för AVAB

**Status:** Active  
**Start:** 2026-08-17  
**Mål:** Göra det säkert och konsekvent att skapa och ändra AVAB-sidor via ChatGPT, Claude och andra AI-klienter utan krav på VS Code.

## Effektmål

Kunden ska kunna beskriva innehållet för en ny sida i naturligt språk. AI ska därefter kunna identifiera rätt sidtyp, läsa rätt regler, använda rätt komponenter/content model, validera resultatet och lämna ändringen som branch/PR för granskning.

AI ska i normalfallet ändra innehåll och data – inte uppfinna ny design eller duplicera sidkod.

## Grundprinciper

- GitHub är gemensam sanningskälla för kod, standarder och workflows.
- `TODO.md` är enda levande listan för öppet arbete.
- Designregler ska så långt möjligt enforce:as genom komponenter, schemas och tester.
- Nya innehållssidor ska inte byggas som stora fristående kopior av befintliga `index.astro`.
- AI-arbete ska ske via branch + PR, inte direkt mot `main`.
- Innehållsarbete och ändringar i designsystemet ska ha olika risknivå och olika tillåtna scopes.

---

# Fas 0 – Baseline och säkerhetsram

## Mål
Fastställ nuläge innan omstrukturering.

## Arbete
- Inventera aktiva dokument, dubbleringar, konceptfiler och gamla arbetskopior.
- Inventera sidtyper: referens, miljö, tjänst, kunskap, special/landningssida.
- Inventera hur mycket markup/CSS som dupliceras mellan sidor.
- Fastställ branch/PR-policy för AI.
- Definiera vilka filer en innehållsagent normalt får ändra.

## Leverabler
- dokumentinventering
- sidtypskarta
- behörighets-/scope-regler
- migrationslista

## Exit criterion
Ingen större filflytt eller template-refaktor startar innan sanningskällor och scope är identifierade.

---

# Fas 1 – Dokumentationssystem

## Mål
Skapa en enda tydlig struktur för all projektkunskap.

## Arbete
- Migrera `src/docs/` till `docs/` enligt dokumenttypen.
- Klassificera varje befintlig fil som Active, Draft, Deprecated eller Archived.
- Slå ihop överlappande regler.
- Rätta interna länkar och TODO-referenser.
- Normalisera namn till kebab-case.
- Lägg ersatta koncept och historik i `docs/archive/` när de fortfarande har värde.

## Målstruktur
```text
docs/
├── README.md
├── standards/
│   ├── global/
│   │   ├── design-system.md
│   │   ├── mobile.md
│   │   ├── seo.md
│   │   ├── accessibility.md
│   │   └── images.md
│   └── pages/
│       ├── reference.md
│       ├── environment.md
│       ├── service.md
│       └── knowledge.md
├── workflows/
│   ├── create-reference.md
│   ├── create-page.md
│   ├── modify-page.md
│   └── mobile-qa.md
├── architecture/
│   ├── documentation-rules.md
│   ├── content-model.md
│   ├── page-types.md
│   └── ai-write-scope.md
├── projects/
│   └── ai-content-system/
└── archive/
```

## Exit criterion
En ny AI-session ska kunna börja i `AGENTS.md` + `docs/README.md` och entydigt hitta rätt regel för en uppgift.

---

# Fas 2 – Sidtyper och designsystem

## Mål
Flytta konsekvens från instruktioner till kod.

## Arbete
- Definiera fasta sidtyper och deras ansvar.
- Inventera gemensamma sektioner: hero, breadcrumbs, fakta, kort, bildgalleri, CTA, relaterat innehåll.
- Skapa/normalisera delade komponenter.
- Flytta återkommande styling från sidspecifik CSS till komponent/global CSS.
- Dokumentera tillåtna variationer per sidtyp.

## Viktig regel
En AI ska inte behöva återskapa designen för en referenssida. Den ska fylla en redan definierad referensmodell.

## Exit criterion
Representativa sidor för varje sidtyp kan byggas med delade primitives utan kopierad fullsidig markup/CSS.

---

# Fas 3 – Content model och schemas

## Mål
Separera innehåll från presentation.

## Arbete
- Bestäm om Astro Content Collections/content files eller typed data är bäst per sidtyp.
- Definiera schema för metadata, SEO, bilder, relationer och sidsektioner.
- Validera obligatoriska fält vid build.
- Skapa kontrollerade enums där fri text skapar risk, exempelvis sidtyp/kategori.
- Definiera draft/publication-status.

## Referenser först
Referenser används som pilot eftersom projektet redan har `ReferenceCard.astro`, `src/data/referenser.ts` och en dokumenterad ambition att separera frontmatter från layout.

## Exit criterion
En ny pilot-referens kan skapas huvudsakligen som strukturerad data/innehåll och renderas utan unik sidlayout.

---

# Fas 4 – AI-workflows

## Mål
Göra AI-användningen reproducerbar mellan ChatGPT, Claude och Codex.

## Arbete
- Skapa workflow för `create-reference`.
- Skapa generellt workflow för ny miljö-/tjänste-/kunskapssida.
- Definiera vilka uppgifter AI måste efterfråga om de saknas.
- Definiera vad AI får föreslå men inte hitta på.
- Definiera hur bilder, alt-text, metadata och internlänkar hanteras.
- Definiera branch- och PR-resultat.

## Exit criterion
Samma input ska ge strukturellt likvärdigt resultat oavsett om kunden använder ChatGPT eller Claude.

---

# Fas 5 – Guardrails och automatisk validering

## Mål
Göra fel svåra att merge:a.

## Arbete
- Build i PR.
- Schema/content validation.
- Kontroll av internlänkar.
- Kontroll av canonical-domän `https://avab.eu/`.
- Kontroll av saknad alt-text/metadata där det är möjligt.
- Lint/regler för förbjuden eller duplicerad sidspecifik struktur där praktiskt möjligt.
- Preview-deployment per PR om infrastrukturen stödjer det.

## Exit criterion
En felaktig AI-genererad sida ska normalt stoppas automatiskt innan merge.

---

# Fas 6 – Säker kundworkflow utan VS Code

## Mål
Kunden ska kunna arbeta från chatten.

## Normalflöde
```text
Kundens instruktion
      ↓
ChatGPT / Claude
      ↓
identifiera sidtyp
      ↓
läs rätt standard + workflow
      ↓
skapa/ändra content
      ↓
branch
      ↓
automatisk validering
      ↓
PR + preview
      ↓
kundgranskning
      ↓
merge
```

## Risknivåer

### Låg risk – innehåll
Tillåtna ändringar kan exempelvis vara content/data, bilder och metadata.

### Högre risk – designsystem
Ändringar i `src/components/`, `src/layouts/`, `src/styles/` eller schemas ska behandlas som utvecklingsarbete och granskas särskilt.

## Exit criterion
Kunden kan skapa en verklig referens via chatten utan lokal utvecklingsmiljö och utan att AI behöver modifiera designsystemet.

---

# Fas 7 – Migrering av befintliga sidor

## Mål
Få gamla och nya sidor att följa samma system.

## Arbete
- Migrera en sidtyp i taget.
- Börja med referenser.
- Jämför rendering och innehåll före/efter.
- Eliminera duplicerad markup/CSS när migrationen verifierats.
- Behåll URL:er och SEO-signaler.

## Exit criterion
Alla aktiva sidor av respektive sidtyp använder samma modell, med dokumenterade undantag.

---

# Fas 8 – Förvaltning

## Mål
Förhindra ny dokument- och designdrift.

## Arbete
- Periodisk kontroll av Active-standarder.
- Dokumentera nya arkitekturbeslut när de faktiskt behövs.
- Avveckla Deprecated-filer efter verifierad migration.
- Håll AI-instruktionerna korta och låt dem länka vidare till rätt standard/workflow.

## Definition of Done för hela projektet

- dokumentationen har en entydig struktur och regelhierarki
- varje publik standardsida tillhör en definierad sidtyp
- återkommande design implementeras i delade komponenter/templates
- innehåll valideras genom schema där lämpligt
- ChatGPT och Claude kan följa samma repo-baserade regler
- normala innehållsändringar kräver inte VS Code
- AI skriver inte direkt till `main`
- PR/build/validering skyddar mot vanliga fel
- befintliga referenser är migrerade till den nya modellen
- gammal dokumentation är migrerad, markerad Deprecated eller arkiverad

## Prioritet

Fas 0–3 ger störst teknisk nytta och ska göras före finpolering av AI-promptar. Ett avancerat chat-workflow ovanpå duplicerad sidkod skulle bara automatisera dagens inkonsekvenser.