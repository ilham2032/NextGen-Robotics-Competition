# NextGen Robotics Competition — API

Professional REST API built with [Django REST Framework](https://www.django-rest-framework.org/) for team and participant registration.

## Quick start

```bash
cd backend
py -3 -m pip install -r requirements.txt
copy .env.example .env          # Windows
py -3 manage.py migrate
py -3 manage.py seed_categories
py -3 manage.py runserver
```

API base URL: **http://127.0.0.1:8000/api/**

Set in the frontend `.env`:

```
VITE_REMOTE_API_URL=http://127.0.0.1:8000
```

Then run the frontend (`npm run dev`) in a second terminal.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health/` | Health check |
| `GET` | `/api/teams` | List all teams (flat array — used by Participants page) |
| `GET` | `/api/teams/` | List teams (DRF browsable API) |
| `POST` | `/api/teams/` | Register a new team |
| `GET` | `/api/teams/{id}/` | Team details |
| `PUT/PATCH` | `/api/teams/{id}/` | Update team |
| `DELETE` | `/api/teams/{id}/` | Delete team |
| `POST` | `/api/teams/sync/` | Bulk upsert teams (frontend sync) |
| `GET` | `/api/members/` | List participants (`?mentorId=` filter) |
| `POST` | `/api/members/` | Add participant |
| `POST` | `/api/members/sync/` | Bulk upsert members |
| `GET` | `/api/mentors/` | List mentors |
| `POST` | `/api/mentors/` | Register mentor |
| `POST` | `/api/mentors/sync/` | Bulk upsert mentors |
| `GET` | `/api/categories/` | List competition categories |

## Example: register a team

```bash
curl -X POST http://127.0.0.1:8000/api/teams/ \
  -H "Content-Type: application/json" \
```

## Admin panel

```bash
py -3 manage.py createsuperuser
```

Open http://127.0.0.1:8000/admin/ to manage teams, members, and mentors.

## Production notes

- Set `DJANGO_DEBUG=false` and a strong `DJANGO_SECRET_KEY`
- Use PostgreSQL (`DB_ENGINE=django.db.backends.postgresql`)
- Add your frontend domain to `CORS_ALLOWED_ORIGINS`
- Serve with Gunicorn + Nginx or deploy to Railway / Render / Fly.io
