import React, {useState, useEffect} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    PlusIcon,
    Trash2Icon,
    ScaleIcon,
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
    ResponsiveContainer
} from 'recharts';
import {motion, AnimatePresence} from 'framer-motion';

// Types for weight entries and chart data
interface WeightEntry {
    id: string;
    date: string;
    weight: number;
    note?: string;
}

interface ChartData {
    date: string;
    weight: number;
}

const WeightTracker: React.FC = () => {
    const [weights, setWeights] = useState<WeightEntry[]>([]);
    const [newWeight, setNewWeight] = useState({
        weight: '',
        note: '',
        date: ''
    });
    const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
    const [chartData, setChartData] = useState<ChartData[]>([]);

    // Fetch weights from API
    const fetchWeights = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/weights');
            if (!response.ok) throw new Error('Failed to retrieve weights');
            const data: WeightEntry[] = await response.json();
            setWeights(data);
        } catch (error) {
            console.error('Error retrieving weights:', error);
        }
    };

    useEffect(() => {
        fetchWeights();
    }, []);

    // Process chart data
    useEffect(() => {
        const processChartData = () => {
            const groupedData = weights.reduce((acc, weightEntry) => {
                const dateKey = new Date(weightEntry.date).toISOString().split('T')[0];
                if (!acc[dateKey]) {
                    acc[dateKey] = {date: dateKey, weight: 0, count: 0};
                }
                acc[dateKey].weight += weightEntry.weight;
                acc[dateKey].count += 1;
                return acc;
            }, {} as Record<string, { date: string; weight: number; count: number }>);

            const dailyData = Object.values(groupedData)
                .map(item => ({
                    date: item.date,
                    weight: item.weight / item.count // Average weight if multiple entries per day
                }))
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            if (viewMode === 'week' && dailyData.length > 0) {
                const weeklyData: ChartData[] = [];
                const startDate = new Date(dailyData[0].date);
                let currentWeek: { date: string; weight: number; count: number } = {
                    date: `Week of ${startDate.toLocaleDateString()}`,
                    weight: 0,
                    count: 0
                };

                dailyData.forEach((day, index) => {
                    const currentDate = new Date(day.date);
                    const daysDiff = Math.floor(
                        (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                    );

                    if (daysDiff >= 7) {
                        weeklyData.push({
                            date: currentWeek.date,
                            weight: currentWeek.count > 0 ? currentWeek.weight / currentWeek.count : 0
                        });
                        startDate.setDate(startDate.getDate() + 7);
                        currentWeek = {
                            date: `Week of ${startDate.toLocaleDateString()}`,
                            weight: 0,
                            count: 0
                        };
                    }

                    currentWeek.weight += day.weight;
                    currentWeek.count += 1;

                    if (index === dailyData.length - 1) {
                        weeklyData.push({
                            date: currentWeek.date,
                            weight: currentWeek.count > 0 ? currentWeek.weight / currentWeek.count : 0
                        });
                    }
                });

                setChartData(weeklyData);
            } else {
                setChartData(dailyData);
            }
        };

        processChartData();
    }, [weights, viewMode]);

    // Add weight entry
    const handleAddWeight = async (e: React.FormEvent) => {
        e.preventDefault();
        const weightPayload = {
            date: newWeight.date ? new Date(newWeight.date).toISOString() : new Date().toISOString(),
            weight: Number(newWeight.weight) || 0,
            note: newWeight.note || ''
        };

        try {
            const response = await fetch('http://127.0.0.1:8080/weights', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(weightPayload)
            });

            if (!response.ok) throw new Error('Failed to add weight entry');
            const savedWeight: WeightEntry = await response.json();

            setWeights((prev) =>
                [...prev, savedWeight].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
            setNewWeight({weight: '', note: '', date: ''});
        } catch (error) {
            console.error('Error adding weight entry:', error);
        }
    };

    // Delete weight entry
    const handleDeleteWeight = async (id: string) => {
        if (!id || id === "undefined") {
            console.error('Invalid weight ID');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8080/weights/${id}`, {method: 'DELETE'});
            if (!response.ok) throw new Error('Failed to delete weight entry');
            setWeights((prev) => prev.filter((weight) => weight.id !== id));
        } catch (error) {
            console.error('Error deleting weight entry:', error);
        }
    };

    return (
        <div className="w-full">
            {/* Header and View Mode Buttons */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-300 p-6 rounded-lg shadow-md mb-8 w-full">
                <h1 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
                    <ScaleIcon/> Weight Tracker
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
                            className="bg-gradient-to-r from-purple-500 to-purple-300 p-6 rounded-lg shadow-md"
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                        >
                            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                                <ScaleIcon/> Add New Weight
                            </h2>
                            <form onSubmit={handleAddWeight} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    type="number"
                                    placeholder="Weight (lbs/kg)"
                                    value={newWeight.weight}
                                    onChange={(e) => setNewWeight({...newWeight, weight: e.target.value})}
                                    required
                                    min="0"
                                    className="border-white placeholder:text-white"
                                />
                                <Input
                                    type="text"
                                    placeholder="Note (optional)"
                                    value={newWeight.note}
                                    onChange={(e) => setNewWeight({...newWeight, note: e.target.value})}
                                    className="border-white placeholder:text-white"
                                />
                                <Input
                                    type="date"
                                    value={newWeight.date}
                                    onChange={(e) => setNewWeight({...newWeight, date: e.target.value})}
                                    className="text-white border-white placeholder:text-white"
                                    required
                                />
                                <Button type="submit" className="border-white border-2 text-white md:col-span-2">
                                    <PlusIcon className="mr-2 h-4 w-4"/> Add Weight
                                </Button>
                            </form>
                        </motion.div>

                        <div
                            className="bg-gradient-to-r from-purple-500 to-purple-300 p-6 rounded-lg shadow-md max-h-76 overflow-y-auto"
                        >
                            <h2 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                                <ClockIcon/> Recent Weights
                            </h2>
                            <AnimatePresence>
                                {weights.length === 0 ? (
                                    <p className="text-white">No weight entries added yet.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {weights.map((weightEntry) => (
                                            <motion.div
                                                key={weightEntry.id}
                                                initial={{opacity: 0, y: -20}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: -20}}
                                                className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
                                            >
                                                <div>
                                                    <h3 className="font-semibold">{weightEntry.weight} lbs/kg</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(weightEntry.date).toLocaleDateString()}
                                                    </p>
                                                    {weightEntry.note && (
                                                        <p className="text-sm">Note: {weightEntry.note}</p>
                                                    )}
                                                </div>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDeleteWeight(weightEntry.id)}
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
                        <div className="bg-gradient-to-r from-purple-500 to-purple-300 p-6 rounded-lg shadow-md">
                            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                                <CalendarClockIcon/> Weight Over Time
                            </h2>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#fff"/>
                                        <XAxis dataKey="date" stroke="#fff" tick={{fill: '#fff'}}/>
                                        <YAxis stroke="#fff" tick={{fill: '#fff'}}/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Line type="monotone" dataKey="weight" stroke="#fff" strokeWidth={2}
                                              name="Weight (lbs/kg)"/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div
                            className="bg-gradient-to-r from-purple-500 to-purple-300 p-6 rounded-lg shadow-md opacity-50 pointer-events-none">
                            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                                <CalendarClockIcon/> Placeholder Chart
                            </h2>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={[]}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#fff"/>
                                        <XAxis dataKey="date" stroke="#fff" tick={{fill: '#fff'}}/>
                                        <YAxis stroke="#fff" tick={{fill: '#fff'}}/>
                                        <Tooltip/>
                                        <Legend/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Placeholder Insights Column */}
                <div
                    className="lg:w-1/4 bg-gradient-to-r from-purple-500 to-purple-300 p-6 rounded-lg shadow-md flex flex-col"
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

export default WeightTracker;