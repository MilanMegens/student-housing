# Student Housing website

Website voor de medewerkers van Student Housing BV, gemaakt voor de challenge Student Housing (HBO-ICT, Fontys Hogeschool, semester 1).

Met de website kunnen medewerkers:

- evenementen aanmaken, aanpassen en verwijderen, waarbij de bewoners automatisch een mail krijgen
- het energie- en gasverbruik bekijken, ook per huis
- de reviews van de bewoners per locatie bekijken

Bewoners krijgen een mail waarmee ze een review kunnen plaatsen.

## Team

- Milan
- Niek

## Stack

| Onderdeel | Keuze |
|---|---|
| Front-end | React met TypeScript, gebouwd met Vite |
| Styling | Tailwind CSS en shadcn/ui |
| Routing | TanStack Router |
| Grafieken | Chart.js |
| Back-end | Node.js |
| Database | Nog te kiezen |
| Mail | Brevo of Postmark |
| Codekwaliteit | ESLint en Prettier |
| Testen | Vitest |

## Mappen

```
student-housing/
├── frontend/      React-app (Vite + TypeScript)
├── backend/       Node.js-server en API
├── .env.example   Voorbeeld van de omgevingsvariabelen
└── README.md
```

## Installeren

Je hebt [Node.js](https://nodejs.org) (LTS-versie) en [Git](https://git-scm.com) nodig.

```bash
git clone https://github.com/MilanMegens/student-housing.git
cd student-housing
```

### Front-end

```bash
cd frontend
npm install
npm run dev
```

De website draait daarna op het adres dat in de terminal staat, meestal http://localhost:5173.

### Back-end

```bash
cd backend
npm install
```

Het startcommando voor de back-end volgt zodra de server is opgezet.

### Omgevingsvariabelen

Kopieer `.env.example` naar een nieuw bestand `.env` en vul de waarden in. Zet het bestand `.env` nooit in Git, want daarin staan wachtwoorden en API-keys.

## Samenwerken met Git

- In `main` staat alleen code die werkt en door de ander is bekeken. Push nooit direct naar `main`.
- Maak voor elke use case een eigen branch vanaf `main`, bijvoorbeeld `feature/uc01-evenement-aanmaken`.
- Is je functie af, push je branch en open een pull request. De ander bekijkt de code en merget hem in `main`.
- Verwijder de branch na het mergen.

```bash
git switch main
git pull
git switch -c feature/uc01-evenement-aanmaken
git add .
git commit -m "UC01: formulier met validatie"
git push -u origin feature/uc01-evenement-aanmaken
```

### Commitberichten

Begin met de code van de use case, gevolgd door een korte beschrijving van wat je hebt gedaan, bijvoorbeeld `UC04: lijndiagram met filters`.

## Use cases

| Code | Use case |
|---|---|
| UC01 | Evenement aanmaken |
| UC02 | Evenement bewerken |
| UC03 | Evenement verwijderen |
| UC04 | Energieverbruik bekijken |
| UC05 | Reviews bekijken |
| UC06 | Review plaatsen |
| UCU01 | Email versturen |
| UCU02 | Verbruik per huis vergelijken |