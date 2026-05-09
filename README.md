# 🛍️ ShopVerse - Full-Stack E-Commerce Platform

> A premium, production-ready e-commerce web application built for **UCS310 DBMS** at Thapar Institute. Features a modern React UI, interactive 3D elements, JWT authentication, and your complete MySQL schema with triggers, procedures, and views.

<div align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwindcss&logoColor=white" />
</div>

---

## ✨ Key Features
- 🎨 **Premium SaaS UI** – Clean, glassmorphism-inspired design with smooth Framer Motion animations
- ❓ **Interactive FAQ** – Accordion with +/- toggle, smooth expand/collapse, card-based layout
- 🎮 **3D Hero Section** – Animated floating sphere using React Three Fiber & Drei
- 🤖 **Smart Mascot** – Context-aware assistant that reacts to scroll/click with tooltips
- 🌓 **Dark/Light Mode** – System-aware toggle with persistent preferences
- 🔐 **JWT Authentication** – Secure login/register with protected API routes
- 🗄️ **Full DB Integration** – Your exact ShopVerse schema (triggers, procedures, views, cursors intact)

---

## 🛠️ Tech Stack
| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **3D/UX** | Three.js, React Three Fiber, Drei, Lucide Icons |
| **Backend** | Node.js, Express.js, JWT, bcryptjs, dotenv |
| **Database** | MySQL 8.0, mysql2,  |

---

## 🚀 Quick Start (Windows)

### 1️⃣ Database Setup
1. Open **MySQL Workbench** → Connect to `localhost:3306`
2. Create a new query tab, paste your `shopverse.sql` script
3. Execute (`Ctrl+Shift+Enter`) ✅

### 2️⃣ Backend
```bash
cd server
copy .env.example .env
# Edit .env: set MYSQL_PASSWORD and JWT_SECRET
npm install
npm run dev
