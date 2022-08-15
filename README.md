# ddagen-clicker
Clicker för D-Dagen: [clicker.ddagen.se](http://clicker.ddagen.se). Används för att räkna hur många personer som befinner sig i lokalen.

Alla kan se countern, men för att ändra den krävs att användaren loggar in med sitt kth-konto. Datasektionens behörighetssystem [pls](https://pls.datasektionen.se) används, och kräver att användaren har rättigheten "admin" i systemet "ddagen-clicker".

## Teknik
NodeJS och biblioteket Express används för backend. Frontend är ren HTML/CSS/JavaScript.

## Installation och start:

1. Installera NodeJS och npm
2. `npm install`
3. För lokal utveckling, generera ett certifikat för att få https att fungera för localhost och localhost.datasektionen.se:
   `mkcert -key-file key.pem -cert-file cert.pem localhost localhost.datasektionen.se`
4. `node app.js`
5. Gå in på https://localhost.datasektionen.se:3000. Chrome ger en varning angående certifikatet, gå runt varningen via "Advanced" -> "Proceed to...".

Relevanta miljövariabler:

* `LOGIN_VERIFICATION_TOKEN` (Obligatorisk): Api-nyckel som används för att verifiera login-tokens. Be informationsorganet om en.
* `PORT`: Serverport. (Valfri, standard är 3000)
* `NODE_ENV`: `development`/`production`. (Valfri, standard är development).

## Deploy

För att få upp din ändring på clicker.ddagen.se, ladda upp koden på github-repot, gå sedan till `Actions` i menyn längst upp, välj `Deploy` till vänster, och tryck på `Run workflow` till höger. Det tar cirka 2 minuter för ändringen att slå igenom.