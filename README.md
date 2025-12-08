# 🎬QuickShow - Movie Ticket Booking App
[🔴🔴LIVE](https://quickshow-seven-amber.vercel.app/)

A full-stack MERN (MongoDB, Express, React, Node.js) movie ticket booking system.  
Users can browse movies, view seat layouts, book tickets, and manage bookings.  
Admin users can add movies and manage bookings. Authentication and seat locking are also implemented.

---

## 🚀 Features

### 👤 User Features
- Sign up / Login with secure authentication (Clerk)
- View available movies and their details
- Select seats and book tickets
- View booking history
- Automatic email notifications
- Temporary seat hold during booking to avoid duplicate reservations

### 🛠 Admin Features
- Add / Edit / Delete movies
- Manage bookings
- View user and booking analytics (optional future enhancement)

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, React Router, TailwindCSS / CSS (as per tutorial) |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | Clerk |
| Background Jobs | Inngest (Seat unlock + emails) |
| Deployment | Vercel / Render / MongoDB Atlas |

---

## 📁 Folder Structure
```
QuickShow/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ └── App.js
│ └── package.json
│
└── README.md
```



---

## 🔑 Environment Variables

Create a `.env` file in both **frontend** and **backend** folders.

### Backend `.env`
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_token_secret
CLERK_SECRET_KEY=your_clerk_secret_key
INNGEST_API_KEY=your_inngest_key
```

### Frontend `.env`

```
VITE_CLERK_PUBLISHABLE_KEY=your_frontend_clerk_key
VITE_BACKEND_URL=http://localhost:5000
```


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/ShubhamKuttarmare25/QuickShow.git
cd quickshow
```

### 2️⃣ Install Dependencies

Backend

```
cd backend
npm install
npm run dev
```

Frontend

```
cd ../frontend
npm install
npm run dev
```

▶️ Running the Application
Service	Command	URL
Backend	
```
npm run dev	http://localhost:5000
```

Frontend	
```
npm run dev	http://localhost:5173
 (or Vite port)
```

🛠 Future Enhancements

*🎫 Payment gateway integration (Razorpay / Stripe)*

*📍 Location-based cinema selection*

*🌐 Multi-language support*

*📊 Admin analytics dashboard*

*🎟 Printable or QR-based ticket system*


## Screenshots
<img width="1920" height="1080" alt="Screenshot (753)" src="https://github.com/user-attachments/assets/47886682-893c-405b-a43e-ecfbf45a3b60" />
<img width="1920" height="1080" alt="Screenshot (754)" src="https://github.com/user-attachments/assets/e1a1cf77-5e64-4a6d-8388-ec4885b1d50d" />
<img width="1920" height="1080" alt="Screenshot (755)" src="https://github.com/user-attachments/assets/11c3cca9-b135-4437-aa4e-15c850ac1f77" />
<img width="1920" height="1080" alt="Screenshot (756)" src="https://github.com/user-attachments/assets/dfa15c36-d3d4-46ee-9724-3d95a9fe8a6f" />
<img width="1920" height="1080" alt="Screenshot (757)" src="https://github.com/user-attachments/assets/2265e320-2380-4680-8ebb-0be26400e5ca" />
<img width="1920" height="1080" alt="Screenshot (758)" src="https://github.com/user-attachments/assets/73c43e50-e6bf-4d87-91a4-13cba554f4f7" />
<img width="1920" height="1080" alt="Screenshot (759)" src="https://github.com/user-attachments/assets/18f04404-fe4a-4172-9266-254fbe4531da" />
<img width="1920" height="1080" alt="Screenshot (760)" src="https://github.com/user-attachments/assets/1190e309-a36e-4c21-889c-8b58063922fb" />
<img width="1920" height="1080" alt="Screenshot (761)" src="https://github.com/user-attachments/assets/5a71c77a-0879-4c25-8935-c57e3ac73134" />
<img width="1920" height="1080" alt="Screenshot (762)" src="https://github.com/user-attachments/assets/9211b477-f122-4bac-a8f6-1be34fbf0364" />
<img width="1920" height="1080" alt="Screenshot (763)" src="https://github.com/user-attachments/assets/a794a109-1b31-421e-8af3-d1889229b562" />
<img width="1920" height="1080" alt="Screenshot (764)" src="https://github.com/user-attachments/assets/cb35ae07-63a6-4e14-80bc-4d6917eae793" />
<img width="1920" height="1080" alt="Screenshot (765)" src="https://github.com/user-attachments/assets/9840d68d-4d41-425a-9bdb-6caf90fe62af" />
<img width="1920" height="1080" alt="Screenshot (766)" src="https://github.com/user-attachments/assets/f7a227aa-e0c1-4954-9c67-5547ae7e9cd3" />
<img width="1920" height="1080" alt="Screenshot (767)" src="https://github.com/user-attachments/assets/930b068e-9325-43c5-8bce-f224a34680b0" />



## Useful Links

- [Demo App]([https://quick-ai-taupe.vercel.app](https://quickshow-seven-amber.vercel.app/))
- [Video Tutorial](https://www.youtube.com/watch?v=Pez37wmUaQM)
- [Instructor Website](https://greatstack.dev/)
- [Clerk Authentication](https://clerk.com/)
- [Vercel](https://vercel.com/)

## Contact

For questions or feedback, mail at shubhamkuttarmare8329@gmail.com

