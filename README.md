# ShoppingList

Eine Einkaufslisten-App: React-Frontend, Express-API, MongoDB. Monorepo mit
npm-Workspaces, `apps/api` und `apps/frontend` als Anwendungen, `packages/domain`,
`packages/contracts` und `packages/infrastructure` als gemeinsam genutzte Pakete.

## Voraussetzungen

- [Docker](https://www.docker.com/) mit Docker Compose (Docker Desktop bringt das
  bereits mit)

Für die Entwicklung am Code zusätzlich:

- [VS Code](https://code.visualstudio.com/) mit der Erweiterung
  [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Ein eigenes, lokal installiertes Node.js wird nicht gebraucht, weder zum Ausführen
noch zum Entwickeln, beides läuft in Containern.

## Schnellstart, nur ausführen

Der einfachste Weg, die App laufen zu sehen, ohne am Code zu arbeiten.

1. Repository klonen und in den Ordner wechseln.

2. `.env`-Datei aus der Vorlage anlegen:

```bash
cp _docker/.env.example _docker/.env
```

3. In der neuen `_docker/.env` mindestens `MONGO_USER` und `MONGO_PASSWORD` setzen,
   beide haben keinen Standardwert und die API startet ohne sie nicht. Die restlichen
   Werte (Ports, Datenbankname) können unverändert bleiben.

4. Alles bauen und starten:

```bash
docker compose -f _docker/docker-compose.yml up -d --build
```

5. Öffnen: `http://localhost:8080` (oder der Wert von `FRONTEND_PORT` in der `.env`).
   Die API selbst hat keine eigene Seite zum Öffnen, sie wird nur vom Frontend
   aufgerufen. Zum Prüfen, ob sie läuft, reicht `http://localhost:3280/health`
   (oder der Wert von `API_PORT`), die Antwort ist nur `{"status":"ok"}`.

6. Wieder stoppen:

```bash
docker compose -f _docker/docker-compose.yml down
```

## Entwicklung

Für Änderungen am Code, mit Hot Reload in Frontend und API.

### Mit VS Code (empfohlen, so ist das Projekt entstanden)

1. Schritte 1 bis 3 aus dem Schnellstart (Repository klonen, `.env` anlegen, Zugangsdaten
   eintragen).
2. Projekt in VS Code öffnen, dann über die Befehlspalette (`Strg+Shift+P`)
   „Dev Containers: Reopen in Container" wählen. Das startet einen Node-Container mit
   dem gesamten Projekt und zusätzlich MongoDB in einem eigenen Container, aber nicht
   Frontend und API selbst, die laufen im DevContainer direkt über Node, nicht als
   eigene Docker-Images.
3. Im Terminal des DevContainers einmalig alle Pakete installieren und bauen:

```bash
npm install
npm run build
```

`npm run build` baut `domain`, `contracts` und `infrastructure`, in dieser
Reihenfolge, weil `api` und `frontend` von allen dreien abhängen.

4. API starten, in einem Terminal:

```bash
npm run dev -w apps/api
```

5. Frontend starten, in einem zweiten Terminal:

```bash
npm run dev -w apps/frontend
```

6. Frontend erreichbar unter `http://localhost:5173`, die API läuft auf Port 3000,
   ein in Vite eingerichteter Proxy leitet Anfragen an `/api` dorthin weiter, siehe
   `apps/frontend/vite.config.ts`.

### Nach Änderungen in `packages/*`

Ändert sich etwas in `packages/domain`, `packages/contracts` oder
`packages/infrastructure`, sehen `apps/api` und der Editor das erst nach:

```bash
npm run build
```

und einem TypeScript-Server-Neustart in VS Code (`Strg+Shift+P` →
„TypeScript: Restart TS Server"). Grund: `main` und `types` dieser Pakete zeigen auf
den kompilierten `dist`-Ordner, nicht auf den Quellcode.

### Ohne VS Code

Dieselben Schritte funktionieren auch ohne Dev-Containers-Erweiterung, mit lokal
installiertem Node.js (Version 24) und MongoDB separat gestartet:

```bash
docker compose -f _docker/docker-compose.yml up -d mongodb
npm install
npm run build
npm run dev -w apps/api
npm run dev -w apps/frontend
```

## Umgebungsvariablen

Alle in `_docker/.env`, Vorlage in `_docker/.env.example`.

| Variable | Bedeutung | Pflicht |
|---|---|---|
| `MONGO_USER` | Benutzername für MongoDB | ja |
| `MONGO_PASSWORD` | Passwort für MongoDB | ja |
| `MONGO_HOST` | Rechnername der Datenbank | nein, Standard `localhost` |
| `MONGO_PORT` | Port der Datenbank | nein, Standard `27017` |
| `MONGO_DB` | Name der Datenbank | nein, Standard `shoppinglist` |
| `FRONTEND_PORT` | Port, unter dem das Frontend erreichbar ist | nein, Standard `8080` |
| `API_PORT` | Port, unter dem die API von außen erreichbar ist | nein, Standard `3280` |
| `RESTART_POLICY` | Docker-Neustartverhalten der Container | nein, Standard `unless-stopped` |

## Projektstruktur

```
apps/
  api/            Express-API
  frontend/       React-Frontend
packages/
  domain/         Reine Typen und Fehlerklassen, keine Abhängigkeiten
  contracts/      Zod-Schemas, gemeinsam genutzt von api und frontend
  infrastructure/ MongoDB-Anbindung (Mongoose)
_docker/          docker-compose.yml und .env für den vollständigen Stack
.devcontainer/    Entwicklungsumgebung für VS Code
```
