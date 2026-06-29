# Storage App

A full-stack cloud storage application built with **React**, **FastAPI**, and **PostgreSQL**. Users can securely register, log in, upload files, manage their storage, and download or delete files using JWT authentication.

---

## Features

* Secure user registration and login
* Password hashing using bcrypt
* JWT Authentication
* Protected routes
* User profile page
* File upload
* File download
* File deletion
* Search files
* Storage usage indicator
* PostgreSQL database
* Docker support

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication
* Passlib (bcrypt)

### DevOps

* Docker
* Docker Compose

---

## Project Structure

```text
storage-app/
│
├── backend/
│   ├── app/
│   ├── uploads/
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env
│   └── .env.docker
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── vite.config.ts
│
├── docker-compose.yml
└── README.md
```

---

## Screenshots

### Register

<img width="1116" height="1147" alt="image" src="https://github.com/user-attachments/assets/a6fc8928-a76f-44b8-92f8-6dc537c76034" />

---
### Login

<img width="559" height="569" alt="image" src="https://github.com/user-attachments/assets/455311d6-1726-41d9-9c86-452735c8c76c" />

---

### Dashboard

<img width="1116" height="1144" alt="image" src="https://github.com/user-attachments/assets/03c2bf73-642c-4265-b4c1-2b96d55edc9a" />

---

### Profile

<img width="1117" height="1138" alt="image" src="https://github.com/user-attachments/assets/88c25f33-e7bf-4c7c-87e7-42ed88cc686a" />


---

## Running Locally

### Clone the repository

```bash
git clone https://github.com/Geo-techy/Storage_app.git

cd storage-app
```

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:8080
```

---

## Running with Docker

Build the project

```bash
docker compose build
```

Run

```bash
docker compose up
```

Services

| Service  | URL                        |
| -------- | -------------------------- |
| Frontend | http://localhost:8080      |
| Backend  | http://localhost:8000      |
| API Docs | http://localhost:8000/docs |

---

## Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/storage

JWT_SECRET_KEY=your-secret-key
```

For Docker, use `.env.docker`:

```env
DATABASE_URL=postgresql://postgres:password@postgres:5432/storage

JWT_SECRET_KEY=your-secret-key
```

---

## REST API

### Authentication

| Method | Endpoint    |
| ------ | ----------- |
| POST   | `/register` |
| POST   | `/login`    |
| GET    | `/me`       |

---

### Files

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | `/upload`        |
| GET    | `/files`         |
| GET    | `/download/{id}` |
| DELETE | `/files/{id}`    |

---

### Storage

| Method | Endpoint   |
| ------ | ---------- |
| GET    | `/storage` |

---

## Future Improvements

* Folder support
* File renaming
* Drag & Drop upload
* Upload progress bar
* File sharing
* Trash / Recycle Bin
* AWS S3 storage
* Dark mode
* User profile picture
* Storage analytics

---

## Author

**Geo Joyson**

GitHub: https://github.com/Geo-techy

---

## License

This project is licensed under the MIT License.

