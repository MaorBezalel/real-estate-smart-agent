import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';

import Header from '@layouts/header';

import '@common/assets/animations/loading.css';

const HomePage = React.lazy(() => import('@pages/HomePage'));
const AboutPage = React.lazy(() => import('@pages/AboutPage'));
const SearchPage = React.lazy(() => import('@pages/SearchPage'));

export default function App() {
    return (
        <Router>
            <Header />
            <Suspense fallback={<div className="fallback-loading pac-man" />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="search" element={<SearchPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
}
