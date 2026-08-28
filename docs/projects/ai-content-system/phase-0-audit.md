# Fas 0 – nulägesinventering

**Status:** Complete for documentation/page-type baseline  
**Reviewed:** 2026-08-17  
**Scope:** Dokument, sidtyper, AI-risker och migrationsunderlag. Ingen publik sidkod har ändrats.

## Slutsats

AVAB-repot har en fungerande grund, men dagens kunskap är spridd mellan root-dokument, `src/docs/`, sidmaterial i `src/pages/` och faktisk kod. Den största risken för AI-arbete är inte brist på instruktioner utan att flera filer kan uppfattas som sanningskälla samtidigt.

Fas 1 ska därför först göra dokumenthierarkin entydig. Kod-/template-refaktor ska inte starta innan detta är gjort.

## Dokumentinventering

### Root – behåll som särskilda ingångar

| Fil | Klass | Status | Åtgärd |
|---|---|---|---|
| `AGENTS.md` | AI entrypoint | Active | Behåll kort och länka vidare till `docs/` |
| `CLAUDE.md` | Claude entrypoint | Active | Behåll kort och parallell med `AGENTS.md` |
| `README.md` | Repo onboarding | Active men delvis inaktuell | Skriv om i Fas 1 så arkitekturregler inte motsäger AI Content System |
| `TODO.md` | Open work | Active | Behåll som enda levande TODO |
| `codex-prompt-klickbara-kort.md` | Engångsprompt/arbetsunderlag | Ej standard | Flytta till archive eller projekthistorik efter verifiering att uppgiften är avslutad |

### Nya `docs/`

| Fil | Klass | Status |
|---|---|---|
| `docs/README.md` | Dokumentnav/regelhierarki | Active |
| `docs/architecture/documentation-rules.md` | Architecture | Active |
| `docs/workflows/ai-page-authoring.md` | Workflow | Active |
| `docs/projects/ai-content-system/README.md` | Project | Active |
| `docs/projects/ai-content-system/document-migration-map.md` | Project/migration | Active working document |

### Gamla `src/docs/` under migration

| Fil | Klass | Status | Mål |
|---|---|---|---|
| `AVAB-standard-mobil.md` | Global standard | Active under migration | `docs/standards/global/mobile.md` |
| `AVAB-mobilinventering.md` | QA workflow | Active under migration | `docs/workflows/mobile-qa.md` |
| `AVAB-standard-referensprojekt.md` | Blandad standard/arkitektur/mall | Deprecated after migration, currently needed | split to reference standard + content model |
| `avab-design-referenssida-inkopare.md` | Design concept | Draft/concept | merge approved parts into reference standard; archive remainder |

## Verifierade dokumentkonflikter

### 1. Root README kontra ny arkitektur

`README.md` instruerar idag att en ny sida ska lägga unik text och HTML i sidans `index.astro`. AI Content System har motsatt mål: standardsidor ska huvudsakligen fylla en delad modell och inte duplicera fullsidig markup.

**Beslut för Fas 1:** Root README måste skrivas om. Under övergången har `docs/README.md` högre dokumentprioritet enligt den nya hierarkin.

### 2. Referenser kontra referensprojekt

Publik route och språk är `/referenser/` och “Referenser”, medan gamla standarden fortfarande använder “referensprojekt” och exempel med annan route.

**Beslut:** Normalisera dokumentation till `reference`/`Referenser`; befintliga publika URL:er ska behållas.

### 3. Standard kontra koncept

Referensdesignfilen beskriver sig själv som koncept medan referensstandardfilen innehåller både normativa regler och tekniska implementationsidéer.

**Beslut:** Inget koncept får automatiskt bli Active. Godkända designprinciper flyttas till sidstandarden; teknisk modell flyttas till architecture.

## Sidtypskarta

Följande publika sidfamiljer är verifierade i `src/pages/`:

| Sidtyp | Exempel | Bedömning |
|---|---|---|
| Referens | `/referenser/minnebergsskolan-arvika/` | Första pilot för content model/template |
| Miljö | `/miljo/simhall/`, `/miljo/gym/` | Tydlig återkommande sidfamilj, andra pilot |
| Tjänst | `/tjanster/ljudsystem/` | Återkommande sidfamilj |
| Kunskap | `/kunskap/kablar-kontakter/` | Innehålls-/artikeltyp, få sidor idag |
| Special/landning | `/`, `/kontakt/`, `/rastsignal/`, `/integritetspolicy/` | Ska inte tvingas in i standardmall utan separat beslut |
| Listing/index | `/referenser/` | Egen sidtyp som konsumerar referensdata |

Verifierat nuläge omfattar cirka 15 miljöroutes, 13 individuella referenser, 8 tjänster plus projektering, en kunskapssida och ett antal specialroutes.

## Kodarkitekturrisker som påverkar AI

### Fullsidig duplicering

Representativa referens- och miljösidor innehåller egen `<html>`, `<head>`, metadata, schema och sidmarkup. Detta gör att canonical, SEO, breadcrumbs och design kan drifta sida för sida.

Exempel på verifierad drift: både Minnebergsskolan och Simhall använder fortfarande `https://www.avab.eu/` på flera metadata-/schemafält trots beslut att `https://avab.eu/` är canonical.

### Gemensam layout är tunn

`src/layouts/Layout.astro` finns, men aktiva representativa sidor bygger fortfarande stora delar av dokumentstrukturen själva. Detta bekräftar att Fas 2–3 behöver centralisera layout/metadata snarare än bara skriva fler instruktioner.

### Referensdata finns redan

`ReferenceCard.astro` och `src/data/referenser.ts` visar att projektet redan har börjat separera återkommande referensdata från rendering. Detta är rätt riktning och bör återanvändas i pilotmigreringen.

## Repo-hygien – verifierad risklista

Miljösidorna innehåller många icke-aktiva eller oklara sidkopior: `index.txt`, `index2.txt`, `index-gammal.astro`, filer med `trasig`, preview-HTML och `Avab-hub-*.txt`. I de 15 miljömapparna finns ungefär 57 sådana sidmaterial-/backupfiler utöver aktiva `index.astro`.

I reporoten finns fem stora ZIP-backuper (`public.zip`, `public (2).zip`, `public (3).zip`, `public (4).zip`, `src.zip`) på sammanlagt ungefär 140 MB. Dessa ska inte ligga kvar som långsiktig versionshistorik när innehållet är verifierat säkert på annat sätt.

`SiteHeader1.astro` och `SiteFooter1.astro` är kandidater för gamla dubbletter och ska diffas mot de aktiva komponenterna innan eventuell borttagning.

**Stopregel:** Inget av ovanstående raderas i Fas 0.

## AI-säkerhetsram fastställd i Fas 0

### Låg risk – normalt innehållsarbete

AI får efter införandet av content model normalt ändra:
- innehållsfiler/data för aktuell sidtyp,
- uttryckligen tillhörande bilder,
- sidmetadata som ingår i schemat,
- relationer till befintliga referenser/tjänster/miljöer.

### Högre risk – utvecklingsarbete

Följande kräver explicit scope och särskild granskning:
- `src/components/`
- `src/layouts/`
- `src/styles/`
- content schemas/config
- globala navigationer
- build/deploy-konfiguration
- routingarkitektur

En vanlig begäran som “skapa en ny referens” får inte automatiskt ge AI rätt att ändra dessa områden.

### Branchregel

AI-genererade ändringar ska ske på separat branch och lämnas som PR. Normal innehållspublicering ska inte skriva direkt till `main`.

## Content-model-bedömning

Projektet använder Astro 6.4.7. För grupper av strukturellt likartat innehåll är Astro Content Collections en lämplig kandidat eftersom schema kan validera fält och build-time collections kan läsa lokala Markdown/JSON/YAML-liknande källor. Exakt modell beslutas i Fas 3 efter pilotdesignen; Fas 0 låser inte filformatet.

## Fas 0 – exit check

- [x] Dokumentfamiljer identifierade
- [x] Gällande och konceptuella dokument separerade i migrationsplan
- [x] Viktigaste dokumentkonflikterna identifierade
- [x] Sidtyper identifierade
- [x] Specialroutes separerade från standardsidor
- [x] AI write-scope definierat på principnivå
- [x] Branch/PR-princip fastställd
- [x] Repo-hygienrisker dokumenterade utan destruktiva ändringar
- [x] Referenser valda som första pilot

## Nästa steg

Starta Fas 1 – Dokumentationssystem:
1. skriv om root `README.md` så den inte instruerar duplicerad fullsidig markup,
2. migrera mobilstandard + mobil-QA,
3. skapa `docs/standards/pages/reference.md`,
4. skapa `docs/architecture/content-model.md` från tekniska delar i gamla referensstandarden,
5. konsolidera/arkivera referensdesignkonceptet,
6. uppdatera alla aktiva länkar till gamla dokumentnamn,
7. markera gamla filer Deprecated innan de slutligen tas bort.