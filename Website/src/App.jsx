import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SkillsProvider } from './context/SkillsContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BrowseSkills from './pages/BrowseSkills';
import AddSkill from './pages/AddSkill';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import styles from './App.module.css';

function App() {
	return (
		<AuthProvider>
			<SkillsProvider>
				<div className={styles.app}>
					<Navbar />
					<main className={styles.main}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/browse" element={<BrowseSkills />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/contact" element={<Contact />} />
							
							{/* Protected Routes */}
							<Route path="/add" element={
								<ProtectedRoute>
									<AddSkill />
								</ProtectedRoute>
							} />
							<Route path="/dashboard" element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							} />
							<Route path="/profile" element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							} />
						</Routes>
					</main>
					<Footer />
				</div>
			</SkillsProvider>
		</AuthProvider>
	);
}

export default App;



