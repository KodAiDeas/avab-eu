# Workflow: kundarbete via chat utan VS Code

**Status:** Active  
**Owner:** AVAB-projektet  
**Scope:** ChatGPT/Claude-baserat arbete mot GitHub utan lokal utvecklingsmiljö  
**Last reviewed:** 2026-08-17

## Syfte

Detta workflow beskriver hur en kund eller redaktör ska kunna skapa och ändra AVAB-innehåll från mobil eller dator via chatten, utan att öppna VS Code.

GitHub är fortfarande sanningskälla. Chatten är arbetsgränssnittet.

## Grundprincip

```text
kundens instruktion
→ AI identifierar sidtyp och risknivå
→ AI läser rätt standard/workflow
→ AI kontrollerar saknad fakta
→ separat branch
→ begränsad ändring
→ automatisk validering
→ draft PR
→ mänsklig granskning
→ merge först efter godkännande
```

AI får aldrig tolka "utan VS Code" som "utan branch, validering eller granskning".

## 1. Förstå uppgiften

AI ska avgöra:

- skapa eller ändra
- route/sidtyp
- content- eller arkitekturarbete
- vilken fakta som är verifierad
- om bilder finns eller behöver tillhandahållas

Använd `docs/workflows/ai-page-authoring.md` som router.

## 2. Välj risknivå

### Låg risk – content

Exempel:

- text och strukturerad content-data
- bildreferenser och alt-text
- SEO-fält
- relationer till andra sidor
- status draft/published

Detta kan normalt utföras via chatten när aktuell sidtyp har ett implementerat schema/template.

### Medelrisk – sidtypsarkitektur

Exempel:

- ändring av content schema
- ny gemensam referens-/miljö-/tjänstkomponent
- ny standardsektion

Ska behandlas som utvecklingsarbete i separat scope och särskilt granskas.

### Hög risk – global arkitektur

Exempel:

- `src/styles/**`
- `src/layouts/**`
- globala shared components
- Astro/build/deploy-konfiguration
- routing eller borttagning av filer

Får inte smygas in i en vanlig content-beställning.

## 3. Fråga bara efter blockerande information

AI ska använda information som redan finns i chatten och repot. Fråga endast när ett verkligt publiceringskrav saknas och inte säkert kan härledas.

AI får hjälpa till att formulera:

- rubrik
- ingress
- SEO-title/description
- alt-text från en känd bild
- disposition
- internlänkförslag

AI får inte hitta på:

- kundnamn
- teknisk leverans
- antal, mått eller prestanda
- årtal
- resultat/besparingar
- kundcitat eller godkännande

Vid osäker fakta: använd draft eller markera verifieringsbehov.

## 4. Branch-regel

Normal kundändring ska aldrig skrivas direkt till `main`.

Rekommenderad branch-prefix:

```text
content/reference-<slug>
content/environment-<slug>
content/service-<slug>
content/knowledge-<slug>
content/update-<slug>
```

Arkitekturarbete använder tydligt separat prefix, exempelvis `feature/` eller `agent/`.

Om en redan pågående dedikerad projektbranch finns ska AI fortsätta där endast när användarens uppgift tillhör samma scope.

## 5. Ändra minsta nödvändiga yta

AI ska föredra:

1. befintlig content entry
2. befintligt schema
3. befintlig renderer/template
4. befintliga globala primitives

Normal content-PR ska inte innehålla orelaterad refaktorering.

Om sidtypen saknar implementerad content model/template ska AI inte skapa en ny stor legacy-`index.astro` som genväg. Arbetet ska omklassificeras till sidtypsarkitektur eller lämnas som strukturerat underlag tills implementation finns.

## 6. Automatisk validering

Innan en ändring kan betraktas som redo för granskning ska PR-checken passera.

Miniminivå i nuläget:

- `npm ci`
- `npm run validate`
- Astro build
- Zod/content validation för implementerade collections
- AVAB guardrails i `scripts/validate-site.mjs`

Ett rött check-resultat betyder att ändringen inte är klar för merge.

## 7. PR-kontrakt

AI ska lämna en draft PR med en kort sammanfattning som innehåller:

- vad användaren bad om
- sidtyp och route
- vilka filer/content entries som ändrats
- vilken fakta som fortfarande behöver verifieras
- vilka automatiska kontroller som passerat
- om ändringen innehåller något utanför normal content-scope

## 8. Mobil granskning

Kunden ska kunna granska från mobilen genom att läsa PR-sammanfattningen och, när preview finns, öppna preview-länken.

Tills automatiserad PR-preview är implementerad ska AI vara tydlig med att grön build verifierar struktur/build men inte ersätter visuell browsergranskning.

## 9. Merge-regel

AI får inte merge:a bara för att checks är gröna.

Merge sker först efter uttryckligt mänskligt godkännande när uppgiften kräver publicering. Om användaren endast bett om att förbereda ändringen ska PR:n lämnas öppen.

## 10. Exempel: ny referens från mobilen

Kunden kan skriva ungefär:

```text
Skapa en ny referens för projekt X. Kunden är Y, ort Z. Vi levererade ... Här är bilderna ...
```

AI ska då:

1. klassificera `reference`
2. läsa referensstandard + create-reference workflow
3. kontrollera saknade fakta/publiceringsgodkännande
4. skapa content-entry i rätt branch
5. låta schema + guardrails + build validera
6. skapa/lämna draft PR
7. sammanfatta vad kunden ska kontrollera

När referensmodellen är färdigmigrerad ska ingen ny unik referenslayout behöva skrivas för detta.

## Definition of Done för chatbaserat arbete

- lokal VS Code-miljö behövdes inte
- ändringen ligger inte direkt på `main`
- AI använde rätt sidtyp/workflow
- ändringsscope är begränsat
- osäker fakta är inte uppfunnen
- automatiska checks är gröna
- PR:n är begriplig från mobilen
- mänskligt godkännande återstår innan merge när relevant
