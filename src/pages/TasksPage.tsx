
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import TasksList from "@/components/TasksList";
import TasksBoard from "@/components/TasksBoard";
import TaskDetail from "@/components/TaskDetail";
import { Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "high" | "medium" | "normal";
  dueDate: string;
  completedDate?: string;
  source: string;
  sourceText?: string;
  tags: string[];
  notes?: string;
}

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  
  // Sample tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Replace spray nozzles on the sprayer",
      description: "Need to replace all spray nozzles before next application",
      status: "todo",
      priority: "high",
      dueDate: "Today",
      source: "Equipment Note",
      tags: ["Equipment", "Urgent"],
      notes: "Purchase new nozzles from AgriSupply. Need 24 units."
    },
    {
      id: "2",
      title: "Pick up stone in northeast corner of North Field",
      description: "Large stone needs to be removed before planting",
      status: "in-progress",
      priority: "medium",
      dueDate: "Tomorrow",
      source: "Field Observation",
      sourceText: "North Field looking good but there's a stone to pick out in the northeast corner",
      tags: ["North Field", "Equipment"],
      notes: "Will need the front-end loader. Stone is approximately 18\" in diameter."
    },
    {
      id: "3",
      title: "Pick up belts and spray in Brandon",
      description: "Purchase replacement belts for the combine and herbicide",
      status: "todo",
      priority: "normal",
      dueDate: "March 30, 2025",
      source: "Manual Entry",
      tags: ["Supplies"],
      notes: "Check prices at both suppliers before purchasing."
    },
    {
      id: "4",
      title: "Schedule soil test for East Field",
      description: "Arrange for soil testing before fertilizer application",
      status: "completed",
      priority: "medium",
      dueDate: "March 27, 2025",
      completedDate: "March 27, 2025",
      source: "Crop Planning",
      tags: ["East Field"],
      notes: "Scheduled with AgriLabs for next Tuesday."
    },
    {
      id: "5",
      title: "Call AgriCo about urea pricing",
      description: "Get updated pricing for bulk urea purchase",
      status: "completed",
      priority: "normal",
      dueDate: "March 26, 2025",
      completedDate: "March 26, 2025",
      source: "Chat",
      tags: ["Pricing"],
      notes: "Current price is $495/ton plus delivery. Firm until April 15."
    }
  ]);

  const createTask = () => {
    // First clear the selected task
    setSelectedTask(null);
    
    // Small delay to ensure the clearing animation is visible
    setTimeout(() => {
      const newTask = {
        id: Date.now().toString(),
        title: "New Task",
        description: "",
        status: "todo" as const,
        priority: "normal" as const,
        dueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        source: "Manual Entry",
        tags: [],
        notes: ""
      };
      
      setTasks([newTask, ...tasks]);
      setSelectedTask(newTask);
      
      toast({
        title: "Task Created",
        description: "A new task has been created",
      });
    }, 50);
  };

  const completeTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: "completed" as const, 
            completedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          } 
        : task
    );
    setTasks(updatedTasks);
    
    if (selectedTask?.id === taskId) {
      const updatedTask = updatedTasks.find(task => task.id === taskId);
      setSelectedTask(updatedTask || null);
    }
    
    toast({
      title: "Task Completed",
      description: "The task has been marked as completed",
    });
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    setSelectedTask(null);
    
    toast({
      title: "Task Deleted",
      description: "The task has been deleted",
    });
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setSelectedTask(updatedTask);
  };

  // Filter tasks based on search query and source filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery === "" || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSource = sourceFilter === "All" || task.source === sourceFilter;
    
    return matchesSearch && matchesSource;
  });

  // Separate upcoming and completed tasks
  const upcomingTasks = filteredTasks.filter(task => task.status !== "completed");
  const completedTasks = filteredTasks.filter(task => task.status === "completed");

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white text-xl font-semibold px-4 py-2 rounded-md">
                BizzyPerson
              </div>
              <div className="text-xl font-semibold ml-2 text-gray-700">Tasks</div>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Tasks List Panel */}
            <div className="w-3/5 border-r flex flex-col">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                
                <div className="flex items-center justify-between mb-4">
                  <Tabs defaultValue={activeTab} value={activeTab} className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="list">List</TabsTrigger>
                      <TabsTrigger value="board">Board</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <Button 
                    className="ml-2 bg-blue-600 hover:bg-blue-700 text-white" 
                    onClick={createTask}
                  >
                    <Plus className="h-4 w-4 mr-1" /> New Task
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="relative">
                    <select 
                      className="w-full p-2 pr-8 border rounded-md text-sm appearance-none bg-white"
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value)}
                    >
                      <option>All</option>
                      <option>Field Observation</option>
                      <option>Equipment Note</option>
                      <option>Manual Entry</option>
                      <option>Crop Planning</option>
                      <option>Chat</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <Filter className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select className="w-full p-2 pr-8 border rounded-md text-sm appearance-none bg-white">
                      <option>All Fields</option>
                      <option>North Field</option>
                      <option>East Field</option>
                      <option>South Field</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <Filter className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <Input
                    type="search"
                    placeholder="Search tasks..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                {activeTab === "list" ? (
                  <>
                    {/* Upcoming Tasks */}
                    {upcomingTasks.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold mb-2 text-gray-700">Upcoming</h3>
                        <TasksList 
                          tasks={upcomingTasks} 
                          selectedTask={selectedTask} 
                          onSelectTask={setSelectedTask}
                          onCompleteTask={completeTask}
                        />
                      </div>
                    )}
                    
                    {/* Completed Tasks */}
                    {completedTasks.length > 0 && (
                      <div>
                        <h3 className="text-base font-semibold mb-2 text-gray-700">Recently Completed</h3>
                        <TasksList 
                          tasks={completedTasks} 
                          selectedTask={selectedTask} 
                          onSelectTask={setSelectedTask}
                          onCompleteTask={completeTask}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <TasksBoard
                    tasks={filteredTasks}
                    selectedTask={selectedTask}
                    onSelectTask={setSelectedTask}
                    onCompleteTask={completeTask}
                    createTask={createTask}
                  />
                )}
              </div>
            </div>
            
            {/* Task Detail Panel */}
            <div className="w-2/5">
              {selectedTask ? (
                <TaskDetail 
                  task={selectedTask}
                  onUpdateTask={updateTask}
                  onCompleteTask={completeTask}
                  onDeleteTask={deleteTask}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
                    <Plus className="h-8 w-8" />
                  </div>
                  <p className="text-xl font-medium mb-2">No task selected</p>
                  <p className="text-sm text-gray-400 mb-6">Select a task or create a new one</p>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white" 
                    onClick={createTask}
                  >
                    Create Task
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Action Log Footer */}
          <div className="border-t p-2 text-sm text-gray-500 flex justify-end">
            <div>
              <span className="font-medium">Action Log:</span> 
              <span className="ml-2">Navigated to Tasks</span>
            </div>
          </div>
        </div>
      </SidebarProvider>

      {/* Universal Capture Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          onClick={createTask}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default TasksPage;
