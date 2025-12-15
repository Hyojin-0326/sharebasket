# Location-Based Group Buying Web App

A full-stack web application that enables **location-based group buying** for students living alone.  
Users can create or join nearby group-buy deals and automatically split costs based on the number of participants.

## Overview

- Designed to reduce individual living costs through **local group purchases**
- Matches users by **location or region**
- Covers the full workflow: creation → participation → closing → cost settlement

## Key Features

- **Group Buy Creation**
  - Title, description, total price, target participants, deadline, image upload
- **Location-Based Browsing**
  - View nearby group-buy deals with tag-based filtering
- **Real-Time Participation**
  - Join group buys and update participant count dynamically
- **Automatic Cost Splitting**
  - Displays estimated cost per person based on current participants
- **Deadline Handling**
  - Automatically closes group buys after the deadline

> Planned feature: Comment / chat system (not implemented)

## Tech Stack

**Frontend**
- React
- React Router
- State management with `useState`, `useEffect`

**Backend**
- Spring Boot (Java)
- RESTful API design
- DTO / Service / Controller architecture

**Database**
- Firebase Firestore

**Environment**
- macOS
- Visual Studio Code

## Core APIs

- `POST /api/login` – User login  
- `POST /api/signup` – User registration  
- `POST /api/groupbuys` – Create group buy  
- `GET /api/groupbuys` – List group buys  
- `GET /api/groupbuys/{id}` – Group buy details  
- `POST /api/groupbuys/{id}/join` – Join group buy  

## Project Structure

.
├─ frontend/
│ └─ src/
│ ├─ pages/
│ ├─ components/
│ └─ ...
└─ backend/
└─ src/main/java/
├─ controller/
├─ service/
├─ dto/
├─ entity/
└─ repository/


## Key Engineering Challenges

### 1. Incorrect Price Storage
- **Problem**: `totalPrice` was always saved as 0
- **Cause**: Inconsistent field naming (`price` vs `totalPrice`)
- **Solution**: Unified naming across Entity, DTO, and Service layers

### 2. UI Not Updating After Join
- **Problem**: Participant count did not update on the frontend
- **Cause**: No data refresh after POST request
- **Solution**: Triggered a GET request to reload state after joining

## How to Run

### Backend
```bash
cd backend
./gradlew clean
./gradlew bootRun

### Frontend
```bash
cd frontend
npm install
npm run dev

### Demo 

https://github.com/user-attachments/assets/6e7f2a8e-666a-4a11-ac08-ce0b19617a0e

### Author

Hyojin Kwon
Undergraduate, Mechanical Engineering
Seoul National University

