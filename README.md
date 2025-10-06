Task Manager App
A modern, responsive Task Management application built with React, Firebase, and Material-UI.

https://img.shields.io/badge/React-18.2.0-blue https://img.shields.io/badge/Firebase-10.7.1-orange https://img.shields.io/badge/Material--UI-5.14.20-purple https://img.shields.io/badge/License-MIT-green

🚀 Live Demo
View Live App <!-- Update with your actual Vercel URL -->

📋 Features
✅ User Authentication - Secure sign up and login with Firebase Auth

📝 Task Management - Create, read, update, and delete tasks

🏷️ Task Organization - Categorize tasks by status (To Do, In Progress, Done)

⚡ Priority Levels - Set task priorities (High, Medium, Low)

📅 Due Dates - Add due dates to tasks

🎨 Modern UI - Beautiful, responsive design with Material-UI

🔒 Real-time Sync - Instant updates with Firebase Firestore

📱 Mobile Friendly - Fully responsive design

🛠️ Tech Stack
Frontend: React 18, Material-UI, Context API

Backend: Firebase (Authentication & Firestore)

Deployment: Vercel

Styling: Material-UI with custom theme

📦 Installation
Clone the repository

bash
git clone https://github.com/BrMwita/Task-manager.git
cd Task-manager
Install dependencies

bash
npm install
Set up Firebase

Create a Firebase project at Firebase Console

Enable Authentication (Email/Password)

Create Firestore Database

Update src/firebase/config.js with your Firebase config

Run the development server

bash
npm start
Build for production

bash
npm run build
🔧 Firebase Configuration
Create a new Firebase project

Enable Authentication → Email/Password

Create Firestore Database in test mode

Add your web app and copy the configuration

Update src/firebase/config.js:

javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
🎯 Usage
Sign Up - Create a new account with email and password

Login - Access your task dashboard

Create Tasks - Click "New Task" to add tasks with title, description, priority, status, and due date

Organize - Filter tasks by status (All, To Do, In Progress, Done)

Manage - Edit or delete tasks as needed

📁 Project Structure
text
task-manager/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── TaskCard.js
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   │   ├── Header.js
│   │   └── LoadingSpinner.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── firebase/
│   │   └── config.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── styles/
│   │   └── theme.js
│   ├── App.js
│   ├── index.js
│   └── App.css
├── package.json
└── README.md
🚀 Deployment
This app is deployed on Vercel. To deploy your own version:

Fork this repository

Connect your GitHub account to Vercel

Import the project

Add Firebase environment variables

Deploy!

🔒 Security Features
Firebase Authentication for secure user management

Firestore Security Rules for data protection

Context API for state management

Protected routes for authenticated users only

🎨 Customization
The app uses a custom Material-UI theme. You can customize colors, typography, and components in src/styles/theme.js:

javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4338ca',
    },
    // Customize your colors here
  },
});
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Brian Mwita

GitHub: @BrMwita

Portfolio: [Your Portfolio Link] <!-- Add your portfolio link if you have one -->

LinkedIn: [Your LinkedIn] <!-- Add your LinkedIn if you have one -->

🙏 Acknowledgments
Material-UI for the beautiful component library

Firebase for the robust backend services

React team for the amazing framework

Vercel for seamless deployment

⭐ Star this repository if you found it helpful!

Built with ❤️ by Brian Mwita