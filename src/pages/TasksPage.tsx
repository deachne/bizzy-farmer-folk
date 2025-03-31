import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import TasksList from "@/components/TasksList";
import TasksBoard from "@/components/TasksBoard";
import TasksPartsView from "@/components/TasksPartsView";
import TaskDetail from "@/components/TaskDetail";
import { Plus, Filter, Search, X, ChevronRight, ShoppingBag, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import ShoppingList from "@/components/tasks/ShoppingList";

export interface Part {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  partNumber?: string;
  vendor?: string;
  ordered?: boolean;
  received?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed" | "parts-list" | "field-tasks";
  priority: "high" | "medium" | "normal";
  dueDate: string;
  completedDate?: string;
  source: string;
  sourceText?: string;
  tags: string[];
  notes?: string;
  parts?: Part[];
}

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);
  
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
      notes: "Purchase new nozzles from AgriSupply. Need 24 units.",
      parts: [
        {
          id: "p1",
          name: "Standard Spray Nozzles",
          quantity: 24,
          partNumber: "SN-120-X",
          vendor: "AgriSupply",
          ordered: false,
          received: false
        },
        {
          id: "p2",
          name: "Nozzle gaskets",
          quantity: 24,
          partNumber: "NG-120",
          vendor: "AgriSupply",
          ordered: false,
          received: false
        }
      ]
    },
    {
      id: "2",
      title: "Pick up stone in northeast corner of North Field",
      description: "Large stone needs to be removed before planting",
      status: "field-tasks",
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
      status: "parts-list",
      priority: "normal",
      dueDate: "March 30, 2025",
      source: "Manual Entry",
      tags: ["Supplies"],
      notes: "Check prices at both suppliers before purchasing.",
      parts: [
        {
          id: "p3",
          name: "Combine Drive Belt",
          quantity: 2,
          partNumber: "CD-450-X",
          vendor: "Brandon Farm Supply",
          ordered: false,
          received: false
        },
        {
          id: "p4",
          name: "Herbicide - Roundup",
          quantity: 10,
          unit: "gallons",
          vendor: "Brandon Ag Chemicals",
          ordered: false,
          received: false
        }
      ]
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
    },
    {
      id: "6",
      title: "Kitchen Supplies Restock",
      description: "Pick up some kitchen essentials",
      status: "todo",
      priority: "normal",
      dueDate: "April 1, 2025",
      source: "Manual Entry",
      tags: ["Supplies"],
      parts: [
        {
          id: "p5",
          name: "Paper Towels",
          quantity: 2,
          vendor: "",
          ordered: false,
          received: false
        },
        {
          id: "p6",
          name: "Garbage Bags",
          quantity: 1,
          unit: "box",
          vendor: "",
          ordered: false,
          received: false
        },
        {
          id: "p7",
          name: "Electrical Tape",
          quantity: 3,
          partNumber: "ET-100",
          vendor: "Hardware Store",
          ordered: false,
          received: false
        }
      ]
    },
    {
      id: "7",
      title: "Garden Maintenance",
      description: "Prepare garden tools and supplies",
      status: "todo",
      priority: "medium",
      dueDate: "April 5, 2025",
      source: "Field Observation",
      tags: ["Gardening"],
      parts: [
        {
          id: "p8",
          name: "Garden Gloves",
          quantity: 1,
          vendor: "Gardening Supply Co",
          ordered: false,
          received: false
        },
        {
          id: "p9",
          name: "Plant Fertilizer",
          quantity: 2,
          unit: "bags",
          vendor: "Gardening Supply Co",
          ordered: false,
          received: false
        },
        {
          id: "p10",
          name: "Pruning Shears",
          quantity: 1,
          partNumber: "PS-200",
          vendor: "Gardening Supply Co",
          ordered: false,
          received: false
        },
        {
          id: "p11",
          name: "Twine",
          quantity: 1,
          vendor: "",
          ordered: false,
          received: false
        }
      ]
    }
  ]);

  const createTask = () => {
    setSelectedTask(null);
    
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
      setIsDetailOpen(true);
      
      toast({
        title: "Task Created",
        description: "A new task has been created",
      });
    }, 50);
  };

  const completeTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newStatus: Task["status"] = task.status === "completed" ? "todo" : "completed";
        
        return { 
          ...task, 
          status: newStatus,
          completedDate: newStatus === "completed" ? 
            new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 
            undefined
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    if (selectedTask?.id === taskId) {
      const updatedTask = updatedTasks.find(task => task.id === taskId);
      if (updatedTask) {
        setSelectedTask(updatedTask);
      }
    }
    
    const taskStatus = updatedTasks.find(t => t.id === taskId)?.status;
    toast({
      title: taskStatus === "completed" ? "Task Completed" : "Task Reopened",
      description: taskStatus === "completed" ? 
        "The task has been marked as completed" : 
        "The task has been reopened",
    });
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    setSelectedTask(null);
    setIsDetailOpen(false);
    
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

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const toggleShoppingList = () => {
    setShowShoppingList(!showShoppingList);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery === "" || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSource = sourceFilter === "All" || task.source === sourceFilter;
    
    return matchesSearch && matchesSource;
  });

  const upcomingTasks = filteredTasks.filter(task => task.status !== "completed");
  const completedTasks = filteredTasks.filter(task => task.status === "completed");
  const tasksWithParts = tasks.filter(task => task.parts && task.parts.length > 0);

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white text-xl font-semibold px-4 py-2 rounded-md">
                BizzyPerson
              </div>
              <div className="text-xl font-semibold ml-2 text-gray-700">Tasks</div>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            <div className={`${(isDetailOpen || showShoppingList) ? 'w-3/5' : 'w-full'} flex flex-col transition-all duration-300`}>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                
                <div className="flex items-center justify-between mb-4">
                  <Tabs defaultValue={activeTab} value={activeTab} className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="list">List</TabsTrigger>
                      <TabsTrigger value="board">Board</TabsTrigger>
                      <TabsTrigger value="parts" className="flex items-center">
                        <Package className="h-4 w-4 mr-1" /> Parts
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="flex space-x-2">
                    {tasksWithParts.length > 0 && (
                      <Button 
                        className="ml-2 bg-green-600 hover:bg-green-700 text-white" 
                        onClick={toggleShoppingList}
                      >
                        <ShoppingBag className="h-4 w-4 mr-1" /> Parts
                      </Button>
                    )}
                    <Button 
                      className="ml-2 bg-blue-600 hover:bg-blue-700 text-white" 
                      onClick={createTask}
                    >
                      <Plus className="h-4 w-4 mr-1" /> New Task
                    </Button>
                  </div>
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
                    {upcomingTasks.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold mb-2 text-gray-700">Upcoming</h3>
                        <TasksList 
                          tasks={upcomingTasks} 
                          selectedTask={selectedTask} 
                          onSelectTask={handleSelectTask}
                          onCompleteTask={completeTask}
                        />
                      </div>
                    )}
                    
                    {completedTasks.length > 0 && (
                      <div>
                        <h3 className="text-base font-semibold mb-2 text-gray-700">Recently Completed</h3>
                        <TasksList 
                          tasks={completedTasks} 
                          selectedTask={selectedTask} 
                          onSelectTask={handleSelectTask}
                          onCompleteTask={completeTask}
                        />
                      </div>
                    )}
                  </>
                ) : activeTab === "board" ? (
                  <TasksBoard
                    tasks={filteredTasks}
                    selectedTask={selectedTask}
                    onSelectTask={handleSelectTask}
                    onCompleteTask={completeTask}
                    createTask={createTask}
                  />
                ) : (
                  <TasksPartsView
                    tasks={filteredTasks}
                    onSelectTask={handleSelectTask}
                    onUpdateTask={updateTask}
                  />
                )}
              </div>
            </div>
            
            {isDetailOpen && (
              <div className="w-2/5 relative border-l">
                {selectedTask ? (
                  <TaskDetail 
                    task={selectedTask}
                    onUpdateTask={updateTask}
                    onCompleteTask={completeTask}
                    onDeleteTask={deleteTask}
                    onClose={handleCloseDetail}
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

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full absolute top-2 right-2"
                      onClick={handleCloseDetail}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {showShoppingList && (
              <div className="w-2/5 relative border-l">
                <ShoppingList 
                  tasks={tasksWithParts} 
                  onClose={() => setShowShoppingList(false)}
                  onTaskSelect={handleSelectTask}
                  onUpdateTask={updateTask}
                />
              </div>
            )}
            
            {!isDetailOpen && selectedTask && (
              <div className="fixed bottom-20 right-6 z-20">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                  onClick={() => setIsDetailOpen(true)}
                >
                  View Task <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="border-t p-2 text-sm text-gray-500 flex justify-end">
            <div>
              <span className="font-medium">Action Log:</span> 
              <span className="ml-2">Navigated to Tasks</span>
            </div>
          </div>
        </div>
      </SidebarProvider>

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
