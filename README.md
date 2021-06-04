# Mentorito

## Upute za pokretanje

Aplikacija Mentorito sastoji se od serverskog dijela (engl. _backend_) koji je napisan koristeći Node.js i programski okvir Express koji komunicira sa PostgreSQL bazom podataka te korisničkog sučelja napisanog u React.js-u.

Za pokretanje cjelokupne aplikacije potrebno je:

1. Klonirati ovaj repozitorij `git clone https://github.com/MarioVrd/mentorito`
2. Dodati `.env` datoteku u direktorij `backend` \*sadržaj ove datoteke biti će opisan na kraju ovoga teksta
3. Pokrenuti naredbu `docker-compose up -d` iz root (mentorito) direktorija
    1. _U slučaju problema provjerite u `frontend/package.json` datoteci je li proxy postavljen na `http://backend:5000`_

#### \*Sadržaj `.env` datoteke

**_Napomena_**: `DATABASE_URL` **nije potreban** ukoliko se aplikacija pokreće koristeći **Docker**

```
DATABASE_URL=postgresql://korisnickoIme:lozinka@host:port/baza?schema=public
DEFAULT_USER_PASSWORD=123456
NODE_ENV=development
PORT=5000
JWT_SECRET=nekiTajniKljuc
JWT_EXPIRES_IN=5d
```
