# AI-agenter – AVAB

Det här dokumentet gäller för Codex och andra AI-agenter som arbetar i AVAB-repot.

## Startpunkt för projektkunskap

- Läs `docs/README.md` som officiellt index och regelhierarki för projektets dokumentation.
- Identifiera uppgiftens sidtyp/scope och läs bara relevanta Active-standarder, workflows och arkitekturdokument.
- Dokument under `src/docs/` är Deprecated efter dokumentmigreringen och får inte behandlas som gällande standard. Följ deras ersättningslänk om en gammal referens leder dit.
- Vid arbete med nya eller ändrade publika sidor: följ `docs/workflows/ai-page-authoring.md`.
- Vid mobilgranskning: följ `docs/standards/global/mobile.md` och `docs/workflows/mobile-qa.md`.
- Vid referensarbete: följ `docs/standards/pages/reference.md`.

## Gemensam källa för öppet arbete

- `TODO.md` är projektets **enda levande att-göra-lista** och ska behandlas som projektets minne för öppna uppgifter.
- Läs `TODO.md` när arbetet berör status, prioriteringar, följduppgifter eller tidigare beslut.
- Skapa inte alternativa TODO-listor i andra filer.
- Följ ID-format, prioriteringar, statusregler och sektioner i `TODO.md`.

## Lägg till nya saker på rätt sätt

Uppdatera `TODO.md` när användaren tydligt vill spara något för senare eller när ett faktiskt framtida arbete beslutas.

Typiska signaler är:

- ”lägg till i TODO”
- ”kom ihåg detta”
- ”det här tar vi senare”
- ”lägg till den här idén”
- ”det här måste göras innan lansering”

Lägg inte in varje spekulation eller brainstormad idé automatiskt. TODO:n ska innehålla verkliga uppgifter, beslutade uppföljningar och uttryckligen sparade idéer — inte allt som råkar diskuteras.

Om prioritet eller rätt sektion inte går att avgöra utan antaganden, använd `Inkorg / nya idéer` enligt instruktionerna i `TODO.md`.

## Under och efter arbete

- Kontrollera om en befintlig TODO-punkt redan täcker uppgiften innan en ny skapas.
- Markera bara en punkt som klar efter faktisk verifiering.
- Delvis slutfört arbete ska få uppdaterad status, inte felaktigt markeras som klart.
- Gamla siffror, branches, PR-statusar eller inventeringar ska verifieras mot aktuellt repo innan de används som sanning.
- Om en tydlig, beslutad följduppgift uppstår under arbetet och ska göras senare, lägg in den i `TODO.md` innan uppgiften avslutas.

## Projektets dokumentation

- Följ regelhierarkin i `docs/README.md`.
- Läs relevanta Active-standarder före större ändringar av design, innehåll, struktur eller arbetsflöde.
- Respektera dokumenterade beslut och undvik att återöppna dem utan ny information.
- Om nya instruktioner kolliderar med tidigare beslut, flagga konflikten tydligt.
- En innehållsuppgift får inte tyst expandera till en design-/arkitekturändring.
- Följ `docs/architecture/ai-write-scope.md` för normal innehållsagent.
- Återanvänd komponenter, schemas och content models före ny sidspecifik markup/CSS.
- Faktisk kod är sanningskälla för vad som är implementerat; Draft-arkitektur är inte samma sak som färdig funktion.

## Målet

Håll `TODO.md` tillräckligt komplett för att inget viktigt tappas bort och dokumentationen tillräckligt entydig för att människor, ChatGPT, Claude och andra agenter kan följa samma system.
