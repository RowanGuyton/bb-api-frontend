// import {StrictMode} from 'react'
// import {createRoot} from 'react-dom/client'
// import './index.css'
// // import App from './App.tsx'
// // import DietTrackerA from './DietTrackerA.tsx'
// // import DietTrackerB from './DietTrackerB.tsx'
// // import DietTracker from "./DietTracker.tsx";
// import ExerciseTracker from "@/ExerciseTracker.tsx";
// // import DietTrackerOriginal from "@/DietTrackerOriginal.tsx";
// import PunnetSquareSimulation from "@/PunnettSquareSimulation.tsx"
//
// createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//         {/*<App/>*/}
//         {/*<DietTrackerA />*/}
//         {/*<DietTrackerB />*/}
//         {/*<DietTracker />*/}
//         <ExerciseTracker />
//         {/*<DietTrackerOriginal />*/}
//     </StrictMode>,
// )

import React from 'react';
import {createRoot} from 'react-dom/client';
import HealthTracker from './HealthTracker'; // Adjust path as needed
import './index.css'; // Your global styles

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <HealthTracker/>
        {/*<PunnetSquareSimulation />*/}
    </React.StrictMode>
);
