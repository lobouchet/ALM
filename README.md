# To Scooby-Do

A modern and efficient to-do list application built with Next.js and Firebase.

## Features

- Create, update, and delete tasks
- Mark tasks as complete/incomplete
- Visual alerts for:
  - More than 15 incomplete tasks
  - Tasks expiring within 1 hour
- Responsive design
- Real-time updates with Firebase
- CI/CD pipeline with GitHub Actions
- Automated testing with Playwright

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Firebase Authentication
- Firebase Realtime Database
- Playwright for E2E testing

### DevOps
- GitHub Actions for CI/CD
- Firebase Hosting
- Automated testing

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd to-scooby-do
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Testing

The project includes E2E tests using Playwright. To run the tests:

```bash
# Install Playwright browsers
npx playwright install --with-deps

# Run tests
npx playwright test
```

## Deployment

The application is automatically deployed to Firebase Hosting when changes are pushed to the master branch. The deployment process includes:

1. Running tests
2. Building the application
3. Deploying to Firebase Hosting

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment. The workflow:

1. Runs on push to master branch and pull requests
2. Executes tests
3. Deploys to Firebase Hosting (only on master branch)

## License

MIT 