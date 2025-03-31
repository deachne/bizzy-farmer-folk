
import React, { useState } from "react";
import { Task, Part } from "@/pages/TasksPage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  ExternalLink, 
  ShoppingBag, 
  Store,
  Home,
  ShoppingCart
} from "lucide-react";
import QuickAddParts from "./tasks/QuickAddParts";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";

interface TasksPartsViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  onAddSimplePart: (part: Part) => void;
}

// Helper function to get an icon based on category
const getCategoryIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'shop': return <Store className="h-5 w-5 mr-2 text-purple-500" />;
    case 'grocery': return <ShoppingCart className="h-5 w-5 mr-2 text-green-500" />;
    case 'cabin': return <Home className="h-5 w-5 mr-2 text-orange-500" />;
    default: return <ShoppingBag className="h-5 w-5 mr-2 text-blue-500" />;
  }
};

const TasksPartsView = ({ 
  tasks, 
  onSelectTask, 
  onUpdateTask, 
  onAddSimplePart 
}: TasksPartsViewProps) => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  
  // Collect all vendor parts and category parts
  const vendorParts: { vendor: string; parts: { part: Part; task: Task }[] }[] = [];
  const categoryParts: { category: string; parts: { part: Part; task: Task }[] }[] = [];
  
  // Helper to find or create a group
  const getOrCreateGroup = (groups: any[], key: string, keyProp: string) => {
    let group = groups.find(g => g[keyProp] === key);
    if (!group) {
      group = { [keyProp]: key, parts: [] };
      groups.push(group);
    }
    return group;
  };
  
  tasks.forEach(task => {
    task.parts?.forEach(part => {
      // Categorize simple parts
      if (part.category) {
        const categoryGroup = getOrCreateGroup(categoryParts, part.category, 'category');
        categoryGroup.parts.push({ part, task });
      }
      // Categorize vendor parts
      else if (part.vendor) {
        const vendorGroup = getOrCreateGroup(vendorParts, part.vendor, 'vendor');
        vendorGroup.parts.push({ part, task });
      }
    });
  });

  // Render parts in a card
  const renderPartsCard = (
    title: string, 
    parts: { part: Part; task: Task }[], 
    icon?: React.ReactNode, 
    isSimpleParts: boolean = false
  ) => (
    <Card key={title} className="shadow-sm hover:shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center">
            {icon || <ShoppingBag className="h-5 w-5 mr-2 text-blue-500" />}
            {title}
          </span>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {parts.length} {parts.length === 1 ? 'item' : 'items'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="items" className="border-none">
            <AccordionTrigger className="py-2">
              <span className="text-sm font-medium">Items</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {parts.map(({ part, task }) => (
                  <li key={part.id} className="flex justify-between items-start">
                    <div>
                      <span className="font-medium">{part.name}</span>
                      {part.quantity > 1 && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({part.quantity} {part.unit || 'ea'})
                        </span>
                      )}
                      
                      {!isSimpleParts && (
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto text-xs text-blue-600 ml-2 flex items-center"
                          onClick={() => onSelectTask(task)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" /> 
                          {task.title}
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`ordered-${part.id}`}
                        checked={part.ordered}
                        onCheckedChange={() => {
                          const updatedTask = tasks.find(t => t.id === task.id);
                          if (updatedTask) {
                            const updatedParts = updatedTask.parts?.map(p => 
                              p.id === part.id ? { ...p, ordered: !p.ordered } : p
                            );
                            onUpdateTask({ ...updatedTask, parts: updatedParts });
                          }
                        }}
                      />
                      <span className="text-xs">Got it</span>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );

  return (
    <ScrollArea className="h-full">
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Quick Add Button */}
        <div className="col-span-full flex justify-end mb-4">
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={() => setShowQuickAdd(true)}
          >
            <Package className="h-4 w-4 mr-2" /> Quick Add Simple Part
          </Button>
        </div>

        {/* Simple Parts Card - Always on the right */}
        {categoryParts.length > 0 && (
          <div className="sm:col-start-2 sm:col-end-3 lg:col-start-3 lg:col-end-4">
            {renderPartsCard(
              "Simple Parts", 
              categoryParts.flatMap(group => group.parts), 
              <Package className="h-5 w-5 mr-2 text-indigo-500" />,
              true
            )}
          </div>
        )}

        {/* Vendor Parts Cards */}
        {vendorParts.map(group => 
          renderPartsCard(group.vendor, group.parts)
        )}
      </div>
      
      <QuickAddParts 
        open={showQuickAdd}
        onOpenChange={setShowQuickAdd}
        onAddPart={(newPart) => {
          const updatedTasks = [...tasks];
          const firstTask = updatedTasks[0];
          
          if (firstTask) {
            firstTask.parts = [...(firstTask.parts || []), newPart];
            onUpdateTask(firstTask);
          }
          
          setShowQuickAdd(false);
        }}
      />
    </ScrollArea>
  );
};

export default TasksPartsView;
