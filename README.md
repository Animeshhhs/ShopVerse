🛍️ ShopVerse - Full-Stack E-Commerce
Premium SaaS-style e-commerce app with React, Node.js, Express & MySQL. Features 3D elements, interactive mascot, and production-ready FAQ.
<div align="center">








</div>

✨ Key Features
🎨 Premium UI – Clean SaaS design with glassmorphism & smooth animations
❓ Interactive FAQ – Accordion with +/- icons, smooth expand/collapse
🎮 3D Hero – Animated sphere using React Three Fiber
🤖 Mascot Assistant – Reacts to scroll/click with helpful tooltips
🌓 Dark/Light Mode – System-preference aware toggle
🔐 JWT Auth – Secure login/register with protected routes
🗄️ MySQL Schema – Your ShopVerse DB with triggers, procedures, views intact
🛠️ Tech Stack
Frontend
Backend
Database
React 18 + Vite
Node.js + Express
MySQL 8.0
Tailwind CSS
JWT + bcryptjs
Your ShopVerse schema
Framer Motion
MySQL2 + dotenv
Triggers/Procedures
Three.js + Drei
CORS + Helmet
Views + Cursors
🚀 Quick Start (Windows)
1️⃣ Clone & Setup
bash
12
2️⃣ Database (MySQL Workbench)
Open Workbench → Connect to localhost:3306
Paste your shopverse_schema.sql → Execute ⚡
Verify: USE e_commerce; SELECT COUNT(*) FROM customer; → Should return 3
3️⃣ Backend Setup
bash
12345
✅ Server runs at: http://localhost:5000
4️⃣ Frontend Setup
bash
1234
✅ App runs at: http://localhost:5173
📡 API Endpoints
bash
123456789101112
🗂️ Project Structure
123456789101112131415161718192021
🧪 Test It
bash
1234567
✅ Check frontend: FAQ accordion, 3D hero, mascot tooltips, dark mode toggle
🌐 Deploy
Frontend → Vercel
bash
12
Backend → Render
Create Web Service → Connect GitHub repo
Root dir: server | Build: npm install | Start: npm start
Add env vars from .env + MySQL credentials
👥 Team
Name
ID
Role
Animesh Sudhanshu
1024170375
Full-Stack Dev
Ashish Bhagat
1024170372
Database Architect
Course: UCS310 DBMS | Institute: Thapar Institute, Patiala
Group: 2Q34 | Session: Jan-May 2026
🐛 Troubleshooting
Issue
Fix
MySQL connection failed
Check password in server/.env, ensure MySQL service running
CORS error
Verify VITE_API_URL matches backend port
Port in use
netstat -ano | findstr :5000 → taskkill /PID <PID> /F
White screen
Check browser console (F12) for import errors
📜 License
MIT License © 2026 Animesh Sudhanshu & Ashish Bhagat
<div align="center">

⭐ Star this repo if it helped your DBMS project!
⬆ Back to Top
</div>
