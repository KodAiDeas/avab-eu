# Dokumentationsregler för AVAB

**Status:** Active  
**Owner:** AVAB-projektet  
**Last reviewed:** 2026-08-17

## Syfte

Dokumentationen ska vara lätt att förstå för både människor och AI-agenter, utan dubbla sanningskällor eller motstridiga regler.

## Grundregler

1. En regel ska ha en primär hemvist.
2. Dokument ska länka till varandra i stället för att kopiera samma regeltext.
3. Gällande standard och tillfällig arbetsplan ska inte blandas i samma dokument.
4. Kodnära regler som kan uttryckas genom komponenter, schema, lint eller test ska på sikt flyttas från prose-only-regler till faktisk enforcement.
5. Projektstatus och öppna uppgifter hör hemma i `TODO.md`, inte i flera projektdokument.
6. Historik ska normalt hanteras av Git. Arkiv används bara när innehållet fortfarande har dokumentationsvärde.
7. Alla nya dokument ska kunna klassificeras som standard, workflow, architecture, project eller archive.

## Normativt kontra informativt

### Normativt

Dokument under `docs/standards/` beskriver vad som måste eller bör gälla.

Använd tydliga formuleringar:

- `MÅSTE` – obligatoriskt.
- `SKA` – projektets normala regel.
- `BÖR` – rekommenderad default som får avvikas med motivering.
- `FÅR` – tillåtet alternativ.

### Informativt

Projektplaner, inventeringar, analyser och koncept får beskriva bakgrund och möjliga lösningar men får inte tyst överstyra en Active-standard.

## Livscykel

- **Draft** – förslag, inte gällande.
- **Active** – gällande.
- **Deprecated** – ersatt men kvar under migration.
- **Archived** – historik; ska inte användas som aktuell regel.

När ett dokument ersätts ska det peka på efterföljaren.

## Dokumentindex

`docs/README.md` ska hållas som enda navigationsnav för dokumentationen. Nya större dokument ska läggas in där eller kunna hittas genom dess struktur.

## Regler för AI

Innan större arbete ska AI:

1. identifiera uppgiftens sidtyp eller scope,
2. läsa `AGENTS.md`,
3. läsa relevant Active-standard,
4. läsa relevant workflow,
5. kontrollera `TODO.md` om uppgiften påverkar pågående arbete,
6. verifiera faktisk kod innan dokumentation behandlas som bevis för implementation.

AI får inte anta att en gammal konceptfil är gällande bara för att den finns i repot.