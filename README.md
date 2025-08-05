# Donation Platform

A modern, secure platform built to facilitate and track donations for Any Foundation, empowering interns and donors alike. This application provides a seamless donation experience while offering robust tools for internal tracking and fundraising.

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## Overview

This project is a comprehensive donation platform. It allows anonymous users to make donations and empowers foundation interns to track their fundraising efforts through a unique referral system. The application is built with a modern tech stack and follows best practices for security, data integrity, and user experience.

The core data model consists of three main collections:
- **Users:** Internal staff or interns with authentication and referral data.
- **Donors:** A collection of unique individuals who have donated, tracking their total contributions.
- **Donations:** A detailed log of every single transaction, linking donors to referred interns.

## Live Demo

You can view and interact with the live deployed application here:
**[https://donation-platform-pi.vercel.app](https://donation-platform-pi.vercel.app)**

## Key Features

- **Secure User Authentication:** Staff/interns can sign up and log in using Firebase Authentication.
- **Intern Referral System:** Every intern has a unique referral ID to share with potential donors.
- **Anonymous Donations:** Anyone can make a donation quickly and easily (currently uses a mock payment flow).
- **Automatic Donation Tracking:** When a referral ID is used, the corresponding intern's `totalDonations` amount is automatically updated in their profile.
- **Robust Donor Management:** The system intelligently tracks unique donors by email, updating their total contribution history with each new donation.
- **Detailed Transaction Logging:** Every donation is recorded as a unique transaction for complete financial accountability.
- **Modern & Inspiring UI:** A welcoming user interface for both new and returning members.

## Tech Stack

- **Frontend:** [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/)), [Redux](https://redux.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore, Firebase Authentication)
- **Deployment:** [Vercel](https://vercel.com/) (with automated CI/CD from GitHub)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (version 16 or later) and npm installed on your machine.

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/Abhinav-Anil-5670/donation-platform.git](https://github.com/Abhinav-Anil-5670/donation-platform.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd donation-platform
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up your Environment Variables**
    - Create a `.env` file in the root of your project.
    - Copy the contents of `.env.example` into your new `.env` file.
    - Fill in your actual Firebase project credentials. See the section below for details.

5.  **Run the development server**
    ```sh
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the port specified in your terminal) to view it in the browser.

## Environment Variables

This project requires Firebase credentials to connect to the backend. For security, these are stored in an environment file.

Create a file named `.env` in the root of the project and add the following, replacing the placeholder values with your own Firebase project configuration keys:

```env
# .env

# Firebase Configuration
VITE_API_KEY="AIzaSy...YOUR_API_KEY"
VITE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_PROJECT_ID="your-project-id"
VITE_STORAGE_BUCKET="your-project-id.appspot.com"
VITE_MESSAGING_SENDER_ID="your-sender-id"
VITE_APP_ID="your-app-id"
VITE_APP_MEASUREMENT_ID="your-measurement_id"
```

## Deployment

This project is set up for **Continuous Deployment** with Vercel. Every push to the `main` branch on GitHub will automatically trigger a new production build and deployment, ensuring the live application is always up-to-date with the latest changes.
