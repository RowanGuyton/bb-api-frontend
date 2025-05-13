import React, {useState, useEffect} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    PlusIcon,
    Trash2Icon,
    DumbbellIcon,
    ClockIcon,
    CalendarClockIcon,
    LightbulbIcon
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    ResponsiveContainer
} from 'recharts';
import {motion, AnimatePresence} from 'framer-motion';

// Types for exercise entries and chart data
interface ExerciseEntry {
    id: string;
    date: string;
    movement: string;
    sets: number;
    reps: number;
    weight: number;
    type: 'push' | 'pull';
}

interface ChartData {
    date: string;
    reps: number;
    sets: number;
}

const ExerciseTracker: React.FC = () => {
    const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
    const [newExercise, setNewExercise] = useState({
        movement: '',
        sets: '',
        reps: '',
        weight: '',
        type: 'push',
        date: ''
    });
    const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
    const [chartData, setChartData] = useState<ChartData[]>([]);

    // Function to fetch existing exercises from the API
    const fetchExercises = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/exercises');
            if (!response.ok) {
                throw new Error('Failed to retrieve exercises');
            }
            const data: ExerciseEntry[] = await response.json();
            setExercises(data);
        } catch (error) {
            console.error('Error retrieving exercises:', error);
        }
    };

    // useEffect to fetch exercises on component mount
    useEffect(() => {
        fetchExercises();
    }, []);

    // Process data for charts when exercises or viewMode change
    useEffect(() => {
        const processChartData = () => {
            const groupedData = exercises.reduce((acc, exercise) => {
                const dateKey = new Date(exercise.date).toISOString().split('T')[0];
                if (!acc[dateKey]) {
                    acc[dateKey] = {date: dateKey, reps: 0, sets: 0};
                }
                acc[dateKey].reps += exercise.reps;
                acc[dateKey].sets += exercise.sets;
                return acc;
            }, {} as Record<string, ChartData>);

            let dailyData = Object.values(groupedData).sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );

            if (viewMode === 'week' && dailyData.length > 0) {
                const weeklyData: ChartData[] = [];
                let weekStartDate = new Date(dailyData[0].date);
                let currentWeek: ChartData = {
                    date: `Week of ${weekStartDate.toLocaleDateString()}`,
                    reps: 0,
                    sets: 0
                };

                dailyData.forEach((day, idx) => {
                    const currentDate = new Date(day.date);
                    const diffDays = Math.floor(
                        (currentDate.getTime() - weekStartDate.getTime()) / (1000 * 60 * 60 * 24)
                    );

                    if (diffDays >= 7) {
                        weeklyData.push(currentWeek);
                        weekStartDate.setDate(weekStartDate.getDate() + 7);
                        currentWeek = {
                            date: `Week of ${weekStartDate.toLocaleDateString()}`,
                            reps: 0,
                            sets: 0
                        };
                    }

                    currentWeek.reps += day.reps;
                    currentWeek.sets += day.sets;

                    if (idx === dailyData.length - 1) {
                        weeklyData.push(currentWeek);
                    }
                });

                setChartData(weeklyData);
            } else {
                setChartData(dailyData);
            }
        };

        processChartData();
    }, [exercises, viewMode]);

    // Handle form submission to add a new exercise entry via API
    const handleAddExercise = async (e: React.FormEvent) => {
        e.preventDefault();

        const exercisePayload = {
            date: newExercise.date
                ? new Date(newExercise.date).toISOString()
                : new Date().toISOString(),
            movement: newExercise.movement,
            sets: Number(newExercise.sets) || 0,
            reps: Number(newExercise.reps) || 0,
            weight: Number(newExercise.weight) || 0,
            type: newExercise.type as 'push' | 'pull'
        };

        try {
            const response = await fetch('http://127.0.0.1:8080/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exercisePayload)
            });

            if (!response.ok) {
                throw new Error('Failed to add exercise');
            }

            const savedExercise: ExerciseEntry = await response.json();

            setExercises((prev) =>
                [...prev, savedExercise].sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                )
            );

            setNewExercise({movement: '', sets: '', reps: '', weight: '', type: 'push', date: ''});
        } catch (error) {
            console.error('Error adding exercise:', error);
        }
    };

    // Handle exercise deletion via API
    const handleDeleteExercise = async (id: string) => {
        if (!id || id === "undefined") {
            console.error('Invalid exercise ID');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8080/exercises/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete exercise');
            }

            setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    };

    return (
        <div className="w-full">
            {/* Header and View Mode Buttons */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-md mb-8 w-full">
                <h1 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
                    <DumbbellIcon/> Exercise Tracker
                </h1>
                <div className="flex gap-2">
                    <Button
                        variant={viewMode === 'day' ? 'default' : 'outline'}
                        onClick={() => setViewMode('day')}
                        className="text-white"
                    >
                        Daily View
                    </Button>
                    <Button
                        variant={viewMode === 'week' ? 'default' : 'outline'}
                        onClick={() => setViewMode('week')}
                        className="text-white"
                    >
                        Weekly View
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 w-full">
                <div className="flex-1">
                    {/* Top Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full">
                        <motion.div
                            className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-md"
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                        >
                            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                                <DumbbellIcon/> Add New Exercise
                            </h2>
                            <form onSubmit={handleAddExercise} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    type="text"
                                    placeholder="Movement"
                                    value={newExercise.movement}
                                    onChange={(e) => setNewExercise({...newExercise, movement: e.target.value})}
                                    required
                                    className="border-white placeholder:text-white"
                                />
                                <Input
                                    type="number"
                                    placeholder="Sets"
                                    value={newExercise.sets}
                                    onChange={(e) => setNewExercise({...newExercise, sets: e.target.value})}
                                    required
                                    min="0"
                                    className="border-white placeholder:text-white"
                                />
                                <Input
                                    type="number"
                                    placeholder="Reps"
                                    value={newExercise.reps}
                                    onChange={(e) => setNewExercise({...newExercise, reps: e.target.value})}
                                    required
                                    min="0"
                                    className="border-white placeholder:text-white"
                                />
                                <Input
                                    type="number"
                                    placeholder="Weight"
                                    value={newExercise.weight}
                                    onChange={(e) => setNewExercise({...newExercise, weight: e.target.value})}
                                    required
                                    min="0"
                                    className="border-white placeholder:text-white"
                                />
                                <select
                                    value={newExercise.type}
                                    onChange={(e) => setNewExercise({...newExercise, type: e.target.value})}
                                    className="border border-white bg-transparent text-white rounded px-3 py-2"
                                >
                                    <option value="push">Push</option>
                                    <option value="pull">Pull</option>
                                </select>
                                <Input
                                    type="date"
                                    value={newExercise.date}
                                    onChange={(e) => setNewExercise({...newExercise, date: e.target.value})}
                                    className="text-white border-white placeholder:text-white"
                                    required
                                />
                                <Button type="submit" className="border-white border-2 text-white md:col-span-2">
                                    <PlusIcon className="mr-2 h-4 w-4"/> Add Exercise
                                </Button>
                            </form>
                        </motion.div>

                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-md max-h-76 overflow-y-auto"
                        >
                            <h2 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                                <ClockIcon/> Recent Exercises
                            </h2>
                            <AnimatePresence>
                                {exercises.length === 0 ? (
                                    <p className="text-white">No exercises added yet.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {exercises.map((exercise) => (
                                            <motion.div
                                                key={exercise.id}
                                                initial={{opacity: 0, y: -20}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: -20}}
                                                className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
                                            >
                                                <div>
                                                    <h3 className="font-semibold">{exercise.movement}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(exercise.date).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-sm">
                                                        {exercise.sets} sets | {exercise.reps} reps
                                                        | {exercise.weight} |
                                                        ({exercise.type})
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDeleteExercise(exercise.id)}
                                                    className="bg-red-400"
                                                >
                                                    <Trash2Icon className="h-4 w-4"/>
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Bottom Row: Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-md">
                            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                                <CalendarClockIcon/> Reps Over Time
                            </h2>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#fff"/>
                                        <XAxis dataKey="date" stroke="#fff" tick={{fill: '#fff'}}/>
                                        <YAxis stroke="#fff" tick={{fill: '#fff'}}/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Line type="monotone" dataKey="reps" stroke="#fff" strokeWidth={2}/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-md">
                            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                                <CalendarClockIcon/> Sets Over Time
                            </h2>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#fff"/>
                                        <XAxis dataKey="date" stroke="#fff" tick={{fill: '#fff'}}/>
                                        <YAxis stroke="#fff" tick={{fill: '#fff'}}/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="sets" fill="#8B5CF6" name="Sets"/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Placeholder Insights Column */}
                <div
                    className="lg:w-1/4 bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-md flex flex-col"
                >
                    <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                        <LightbulbIcon/> Insights (GPT Placeholder)
                    </h2>
                    <div className="text-white space-y-4 flex-1">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </p>
                        <p>
                            Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
                            commodo
                            pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseTracker;