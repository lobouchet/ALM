# To Scooby-Do

A simple and functional to-do list application with user authentication and task management.

## Features

- User authentication (login/register)
- Create, update, and delete tasks
- Mark tasks as complete/incomplete
- Visual alerts for:
  - More than 15 incomplete tasks
  - Tasks expiring within 1 hour
- Responsive design

## Tech Stack

### Frontend
- React
- Styled Components
- React Router
- Axios
- React Toastify

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt for password hashing

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd to-scooby-do
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/to-scooby-do
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
```

## Running the Application

1. Start the MongoDB server

2. Start the backend server:
```bash
cd server
npm run dev
```

3. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Tasks
- GET `/api/tasks` - Get all tasks for the authenticated user
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## License

MIT 