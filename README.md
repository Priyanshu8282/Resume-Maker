# Resume Maker


A web application for creating professional resumes quickly and easily. The Resume Maker project enables users to input their personal, educational, and professional details, customize their resume layout, and download it as a PDF.


Features
JWT-based Authentication: Secure login and registration using JSON Web Tokens.
Resume Customization: Users can enter and edit their personal details, education, skills, experience, and other sections.
Real-time Preview: See changes live as the resume is being created.
Downloadable PDF: Generate a PDF of the resume using html-pdf library.
User-Friendly Interface: Clean and intuitive UI for easy resume creation.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/resume-maker.git
cd resume-maker
Install frontend dependencies:

bash
Copy code
cd client
npm install
Install backend dependencies:

bash
Copy code
cd ../server
npm install
Set up environment variables: Create a .env file in the server directory with the following variables:

plaintext
Copy code
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
Run the application:

Start the backend server:
bash
Copy code
cd server
npm start
Start the frontend development server:
bash
Copy code
cd ../client
npm start
Open the app in your browser at http://localhost:3000.

Technologies Used
Frontend: React, CSS
Backend: Node.js, Express, MongoDB
Authentication: JSON Web Tokens (JWT)
PDF Generation: html-pdf (or html-pdf-node as an alternative)
Usage
Register a new account or log in with existing credentials.
Add personal, educational, and professional information to build your resume.
Customize the layout as needed.
Preview your resume and download it as a PDF.
