import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import './MainLayout.css';

function MainLayout() {
    return (
        <div className="main-layout">
            <Header />
            <main>
                <Outlet />
            </main>
            <footer className="app-footer">
                <p className="app-footer-text">© 2024 React Application. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default MainLayout;
