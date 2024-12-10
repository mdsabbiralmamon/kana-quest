# Kana Quest

Kana Quest is a web application designed to help users learn and practice Japanese vocabulary effectively. Built using Next.js, the app includes features like lesson management, vocabulary tracking, and user authentication.

## Features

- **Interactive Lessons:** Learn and practice Japanese vocabulary through structured lessons.
- **User Authentication:** Secure sign-in and sign-up functionality.
- **Pagination Support:** View data in a paginated format for better user experience.
- **Database Integration:** MongoDB for managing lessons, vocabulary, and user data.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/kana-quest.git
```

### 2. Install Dependencies
Navigate to the project directory and install the required dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_nextauth_url
```

### 4. Run the Development Server
Start the development server:
```bash
npm run dev
```

Visit the app at `http://localhost:3000`.

---

## Authentication Details

### Admin Account
- **Email:** `admin@kana-quest.com`
- **Password:** `727726`

### Demo User Account
- **Email:** `demo@mail.com`
- **Password:** `727726`

---

## API Routes

### Lessons API
- **Fetch all lessons:** `GET /api/lessons`
- **Fetch a specific lesson:** `GET /api/lessons/{lessonNo}`
- **Add a new lesson:** `POST /api/lessons`

### Vocabulary API
- **Fetch vocabulary for a lesson:** `GET /api/lessons/{lessonNo}/vocabulary`
- **Add vocabulary to a lesson:** `POST /api/lessons/{lessonNo}/vocabulary`

---

## Deployment
This app can be deployed on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Make sure to set up the environment variables in the hosting platform.

---

## Contributing
Contributions are welcome! If you have suggestions or encounter issues, feel free to open an issue or create a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**Kana Quest**: Helping you master Japanese vocabulary, one lesson at a time! 🎌