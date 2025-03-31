
import React, { useState } from "react";
import { Task, Part } from "@/pages/TasksPage";
import { Button } from "@/components/ui/button";
import { X, ShoppingBag, CheckCircle, ExternalLink, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface ShoppingListProps {
  tasks: Task[];
  onClose: () => void;
  onTaskSelect: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
}

const ShoppingList = ({ tasks, onClose, onTaskSelect, onUpdateTask }: ShoppingListProps) => {
  const [activeTab, setActiveTab] = useState<string>("needed");
  const [filter, setFilter] = useState<string>("all");
  
  // Group parts by vendor - filter out any category/simple parts
  const groupedParts: Record<string, {
    vendor: string;
    parts: { part: Part; task: Task }[];
  }> = {};
  
  tasks.forEach(task => {
    if (task.parts && task.parts.length > 0) {
      task.parts.forEach(part => {
        // Only include parts with a vendor (skip simple/category parts)
        if (part.vendor) {
          const vendor = part.vendor;
          
          if (!groupedParts[vendor]) {
            groupedParts[vendor] = {
              vendor,
              parts: []
            };
          }
          
          groupedParts[vendor].parts.push({ part, task });
        }
      });
    }
  });
  
  // Get lists based on filters
  const getFilteredGroupedParts = () => {
    const result: Record<string, {
      vendor: string;
      parts: { part: Part; task: Task }[];
    }> = {};
    
    Object.keys(groupedParts).forEach(vendor => {
      const vendorGroup = groupedParts[vendor];
      const filteredParts = vendorGroup.parts.filter(({ part }) => {
        if (activeTab === "needed") {
          return !part.received;
        } else if (activeTab === "ordered") {
          return part.ordered && !part.received;
        } else if (activeTab === "received") {
          return part.received;
        }
        return true;
      });
      
      if (filteredParts.length > 0) {
        result[vendor] = {
          vendor,
          parts: filteredParts
        };
      }
    });
    
    if (filter !== "all") {
      const filteredResult: Record<string, {
        vendor: string;
        parts: { part: Part; task: Task }[];
      }> = {};
      
      Object.keys(result).forEach(vendor => {
        if (vendor === filter) {
          filteredResult[vendor] = result[vendor];
        }
      });
      
      return filteredResult;
    }
    
    return result;
  };
  
  const filteredGroupedParts = getFilteredGroupedParts();
  
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
  
  // Get unique vendors for filter
  const uniqueVendors = Object.keys(groupedParts).sort();
  
  // Get tab counts
  const getNeededCount = () => {
    let count = 0;
    Object.values(groupedParts).forEach(group => {
      group.parts.forEach(({ part }) => {
        if (!part.received) {
          count++;
        }
      });
    });
    return count;
  };
  
  const getOrderedCount = () => {
    let count = 0;
    Object.values(groupedParts).forEach(group => {
      group.parts.forEach(({ part }) => {
        if (part.ordered && !part.received) {
          count++;
        }
      });
    });
    return count;
  };
  
  const getReceivedCount = () => {
    let count = 0;
    Object.values(groupedParts).forEach(group => {
      group.parts.forEach(({ part }) => {
        if (part.received) {
          count++;
        }
      });
    });
    return count;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-white sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center">
          <ShoppingBag className="h-5 w-5 text-green-600 mr-2" />
          <h2 className="text-lg font-semibold">Shopping List</h2>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4 border-b">
        <Tabs defaultValue={activeTab} value={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="needed" className="relative">
              Needed
              <Badge className="ml-1 bg-green-100 text-green-800 absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                {getNeededCount()}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="ordered" className="relative">
              Ordered
              <Badge className="ml-1 bg-yellow-100 text-yellow-800 absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                {getOrderedCount()}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="received" className="relative">
              Received
              <Badge className="ml-1 bg-blue-100 text-blue-800 absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                {getReceivedCount()}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {uniqueVendors.length > 1 && (
          <div className="mt-3">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Filter by Vendor:</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Vendors</option>
              {uniqueVendors.map(vendor => (
                <option key={vendor} value={vendor}>{vendor}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <ScrollArea className="flex-1">
        {Object.keys(filteredGroupedParts).length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm">
              {activeTab === "needed" && "All parts have been received."}
              {activeTab === "ordered" && "No parts have been ordered."}
              {activeTab === "received" && "No parts have been marked as received."}
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {Object.values(filteredGroupedParts).map(({ vendor, parts }) => (
              <div key={vendor} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b flex justify-between items-center">
                  <span>{vendor}</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {parts.length} {parts.length === 1 ? 'item' : 'items'}
                  </Badge>
                </div>
                
                <div className="divide-y">
                  {parts.map(({ part, task }) => (
                    <div key={part.id} className="p-3 hover:bg-gray-50">
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
                            className="p-0 h-auto text-xs text-blue-600 mt-1"
                            onClick={() => onTaskSelect(task)}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" /> 
                            {task.title}
                          </Button>
                        </div>
                        
                        <div className="flex space-x-4">
                          <div className="flex items-center gap-1">
                            <Checkbox 
                              id={`ordered-${part.id}`}
                              checked={part.ordered}
                              onCheckedChange={() => toggleOrdered(task.id, part.id)}
                            />
                            <label htmlFor={`ordered-${part.id}`} className="text-xs whitespace-nowrap">
                              Ordered
                            </label>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Checkbox 
                              id={`received-${part.id}`}
                              checked={part.received}
                              onCheckedChange={() => toggleReceived(task.id, part.id)}
                            />
                            <label htmlFor={`received-${part.id}`} className="text-xs whitespace-nowrap">
                              Received
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      
      <div className="p-4 border-t">
        <Button className="w-full" onClick={() => window.print()}>
          <CheckCircle className="h-4 w-4 mr-2" /> Print Shopping List
        </Button>
      </div>
    </div>
  );
};

export default ShoppingList;

