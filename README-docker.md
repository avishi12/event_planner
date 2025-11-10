Dockerized stack (frontend + backend + MongoDB)

Build and run (PowerShell):

```powershell
# build and start
docker compose up --build -d

# view logs
docker compose logs -f

# stop and remove
docker compose down
```

Notes:
- The backend reads env vars from `backend/.env`. For development copy `backend/.env.example` to `backend/.env` and edit secrets.
- The frontend in this compose uses the React dev server and maps host port 3000 to container port 3000 (so open http://localhost:3000).
- In the Compose file the frontend's `REACT_APP_API_URL` points to the backend service using the service name `http://backend:4000` so containers can communicate. If you run the frontend locally (outside Docker) set `REACT_APP_API_URL` to `http://localhost:4000`.
- MongoDB is provided by the `mongo` service in compose; start the full stack with `docker compose up` so the backend can reach the database. The demo uses a simple root user/password in compose — change before production.
