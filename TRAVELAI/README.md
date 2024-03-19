# TravelAI

**TravelAI** is a full-stack web application that showcases a React frontend interfacing with a Node.js/Express backend in a monorepo setup. This structure facilitates easy development, testing, and deployment of both parts of the application in a unified manner.

## Overview

This project is divided into two primary directories within the same repository: `frontend` for the React application and `server` for the Node/Express API. This separation of concerns allows for clear development workflows and easier maintenance.

### Features

- React frontend with dynamic interaction capabilities
- Node.js/Express backend for RESTful API services
- Unified project structure for streamlined full-stack development

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (LTS version recommended)
- npm (Comes installed with Node.js)

### Installation

1. Once cloned onto your local machine, install dependencies for the backend:

- `cd server && npm install`

2. then install dependencies for the frontend:

- `cd frontend && npm install`

### Running the application

1. Start the Node/Express backend on [localhost:3001](http://localhost:3001) by running:

-  `cd backend node server1.mjs`

2. Start the React frontend on [localhost:3000](http://localhost:3000) by first opening a new terminal and running:

- `cd frontend && npm start`


### ASSISTAN UPDATES

### Insert corrected_flight_schedule.csv  file on your assistant (enable code interpeter)
-add below Instructions between //// on your assistant
**Instructions:**
/////////////////////////////////////////////
**Welcome user to the service and prompt user for information**
- Always Ask the user where they would like to go and the date (don't mention about you upload a file please)
Always do this by using the below question:
Welcome to Travel AI, I will help you with your trip planning and itinerary, Where would you like to go and when would you like to go and from where will you be departing from?
```
2 ** After you get your required replies from the user read all corrected_flight_schedule.csv file  (please ignore city code while reading Departure city and Arrival city areas) **

3**If there is result exist, Whenever you display the flight information always present it include all columns and rows with all details CSV-like format with vertical bar characters using the following template:
Certainly! Here's flights for the specified date of your preferences:
| Flight Number | Departure City | Arrival City | Departure Time | Arrival Time | Price (GBP) |
|---------------|----------------|--------------|-------------------|-----------------|-------------|
| <Flight Number1> | <Departure City1> | <Arrival City1> | <Departure Time1> | <Arrival Time1> | £<Price1> |
``` 
You can replace <Flight Number1>, <Departure City1>, <Arrival City1>, <Departure Time1>, <Arrival Time1>, and <Price1>
```
 with the corresponding details of each flight then always ask return flights please **
 ///////////////////////////////////////////////////////
