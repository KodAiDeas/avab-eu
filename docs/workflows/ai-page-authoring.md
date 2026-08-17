# Workflow: AI-skapande av AVAB-sidor

**Status:** Active  
**Last reviewed:** 2026-08-17

Detta workflow beskriver standardflödet när ChatGPT, Claude, Codex eller annan AI ska skapa eller ändra en publik AVAB-sida.

## 1. Klassificera uppgiften

Identifiera först sidtypen:

- reference
- environment
- service
- knowledge
- special

Om sidtypen inte kan bestämmas från URL, innehåll eller användarens instruktion ska AI läsa befintlig struktur innan den gissar.

## 2. Läs rätt regler

Läs i denna ordning:

1. `AGENTS.md`
2. `docs/README.md`
3. relevant standard i `docs/standards/`
4. relevant workflow
5. relevanta arkitekturdokument
6. `TODO.md` om arbetet påverkar pågående projekt/status

## 3. Separera innehåll från designsystem

Innan kod ändras ska AI avgöra om uppgiften är:

### Innehållsändring
Normalt: text, strukturerad data, bildreferenser, alt-text, metadata, relationer.

### Design-/arkitekturändring
Komponenter, layouts, global CSS, schemas eller nya sidmönster.

En innehållsuppgift får inte tyst expandera till en designsystemändring.

## 4. Kontrollera erforderlig input

AI får formulera och förbättra språk men får inte hitta på projektfakta.

Särskilt känsliga fält:

- kundnamn
- årtal
- teknisk omfattning
- antal produkter/zoner
- resultat
- kundcitat
- referenskontakt
- certifieringar eller uppmätta värden

Saknad kritisk fakta ska markeras eller efterfrågas. AI får använda `draft` tills publiceringskrav är uppfyllda.

## 5. Återanvänd befintlig modell

AI ska i första hand använda:

1. befintlig content model/schema,
2. befintlig sidtemplate,
3. befintliga komponenter,
4. globala styles/tokens.

Ny lokal markup/CSS är sista utvägen och ska motiveras.

## 6. SEO, tillgänglighet och bilder

Kontrollera minst:

- unik title och description,
- canonical under `https://avab.eu/`,
- en H1,
- korrekt rubrikhierarki,
- meningsfull alt-text,
- interna länkar till relevanta sidor,
- inga påhittade strukturerade data,
- korrekt bildsökväg och filnamn enligt bildstandarden när den finns.

## 7. Ändringsscope

Normal innehållsagent ska undvika ändringar i:

- `src/components/**`
- `src/layouts/**`
- `src/styles/**`
- build/deployment-konfiguration

om uppgiften inte uttryckligen kräver utvecklingsarbete.

## 8. Branch och PR

AI-genererade ändringar ska göras i en separat branch och lämnas för granskning via PR. Skriv inte normalt direkt till `main`.

PR:n ska förklara:

- vilken sidtyp som ändrats,
- vilket innehåll som lagts till/ändrats,
- vilka standarder som följts,
- vilka valideringar som körts,
- eventuell information som fortfarande behöver mänsklig verifiering.

## 9. Definition of Done

En AI-skapad sida är inte klar förrän:

- rätt sidtyp och standard har använts,
- inga fakta har uppfunnits,
- designen bygger på befintlig modell,
- metadata och alt-text är kontrollerade,
- interna länkar är rimliga,
- build/schema-validering passerar när tillgänglig,
- ändringen ligger i branch/PR för granskning,
- eventuella osäkerheter är uttryckligt markerade.

## Målbild

När content architecture-projektet är klart ska detta workflow främst skapa eller ändra strukturerat innehåll. AI ska sällan behöva skriva full Astro-markup för en ny standardsida.