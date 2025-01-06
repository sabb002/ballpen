# BlogSite

A fullstack modern blog site.


### Frontend
- **React**: Fast and dynamic UI rendering.
- **Redux Toolkit**: Simplified state management.
- **Redux Query**: Efficient data fetching and caching.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **QuillJS Editor**: Rich text editor for creating and editing blog posts.
- **Vite**: Blazing-fast frontend build tool.

### Backend
- **Express.js**: Lightweight and flexible server framework.
- **MongoDB**: NoSQL database for storing user data and blog content.

### General Features
- **Google Authentication**: Secure Google login.
- **Blog Management**: Create, read, update, and delete (CRUD) operations for blogs.
- **Responsive Design**: Optimized for all devices.
- **Error Handling**: Robust error messages for both frontend and backend.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Clone the Repository
```bash
git clone https://github.com/sabb002/ballpen.git
cd ballpen
```

### Backend Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` folder with the following content:
   ```env
    PORT=8080
    DBUSER=
    DBPASS= 
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Interact with the platform to create, edit, and manage blog posts.

## Folder Structure

### Client
```
client/
├── public/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icon/
│   │   ├── images/
│   ├── components/
│   │   ├── posts/
│   ├── customs/
│   ├── data/
│   ├── pages/
│   ├── store/
│   ├── utils/
│   ├── Layout.js
│   ├── main.js
│   ├── custom.d.ts
│   ├── globals.css
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── eslint.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
```

### Server
```
server/
├── controllers/
├── db/
├── routes/
├── index.js
├── .env
├── package.json
├── package-lock.json
```


## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For inquiries or support, contact:
- **Your Name**: sabbirhossainalvee@gmail.com
- GitHub: [sabb002](https://github.com/sabb002)