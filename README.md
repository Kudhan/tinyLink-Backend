# 🔗 TinyLink Backend — URL Shortener API

TinyLink Backend handles **authentication**, **URL shortening**, **redirects**, and **analytics tracking** for the TinyLink platform.

This backend is built using **Node.js, Express, PostgreSQL (Supabase), and Prisma ORM**.


---

# 🚀 Live API
Backend (Render):  
**[https://tinylink-backend-1wtm.onrender.com]**

---

# 📦 Tech Stack
- **Node.js + Express**
- **PostgreSQL (Supabase)**
- **Prisma ORM**
- **JWT Authentication**
- **CORS + Helmet (security)**
- **Render Deployment**

---

# 🛠️ Installation

```bash
cd backend
npm install

⚙️ Environment Variables

Create .env:

DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
BASE_URL=https://your-backend.onrender.com
PORT=3000

---

▶️ Run Locally
npm run dev


Server runs at:

http://localhost:3000

🗂️ Project Structure
backend/
 ├── prisma/
 │    ├── schema.prisma
 │    └── migrations/
 ├── src/
 │    ├── server.js
 │    ├── prismaClient.js
 │    ├── middleware/auth.js
 │    └── routes/
 │         ├── auth.js
 │         └── links.js
 ├── .env
 └── package.json

---

🔐 Authentication Endpoints
POST /api/auth/register
{
  "email": "test@example.com",
  "password": "secret"
}

POST /api/auth/login

Response:

{
  "token": "...",
  "expiresIn": "7d",
  "user": { "id": 1, "email": "test@example.com" }
}

GET /api/auth/me

Headers:

Authorization: Bearer <TOKEN>

🔗 Link Endpoints
POST /api/links

Headers:

Authorization: Bearer <TOKEN>


Body:

{
  "target": "https://google.com",
  "code": "custom12"
}

GET /api/links

Supports filtering:

q, deleted, minClicks, maxClicks, dateFrom, dateTo, sort, order, limit, offset

GET /api/links/:code

Returns analytics.

DELETE /api/links/:code

Soft delete → /:code returns 404.

---

🔁 Redirect Endpoint
GET /:code

302 Redirect

Increments totalClicks

Updates lastClicked

Returns 404 if deleted or not found

---

🧪 Test with curl
Healthcheck
curl https://your-backend.onrender.com/healthz

Create link
curl -X POST https://your-backend.onrender.com/api/links \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"target":"https://google.com"}'

Redirect
curl -I https://your-backend.onrender.com/<CODE>

Stats
curl https://your-backend.onrender.com/api/links/<CODE> \
  -H "Authorization: Bearer <TOKEN>"

---

🌐 Deployment (Render)

Push backend to GitHub

Create Web Service on Render

Add environment variables

Build command (optional):

npm install && npx prisma generate


Start command:

npm start
