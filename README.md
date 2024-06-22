
# Project Setup Guide

This guide will walk you through setting up a Node.js project with MongoDB and configuring environment variables for database connection and email credentials.

## Step 1: Clone the Project Repository

1. Clone the project repository from GitHub:
   ```bash
   git clone https://github.com/saaya-code/carbon-footprint-explorer.git
   ```

2. Navigate into the project directory:
   ```bash
   cd carbon-footprint-explorer/
   ```

## Step 2: Install Dependencies

1. Install Node.js dependencies using npm:
   ```bash
   npm install
   ```

## Step 3: MongoDB Setup

1. **Install MongoDB Community Edition**

   - Visit the [MongoDB Download Center](https://www.mongodb.com/try/download/community) and download the Community Server version suitable for your operating system.
   - Follow the installation instructions for your OS.

2. **Start MongoDB Server**

   - After installation, start the MongoDB server:
     - On Windows, use the Command Prompt or PowerShell and run `mongod`.
     - On macOS/Linux, open a terminal and run `mongod`.
   - MongoDB server should now be running on `localhost:27017` by default.

3. **Create a Database and Collection**

   - You can create a database and collection using MongoDB Compass or through the MongoDB shell (`mongo` command).
   - Example using MongoDB shell:
     ```bash
     # Connect to MongoDB
     mongo
     # Create a new database
     use carbonFootprint
     ```

## Step 4: Configure `.env` File

1. **Create `.env` File**

   - In the root of your Node.js project, create a `.env` file if it doesn't already exist.

2. **Environment Variables**

   - Add the following environment variables to your `.env` file:
     ```dotenv
     # MongoDB Connection URI
     MONGODB_URI=mongodb://localhost:27017/carbonFootprint
     
     # Example Email Credentials (replace `<your mail>` and `<your password>` with your actual email credentials)
     EMAIL_USER=<your mail>
     EMAIL_PASS=<your password>
     ```

   - Replace `carbonFootprint` in `MONGODB_URI` with the name of your MongoDB database.
   - Replace `<your mail>` and `<your password>` with your actual email credentials for sending confirmation emails.

## Step 5: Start the Application

1. Run the application in dev mode:
   ```bash
   npm run dev
   ```

2. Access the application in your web browser at `http://localhost:3000`.

3. Run the application in production mode:
   ```bash
   npm run build
   npm start
   ```
---


