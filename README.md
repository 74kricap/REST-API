### Titel: REST-API
 

Projektet är ett enkelt REST-API i node.js med Express. Express är byggd ovanpå node.js och lägger till stöd för routing, middleware, visningssystem etc. Server.js är ingångspunkten för applikation, i denna fil har jag skapat en expressapp som med app.use () lägger till middlewares, först express.json, routern, två status hanterare och sist vilken port den ska lyssna på.  I routern defenierar jag mina endpoints och importerar metoder till dessa från controllern.
Jag har använt mig av följande HTTP endpoints:

# GET: api/cosmetics - används för att hämta alla objekt i en lista.
•	Response body returnerar en lista med alla produkter, om det finns några i json filen.
•	Status code 200 OK om request blivit accepterad.
•	Status code 404 Not Found om jsonfilen saknar produkter.

# GET: /api/cosmetics/:id - används för att hämta ett specifikt objekt via ett id.
•	Kräver en inparameter av typen int som representerar en produkts id.
•	Metoden fs.read file() läser in listan.
•	Find() metoden söker i listan om det specifika id finns.
•	Response body retunerar en produkt om produktens id finns.
•	Status code 200 OK om request blivit accepterad.
•	Status code 404 Not Found om json filen saknar det givna produkt id.

# POST: /api/cosmetics - används för att skapa ett nytt okjekt.
•	Läser in en produktobjekts-struktur som request body och tilldelar ett unikt id.
•	Metoden fs.read file() läser in listan.
•	Metoden JSON.parse () analyserar JSON -strängen och konstruerar objektet som beskrivs av strängen.
•	Push metoden lägger till det nya objektet i arrayen.
•	Fs.writeFile() metoden returnerar den nya listan.
•	Status code 200 om request blivit accepterad och objektet har skapats framgångsrikt.
•	Status code 500 Internal Server Error om man inte fyllt i strukturen rätt.

# PUT: /api/cosmetics/ :id - används för att uppdatera ett befintligt objekt.
•	Kräver en inparameter av typen int som representerar en produkts id.
•	Metoden fs.read file() läser in listan.
•	Metoden JSON.parse () analyserar JSON -strängen och konstruerar objektet som beskrivs av strängen.
•	Find() metoden söker i listan om det specifika id finns.
•	Status code 200 OK om request blivit accepterad.
•	Status code 404 Not Found om json filen saknar det givna produkt id.
•	Uppdatering sker när cosmetic egenskapen tilldelas en ny egenskap via req.body

# DELETE: /api/cosmetics/ :id - används för att ta bort ett objekt.
•	Kräver en inparameter av typen int som representerar en produkts id.
•	Läser in egenskapen av ett objekt som innehåller egenskaper mappade till den namngivna rutten "id" via 
    req.params för att kunna söka efter produktens id.
•	Läser in hämta allt från req.body
•	Metoden fs.read file() läser in listan.
•	Metoden JSON.parse () analyserar JSON -strängen och konstruerar objektet som beskrivs av strängen.
•	Find() metoden söker i listan om det specifika id finns.
•	Metoden filter() returnerar listan utan det specifika id som söktes med find().
•	Status code 200 OK om request blivit accepterad.
•	Status code 404 Not Found om json filen saknar det givna produkt id.
•	Status code 500 Internal Server Error om något gick fel.

Package.json -filen registrerar viktiga metadata om ett projekt som krävs innan publicering till NPM, och definierar också funktionella attribut för ett projekt som npm använder för att installera beroenden, köra skript och identifiera ingångspunkten till vårt paket. då jag installerat nodemon som är ett verktyg som hjälper till att utveckla node.js -baserade applikationer genom att automatiskt starta om nodeprogrammet när filändringar i projektet upptäcks har jag satt "scripts" till { "start": "nodemon server.js"}. På så sätt startar jag servern genom att skriva npm start i terminalen.

Krav för godkänt:
1. Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs) **[JA]**
2. Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http) **[JA]**
3. Datan som API:et hanterar sparas lokalt i serverfilen **[JA]**
4. Git & GitHub har använts **[JA]**
5. Projektmappen innehåller en README.md fil - (läs ovan för mer info) **[JA]**
6. Uppgiften lämnas in i tid! **[JA]**

Krav för väl godkänt:
1. Alla punkter för godkänt är uppfyllda **[JA]**
2. All data skall vara sparad i en JSON-fil istället för i serverfilen **[JA]**
3. Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort **[JA]**
4. Ett simpelt klient-gränssnitt skall finnas för att anropa API:ets olika endpoints, samt
visa upp resultatet vid GET anrop **[NEJ]**
5. Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt **[JA]**

