# Bidding Platform

This is a comprehensive RESTful API for a real-time bidding platform using Node.js, Express, Socket.io, and a SQL database (PostgreSQL or MySQL).

## Features

- User authentication and role-based access control
- CRUD operations for auction items
- Real-time bidding using WebSockets
- Notifications system
- Image upload functionality
- Search and filtering
- Pagination
- Validation and error handling

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akshat2502/Bidding-platform.git
   cd Bidding-platform
Install dependencies:

bash
npm install
Set up your environment variables in a .env file:

env
PORT=3000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
Run the server:

bash
npm start
Database Schema
Users Table
id (Primary Key)
username (String, unique, not null)
password (String, not null)
email (String, unique, not null)
role (String, default to 'user')
created_at (Timestamp, default to current time)
Items Table
id (Primary Key)
name (String, not null)
description (Text, not null)
starting_price (Decimal, not null)
current_price (Decimal, default to starting_price)
image_url (String, nullable)
end_time (Timestamp, not null)
created_at (Timestamp, default to current time)
Bids Table
id (Primary Key)
item_id (Foreign Key referencing items.id)
user_id (Foreign Key referencing users.id)
bid_amount (Decimal, not null)
created_at (Timestamp, default to current time)
Notifications Table
id (Primary Key)
user_id (Foreign Key referencing users.id)
message (String, not null)
is_read (Boolean, default to false)
created_at (Timestamp, default to current time)
API Endpoints
Users
POST /users/register - Register a new user.
POST /users/login - Authenticate a user and return a token.
GET /users/profile - Get the profile of the logged-in user.
Items
GET /items - Retrieve all auction items (with pagination).
GET /items/:id - Retrieve a single auction item by ID.
POST /items - Create a new auction item. (Authenticated users, image upload)
PUT /items/:id - Update an auction item by ID. (Authenticated users, only item owners or admins)
DELETE /items/:id - Delete an auction item by ID. (Authenticated users, only item owners or admins)
Bids
GET /items/:itemId/bids - Retrieve all bids for a specific item.
POST /items/:itemId/bids - Place a new bid on a specific item. (Authenticated users)
Notifications
GET /notifications - Retrieve notifications for the logged-in user.
POST /notifications/mark-read - Mark notifications as read.
WebSocket Events
Bidding
connection - Establish a new WebSocket connection.
bid - Place a new bid on an item.
update - Notify all connected clients about a new bid on an item.
Notifications
notify - Send notifications to users in real-time.
Testing
Unit and integration tests are included using Mocha, Chai, or Jest.
Run tests with:

bash
npm test
Additional Features
Rate limiting middleware to prevent abuse of the API.
Copy code
Steps to push everything to GitHub
Initialize Git repository (if not already initialized):

bash
git init
Add all files to staging area:

bash
git add .
Commit the changes:

bash
git commit -m "Initial commit with project setup and documentation"
Add the remote repository:

bash
git remote add origin https://github.com/akshat2502/Bidding-platform.git
Push the changes to the main branch:

bash
git push -u origin main