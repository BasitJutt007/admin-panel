## 🛠️ Admin Panel — Supabase Content Manager

This is a simple and modern admin panel built using **Next.js (App Router)**, connected to a **Supabase** backend. It allows admins to update content (Title and Description), which is then used to rebuild a **public static site** automatically.

---

## 📌 Features

- ✍️ Edit and save a **title** and **description**
- 🕒 See **last updated timestamps** for each field
- ✅ Fields are validated and saved **only when changed**
- 🔄 **Triggers a rebuild** of the public static site using Supabase Edge Functions + GitHub Actions
- 💬 Clean UI with real-time feedback using `react-hot-toast`
- 🎨 Fully styled with **Tailwind CSS**

---

## 🧠 Tech Stack

| Tech                | Usage                                       |
| ------------------- | ------------------------------------------- |
| **Next.js**         | React-based frontend framework (App Router) |
| **Supabase**        | Database + Edge Functions                   |
| **Tailwind**        | Styling the UI cleanly & quickly            |
| **GitHub Actions**  | Used indirectly for site rebuild            |
| **React Hot Toast** | For UI feedback (success, errors)           |

---

## 🔐 Environment Variables

Before running locally, make sure you have a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These keys are provided by Supabase and are safe to use on the frontend.

---

## 🚀 How It Works

1. You fill in or update the Title and/or Description.
2. The form checks what has changed and updates Supabase.
3. After a successful save, it calls a **Supabase Edge Function**.
4. That Edge Function uses your GitHub PAT to trigger a **GitHub Action**.
5. The GitHub Action connects to your droplet and **rebuilds the static site**.
6. ✅ Updated content goes live on the public site in seconds.

---

## 📸 Screenshots

| Light UI             | Updated with Gradient Style      |
| -------------------- | -------------------------------- |
| ✨ Admin Panel       | 💾 Save Changes                  |
| 🕒 Last Updated Time | 💬 Real-time Toast Notifications |

---

## 🧪 Development Setup

```bash
npm install
npm run dev
```

Then visit:  
📍 [http://localhost:3000](http://localhost:3000)

---

## 💡 Deployment

This project is deployed using **Vercel**.

You can easily deploy it yourself by:

- Pushing the repo to GitHub
- Connecting your GitHub to [https://vercel.com](https://vercel.com)
- Setting the same environment variables in Vercel Dashboard
