# GreenCart 🛒

GreenCart is a modern, full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce platform designed for buying and selling fresh groceries online. It features a clean user interface, separate portals for customers and sellers, and a robust backend to handle products, orders, and authentication.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](YOUR_LIVE_DEMO_URL)

---

## 📸 Project Showcase

*(It is highly recommended to add a screenshot or a GIF of the application here to give visitors a quick look at your project.)*

![GreenCart Screenshot](https://via.placeholder.com/800x400.png?text=Your+App+Screenshot+Here)

---

## ✨ Key Features

### For Customers:
- **User Authentication:** Secure registration and login functionality.
- **Product Browsing:** View all products, filter by category, and search for specific items.
- **Shopping Cart:** Add/remove items and manage quantities.
- **Order Management:** Place orders and view personal order history.
- **Address Management:** Add and manage multiple shipping addresses.

### For Sellers:
- **Seller Authentication:** Separate and secure login for sellers.
- **Product Management:** Add new products with images, view a list of all personal products.
- **Order Viewing:** View orders placed by customers for their products.

---

## 🛠️ Tech Stack

### Frontend
- **React:** A JavaScript library for building user interfaces.
- **Vite:** A next-generation frontend tooling for fast development.
- **React Router:** For declarative routing in the application.
- **Context API:** For state management.
- **CSS:** For styling components.

### Backend
- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A web application framework for Node.js.
- **MongoDB:** A NoSQL database for storing data.
- **Mongoose:** An ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens):** For secure user and seller authentication.
- **Cloudinary:** For cloud-based image storage and management.
- **Multer:** For handling `multipart/form-data`, used for file uploads.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or higher)
- npm (or yarn)
- MongoDB (local installation or a cloud-based instance like MongoDB Atlas)

### Installation & Setup

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/greencart.git
cd greencart
```

**2. Setup the Backend:**
```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the /server directory
touch .env
```
Add the following environment variables to your `.env` file. Replace the placeholder values with your actual credentials.
```env
# Port for the server to run on
PORT=4000

# Your MongoDB connection string
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/greencart

# A secret key for signing JWTs
JWT_SECRET=your_jwt_secret_key

# Your Cloudinary credentials for image uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**3. Setup the Frontend:**
```bash
# Navigate to the client directory from the root
cd client

# Install dependencies
npm install
```

**4. Run the Application:**
- **Start the backend server:** From the `/server` directory, run:
  ```bash
  npm start
  ```
- **Start the frontend development server:** From the `/client` directory, run:
  ```bash
  npm run dev
  ```
The application should now be running on `http://localhost:5173`.

---

## API Endpoints

The backend exposes the following RESTful endpoints.

### User Routes
*Base Path: `/api/users`*
| Method | Endpoint         | Auth     | Description                  |
|--------|------------------|----------|------------------------------|
| `POST` | `/register`      | Public   | Register a new user.         |
| `POST` | `/login`         | Public   | Authenticate a user.         |

### Seller Routes
*Base Path: `/api/seller`*
| Method | Endpoint         | Auth     | Description                  |
|--------|------------------|----------|------------------------------|
| `POST` | `/login`         | Public   | Authenticate a seller.       |

### Product Routes
*Base Path: `/api/products`*
| Method | Endpoint         | Auth     | Description                  |
|--------|------------------|----------|------------------------------|
| `GET`  | `/`              | Public   | Get all products.            |
| `GET`  | `/:id`           | Public   | Get a single product by ID.  |
| `POST` | `/add`           | Seller   | Add a new product.           |
| `GET`  | `/seller`        | Seller   | Get all products for a seller.|

### Cart Routes
*Base Path: `/api/cart`*
| Method | Endpoint         | Auth     | Description                  |
|--------|------------------|----------|------------------------------|
| `GET`  | `/`              | User     | Get all items in user's cart.|
| `POST` | `/add`           | User     | Add an item to the cart.     |
| `POST` | `/remove`        | User     | Remove an item from the cart.|

### Address Routes
*Base Path: `/api/address`*
| Method | Endpoint         | Auth     | Description                  |
|--------|------------------|----------|------------------------------|
| `GET`  | `/`              | User     | Get all addresses for a user.|
| `POST` | `/add`           | User     | Add a new address.           |

### Order Routes
*Base Path: `/api/orders`*
| Method | Endpoint         | Auth     | Description                  |
|--------|------------------|----------|------------------------------|
| `GET`  | `/`              | User     | Get all orders for a user.   |
| `POST` | `/place`         | User     | Place a new order.           |
| `GET`  | `/seller`        | Seller   | Get all orders for a seller. |

---

## 📂 Project Structure

The project is organized into two main folders: `client` and `server`.

```
greencart/
├── client/         # React frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── ...
└── server/         # Node.js/Express backend
    ├── configs/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    └── server.js
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information. (Note: You would need to add a LICENSE file for this to be valid).

---

## 📧 Contact

 [Email](shashankmishra00026@gmail.com)

Project Link: [https://github.com/your-username/greencart](https://github.com/your-username/greencart)
