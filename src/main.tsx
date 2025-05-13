import React from 'react';
import {createRoot} from 'react-dom/client';
import HealthTracker from './HealthTracker';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <HealthTracker/>
    </React.StrictMode>
);
