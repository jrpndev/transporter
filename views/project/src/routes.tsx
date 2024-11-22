import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrdersPage from './modules/orders/pages/index';
import NotFound from './modules/notFound/pages';
const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<OrdersPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
);

export default AppRoutes;
