import React, { useState } from "react";
import { Task, Part } from "@/pages/TasksPage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Package, ExternalLink, ShoppingBag, List, ListPlus } from "lucide-react";
import QuickAddParts from "./tasks/QuickAddParts";

interface TasksPartsViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
}

const TasksPartsView = ({ tasks, onSelectTask, onUpdateTask }: TasksPartsViewProps) => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  
  // Extract all parts from tasks
  const allParts: { part: Part; task: Task }[] = [];
  tasks.forEach(task => {
    if (task.parts && task.parts.length > 0) {
      task.parts.forEach(part => {
        allParts.push({ part, task });
      });
    }
  });

  // Group parts by vendor
  const groupedByVendor: Record<string, { vendor: string; parts: { part: Part; task: Task }[] }> = {};
  
  // Create a special "Simple Items" category for parts without vendor or just basic supplies
  const simpleItems: { part: Part; task: Task }[] = [];
  
  allParts.forEach(({ part, task }) => {
    // Identify simple items - those without a vendor or have simple labels like "supplies"
    if (!part.vendor || part.vendor.trim() === "" || 
        ["supplies", "misc", "groceries", "general"].includes(part.vendor.toLowerCase())) {
      simpleItems.push({ part, task });
    } else {
      // Normal vendor grouping for everything else
      const vendor = part.vendor;
      
      if (!groupedByVendor[vendor]) {
        groupedByVendor[vendor] = {
          vendor,
          parts: []
        };
      }
      
      groupedByVendor[vendor].parts.push({ part, task });
    }
  });

  // Toggle part ordered status
  const toggleOrdered = (taskId: string, partId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const updatedTask = { ...task };
    if (updatedTask.parts) {
      updatedTask.parts = updatedTask.parts.map(part => 
        part.id === partId
          ? { ...part, ordered: !part.ordered }
          : part
      );
      onUpdateTask(updatedTask);
    }
  };
  
  // Toggle part received status
  const toggleReceived = (taskId: string, partId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const updatedTask = { ...task };
    if (updatedTask.parts) {
      updatedTask.parts = updatedTask.parts.map(part => {
        if (part.id === partId) {
          const received = !part.received;
          // If marking as received, also mark as ordered
          return { ...part, received, ordered: received ? true : part.ordered };
        }
        return part;
      });
      onUpdateTask(updatedTask);
    }
  };

  if (allParts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
        <Package className="h-16 w-16 mb-4 text-gray-300" />
        <h3 className="text-xl font-medium mb-2">No Parts Found</h3>
        <p className="text-sm text-center max-w-md mb-4">
          Add parts to your tasks to see them listed here. Parts can be grouped by vendor for better organization.
        </p>
        <Button 
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          onClick={() => setShowQuickAdd(true)}
        >
          <ListPlus className="h-4 w-4 mr-2" /> Quick Add Simple Parts
        </Button>
        <QuickAddParts 
          open={showQuickAdd}
          onOpenChange={setShowQuickAdd}
          tasks={tasks}
          onUpdateTask={onUpdateTask}
        />
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2">
        <div className="mb-4 flex justify-end">
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={() => setShowQuickAdd(true)}
          >
            <ListPlus className="h-4 w-4 mr-2" /> Quick Add Simple Parts
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Simple Items List */}
          {simpleItems.length > 0 && (
            <Card key="simple-items" className="shadow-sm hover:shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <List className="h-5 w-5 mr-2 text-green-500" />
                    Simple Items
                  </span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {simpleItems.length} {simpleItems.length === 1 ? 'item' : 'items'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {simpleItems.map(({ part, task }) => (
                    <li key={part.id} className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium">{part.name}</span>
                          {part.quantity > 1 && (
                            <span className="ml-2 text-sm text-gray-500">
                              ({part.quantity} {part.unit || 'ea'})
                            </span>
                          )}
                          
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto text-xs text-blue-600 ml-2 flex items-center"
                            onClick={() => onSelectTask(task)}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" /> 
                            {task.title}
                          </Button>
                        </div>
                        
                        <div className="flex flex-row space-x-3 items-center">
                          <div className="flex items-center gap-1">
                            <Checkbox 
                              id={`ordered-${part.id}`}
                              checked={part.ordered}
                              onCheckedChange={() => toggleOrdered(task.id, part.id)}
                            />
                            <span className="text-xs">Got it</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Render card for each vendor group */}
          {Object.values(groupedByVendor).map(({ vendor, parts }) => (
            <Card key={vendor} className="shadow-sm hover:shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-2 text-blue-500" />
                    {vendor}
                  </span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {parts.length} {parts.length === 1 ? 'part' : 'parts'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {parts.map(({ part, task }) => (
                    <li key={part.id} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{part.name}</div>
                          <div className="text-sm text-gray-500">
                            {part.quantity} {part.unit || 'ea'}
                            {part.partNumber && <span className="ml-2">• {part.partNumber}</span>}
                          </div>
                          
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto text-xs text-blue-600 mt-1 flex items-center"
                            onClick={() => onSelectTask(task)}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" /> 
                            {task.title}
                          </Button>
                        </div>
                        
                        <div className="flex flex-col space-y-1 items-end">
                          <div className="flex items-center gap-2">
                            <span className="text-xs">Ordered</span>
                            <Checkbox 
                              id={`ordered-${part.id}`}
                              checked={part.ordered}
                              onCheckedChange={() => toggleOrdered(task.id, part.id)}
                            />
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs">Received</span>
                            <Checkbox 
                              id={`received-${part.id}`}
                              checked={part.received}
                              onCheckedChange={() => toggleReceived(task.id, part.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <QuickAddParts 
        open={showQuickAdd}
        onOpenChange={setShowQuickAdd}
        tasks={tasks}
        onUpdateTask={onUpdateTask}
      />
    </ScrollArea>
  );
};

export default TasksPartsView;
