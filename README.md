# Exercise Armory

## Overview

[The Exercise Armory](https://exercise-armory-frontend.onrender.com)

[![Watch the video](https://raw.githubusercontent.com/MattOzuna/exercise-armory-frontend/main/public/img/demoVid.mov)](https://raw.githubusercontent.com/MattOzuna/exercise-armory-frontend/main/public/img/demoVid.mov)

The Exercise Armory is a frontend web application built with React and React Router. This app provides a user-friendly interface for managing exercises and workouts. Users can register, log in, view exercise details, and manage their workout routines. The application includes protected routes to ensure that only authenticated users can access certain features. The App was deployed using [Render](https://render.com/). 

## Features

- User Authentication: Register and log in to access personalized workout plans.
- Exercise Details: View detailed information about specific exercises.
- User Details: Access user-specific information and workout routines.
- Workouts Management: Manage and view details of workout routines.
- Exercise List: Access and manage exercises within a specific workout.
- Error Handling: Custom error page for undefined routes.

## Routes

The application includes the following routes:

- `/`: Home page displaying an overview of the application.
- `/login`: Login form for user authentication.
- `/register`: Registration form for new users.
- `/exercises/:id`: Protected route for viewing details of a specific exercise.
- `/users/:username`: Protected route for viewing user-specific information.
- `/users/:username/workouts/:id`: Protected route for viewing details of a specific workout.
- `/users/:username/workouts/:id/exercises`: Protected route for viewing exercises within a specific workout.
- `*`: Custom error page for undefined routes.

## Components

- **Navbar**: The navigation bar that provides links to various parts of the application.
- **Home**: The homepage component that welcomes users and provides an overview of the app.
- **LoginForm**: The login form component for user authentication.
- **RegisterForm**: The registration form component for new users.
- **ExerciseDetails**: Component for displaying details of a specific exercise.
- **UserDetails**: Component for displaying user-specific information.
- **WorkoutsDetails**: Component for displaying details of a specific workout.
- **ExerciseList**: Component for displaying a list of exercises within a specific workout.

## Protected Routes

The application uses `ProtectedRoute` components to ensure that certain routes are only accessible to authenticated users. This is achieved by wrapping the protected components in a context provider that manages user authentication state.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.
