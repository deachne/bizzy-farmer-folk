
import React, { useState } from "react";
import { Part, Task } from "@/pages/TasksPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, X, Pencil, Save, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PartsNeededProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
}

const PartsNeeded = ({ task, onUpdateTask }: PartsNeededProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showAddPart, setShowAddPart] = useState(false);
  const [editingPartId, setEditingPartId] = useState<string | null>(null);
  
  const [newPart, setNewPart] = useState<Partial<Part>>({
    name: "",
    quantity: 1,
    partNumber: "",
    vendor: "",
    ordered: false,
    received: false
  });

  const handleAddPart = () => {
    if (!newPart.name) return;
    
    const updatedTask = { ...task };
    const parts = updatedTask.parts || [];
    
    updatedTask.parts = [
      ...parts,
      {
        id: Date.now().toString(),
        name: newPart.name,
        quantity: newPart.quantity || 1,
        unit: newPart.unit,
        partNumber: newPart.partNumber,
        vendor: newPart.vendor,
        ordered: false,
        received: false
      }
    ];
    
    onUpdateTask(updatedTask);
    setNewPart({
      name: "",
      quantity: 1,
      partNumber: "",
      vendor: "",
      ordered: false,
      received: false
    });
    setShowAddPart(false);
  };

  const handleEditPart = (partId: string) => {
    const part = task.parts?.find(p => p.id === partId);
    if (part) {
      setNewPart({...part});
      setEditingPartId(partId);
      setShowAddPart(true);
    }
  };

  const handleUpdatePart = () => {
    if (!editingPartId || !newPart.name) return;
    
    const updatedTask = { ...task };
    const parts = updatedTask.parts || [];
    
    updatedTask.parts = parts.map(part => 
      part.id === editingPartId
        ? { ...part, ...newPart, id: part.id }
        : part
    );
    
    onUpdateTask(updatedTask);
    setNewPart({
      name: "",
      quantity: 1,
      partNumber: "",
      vendor: "",
      ordered: false,
      received: false
    });
    setEditingPartId(null);
    setShowAddPart(false);
  };

  const handleDeletePart = (partId: string) => {
    const updatedTask = { ...task };
    if (updatedTask.parts) {
      updatedTask.parts = updatedTask.parts.filter(part => part.id !== partId);
      onUpdateTask(updatedTask);
    }
  };

  const handleToggleOrderStatus = (partId: string) => {
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

  const handleToggleReceivedStatus = (partId: string) => {
    const updatedTask = { ...task };
    if (updatedTask.parts) {
      updatedTask.parts = updatedTask.parts.map(part => 
        part.id === partId
          ? { ...part, received: !part.received }
          : part
      );
      onUpdateTask(updatedTask);
    }
  };

  const hasParts = task.parts && task.parts.length > 0;
  const partsCount = task.parts?.length || 0;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-md p-3 mt-4"
    >
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <div className="flex items-center cursor-pointer">
            <ShoppingBag className="h-4 w-4 mr-2 text-green-600" />
            <h3 className="text-sm font-medium">
              Parts Needed {hasParts && <span className="text-gray-500">({partsCount})</span>}
            </h3>
          </div>
        </CollapsibleTrigger>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0"
          onClick={() => setShowAddPart(!showAddPart)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <CollapsibleContent className="mt-2 space-y-2">
        {showAddPart && (
          <div className="border rounded-md p-3 bg-gray-50 space-y-2">
            <div className="text-sm font-medium mb-2">
              {editingPartId ? "Edit Part" : "Add Part"}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="partName" className="text-xs">Part Name</Label>
                <Input
                  id="partName"
                  placeholder="Part name"
                  value={newPart.name || ""}
                  onChange={(e) => setNewPart({...newPart, name: e.target.value})}
                  className="h-8 text-sm"
                />
              </div>
              
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="quantity" className="text-xs">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={newPart.quantity || 1}
                    onChange={(e) => setNewPart({...newPart, quantity: parseInt(e.target.value)})}
                    className="h-8 text-sm"
                  />
                </div>
                
                <div className="w-20">
                  <Label htmlFor="unit" className="text-xs">Unit</Label>
                  <Input
                    id="unit"
                    placeholder="ea"
                    value={newPart.unit || ""}
                    onChange={(e) => setNewPart({...newPart, unit: e.target.value})}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="partNumber" className="text-xs">Part Number</Label>
                <Input
                  id="partNumber"
                  placeholder="Part number"
                  value={newPart.partNumber || ""}
                  onChange={(e) => setNewPart({...newPart, partNumber: e.target.value})}
                  className="h-8 text-sm"
                />
              </div>
              
              <div>
                <Label htmlFor="vendor" className="text-xs">Vendor</Label>
                <Input
                  id="vendor"
                  placeholder="Vendor name"
                  value={newPart.vendor || ""}
                  onChange={(e) => setNewPart({...newPart, vendor: e.target.value})}
                  className="h-8 text-sm"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setShowAddPart(false);
                  setEditingPartId(null);
                  setNewPart({
                    name: "",
                    quantity: 1,
                    partNumber: "",
                    vendor: "",
                    ordered: false,
                    received: false
                  });
                }}
              >
                Cancel
              </Button>
              
              <Button 
                size="sm"
                onClick={editingPartId ? handleUpdatePart : handleAddPart}
                disabled={!newPart.name}
              >
                {editingPartId ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        )}
        
        {!hasParts && !showAddPart && (
          <div className="text-sm text-gray-500 italic">
            No parts needed for this task. Click + to add parts.
          </div>
        )}
        
        {hasParts && (
          <div className="space-y-2">
            {task.parts?.map((part) => (
              <div 
                key={part.id} 
                className="flex items-start justify-between border rounded-md p-2 text-sm bg-white"
              >
                <div className="flex-1">
                  <div className="font-medium flex items-center">
                    {part.name}
                    {part.ordered && !part.received && (
                      <Badge variant="outline" className="ml-2 text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                        Ordered
                      </Badge>
                    )}
                    {part.received && (
                      <Badge variant="outline" className="ml-2 text-xs bg-green-50 text-green-700 border-green-200">
                        Received
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-1">
                    <span>{part.quantity} {part.unit || 'ea'}</span>
                    {part.partNumber && <span className="ml-2">• {part.partNumber}</span>}
                    {part.vendor && <span className="ml-2">• {part.vendor}</span>}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col items-center space-y-1">
                    <div className="flex items-center space-x-1">
                      <Checkbox 
                        id={`ordered-${part.id}`}
                        checked={part.ordered}
                        onCheckedChange={() => handleToggleOrderStatus(part.id)}
                      />
                      <Label htmlFor={`ordered-${part.id}`} className="text-xs">Ordered</Label>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Checkbox 
                        id={`received-${part.id}`}
                        checked={part.received}
                        onCheckedChange={() => handleToggleReceivedStatus(part.id)}
                      />
                      <Label htmlFor={`received-${part.id}`} className="text-xs">Received</Label>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleEditPart(part.id)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500 hover:text-red-700"
                      onClick={() => handleDeletePart(part.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PartsNeeded;
