// import React, {useState} from 'react';
// import DietTracker from './DietTracker'; // Adjust path as needed
// import ExerciseTracker from './ExerciseTracker'; // Adjust path as needed
// import {Button} from "@/components/ui/button";
// import {AppleIcon, DumbbellIcon} from "lucide-react";
// import {motion} from 'framer-motion';
//
// const HealthTracker: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<'diet' | 'exercise'>('diet');
//
//     return (
//         <div className="min-h-screen bg-gray-100">
//             <div className="container mx-auto p-6 max-w-7xl">
//                 {/* Navigation Card */}
//                 <motion.div
//                     initial={{opacity: 0, y: -20}}
//                     animate={{opacity: 1, y: 0}}
//                     transition={{duration: 0.5}}
//                     className="bg-gradient-to-r from-purple-500 to-purple-300 p-6 rounded-lg shadow-md mb-8"
//                 >
//                     <h1 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
//                         {activeTab === 'diet' ? (
//                             <>
//                                 <AppleIcon className="h-6 w-6"/> Diet & Fitness Tracker
//                             </>
//                         ) : (
//                             <>
//                                 <DumbbellIcon className="h-6 w-6"/> Exercise Tracker
//                             </>
//                         )}
//                     </h1>
//                     <div className="flex gap-4">
//                         <Button
//                             variant={activeTab === 'diet' ? 'default' : 'outline'}
//                             onClick={() => setActiveTab('diet')}
//                             className={`${
//                                 activeTab === 'diet'
//                                     ? 'bg-white text-purple-600'
//                                     : 'text-white border-white'
//                             } hover:bg-white/90 hover:text-purple-600 transition-all`}
//                         >
//                             <AppleIcon className="mr-2 h-4 w-4"/> Diet Tracker
//                         </Button>
//                         <Button
//                             variant={activeTab === 'exercise' ? 'default' : 'outline'}
//                             onClick={() => setActiveTab('exercise')}
//                             className={`${
//                                 activeTab === 'exercise'
//                                     ? 'bg-white text-purple-600'
//                                     : 'text-white border-white'
//                             } hover:bg-white/90 hover:text-purple-600 transition-all`}
//                         >
//                             <DumbbellIcon className="mr-2 h-4 w-4"/> Exercise Tracker
//                         </Button>
//                     </div>
//                 </motion.div>
//
//                 {/* Content Area */}
//                 <motion.div
//                     initial={{opacity: 0, y: 20}}
//                     animate={{opacity: 1, y: 0}}
//                     transition={{duration: 0.5}}
//                     key={activeTab}
//                 >
//                     {activeTab === 'diet' ? <DietTracker/> : <ExerciseTracker/>}
//                 </motion.div>
//             </div>
//         </div>
//     );
// };
//
// export default HealthTracker;

// import React, {useState} from 'react';
// import DietTracker from './DietTracker'; // Adjust path as needed
// import ExerciseTracker from './ExerciseTracker'; // Adjust path as needed
// import {Button} from "@/components/ui/button";
// import {AppleIcon, DumbbellIcon} from "lucide-react";
// import {motion} from 'framer-motion';
//
// const HealthTracker: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<'diet' | 'exercise'>('diet');
//
//     return (
//         <div className="min-h-screen bg-gray-100">
//             <div className="container mx-auto p-6 max-w-7xl">
//                 {/* Navigation Card - matches exact styling of child tracker headers */}
//                 <motion.div
//                     initial={{opacity: 0, y: -20}}
//                     animate={{opacity: 1, y: 0}}
//                     transition={{duration: 0.5}}
//                     className="bg-gradient-to-r from-purple-500 to-purple-300 p-6 rounded-lg shadow-md mb-8 w-full"
//                 >
//                     <div className="flex flex-col gap-4">
//                         <h1 className="text-white text-2xl font-bold flex items-center gap-2">
//                             {activeTab === 'diet' ? (
//                                 <>
//                                     <AppleIcon className="h-6 w-6"/> Diet & Fitness Tracker
//                                 </>
//                             ) : (
//                                 <>
//                                     <DumbbellIcon className="h-6 w-6"/> Exercise Tracker
//                                 </>
//                             )}
//                         </h1>
//                         <div className="flex gap-2">
//                             <Button
//                                 variant={activeTab === 'diet' ? 'default' : 'outline'}
//                                 onClick={() => setActiveTab('diet')}
//                                 className={`${
//                                     activeTab === 'diet'
//                                         ? 'bg-white text-purple-600'
//                                         : 'text-white border-white'
//                                 } hover:bg-white/90 hover:text-purple-600 transition-all`}
//                             >
//                                 <AppleIcon className="mr-2 h-4 w-4"/> Diet Tracker
//                             </Button>
//                             <Button
//                                 variant={activeTab === 'exercise' ? 'default' : 'outline'}
//                                 onClick={() => setActiveTab('exercise')}
//                                 className={`${
//                                     activeTab === 'exercise'
//                                         ? 'bg-white text-purple-600'
//                                         : 'text-white border-white'
//                                 } hover:bg-white/90 hover:text-purple-600 transition-all`}
//                             >
//                                 <DumbbellIcon className="mr-2 h-4 w-4"/> Exercise Tracker
//                             </Button>
//                         </div>
//                     </div>
//                 </motion.div>
//
//                 {/* Content Area */}
//                 <motion.div
//                     initial={{opacity: 0, y: 20}}
//                     animate={{opacity: 1, y: 0}}
//                     transition={{duration: 0.5}}
//                     key={activeTab}
//                     className="w-full"
//                 >
//                     {activeTab === 'diet' ? <DietTracker/> : <ExerciseTracker/>}
//                 </motion.div>
//             </div>
//         </div>
//     );
// };
//
// export default HealthTracker;

// import React, {useState} from 'react';
// import DietTracker from './DietTracker'; // Adjust path as needed
// import ExerciseTracker from './ExerciseTracker'; // Adjust path as needed
// import {Button} from "@/components/ui/button";
// import {AppleIcon, DumbbellIcon} from "lucide-react";
// import {motion} from 'framer-motion';
//
// const HealthTracker: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<'diet' | 'exercise'>('diet');
//
//     // Dynamic color classes based on active tab
//     const headerGradient = activeTab === 'diet'
//         ? 'from-emerald-500 to-emerald-300'
//         : 'from-blue-500 to-blue-300';
//
//     const activeButtonStyles = activeTab === 'diet'
//         ? 'bg-white text-emerald-600 hover:bg-emerald-50'
//         : 'bg-white text-blue-600 hover:bg-blue-50';
//
//     const inactiveButtonStyles = 'text-white border-white hover:bg-white/10';
//
//     return (
//         <div className="min-h-screen bg-gray-100">
//             <div className="container mx-auto p-6 max-w-7xl">
//                 {/* Navigation Card - colors match active tracker */}
//                 <motion.div
//                     initial={{opacity: 0, y: -20}}
//                     animate={{opacity: 1, y: 0}}
//                     transition={{duration: 0.5}}
//                     className={`bg-gradient-to-r ${headerGradient} p-6 rounded-lg shadow-md mb-8 w-full`}
//                     key={`header-${activeTab}`} // Key for gradient transition animation
//                 >
//                     <div className="flex flex-col gap-4">
//                         <h1 className="text-white text-2xl font-bold flex items-center gap-2">
//                             {activeTab === 'diet' ? (
//                                 <>
//                                     <AppleIcon className="h-6 w-6"/> Diet & Fitness Tracker
//                                 </>
//                             ) : (
//                                 <>
//                                     <DumbbellIcon className="h-6 w-6"/> Exercise Tracker
//                                 </>
//                             )}
//                         </h1>
//                         <div className="flex gap-2">
//                             <Button
//                                 variant={activeTab === 'diet' ? 'default' : 'outline'}
//                                 onClick={() => setActiveTab('diet')}
//                                 className={`${
//                                     activeTab === 'diet' ? activeButtonStyles : inactiveButtonStyles
//                                 } transition-all`}
//                             >
//                                 <AppleIcon className="mr-2 h-4 w-4"/> Diet Tracker
//                             </Button>
//                             <Button
//                                 variant={activeTab === 'exercise' ? 'default' : 'outline'}
//                                 onClick={() => setActiveTab('exercise')}
//                                 className={`${
//                                     activeTab === 'exercise' ? activeButtonStyles : inactiveButtonStyles
//                                 } transition-all`}
//                             >
//                                 <DumbbellIcon className="mr-2 h-4 w-4"/> Exercise Tracker
//                             </Button>
//                         </div>
//                     </div>
//                 </motion.div>
//
//                 {/* Content Area */}
//                 <motion.div
//                     initial={{opacity: 0, y: 20}}
//                     animate={{opacity: 1, y: 0}}
//                     transition={{duration: 0.5}}
//                     key={activeTab}
//                     className="w-full"
//                 >
//                     {activeTab === 'diet' ? <DietTracker/> : <ExerciseTracker/>}
//                 </motion.div>
//             </div>
//         </div>
//     );
// };
//
// export default HealthTracker;

// import React, {useState} from 'react';
// import DietTracker from './DietTracker';
// import ExerciseTracker from './ExerciseTracker';
// import {Button} from "@/components/ui/button";
// import {AppleIcon, DumbbellIcon} from "lucide-react";
// import {motion} from 'framer-motion';
//
// const HealthTracker: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<'diet' | 'exercise'>('diet');
//
//     // Button styles for active/inactive states
//     const activeButtonStyles = 'bg-white text-gray-800 hover:bg-gray-100';
//     const inactiveButtonStyles = 'text-white border-white hover:bg-white/10';
//
//     return (
//         <div className="min-h-screen bg-gray-100">
//             <div className="container mx-auto p-6 max-w-7xl">
//                 {/* Navigation Card - single gradient from emerald to blue */}
//                 <motion.div
//                     initial={{opacity: 0, y: -20}}
//                     animate={{opacity: 1, y: 0}}
//                     transition={{duration: 0.5}}
//                     className="bg-gradient-to-r from-emerald-500 to-blue-300 p-6 rounded-lg shadow-md mb-8 w-full"
//                 >
//                     <div className="flex flex-col gap-4">
//                         <h1 className="text-white text-2xl font-bold flex items-center gap-2">
//                             {activeTab === 'diet' ? (
//                                 <>
//                                     <AppleIcon className="h-6 w-6"/> Diet & Fitness Tracker
//                                 </>
//                             ) : (
//                                 <>
//                                     <DumbbellIcon className="h-6 w-6"/> Exercise Tracker
//                                 </>
//                             )}
//                         </h1>
//                         <div className="flex gap-2">
//                             <Button
//                                 variant={activeTab === 'diet' ? 'default' : 'outline'}
//                                 onClick={() => setActiveTab('diet')}
//                                 className={`${
//                                     activeTab === 'diet' ? activeButtonStyles : inactiveButtonStyles
//                                 } transition-all`}
//                             >
//                                 <AppleIcon className="mr-2 h-4 w-4"/> Diet Tracker
//                             </Button>
//                             <Button
//                                 variant={activeTab === 'exercise' ? 'default' : 'outline'}
//                                 onClick={() => setActiveTab('exercise')}
//                                 className={`${
//                                     activeTab === 'exercise' ? activeButtonStyles : inactiveButtonStyles
//                                 } transition-all`}
//                             >
//                                 <DumbbellIcon className="mr-2 h-4 w-4"/> Exercise Tracker
//                             </Button>
//                         </div>
//                     </div>
//                 </motion.div>
//
//                 {/* Content Area */}
//                 <motion.div
//                     initial={{opacity: 0, y: 20}}
//                     animate={{opacity: 1, y: 0}}
//                     transition={{duration: 0.5}}
//                     key={activeTab}
//                     className="w-full"
//                 >
//                     {activeTab === 'diet' ? <DietTracker/> : <ExerciseTracker/>}
//                 </motion.div>
//             </div>
//         </div>
//     );
// };
//
// export default HealthTracker;

import React, {useState} from 'react';
import DietTracker from './DietTracker';
import ExerciseTracker from './ExerciseTracker';
import WeightTracker from './WeightTracker';
import {Button} from "@/components/ui/button";
import {AppleIcon, DumbbellIcon, ScaleIcon} from "lucide-react";
import {motion} from 'framer-motion';

const HealthTracker: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'diet' | 'exercise' | 'weight'>('diet');

    // Button styles for active/inactive states
    const activeButtonStyles = 'bg-white text-gray-800 hover:bg-gray-100';
    const inactiveButtonStyles = 'text-white border-white hover:bg-white/10';

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-6 max-w-7xl">
                {/* Navigation Card - single gradient from emerald to blue to purple */}
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="bg-gradient-to-r from-emerald-500 via-blue-300 to-purple-300 p-6 rounded-lg shadow-md mb-8 w-full"
                >
                    <div className="flex flex-col gap-4">
                        <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                            {activeTab === 'diet' ? (
                                <>
                                    <AppleIcon className="h-6 w-6"/> Diet Tracker
                                </>
                            ) : activeTab === 'exercise' ? (
                                <>
                                    <DumbbellIcon className="h-6 w-6"/> Exercise Tracker
                                </>
                            ) : (
                                <>
                                    <ScaleIcon className="h-6 w-6"/> Weight Tracker
                                </>
                            )}
                        </h1>
                        <div className="flex gap-2">
                            <Button
                                variant={activeTab === 'diet' ? 'default' : 'outline'}
                                onClick={() => setActiveTab('diet')}
                                className={`${
                                    activeTab === 'diet' ? activeButtonStyles : inactiveButtonStyles
                                } transition-all`}
                            >
                                <AppleIcon className="mr-2 h-4 w-4"/> Diet Tracker
                            </Button>
                            <Button
                                variant={activeTab === 'exercise' ? 'default' : 'outline'}
                                onClick={() => setActiveTab('exercise')}
                                className={`${
                                    activeTab === 'exercise' ? activeButtonStyles : inactiveButtonStyles
                                } transition-all`}
                            >
                                <DumbbellIcon className="mr-2 h-4 w-4"/> Exercise Tracker
                            </Button>
                            <Button
                                variant={activeTab === 'weight' ? 'default' : 'outline'}
                                onClick={() => setActiveTab('weight')}
                                className={`${
                                    activeTab === 'weight' ? activeButtonStyles : inactiveButtonStyles
                                } transition-all`}
                            >
                                <ScaleIcon className="mr-2 h-4 w-4"/> Weight Tracker
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Content Area */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    key={activeTab}
                    className="w-full"
                >
                    {activeTab === 'diet' ? (
                        <DietTracker/>
                    ) : activeTab === 'exercise' ? (
                        <ExerciseTracker/>
                    ) : (
                        <WeightTracker/>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default HealthTracker;