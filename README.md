# 🔄 Skill Swap Network

A modern React-based platform for skill sharing and learning within communities.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd The-Skill-Swap-Network/Web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically reload when you make changes

## 📱 Features

- ✅ **User Registration & Login** - Secure authentication system
- ✅ **Skill Management** - Add, browse, and search skills
- ✅ **Skill Swapping** - Request and manage skill exchanges
- ✅ **Real-time Dashboard** - Track your skills and requests
- ✅ **User Profiles** - Manage your profile and bio
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🏗️ Project Structure

```
Web/
├── index.html
├── package.json
├── vite.config.js
└── Website/
    └── src/
        ├── components/     # Reusable UI components
        ├── context/        # React Context providers
        ├── pages/          # Application pages
        ├── data/           # Static data and types
        └── assets/         # Images, fonts, etc.
```

## 💾 Data Storage

- **Local Storage** - User data persists in browser localStorage
- **No Backend Required** - Fully client-side application
- **Data Persistence** - Users stay logged in across sessions

## 🎯 Getting Started

1. **Sign Up** - Create your account at `/signup`
2. **Add Skills** - Share what you can teach at `/add`
3. **Browse Skills** - Find skills to learn at `/browse`
4. **Request Swaps** - Connect with other users
5. **Manage Activity** - Track everything in your `/dashboard`

## 🔧 Troubleshooting

**Port already in use?**
- Vite will automatically use the next available port (5174, 5175, etc.)

**Dependencies not installing?**
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

**Browser not opening automatically?**
- Manually navigate to `http://localhost:5173`

## 📞 Support

For questions or issues, please check the browser console for error messages.

---

**Built with React 19, Vite, and modern web technologies** 🚀


