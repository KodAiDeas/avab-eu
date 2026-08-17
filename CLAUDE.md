# Claude Code – AVAB

Det här dokumentet innehåller projektövergripande instruktioner för Claude när arbete utförs i AVAB-repot.

## Startpunkt för projektkunskap

- Läs `docs/README.md` som officiellt index och regelhierarki.
- Identifiera uppgiftens sidtyp/scope och läs relevanta Active-standarder och workflows.
- Dokument i `src/docs/` är Deprecated och får inte användas som gällande standard. Följ ersättningslänken om en gammal referens leder dit.
- Vid skapande eller ändring av publika sidor: följ `docs/workflows/ai-page-authoring.md`.
- Vid mobilgranskning: följ `docs/standards/global/mobile.md` och `docs/workflows/mobile-qa.md`.
- Vid referensarbete: följ `docs/standards/pages/reference.md`.

## TODO är projektets minne

- Läs `TODO.md` när en uppgift kan påverka projektets status, prioriteringar eller framtida arbete.
- Behandla `TODO.md` som **enda levande att-göra-listan** för projektet.
- Skapa inte parallella TODO-listor i andra markdownfiler, kommentarer eller arbetsdokument.
- Följ reglerna, prioritetsnivåerna och ID-strukturen som definieras i `TODO.md`.

## När TODO.md ska uppdateras

Uppdatera `TODO.md` när användaren tydligt uttrycker ett framtida åtagande, till exempel:

- ”lägg till i TODO”
- ”kom ihåg detta”
- ”det här ska vi göra senare”
- ”lägg till den här idén”
- ”vi behöver fixa detta innan lansering”

Lägg **inte** automatiskt in varje brainstormad möjlighet eller hypotetisk idé. En punkt ska vara ett verkligt framtida arbete, ett beslutat uppföljningsbehov eller något användaren tydligt vill spara.

Om placering eller prioritet är oklar ska punkten läggas i `Inkorg / nya idéer` enligt reglerna i `TODO.md`, utan att hitta på en prioritet.

## När en uppgift avslutas

- Markera inte en TODO-punkt som klar förrän resultatet faktiskt har verifierats.
- Om en uppgift bara delvis är klar, uppdatera statusen i stället för att avsluta den.
- Om en uppgift leder till en tydlig ny följduppgift som ska göras senare, lägg till den i `TODO.md` innan arbetet avslutas.

## Projektstandarder

- Följ regelhierarkin i `docs/README.md`.
- Kontrollera relevanta Active-standarder innan större design-, innehålls- eller strukturändringar görs.
- Befintliga projektbeslut ska återanvändas i stället för att omprövas utan anledning.
- Om en ny instruktion motsäger ett dokumenterat beslut ska konflikten lyftas tydligt i stället för att beslutet ändras tyst.
- Verifiera alltid aktuell kod, branch, PR eller filstatus innan gamla anteckningar behandlas som aktuella fakta.
- En innehållsuppgift får inte tyst expandera till ändringar i komponenter, layouts eller global CSS.
- Följ `docs/architecture/ai-write-scope.md` för normal innehållsagent.
- Återanvänd content model, schemas och delade komponenter framför duplicerad fullsidig markup.
- Faktisk kod är sanningskälla för vad som är implementerat; Draft-dokument beskriver riktning och får inte tolkas som färdig funktion.

## Grundprincip

GitHub ska vara den gemensamma sanningskällan så att Claude, ChatGPT och andra AI-agenter kan arbeta efter samma regler. `TODO.md` håller öppet arbete; `docs/README.md` leder till rätt projektkunskap.
