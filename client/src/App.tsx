import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './layouts/Header';

import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import SearchPage from './pages/search/SearchPage';

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="search">
                    <Route index element={<SearchPage />} />
                    <Route path=":id" element={<SearchPage />} />
                </Route>
            </Routes>
        </Router>
    );
}
