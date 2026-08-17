# AVAB – TODO

> **Projektets enda levande att-göra-lista.**
> Här samlas uppgifter, idéer som ska följas upp, blockerare och beslut som annars riskerar att glömmas bort.

**Senast uppdaterad:** 2026-08-17  
**Tidigare fil:** `src/docs/att-gora-lista.md`

---

## Regler för AI

När en AI arbetar i detta repo ska `TODO.md` behandlas som **single source of truth för öppna uppgifter**.

1. **Läs befintliga punkter innan du lägger till något.** Undvik dubbletter och slå ihop överlappande punkter.
2. När användaren säger exempelvis **”lägg till i TODO”**, **”kom ihåg detta”**, **”lägg till den här idén”** eller liknande ska filen uppdateras.
3. Om prioritet eller placering är oklar: lägg punkten under **Inkorg / nya idéer**. Gissa inte.
4. Nya öppna punkter får nästa lediga ID i formatet `AVAB-###` och datum då de lades till.
5. Flytta inte en punkt till **Klart** förrän den faktiskt är verifierad som färdig.
6. Ta aldrig bort en öppen punkt bara för att den verkar gammal. Markera i stället **Verifiera**, **Blockerad** eller be om beslut.
7. När en punkt är klar: bocka av den, lägg till slutdatum och flytta den till **Klart**.
8. **Beslut tagna** ska bevaras. Kontrollera dem innan en gammal fråga tas upp igen.
9. Om en uppgift hör ihop med en fil, branch, PR eller issue: lägg till referensen i samma punkt.
10. Håll TODO:n kortfattad. Större specifikationer och arbetsplaner ska ligga i egna dokument och länkas härifrån.
11. Uppdatera alltid **Senast uppdaterad** när innehållet ändras.
12. Om en ny uppgift motsäger ett tidigare beslut: ändra inte beslutet tyst. Flagga konflikten under **Behöver beslut**.

### Prioritet

- **P0** – blockerar publicering, drift, säkerhet eller kritisk funktion.
- **P1** – viktigt och bör göras härnäst.
- **P2** – viktigt men kan vänta.
- **P3** – förbättring, idé eller framtida möjlighet.

### Enkel användning

Du ska kunna skriva till en AI exempelvis:

- `Lägg till i TODO att vi ska kontrollera alla metadata innan lansering.`
- `Lägg till den här idén i AVAB:s TODO: ...`
- `Markera AVAB-003 som klar.`
- `Vad i TODO:n bör vi prioritera nu?`
- `Gå igenom TODO.md och säg vad som är inaktuellt eller behöver verifieras.`

AI:n ansvarar då för ID, datum, placering, dubblettkontroll och struktur.

---

## Näst på tur

### Aktuellt fokus – AI/content architecture

- [ ] **AVAB-013 · P1 · Bygg AI-baserat innehållssystem och dokumentationsarkitektur** — Genomför projektet i `docs/projects/ai-content-system/README.md`: definiera sidtyper, centralisera återkommande layout i komponenter/templates, skapa content models/schemas, standardisera AI-workflows och införa PR/validerings-guardrails så att kunden säkert kan skapa standardsidor via ChatGPT/Claude utan VS Code. Referenser används som första pilot.  
  _Tillagd: 2026-08-17 · Branch: `agent/ai-content-system` · Status: Fas 0 inventering och Fas 1 dokumentmigrering genomförda. Canonical dokumentationsnav, mobilstandard, mobil-QA, referensstandard, sidtyper och AI write-scope finns nu under `docs/`. Nästa steg är Fas 2: inventera faktisk komponent-/layoutduplicering och definiera kodens gemensamma primitives innan schema implementeras._

### Aktuellt fokus – mobil

- [ ] **AVAB-009 · P1 · Verifiera mobil baseline och deployment-paritet** — Fastställ vilken branch/commit som är deployad på `test2.avab.eu` och verifiera att den matchar den kod som ska inventeras. Skärmbildens mobilheader med hamburgermeny matchar inte nuvarande `SiteHeader.astro` på `main`, så versionsskillnaden ska redas ut innan massändringar görs. Följ Fas 0–1 i `docs/workflows/mobile-qa.md`.  
  _Tillagd: 2026-08-15 · Status: nästa steg._

- [ ] **AVAB-010 · P1 · Full mobilinventering och globala mobilfixar** — Inventera samtliga aktiva publika routes enligt `docs/workflows/mobile-qa.md` och bedöm dem mot `docs/standards/global/mobile.md`. Prioritera globala rotorsaker före sidspecifika patchar. Första kända fokus: hero-CTA, knapphöjd/textbrytning, CTA-hierarki, sticky header, overflow, grids, bilder, formulär och innehåll som döljs på mobil. Implementera P0/P1-fixar efter att inventeringen visar rätt scope.  
  _Tillagd: 2026-08-15 · Status: startar efter AVAB-009._

- [ ] **AVAB-011 · P1 · Mobil regression och godkännande** — Efter mobilfixarna: verifiera samtliga aktiva routes på 360/390/430/768 px och kör 320 px gränstest för overflow. Kontrollera header/meny, hero, CTA, kort, bilder, formulär, kalkylatorer och footer. Build ska passera och visuella kontroller måste vara genomförda innan arbetet markeras klart.  
  _Tillagd: 2026-08-15 · Status: startar efter AVAB-010._

- [ ] **AVAB-012 · P1 · Normalisera kanonisk domän till `https://avab.eu/`** — Aktiva sidor innehåller fortfarande förekomster av `https://www.avab.eu/` i canonical, Open Graph, schema och breadcrumbs. Inventera samtliga aktiva sidor och byt webbplatsens kanoniska/metadata-URL:er till `https://avab.eu/`; `www` ska endast vara alias/redirect. Kontrollera att inga interna länkar eller strukturerade data återintroducerar `www`.  
  _Tillagd: 2026-08-15 · Status: konkret avvikelse verifierad på flera representativa sidor; scope för resten av sajten behöver inventeras._

### Tidigare prioriterat

- [ ] **AVAB-001 · P1 · Alt-texter** — Gör en separat granska-först-runda. 17 alt-texter flaggades som tveksamma i tidigare inventering. Ortsnamn (Kil, Hammarö, Säffle, Kumla, Örebro, Arvika, Arjäng …) hör hemma i alt-texten, inte i filnamnen.  
  _Tillagd: 2026-08-03 · Status: verifiera att siffran 17 fortfarande är aktuell._

- [ ] **AVAB-002 · P1 · Bildstruktur-branch/PR** — Verifiera status för `bildstruktur-seo`. Om arbetet fortfarande ligger opushat: pusha och skapa PR. Gör visuell skärmbildskontroll i samband med detta; den blockerades tidigare av browserkopplingen.  
  _Tillagd: 2026-08-03 · Status: verifiera aktuellt branch-/PR-läge innan åtgärd._

- [ ] **AVAB-003 · P1 · Oanvänd bild** — `kopcentrum-fasad-kvall-bred.webp` hade 0 referenser i tidigare inventering. Verifiera aktuellt läge och besluta därefter om bilden ska raderas eller tas i bruk.  
  _Tillagd: 2026-08-03 · Status: behöver verifieras._

---

## Backlog

- [ ] **AVAB-004 · P2 · Trasiga internlänkar** — Tidigare inventering visade 36 mål / 109 förekomster kvar. Kör en ny kontroll och åtgärda återstående fel.  
  _Tillagd: 2026-08-03 · Källa för gamla siffror: commit `bd8515f` · Status: behöver ny inventering._

- [ ] **AVAB-005 · P2 · Saknade originalbilder** — Tidigare inventering uppskattade cirka 41 bilder utan källa. Spåra original eller ersätt dem.  
  _Tillagd: 2026-08-03 · Status: behöver ny inventering._

- [ ] **AVAB-006 · P2 · Publika bild-URL:er och hash-länkar** — Gör manuell kontroll och verifiera att inga problem återstår.  
  _Tillagd: 2026-08-03._

- [ ] **AVAB-007 · P2 · Footer efter logotypändring** — Verifiera att `src/components/SiteFooter.astro` renderar korrekt efter ändrad sökväg till logotypen.  
  _Tillagd: 2026-08-03._

- [ ] **AVAB-008 · P2 · Bildmappsnamn** — Namnkonventionen `images` (plural) kontra `image/partners/` (singular) behöver verifieras och göras enhetlig om båda fortfarande används.  
  _Tillagd: 2026-08-03._

---

## Inkorg / nya idéer

_Lägg nya idéer här när det ännu inte är bestämt om, när eller hur de ska genomföras. AI flyttar dem till rätt sektion när beslut finns._

_Inga punkter just nu._

---

## Blockerat

_Inga verifierade blockerare just nu._

---

## Behöver beslut

_Inga öppna beslut just nu._

---

## Beslut tagna

Dessa beslut ska kontrolleras innan samma fråga öppnas på nytt:

- GitHub ska vara gemensam sanningskälla för AVAB:s kod, AI-regler, standarder och workflows.
- AI-genererade sidändringar ska normalt ske via separat branch och PR, inte direkt mot `main`.
- Innehåll och presentation ska separeras där det är praktiskt; återkommande sidlayout ska ligga i delade komponenter/templates och inte kopieras mellan sidor.
- Mobilförbättringar ska följa `docs/standards/global/mobile.md` och arbetsflödet i `docs/workflows/mobile-qa.md`.
- Publika referenser ska konsekvent heta **Referenser** och ligga under `/referenser/`; `referensprojekt` är inte canonical terminologi/route.
- Återkommande mobilproblem ska lösas globalt/delat före sidspecifika patchar. Viktigt innehåll ska inte döljas enbart för att lösa en mobil layout.
- Bilder i `public/assets/` ligger platt utan undermappar; de ska bara vara korrekt omdöpta.
- Använd generiska motivnamn i filnamn. Ortsnamn hör hemma i alt-text.
- Visuellt lika men icke-identiska bilder hålls isär (två högtalarinstallationer, två köpcentrum, två fältstyrkediagram).
- De två tidigare raderade gymfilerna ska förbli raderade.
- `gym_hero_hammaro_stc.webp` behålls som möjlig framtida gym-hero.
- Val av gym-hero är ett separat innehållsbeslut och ska inte blandas ihop med bildstruktureringen.

---

## Klart

_När öppna punkter verifierats som klara flyttas de hit med slutdatum. När sektionen blir lång kan äldre poster flyttas till `docs/TODO-ARCHIVE.md`; öppna uppgifter ska alltid ligga kvar i denna fil._
