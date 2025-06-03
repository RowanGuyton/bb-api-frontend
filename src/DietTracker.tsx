import React, {useState, useEffect} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    PlusIcon,
    Trash2Icon,
    AppleIcon,
    ClockIcon,
    CalendarClockIcon,
    VeganIcon,
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

// Types for meal entries and chart data
interface MealEntry {
    id: string;
    date: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

interface ChartData {
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

const DietTracker: React.FC = () => {
    const [meals, setMeals] = useState<MealEntry[]>([]);
    const [newMeal, setNewMeal] = useState({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        date: ''
    });
    const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
    const [chartData, setChartData] = useState<ChartData[]>([]);

    // Fetch meals from API
    const fetchMeals = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/meals');
            if (!response.ok) throw new Error('Failed to retrieve meals');
            const data: MealEntry[] = await response.json();
            setMeals(data);
        } catch (error) {
            console.error('Error retrieving meals:', error);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    // Process chart data
    useEffect(() => {
        const processChartData = () => {
            const groupedData = meals.reduce((acc, meal) => {
                const dateKey = new Date(meal.date).toISOString().split('T')[0];
                if (!acc[dateKey]) {
                    acc[dateKey] = {date: dateKey, calories: 0, protein: 0, carbs: 0, fat: 0};
                }
                acc[dateKey].calories += meal.calories;
                acc[dateKey].protein += meal.protein;
                acc[dateKey].carbs += meal.carbs;
                acc[dateKey].fat += meal.fat;
                return acc;
            }, {} as Record<string, ChartData>);

            const processedData = Object.values(groupedData).sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );

            if (viewMode === 'week' && processedData.length > 0) {
                const weeklyData: ChartData[] = [];
                const startDate = new Date(processedData[0].date);
                let currentWeek: ChartData = {
                    date: `Week of ${startDate.toLocaleDateString()}`,
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0
                };

                processedData.forEach((day, index) => {
                    const currentDate = new Date(day.date);
                    const daysDiff = Math.floor(
                        (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                    );

                    if (daysDiff >= 7) {
                        weeklyData.push(currentWeek);
                        startDate.setDate(startDate.getDate() + 7);
                        currentWeek = {
                            date: `Week of ${startDate.toLocaleDateString()}`,
                            calories: 0,
                            protein: 0,
                            carbs: 0,
                            fat: 0
                        };
                    }

                    currentWeek.calories += day.calories;
                    currentWeek.protein += day.protein;
                    currentWeek.carbs += day.carbs;
                    currentWeek.fat += day.fat;

                    if (index === processedData.length - 1) weeklyData.push(currentWeek);
                });

                setChartData(weeklyData);
            } else {
                setChartData(processedData);
            }
        };

        processChartData();
    }, [meals, viewMode]);

    // Add meal
    const handleAddMeal = async (e: React.FormEvent) => {
        e.preventDefault();
        const mealPayload = {
            date: newMeal.date ? new Date(newMeal.date).toISOString() : new Date().toISOString(),
            name: newMeal.name,
            calories: Number(newMeal.calories) || 0,
            protein: Number(newMeal.protein) || 0,
            carbs: Number(newMeal.carbs) || 0,
            fat: Number(newMeal.fat) || 0
        };

        try {
            const response = await fetch('http://127.0.0.1:8080/meals', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(mealPayload)
            });

            if (!response.ok) throw new Error('Failed to add meal');
            const savedMeal: MealEntry = await response.json();

            setMeals((prev) =>
                [...prev, savedMeal].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
            setNewMeal({name: '', calories: '', protein: '', carbs: '', fat: '', date: ''});
        } catch (error) {
            console.error('Error adding meal:', error);
        }
    };

    // Delete meal
    const handleDeleteMeal = async (id: string) => {
        if (!id || id === "undefined") {
            console.error('Invalid meal ID');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8080/meals/${id}`, {method: 'DELETE'});
            if (!response.ok) throw new Error('Failed to delete meal');
            setMeals((prev) => prev.filter((meal) => meal.id !== id));
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    return (
        <div className="w-full">
            {/* Main Content */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-300 p-6 rounded-lg shadow-md mb-8 w-full">
                <h1 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
                    <VeganIcon/> Diet & Food Tracker
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full">
                        <motion.div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-300 p-6 rounded-lg shadow-md"
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                        >
                            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                                <AppleIcon/> Add New Meal
                            </h2>
                            <form onSubmit={handleAddMeal} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Meal name"
                                    value={newMeal.name}
                                    onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                                    required
                                    className="border-white placeholder:text-white"
                                />
                                <Input
                                    type="number"
                                    placeholder="Calories"
                                    value={newMeal.calories}
                                    onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                                    required
                                    min="0"
                                    className="border-white placeholder:text-white"
                                />
                                <Input
                                    type="number"
                                    placeholder="Protein (g)"
                                    value={newMeal.protein}
                                    onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                                    min="0"
                                    className="border-white placeholder:text-white"
                                />
                                <Input
                                    type="number"
                                    placeholder="Carbs (g)"
                                    value={newMeal.carbs}
                                    onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                                    min="0"
                                    className="border-white placeholder:text-white"
                                />
                                <Input
                                    type="number"
                                    placeholder="Fat (g)"
                                    value={newMeal.fat}
                                    onChange={(e) => setNewMeal({...newMeal, fat: e.target.value})}
                                    min="0"
                                    className="border-white placeholder:text-white"
                                />
                                <Input
                                    type="date"
                                    value={newMeal.date}
                                    onChange={(e) => setNewMeal({...newMeal, date: e.target.value})}
                                    className="text-white border-white placeholder:text-white"
                                    required
                                />
                                <Button type="submit" className="border-white border-2 text-white md:col-span-2">
                                    <PlusIcon className="mr-2 h-4 w-4"/> Add Meal
                                </Button>
                            </form>
                        </motion.div>

                        <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-300 p-6 rounded-lg shadow-md max-h-76 overflow-y-auto"
                        >
                            <h2 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                                <ClockIcon/> Recent Meals
                            </h2>
                            <AnimatePresence>
                                {meals.length === 0 ? (
                                    <p className="text-white">No meals added yet.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {meals.map((meal) => (
                                            <motion.div
                                                key={meal.id}
                                                initial={{opacity: 0, y: -20}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: -20}}
                                                className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
                                            >
                                                <div>
                                                    <h3 className="font-semibold">{meal.name}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(meal.date).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-sm">
                                                        {meal.calories} cal | P: {meal.protein}g | C: {meal.carbs}g |
                                                        F: {meal.fat}g
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDeleteMeal(meal.id)}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-300 p-6 rounded-lg shadow-md">
                            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                                <CalendarClockIcon/> Calories Over Time
                            </h2>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#fff"/>
                                        <XAxis dataKey="date" stroke="#fff" tick={{fill: '#fff'}}/>
                                        <YAxis stroke="#fff" tick={{fill: '#fff'}}/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Line type="monotone" dataKey="calories" stroke="#fff" strokeWidth={2}/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-300 p-6 rounded-lg shadow-md">
                            <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                                <CalendarClockIcon/> Macronutrients Over Time
                            </h2>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#fff"/>
                                        <XAxis dataKey="date" stroke="#fff" tick={{fill: '#fff'}}/>
                                        <YAxis stroke="#fff" tick={{fill: '#fff'}}/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="protein" fill="#8B5CF6" name="Protein (g)"/>
                                        <Bar dataKey="carbs" fill="#ffc658" name="Carbs (g)"/>
                                        <Bar dataKey="fat" fill="#ff7300" name="Fat (g)"/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Placeholder Insights Column */}
                <div
                    className="lg:w-1/4 bg-gradient-to-r from-emerald-500 to-emerald-300 p-6 rounded-lg shadow-md flex flex-col"
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

export default DietTracker;