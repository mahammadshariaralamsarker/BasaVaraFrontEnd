# PropertyPro 🏠

**PropertyPro** is a full-stack rental management platform designed to simplify property management for landlords, tenants, and administrators. It enables property listings, tenant-landlord communication, rent payments, complaint management, and administrative oversight — all within a modern, responsive web application.

---

## 🚀 Features

### 🏡 Property Listings
- Search and filter properties by location, price, and availability
- View detailed property descriptions and photos

### 👥 Role-Based Access
- **Tenants**: View and rent properties, pay rent, submit complaints
- **Landlords**: List and manage properties, respond to tenant issues
- **Admins**: Oversee the entire platform, manage users, view analytics

### 🔐 Authentication & Authorization
- JWT-based authentication with secure cookie sessions
- Role-specific dashboard access and routing

### 💳 Secure Payments
- Integrated **SurjoPay** payment gateway
- Rent tracking and receipts

### 📊 Analytics & Dashboard
- Admin dashboard with statistics
- Key metrics: users, properties, payments, and complaints



## ⚙️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Payments**: SurjoPay
- **UI Components**: ShadCN UI, Lucide Icons

---

## 📹 Project Walkthrough

Check out the full video explanation of the project here:  
**[▶️ Watch the Video](https://drive.google.com/file/d/1Z9ZoVVadFBooxwlI92hiIRqmc_BSaY_k/view?usp=sharing)**

---

## 🧰 Manual Installation

Follow these steps to set up PropertyPro on your local machine:

### 1. Clone the Repository
```
git clone https://github.com/mahammadshariaralamsarker/BasaVaraFrontEnd.git
cd BasaVaraFrontEnd
```

### 2. Install Dependencies
#### Frontend
```
npm install
```



### 3. Configure Environment Variables

Create `.env` files



#### Example `.env` for Client:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
JWT_SECRET= add-a-jwt-secrate-here
```

### 4. Run the Application
#### Start Backend
- Don't forget to run the server first then start the client side.

#### Start Frontend
Open a new terminal:
```
npm run dev
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

---


