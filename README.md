# Next.js Simple Blog Spot

**Next.js Simple Blog Spot** is a full-stack blog application built with Next.js and Prisma
It allows users to create and manage blog posts, comment on them, and interact with categorized and genre-based content. The app supports user authentication and role-based access control for advanced permissions and content moderation.

## Features

- User authentication using **NexthAuth.js**
- Role-based permissions:
  - **Admin**, **Editor**, **Author**, and **Unprivileged** users
- Create, update, and delete blog posts
- Commenting system on posts
- Display post images by URL
- Categorize and tag posts with genres
- Sort posts by:
  - Category
  - Genre
  - Author
- Editor tools for managing categories and genres

## Tech Stack

- **Next.js** - App Router, Server Components, SSR
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **shadcn/ui** - Component styling with Tailwind CSS
- **NextAuth.js** - Authentication and session management
- **bcrypt** - Password Hashing
- **Sonner** - Toast notification system

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL instance

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alessiobarsi/nextjs-simple-blog-spot.git
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Configure the databse URL your .env file:

    DATABASE_URL=postgresql://your-db-url

4. Generate the Prisma client and apply migrations:

    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```

5. Seed the database:

    ```bash
    npx tsx prisma/seed.ts
    ```
    You will be prompted to enter an email and password for the superadmin user. This user can't be deleted or lose admin access.

6. Run the development server:

    ```bash
    npm run dev
    ```
    You may change your user details

### License

This project is open source and available under the MIT License.

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.