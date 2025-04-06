# LinkedIn Local Nigeria 2025 Website

## Project Overview
This repository contains the official website for LinkedIn Local Nigeria 2025 (LLN'25). The website serves as the digital face of the LinkedIn Local Nigeria community, providing information about upcoming events, speakers, sponsors, and registration details.

## Tech Stack
- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

## Current Status
The project is currently in development. We are building a responsive landing page with modern animations and UI components.

## Project Structure
```
LinkedIn-Local-NIgeria/
├── public/
│   ├── assets/
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/LinkedIn-Local-Nigeria/LinkedIn-Local-NIgeria.git
   cd LinkedIn-Local-NIgeria.
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Contribution Guidelines

### Branch Workflow
1. **IMPORTANT**: No direct pushes to the `main` branch are allowed
2. Branch permissions have been set to restrict pushing to `main` - only the team lead has this permission
3. All work must be done on feature branches

### How to Contribute
1. Check the Issues tab for available tasks
2. Self-assign an issue you want to work on
3. Create a new branch named after the issue:
   ```bash
   git checkout -b issue-42-header-component
   ```
4. Work on your assigned task
5. Commit your changes with meaningful commit messages:
   ```bash
   git commit -m "feat: implement responsive header component"
   ```
6. Push your branch to the repository:
   ```bash
   git push origin issue-42-header-component
   ```
7. Create a Pull Request (PR) to merge your branch into `main`
8. Wait for code review and address any requested changes
9. The team lead will merge your PR once approved

### Code Standards
- Follow the project's ESLint and Prettier configurations
- Write clean, maintainable, and well-documented code
- Ensure components are responsive and accessible
- Test your code before submitting a PR

## Deployment
The website will be deployed automatically from the `main` branch using GitHub Actions. Details about the deployment process will be added soon.

## Project Timeline
- **Phase 1**: Landing page development (Current)
- **Phase 2**: Event registration and speaker profiles
- **Phase 3**: Interactive agenda and sponsor showcase

## Contact
For any questions or issues, please contact the Web Development Team Lead.
