# Project Setup Guide

This guide will walk you through the steps to set up the project, install dependencies, configure Google API credentials, and set up the `.env` file for environment variables.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Step 1: Clone the Repository](#step-1-clone-the-repository)
- [Step 2: Install Dependencies](#step-2-install-dependencies)
- [Step 3: Set Up Google API](#step-3-set-up-google-api)
- [Step 4: Configure the .env File](#step-4-configure-the-env-file)
- [Step 5: Run the Application](#step-5-run-the-application)

## Prerequisites

Before starting, make sure you have the following:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Google Cloud project for OAuth credentials (refer to **Step 3** below)

## Step 1: Clone the Repository

Clone this repository to your local machine using `git clone`:

```
git clone https://github.com/rajvirsingh03/assessment.git
cd assessment
```

## Step 2: Install Dependencies

Run the following command to install all required dependencies:

```
npm install
cd client
npm install
```

## Step 3: Set Up Google API

To enable Google OAuth and Google Calendar API, follow these steps:

- Create a Google Cloud Project:
  -- Go to the Google Cloud Console.
  -- Click on Select a project or Create Project.
  -- Give your project a name (e.g., "WhiteCarrot Assessment").
  -- Click Create.

- Enable the Google Calendar API:
  -- In the Google Cloud Console, navigate to APIs & Services > Library.
  -- Search for Google Calendar API and enable it for your project.

- Create OAuth 2.0 Credentials:
  -- Go to APIs & Services > Credentials.
  -- Click on Create Credentials > OAuth 2.0 Client ID.
  -- Choose Web application.
  -- Under Authorized redirect URIs, add the following:
  `      http://localhost:5000/auth/callback
     `
  -- After creating the credentials, you will get your Client ID and Client Secret
  -- Download the Credentials:
  -- After creating the OAuth client ID, click the download icon to get your OAuth credentials as a .json file (if needed).

## Step 4: Configure the .env File

- In the server folder, create a .env file. Add the following entries in your .env file:
  ```
      CLIENT_ID=your-google-client-id
      CLIENT_SECRET=your-google-client-secret
      REDIRECT_URI=http://localhost:5000/auth/callback
  ```
  Replace your-google-client-id and your-google-client-secret with the actual values from the Google Cloud Console.

## Step 5: Run the Application

- Start the server by running the following command in the server folder:
  ```
      node index.js
  ```
- Start the client by running the following command in the client folder:
  ```
      npm start
  ```
