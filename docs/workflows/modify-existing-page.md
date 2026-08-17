# Workflow: ändra befintlig AVAB-sida

**Status:** Active  
**Owner:** AVAB-projektet  
**Scope:** Alla publika sidtyper  
**Last reviewed:** 2026-08-17

## Syfte

Detta workflow används när en befintlig sida ska uppdateras utan att sidtypen i sig ska designas om. Målet är att göra minsta korrekta ändring och undvika att en liten innehållsuppgift skapar ny lokal arkitektur.

## 1. Identifiera sidtyp och faktisk implementation

Läs route, relevant standard och faktisk kod. Bestäm om sidan är:

- migrerad till content model/template,
- legacy/fullsidig Astro,
- listing,
- special/custom.

Använd inte samma redigeringsmetod blint för alla fyra.

## 2. Klassificera ändringen

### Content
Text, fakta, bilder, alt-text, metadatafält, FAQ-data, relationer.

### Presentation
Spacing, komponentlayout, responsivitet, visuellt beteende.

### Architecture
Schema, shared components, layouts, global CSS, route-system, gemensam rendering.

En contentuppgift får inte tyst bli presentation/architecture.

## 3. Migrerad standardsida

Om sidan använder content model:

- ändra i första hand content-entryn,
- ändra inte renderer/schema om inte användarens behov verkligen kräver en ny generell förmåga,
- återanvänd samma data för metadata/schema/listing där systemet gör det.

## 4. Legacy-sida

Om sidan fortfarande är en stor `index.astro`:

- gör minsta säkra ändring,
- skapa inte nya lokala CSS-mönster om befintliga gemensamma klasser räcker,
- flytta inte sidan till ny arkitektur som bieffekt av en liten textändring,
- men dokumentera eller följ befintlig migrationsplan när uppgiften visar ett återkommande problem.

Om användaren uttryckligen vill standardisera sidan är det inte längre en liten contentändring utan migration/arkitekturarbete.

## 5. Listing

Om en listing hämtar poster från content/data ska källdatat ändras i stället för att samma post kopieras in manuellt på listningssidan.

## 6. Special/custom

Följ `docs/workflows/special-page-change.md`.

## 7. Fakta och säkerhet

Ändra inte etablerade fakta utan underlag. Om en gammal sida innehåller en uppgift som verkar felaktig men inte kan verifieras ska den flaggas, inte ersättas med en gissning.

## 8. Validera diffens scope

Före avslut ska AI kontrollera:

- ändrades bara relevanta filer?
- introducerades ny lokal CSS i onödan?
- ändrades route eller canonical oavsiktligt?
- tappades befintligt innehåll?
- påverkas listing/relationsdata?
- passerar build/schema när relevant?

## 9. PR-resultat

PR:n ska ange:

- sidtyp och route,
- om sidan är legacy eller content-driven,
- exakt ändringsscope,
- valideringar,
- om ändringen blottade ett framtida migrationsbehov.

## Stopregel

Om en liten ändring kräver modifiering av schema, delad komponent eller global CSS ska AI stoppa och omklassificera uppgiften innan den fortsätter.
