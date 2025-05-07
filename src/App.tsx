import {useState, useCallback, useEffect} from 'react';
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {cn} from "@/lib/utils"
import {format} from 'date-fns';
import {Plus, XCircle, Edit} from 'lucide-react';

interface Event {
    id: string;
    title: string;
    date: Date;
    description: string;
}

const App = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [description, setDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
    const [editEventId, setEditEventId] = useState<string | null>(null);

    useEffect(() => {
        setIsAddButtonDisabled(!title && !date && !description);
    }, [title, date, description]);

    const addEvent = useCallback(() => {
        if (title && date && description) {
            if (editEventId) {
                // Edit existing event
                setEvents(events.map(event =>
                    event.id === editEventId ? {...event, title, date, description} : event
                ));
                setEditEventId(null);
            } else {
                // Add new event
                const newEvent: Event = {
                    id: crypto.randomUUID(),
                    title,
                    date,
                    description,
                };
                setEvents([...events, newEvent]);
            }
            setTitle('');
            setDate(undefined);
            setDescription('');
            setOpen(false);
        }
    }, [title, date, description, events, editEventId]);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedEvents = [...filteredEvents].sort((a, b) => a.date.getTime() - b.date.getTime());

    const confirmDeleteEvent = useCallback((id: string) => {
        setDeleteEventId(id);
        setIsDeleteDialogOpen(true);
    }, []);

    const deleteEvent = useCallback(() => {
        if (deleteEventId) {
            setEvents(events.filter(event => event.id !== deleteEventId));
            setIsDeleteDialogOpen(false);
            setDeleteEventId(null);
        }
    }, [events, deleteEventId]);

    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setDeleteEventId(null);
    };

    const handleEditEvent = (event: Event) => {
        setEditEventId(event.id);
        setTitle(event.title);
        setDate(event.date);
        setDescription(event.description);
        setOpen(true);
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-r from-blue-900 to-white dark:from-blue-500 dark:to-blue-900"
        >
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-300 dark:from-gray-200 dark:to-gray-500 text-transparent bg-clip-text mb-6">
                    Virtual Event Planner
                </h1>

                <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <Input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 border-gray-300 dark:border-gray-700"
                        />
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-white/10 text-white hover:bg-white/20 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                                >
                                    <Plus className="mr-2 h-4 w-4"/> {editEventId ? 'Edit Event' : 'Add Event'}
                                </Button>
                            </DialogTrigger>
                            <DialogContent
                                className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-black dark:text-gray-200 border-gray-300 dark:border-gray-700">
                                <DialogHeader>
                                    <DialogTitle className="text-black dark:text-gray-200">
                                        {editEventId ? 'Edit Event' : 'Add New Event'}
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                                        {editEventId
                                            ? 'Modify the details of your event.'
                                            : 'Enter the details for your new event.'}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label htmlFor="title" className="text-right text-gray-700 dark:text-gray-300">
                                            Title
                                        </label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="col-span-3 bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-200 border-gray-300 dark:border-gray-600"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label htmlFor="date" className="text-right text-gray-700 dark:text-gray-300">
                                            Date
                                        </label>
                                        <div className="col-span-3">
                                            <Input
                                                type="date"
                                                id="date"
                                                value={date ? format(date, 'yyyy-MM-dd') : ''}
                                                onChange={(e) => setDate(new Date(e.target.value))}
                                                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-200 border-gray-300 dark:border-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-start gap-4">
                                        <label htmlFor="description"
                                               className="text-right mt-2 text-gray-700 dark:text-gray-300">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="col-span-3 bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        onClick={addEvent}
                                        disabled={isAddButtonDisabled}
                                        className={cn(
                                            "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600",
                                            isAddButtonDisabled && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        {editEventId ? 'Update Event' : 'Add Event'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="space-y-4">
                    {sortedEvents.length > 0 ? (
                        sortedEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-gradient-to-r from-blue-800 to-blue-500 text-white shadow rounded-md p-4 flex items-center justify-between border border-blue-400"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold">{event.title}</h2>
                                    <p>{format(event.date, 'PPP')}</p>
                                    <p className="mt-1">{event.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEditEvent(event)}
                                        className="bg-green-400 hover:bg-green-600"
                                    >
                                        <Edit className="h-4 w-4"/>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => confirmDeleteEvent(event.id)}
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        <XCircle className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-300 dark:text-gray-400">
                            No events found.
                        </div>
                    )}
                </div>
            </div>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent
                    className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 border-gray-300 dark:border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-black dark:text-gray-200">Confirm Delete</DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-400">
                            Are you sure you want to delete this event?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="destructive"
                            onClick={deleteEvent}
                            className="bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600"
                        >
                            Confirm Delete
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={cancelDelete}
                            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default App;