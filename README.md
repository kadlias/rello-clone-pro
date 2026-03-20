# Trello Clone (Kanban Board)

A fullstack Kanban board inspired by Trello. This project focuses on clean architecture, maintainability and real-world development practices.

## Tech Stack

Frontend
- React
- TypeScript

Backend
- Node.js
- Express

## Features

- Create, edit and manage tasks
- Move tasks between columns (drag & drop)
- Column-based workflow (To Do, Doing, Done)
- REST API for task management
- Simple and intuitive UI

## Project Structure

client/   → Frontend application (React + TypeScript)  
server/   → Backend API (Node.js + Express)  

## Getting Started

### Clone the repository

git clone https://github.com/kadlias/rello-clone-pro.git  
cd rello-clone-pro  

### Run the backend

cd server  
npm install  
node index.js  

Server runs on:
http://localhost:3000

### Run the frontend

cd client  
npm install  
npm run dev  

## API Overview

- GET /tasks → Retrieve all tasks  
- POST /tasks → Create a new task  
- PUT /tasks/:id → Update a task  

## Design Decisions

- The backend uses in-memory storage to keep the project simple and focused on architecture.
- The project is split into client and server to simulate a real production environment.
- The structure is designed to be easily extended with a database and authentication.

## Future Improvements

- Database integration (MongoDB / PostgreSQL)
- User authentication (JWT)
- Multiple boards per user
- Real-time updates

## License

MIT
