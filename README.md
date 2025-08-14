# WhatsApp Web UI Assignment

A full-stack messaging application assignment that replicates WhatsApp Web's interface and functionality. Built with React, Express.js, and Socket.IO for real-time messaging capabilities.

## Assignment Overview

This project demonstrates the implementation of a messaging interface similar to WhatsApp Web, featuring real-time communication, message processing, and a responsive UI. The application consists of a React frontend and an Express.js backend with Socket.IO integration.

## Backend Implementation

### Message Processing & API Routes

The backend handles message processing through dedicated controllers and routes:

**API Endpoints** (`message.routes.js`):

- `GET /chats/:user` - Retrieves all conversations for a specific user

**Message Controller** (`message.controller.js`):

- `getAllChats()` - Processes and returns user conversations
- Groups messages into conversations/chats
- Sorts conversations by most recent activity
- Handles message aggregation and formatting

### Real-time Communication

**Socket.IO Integration** (`socket.js`):

- `setupSocket(server)` - Configures WebSocket connections
- Handles real-time message broadcasting
- Manages user connection states
- Enables instant message delivery between clients

### Data Processing Features

- **Message Grouping**: Messages are automatically grouped into conversations based on participants
- **Conversation Sorting**: Chats are sorted by last message timestamp for better UX
- **Payload Processing**: Backend processes incoming message payloads and formats them appropriately
- **Real-time Updates**: Socket.IO ensures messages appear instantly across all connected clients

## Frontend Implementation

### Component Architecture

The frontend is built with React and uses a modular component structure:

**Main Components**:

- `App.jsx` - Main application container with state management
- `Sidebar.jsx` - Navigation sidebar with chat/status/calls/settings tabs
- `ConversationBar.jsx` - Chat list with search and filtering
- `WhatsappChat.jsx` - Individual chat interface (conditionally rendered)
- `DefaultBanner.jsx` - Welcome screen when no chat is selected

### State Management

**Global State** (`store/store.js`):

- Manages conversations list
- Tracks current active conversation
- Handles real-time state updates

**Custom Hooks**:

- `useAxios` - HTTP client for API requests
- `useSocket` - WebSocket connection management

### Key Features

**Chat Interface**:

- Real-time message display
- Conversation list with unread counts
- Search functionality across conversations
- Responsive design matching WhatsApp Web's UI

**Real-time Communication**:

- Instant message delivery via Socket.IO
- Live conversation updates
- Connection state management

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library for UI elements
- **WhatsApp-like Design** - Authentic color scheme and layout
- **Responsive Layout** - Adapts to different screen sizes

## Technology Stack

### Backend

- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **Node.js** - Runtime environment

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Icons** - Icon components

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB (local or cloud instance)

### Environment Configuration

#### Backend Environment Variables (`.env.local`)

Create a `.env.local` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/whatsapp
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp

# CORS Configuration
FRONTEND_URL=http://localhost:5173
 

```

#### Frontend Environment Variables (`.env.local`)

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# API Configuration
VITE_SERVER_URL=http://localhost:5000/api
VITE_PUBLIC_PHONE=918329446654
This variable is used to identify the user in the demo application.


# User Configuration (for demo purposes)
VITE_PUBLIC_PHONE=918329446654
VITE_USER_ID=user1
```

### Installation & Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd whatsapp-web-assignment
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create the `.env.local` file with the environment variables listed above, then start the server:

```bash
npm start
# OR for development with nodemon:
npm run dev
```

The backend server will run on `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create the `.env.local` file with the environment variables listed above, then start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

#### 4. Database Setup

- Ensure MongoDB is running locally on port 27017
- OR configure MongoDB Atlas connection string in backend `.env.local`
- The application will automatically create the required collections

### Running the Application

1. Start MongoDB service (if using local MongoDB)
2. Start the backend server: `cd backend && npm start`
3. Start the frontend development server: `cd frontend && npm run dev`
4. Open `http://localhost:5173` in your browser

### Environment Variables Explained

#### Backend Variables:

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `FRONTEND_URL` - Frontend URL for CORS configuration
- `SOCKET_CORS_ORIGIN` - Socket.IO CORS origin

#### Frontend Variables:

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_SOCKET_URL` - Socket.IO server URL
- `VITE_PUBLIC_PHONE` - Demo user phone number
- `VITE_USER_ID` - Demo user identifier

## Features Implemented

✅ **Core Messaging**:

- Send and receive messages
- Real-time message delivery
- Conversation management

✅ **UI Components**:

- Sidebar navigation
- Chat list with search
- Message interface
- Responsive design

✅ **Real-time Features**:

- Instant message updates
- Live conversation list
- Connection status handling

## Project Structure

```
├── backend/
│   ├── controllers/
│   │   └── message.controller.js
│   ├── routes/
│   │   └── message.routes.js
│   ├── socket.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConversationBar.jsx
│   │   │   ├── DefaultBanner.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── WhatsappChat.jsx
│   │   ├── hooks/
│   │   │   ├── useAxios.js
│   │   │   └── useSocket.js
│   │   ├── store/
│   │   │   └── store.js
│   │   └── App.jsx
│   └── index.html
└── README.md
```

## Assignment Features Demonstrated

This assignment showcases:

- **Backend Architecture**: RESTful API design with Express.js
- **Real-time Communication**: Socket.IO implementation for instant messaging
- **Database Integration**: MongoDB for message and conversation storage
- **Frontend Development**: Modern React with hooks and state management
- **UI/UX Design**: Responsive interface matching WhatsApp Web's design
- **Full-stack Integration**: Seamless communication between frontend and backend

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**: Ensure MongoDB is running and the connection string is correct
2. **CORS Issues**: Verify that `FRONTEND_URL` and `SOCKET_CORS_ORIGIN` match your frontend URL
3. **Environment Variables**: Double-check that all required environment variables are set
4. **Port Conflicts**: Ensure ports 5000 (backend) and 5173 (frontend) are available

### Development Tips:

- Use browser developer tools to monitor Socket.IO connections
- Check backend console for API request logs
- Verify environment variables are loaded correctly with `console.log(process.env.VARIABLE_NAME)`

This assignment demonstrates a complete full-stack messaging application with modern web technologies and real-time capabilities.
