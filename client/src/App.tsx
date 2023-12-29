import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '@layouts/header/Header';

import HomePage from '@pages/HomePage';
import AboutPage from '@pages/AboutPage';
import SearchPage from '@pages/SearchPage';

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="search" element={<SearchPage />} />
            </Routes>
        </Router>
    );
}
