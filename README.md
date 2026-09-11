# Visitor Management System

A simple Visitor Management Admin Dashboard built with React, TypeScript, Redux Toolkit, Axios, Tailwind CSS, and JSON Server.

## Features

* Admin login with protected routes
* View and search visitors
* Add new visitors
* Approve / Reject visitors
* Delete visitors with confirmation
* Form validation
* Loading and error handling
* Responsive UI

## Tech Stack

* React + TypeScript
* Redux Toolkit
* Axios
* Tailwind CSS
* React Router
* JSON Server

## Setup

Install dependencies:

npm install

Start JSON Server:

npx json-server --watch db.json --port 3001

In another terminal, start the app:

npm run dev

## Login

Email: admin@example.com
Password: admin123

## Project Structure

src/
├── api/          # Axios and API calls
├── app/          # Redux store and slices
├── component/    # Reusable components
├── features/     # Types
├── pages/        # Login, Visitor List, Add Visitor
└── routes/       # Protected routes

## Mock API

JSON Server is used as a mock backend for authentication and visitor CRUD operations.

## Note

This project was created as a machine-coding assignment. The focus was on clean React/TypeScript code, Redux state management, API integration, validation, and a responsive UI.