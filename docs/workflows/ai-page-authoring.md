# Workflow: AI-skapande av AVAB-sidor

**Status:** Active  
**Owner:** AVAB-projektet  
**Scope:** Router för alla publika sidtyper  
**Last reviewed:** 2026-08-17

Detta är det gemensamma ingångsflödet för ChatGPT, Claude, Codex och andra AI-agenter. Det ska först klassificera uppgiften och därefter skicka arbetet till rätt sidtyps-/ändringsworkflow.

När kunden arbetar direkt från mobil eller chat utan lokal utvecklingsmiljö gäller dessutom `docs/workflows/customer-chat-authoring.md`. Chatten är då arbetsgränssnittet; GitHub är fortfarande sanningskällan och branch + PR + validering gäller oförändrat.

## 1. Klassificera sidtypen

Identifiera först:

- `reference`
- `environment`
- `service`
- `knowledge`
- `listing`
- `special`

Använd route, sidans syfte och faktisk kod. Välj inte mall enbart för att två sidor ser lika ut.

## 2. Klassificera uppgiftstyp

Identifiera därefter om användaren vill:

- skapa en ny sida,
- uppdatera befintlig sida,
- migrera legacy-sida till standardarkitektur,
- ändra design/komponentarkitektur.

## 3. Route till rätt workflow

### Ny eller migrerad Referens
→ `docs/workflows/create-reference.md`

### Ny Miljö, Tjänst eller Kunskap
→ `docs/workflows/create-standard-page.md`

### Ändra befintlig sida
→ `docs/workflows/modify-existing-page.md`

### Special/custom
→ `docs/workflows/special-page-change.md`

### Listing
Listing ska normalt konsumera data från underliggande content model. Ändra källdatat framför att skapa dubbla registerposter. Om listingens layout/funktion ska ändras är det utvecklingsarbete.

## 4. Läs gemensamma regler

Oavsett route:

1. `AGENTS.md`
2. `docs/README.md`
3. `docs/architecture/page-types.md`
4. `docs/architecture/ai-write-scope.md`
5. relevant Active sidstandard
6. valt workflow
7. faktisk kod/schema/template
8. `TODO.md` när uppgiften påverkar status, prioritet eller följduppgifter

Vid chatbaserat kundarbete ska `docs/workflows/customer-chat-authoring.md` också läsas för branch-, PR-, risk- och granskningsregler.

## 5. Separera content från arkitektur

### Content
Text, verifierade fakta, strukturerad data, bildreferenser, alt-text, metadata, relationer.

### Presentation
Visuell layout, spacing, responsive behavior, komponentvariant.

### Architecture
Schemas, shared components, layouts, global CSS, route-system, CI/build.

En contentuppgift får aldrig tyst expandera till presentation eller architecture.

## 6. Samla bara saknad input

AI ska återanvända allt användaren redan lämnat. Ställ inte ett standardformulär med frågor som redan är besvarade.

Saknad kritisk fakta ska efterfrågas när den blockerar korrekt publicering. Om sidan tekniskt stöder draftläge får osäkert/inkomplett content hållas som draft i stället för att fyllas med gissningar.

## 7. Fakta AI inte får hitta på

Exempel:

- kundnamn,
- årtal,
- priser,
- antal produkter/zoner/rum,
- mätvärden,
- besparingar,
- kundcitat,
- certifieringar,
- garantier,
- lag-/standardkrav,
- projektreferenser,
- resultat som inte stöds av underlaget.

AI får förbättra formulering, struktur, rubriker, SEO-copy och alt-text så länge faktainnehållet inte ändras.

## 8. Återanvänd faktisk implementation

Prioritetsordning:

1. befintlig content model/schema,
2. befintlig sidrenderer/template,
3. befintliga komponenter,
4. globala styles/tokens,
5. ny generell arkitektur först när ett verkligt återanvändningsbehov finns.

Ny lokal fullsidig markup/CSS är inte normal lösning för en standardsida.

## 9. Gemensamma metadata-/bildregler

Kontrollera minst:

- canonical root `https://avab.eu/`,
- unik SEO-title/description,
- exakt en H1,
- korrekt rubrikhierarki,
- meningsfull alt-text,
- existerande bildreferenser,
- naturliga interna länkar,
- strukturerad data baserad på samma verifierade fakta som synligt innehåll,
- inget `www` som canonical.

## 10. Normal write-scope

En vanlig content-agent ska normalt inte ändra:

- `src/components/**`
- `src/layouts/**`
- `src/styles/**`
- `src/content.config.ts`
- build/deploy/CI
- andra sidtyper eller orelaterade routes

utan att arbetet uttryckligen har klassificerats som utveckling/arkitektur.

## 11. Branch, validering och PR

AI-genererade publika sidändringar ska normalt göras i separat branch och PR, inte direkt i `main`.

PR:n ska ange:

- sidtyp,
- route,
- create/modify/migrate,
- content- eller architecture-scope,
- vilka standarder/workflows som följts,
- vilka valideringar som passerat,
- kvarstående mänsklig verifiering.

När schema/build finns ska de passera innan uppgiften kan kallas tekniskt klar. Grön CI ersätter inte visuell browsergranskning.

## 12. Definition of Done

En AI-skapad eller ändrad standardsida är inte klar förrän:

- rätt sidtyp och workflow använts,
- inga fakta fabricerats,
- befintlig modell återanvänts,
- metadata/bilder/länkar kontrollerats,
- available schema/build-validering passerar,
- diffen håller rätt scope,
- ändringen ligger i branch/PR,
- osäkerheter är explicit markerade.

## Målbild

Kunden ska kunna beskriva vad som ska skapas eller ändras i chatten. AI:n ska själv routa uppgiften till rätt sidtyp, samla endast saknad input och producera strukturellt likvärdigt resultat oavsett om klienten är ChatGPT eller Claude. VS Code ska inte behövas för normalt structured-content-arbete när sidtypen är implementerad.