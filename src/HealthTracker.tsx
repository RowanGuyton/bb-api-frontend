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

import React, {useState} from 'react';
import DietTracker from './DietTracker';
import ExerciseTracker from './ExerciseTracker';
import WeightTracker from './WeightTracker';
import {Button} from "@/components/ui/button";
import {AppleIcon, DumbbellIcon, ScaleIcon, ChevronDownIcon} from "lucide-react";
import {motion} from 'framer-motion';

const HealthTracker: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'diet' | 'exercise' | 'weight'>('diet');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Button styles for active/inactive states
    const activeButtonStyles = 'bg-white text-gray-800 hover:bg-gray-100';
    const inactiveButtonStyles = 'text-white border-white hover:bg-white/10';

    const tabOptions = [
        {id: 'diet', label: 'Diet', icon: <AppleIcon className="mr-2 h-4 w-4"/>},
        {id: 'exercise', label: 'Exercise', icon: <DumbbellIcon className="mr-2 h-4 w-4"/>},
        {id: 'weight', label: 'Weight', icon: <ScaleIcon className="mr-2 h-4 w-4"/>},
    ] as const;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
                {/* Navigation Card */}
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="bg-gradient-to-r from-emerald-500 via-blue-300 to-purple-300 p-4 sm:p-6 rounded-lg shadow-md mb-8 w-full"
                >
                    <div className="flex flex-col gap-3">
                        <h1 className="text-white text-xl sm:text-2xl font-bold flex items-center gap-2">
                            {activeTab === 'diet' ? (
                                <>
                                    <AppleIcon className="h-5 w-5 sm:h-6 sm:w-6"/> Diet Tracker
                                </>
                            ) : activeTab === 'exercise' ? (
                                <>
                                    <DumbbellIcon className="h-5 w-5 sm:h-6 sm:w-6"/> Exercise Tracker
                                </>
                            ) : (
                                <>
                                    <ScaleIcon className="h-5 w-5 sm:h-6 sm:w-6"/> Weight Tracker
                                </>
                            )}
                        </h1>
                        {/* Mobile Dropdown Menu */}
                        <div className="relative sm:hidden">
                            <Button
                                variant="outline"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`text-white border-white hover:bg-white/10 w-full justify-start`}
                            >
                                {tabOptions.find(tab => tab.id === activeTab)?.icon}
                                {tabOptions.find(tab => tab.id === activeTab)?.label}
                                <ChevronDownIcon className="ml-auto h-4 w-4"/>
                            </Button>
                            {isMenuOpen && (
                                <div
                                    className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-10">
                                    {tabOptions.map(tab => (
                                        <Button
                                            key={tab.id}
                                            variant="ghost"
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                setIsMenuOpen(false);
                                            }}
                                            className={`w-full justify-start text-gray-800 hover:bg-gray-100 rounded-none`}
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Desktop Button Group */}
                        <div className="hidden sm:flex gap-2">
                            {tabOptions.map(tab => (
                                <Button
                                    key={tab.id}
                                    variant={activeTab === tab.id ? 'default' : 'outline'}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${
                                        activeTab === tab.id ? activeButtonStyles : inactiveButtonStyles
                                    } transition-all`}
                                >
                                    {tab.icon}
                                    {tab.label} Tracker
                                </Button>
                            ))}
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