
# CoreNextJS 🚀
**Mastering Next.js Fundamentals to Core Concepts**

Live Demo: [corenextjs.vercel.app](https://corenextjs.vercel.app)

## 📌 Project Philosophy
CoreNextJS is a deep-dive exploration of the **Next.js App Router**. The goal of this project is to understand the "Core" of modern web development: bridging the gap between Client and Server using a unified codebase.

Instead of traditional separated architectures, this project focuses on **Server Actions** and **Server Components**, allowing for backend logic (Mongoose/MongoDB) and frontend UI to exist within the same file structure.



---

## 🛠️ The Tech Stack
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **ORM:** [Mongoose](https://mongoosejs.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Black & White Minimalist Theme)
* **Deployment:** [Vercel](https://vercel.com)

---

## 🧠 Core Learning Milestones
- [x] **Unified Full-Stack:** Implementing `use server` directives to handle database mutations directly in UI components.
- [x] **Database Optimization:** Managing singleton Mongoose connections to handle Vercel's serverless execution context.
- [x] **Modern Navigation:** Building a high-performance, accessible mobile sidebar with React state and Tailwind transitions.
- [x] **Data Flow:** Utilizing `revalidatePath` to keep the client UI in sync with the MongoDB state without manual page refreshes.

---

## ⚙️ Setup & Installation

### 1. Environment Configuration
Create a `.env.local` file in your root directory and add your MongoDB connection string:
```env
MONGODB_URI=your_mongodb_srv_address