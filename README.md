# YC Directory 🧠🚀

A clean and modern **Startup Directory Platform** built with **Next.js 15**, **React 19**, and **Sanity**, allowing entrepreneurs to submit their startup ideas for virtual pitch competitions. Users can create and publish ideas instantly, browse, search, and explore pitches with smooth UX, dynamic content management, and optimized loading via **ISR**.

## Live Demo

🔗 [Live Application](https://yc-directory-chi-pink.vercel.app)

## Features

- 📤 **Submit Pitch** — Users can submit startup ideas with title, description, category, image or video.
- 🔍 **Search & Filter** — Explore pitches and filter by category in real-time.
- 🧑‍🏬 **Profile Page** — Users can view a list of all their submitted ideas.
- 👁️ **View Counter** — Each pitch tracks how many times it's been viewed.
- 📟 **Pitch Details Page** — Full details including media and category.
- ⚡ **Live Content from Sanity** — Startup ideas are loaded dynamically through Sanity's Content API.
- 🔐 **NextAuth GitHub Authentication** — Secure login using GitHub OAuth with NextAuth.js.
- ✨ **Minimal UI Design** — Clean, accessible, and responsive design.

## Tech Stack

| Frontend   | Backend        | CMS / Auth        | Others             |
| ---------- | -------------- | ----------------- | ------------------ |
| Next.js 15 | Server Actions | Sanity CMS        | ShadCN UI          |
| React 19   | API Routes     | NextAuth (GitHub) | Tailwind CSS       |
| TypeScript |                |                   | Lucide-react Icons |

## Installation

```bash
# Clone the repository
git clone https://github.com/AbdulrahmanHabiba/yc_directory.git
cd yc_directory

# Install dependencies
npm install  # or yarn install

# Create environment variables
cp .env.example .env.local

# Start development server
npm run dev  # or yarn dev
```

Then open:

```
http://localhost:3000
```

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_TOKEN=

AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

## License

This project is licensed under the **MIT License**.

---

Built with ❤️ by Abdulrahman Habiba

