# 🎬 VidKit – Fullstack Video Upload & Streaming App with Next.js

VidKit is a modern, full-stack video platform built using the Next.js App Router. It allows authenticated users to upload, stream, and view videos with optimized thumbnail previews. The project leverages powerful tools like **ImageKit**, **NextAuth**, **MongoDB**, and **Tailwind CSS** to deliver a smooth developer and user experience.

---

## 🚀 Features

- 🔐 **Authentication** – Secure login/logout using NextAuth
- 📦 **MongoDB Database** – Mongoose models for users & videos
- 🖼️ **ImageKit Integration** – Real-time optimized image and video uploads
- 🧠 **AI-powered Transformations** via ImageKit URL parameters
- 📂 **Video Uploading** – Separate thumbnail and video file handling
- 🔎 **Public Feed** – Users can view uploaded videos
- ⚙️ **Protected Routes & Middleware** – Only authenticated users can upload
- 🎨 **Tailwind CSS UI** – Clean, responsive design

---

## 🧰 Tech Stack

| Technology             | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| **Next.js App Router** | Full-stack React framework                     |
| **MongoDB + Mongoose** | NoSQL database and schema modeling             |
| **NextAuth.js**        | User authentication & session handling         |
| **ImageKit**           | Media upload, optimization, and CDN            |
| **Tailwind CSS**       | Utility-first CSS framework                    |
| **Axios**              | API communication between frontend and backend |

---

## 📁 Folder Structure

```

.
├── next-auth.d.ts                      # Type augmentation for NextAuth
├── middleware.ts                       # Route protection middleware
├── .env                                # Environment variables

├── models/
│   ├── User.ts                         # Mongoose model for users
│   └── Video.ts                        # Mongoose model for videos

├── lib/
│   ├── api-client.ts                   # Axios wrapper for API calls
│   ├── auth.ts                         # NextAuth config
│   └── db.ts                           # MongoDB connection

├── app/
│   ├── layout.tsx                      # Global layout
│   ├── page.tsx                        # Home page (Video Feed)

│   ├── api/
│   │   ├── auth/
│   │   │   ├── \[...nextauth]           # NextAuth route
│   │   │   └── register                # User registration API
│   │   ├── imagekit-auth               # ImageKit token auth API
│   │   └── video                       # Video CRUD API

│   ├── (auth)/
│   │   ├── login                       # Login page
│   │   └── register                    # Register page

│   ├── components/
│   │   ├── FileUpload.tsx             # Upload component (ImageKit)
│   │   ├── Footer.tsx                 # Page footer
│   │   ├── Header.tsx                 # Top navigation
│   │   ├── Providers.tsx              # Session provider
│   │   └── VideoCard.tsx              # Video card preview

│   └── file-upload/                   # Upload form page (protected)

```

---

## 🔧 Environment Variables

Make sure to add the following in your `.env`:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

---

## 🧠 ImageKit AI Tips

Use smart URL transformation like:

```
https://ik.imagekit.io/your_id/your_image.jpg?tr=w-400,h-300,q-90,fo-auto
```

---

## 📦 Local Development

```bash
git clone https://github.com/AliHasnM/vidkit.git
cd vidkit
npm install
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🌍 Deployment

Recommended: [Vercel](https://vercel.com/)

- Set `.env` values in Vercel's Environment Variables
- Connect GitHub → Deploy

---

## 🪪 License

MIT © Ali Hassan

---
