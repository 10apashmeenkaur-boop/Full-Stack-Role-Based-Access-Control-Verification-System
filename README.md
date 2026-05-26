# Enterprise Role-Based Verification Portal

<img width="1600" height="855" alt="WhatsApp Image 2026-05-26 at 22 56 32 (1)" src="https://github.com/user-attachments/assets/3bbac530-0672-44cc-ae9d-d8d48bac4b77" />

<img width="1600" height="856" alt="WhatsApp Image 2026-05-26 at 22 56 33 (2)" src="https://github.com/user-attachments/assets/ad26d279-30f7-4cf1-bdf5-37a81147544b" />

<img width="1600" height="855" alt="WhatsApp Image 2026-05-26 at 22 56 42" src="https://github.com/user-attachments/assets/340b5eef-07e4-4743-994a-f6c5feb92861" />

<img width="1600" height="852" alt="WhatsApp Image 2026-05-26 at 22 56 32" src="https://github.com/user-attachments/assets/2ed9d1d6-b3bf-4115-b88e-7815446ba4fa" />


## 📖 Project Description
This project is a full-stack Single Page Application (SPA) designed to demonstrate secure, enterprise-grade data handling. At its core, data management is an exercise in trust and security. Organizations must protect sensitive information without locking employees out of their daily workflows. 

This portal solves that challenge through strict, server-side Role-Based Access Control (RBAC). Instead of simply hiding UI elements on the frontend, the backend actively intercepts requests and filters the data before it ever reaches the browser. It provides a secure, distraction-free interface for standard employees, while giving administrators complete oversight of the system.

## ✨ Key Features
* **Server-Side Access Control (RBAC):** Distinct routing and data payloads based on the user's logged-in role.
* **Custom Persistent Database:** A dynamic, zero-configuration local XML database built from scratch using Node.js.
* **Async Processing Simulation:** Engineered artificial network delays with synchronized frontend loading states to demonstrate real-world asynchronous API handling.
* **Custom UI Architecture:** A fully bespoke, responsive interface built without relying on generic component libraries like Bootstrap or Material.

## 🛠️ Technology Stack
* **Frontend:** Angular 12+ (Standalone Components, RxJS, TypeScript, HTML5, Custom CSS3)
* **Backend:** Node.js, Express.js, TypeScript
* **Storage:** Local XML File System (Node `fs` module)
* **Architecture:** RESTful API principles, Modular Angular Services (`UserService`)

## 🗄️ How the Database Works (Data Architecture)
To ensure this application is entirely self-contained and requires zero database configuration from the reviewer, the data layer avoids heavy cloud dependencies (like AWS DynamoDB or MongoDB). 

Instead, it utilizes a custom **Dynamic Local XML Database**. 
1. **The Mechanism:** The backend utilizes Node's native `fs` (File System) module. 
2. **In-Memory Speed, Persistent Storage:** When the server boots, it holds the data in fast memory arrays. However, every time a CRUD operation occurs (e.g., an Admin creates, edits, or deletes a user), a custom `syncToLocalXML()` function is triggered.
3. **The Result:** The server automatically generates and updates a physical `database.xml` file in the root directory. This provides true data persistence (the data survives a server restart) while perfectly mimicking a real-world database interaction, all without requiring the evaluator to install external database software.

## 🔐 Access Levels Explained
The system demonstrates vertical privilege escalation mitigation through two strict roles:

1. **General User:** Restricted access. When fetching system records, the Node.js backend identifies the role and intercepts the payload, returning only a limited subset of standard tasks (5 records). They cannot access the user management portal.
2. **Administrator:** Full clearance. The backend grants access to the complete database payload (all 7 records, including sensitive administrative logs). Furthermore, they are granted UI access to the internal Management Dashboard to perform CRUD operations on personnel.

---

## 🚀 Installation & Setup

This project is separated into a `frontend` and `backend` architecture. You will need two terminal windows to run it locally.

### 1. Start the Backend API
Open your first terminal and navigate to the backend directory:
\`\`\`bash
cd backend
npm install
npm start
\`\`\`
*The server will start on `http://localhost:3000` and automatically generate the `database.xml` file.*

### 2. Start the Angular Frontend
Open a second terminal and navigate to the frontend directory:
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`
*The application will compile and open at `http://localhost:4200`.*

---

## 🧪 Testing Credentials
To verify the Role-Based Access Control, please use the following credentials on the login screen:

**To test the Administrator View (Full Access):**
* **User ID:** `admin`
* **Password:** *(any string)*
* **Role:** `Admin`
*(Notice you can see all 7 records and the "Manage Users" button).*

**To test the General User View (Restricted Access):**
* **User ID:** `101`
* **Password:** *(any string)*
* **Role:** `General User`
*(Notice you are restricted to 5 standard records and cannot manage users).*
