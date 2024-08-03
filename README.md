# Meeting Minutes System

## Overview

The Meeting Minutes System is a comprehensive web application designed to streamline the process of managing meetings, tracking action items, and generating reports. Built with Next.js and utilizing Prisma ORM with a SQLite database, this system offers a robust solution for organizations looking to enhance their meeting productivity and follow-up processes.

## Features

- **Meeting Management**: Create, edit, and delete meetings
- **Action Item Tracking**: Assign and monitor action items from meetings
- **Member Management**: Maintain a database of team members
- **Reporting**: Generate insightful reports on meeting productivity and action item status
- **User-friendly Interface**: Intuitive design for ease of use

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Node.js, Next.js API Routes
- **Database**: SQLite
- **ORM**: Prisma
- **UI Components**: Shadcn UI
- **State Management**: Zustand
- **Charts**: Recharts

## Prerequisites

- Node.js (version 20 or later) 
- npm (usually comes with Node.js)
- Node 20.11.0 was used to build this app

## Getting Started

1. **Clone the repository**
   ```
   git clone https://github.com/your-username/meeting-minutes-system.git
   cd meeting-minutes-system
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up the database**
   ```
   npx prisma migrate dev
   ```
   This command initializes the SQLite database and applies all migrations.

4. **Seed the database**
   ```
   npx prisma db seed
   ```

5. **Start the development server**
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
meeting-minutes-system/
├── app/                 # Next.js app directory
│   ├── api/             # API routes
│   ├── meeting-items/   # Meeting items pages
│   ├── meeting-list/    # Meeting list page
│   ├── members-list/    # Members list page
│   ├── reports/         # Reports page
│   └── ...
├── components/          # Reusable React components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
├── prisma/              # Prisma schema and migrations
├── public/              # Static assets
└── styles/              # Global styles
```

## Advanced Usage

### Database Management

- **Open Prisma Studio** (GUI for database):
  ```
  npx prisma studio
  ```

- **Update Prisma Client** after schema changes:
  ```
  npx prisma generate
  ```

### Custom API Routes

The project uses Next.js API routes located in `app/api/`. To add a new API endpoint, create a new file in this directory.

### Adding New Features

1. Create new components in the `components/` directory
2. Add new pages in the `app/` directory
3. Implement new API routes in `app/api/` if required
4. Update Prisma schema in `prisma/schema.prisma` for any data model changes

## Deployment

1. Build the project:
   ```
   npm run build
   ```

2. Start the production server:
   ```
   npm start
   ```

## Contributing

We welcome contributions to the Meeting Minutes System! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Troubleshooting

- If you encounter database-related issues, try:
  ```
  npx prisma migrate reset
  ```
  This will reset your database and reapply all migrations.

- For Prisma Client issues:
  ```
  npx prisma generate
  ```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Shadcn UI for the component library
- Recharts for charting capabilities
- The Prisma team for their excellent ORM

---

For more information or support, please open an issue in the GitHub repository.
