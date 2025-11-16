# ProjectPulse : Project Management Platform with AI Features

## Overview

A full-stack SaaS solution for modern team collaboration and project management. Built with Next.js 15, PostgreSQL, and Prisma ORM, this platform delivers secure authentication, robust data management, real-time analytics, and a seamless user experience. Now enhanced with AI-powered modules for intelligent task decomposition and smart task assignments, the platform ensures optimal workflow, balanced workload, and elevated team productivity.

## Features

- Multi-workspace and multi-project support
- Kanban board, Gantt chart, project calendar, and real-time dashboards
- Role-based access and permissions for granular team management
- Advanced authentication and user management via Kinde
- File uploads supported with Uploadthing
- Modern, responsive UI with Tailwind CSS
- Onboarding, notifications, project and task-level documentation
- **AI Task Decomposition:** Automatically breaks complex tasks into actionable subtasks, streamlining planning and execution
- **AI Smart Task Assignment:** Suggests optimal task allocation using insights on team skills, workload, and past performance, and adapts to project changes in real-time

## Demo

Features end-to-end project management from onboarding to team invitation, project planning, file management, and analytics. Dynamic dashboards enable real-time tracking of progress and team activities.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- PostgreSQL database (e.g., Neon or local instance)
- Kinde account for authentication
- Optional: Configure Uploadthing for file uploads

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/yourusername/your-task-manager.git
    cd your-task-manager
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Configure environment variables in `.env`:
    - Database connection string
    - Kinde client and secret keys
    - Uploadthing credentials (if using file upload)

4. Run database migrations:
    ```
    npx prisma migrate dev
    ```

5. Start the development server:
    ```
    npm run dev
    ```

### Usage

- Access the app at `http://localhost:3000`
- Register or log in using Kinde authentication
- Create a workspace, add projects, tasks, manage team members
- Use AI-powered modules to decompose tasks and assign work intelligently

## AI Modules

- Task Decomposition: AI analyzes complex tasks and produces subtasks that facilitate efficient progress tracking and resource allocation.
- Smart Task Assignment: The AI recommends assignments based on member skills, availability, and historical performance, continuously adapting to project dynamics.

## Contribution

PRs and suggestions are welcome! Please fork the repository and submit a pull request.

## License

[MIT](LICENSE)

---

For questions or support, open an issue or reach out to the maintainers.

