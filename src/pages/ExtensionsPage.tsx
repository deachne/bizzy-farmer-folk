
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import ExtensionHeader from "@/components/extensions/ExtensionHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Filter, Package, Database, Settings, ShoppingCart, Search } from "lucide-react";
import ExtensionItem from "@/components/extensions/ExtensionItem";

const ExtensionsPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col">
          <ExtensionHeader />
          
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">Extension Management</h2>
                  <p className="text-gray-600">Manage your extensions, control permissions, and configure settings for all installed extensions.</p>
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Extension
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-lg">
                  <Input 
                    type="search" 
                    placeholder="Search extensions..." 
                    className="pl-10"
                  />
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">All</Button>
                  <Button variant="outline">Active</Button>
                  <Button variant="outline">Inactive</Button>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200">
                <ExtensionItem 
                  name="BizzyFarmer"
                  version="1.2.0"
                  icon={<Package className="h-6 w-6 text-green-500" />}
                  description="Agricultural management extension with field mapping, crop planning, and yield tracking"
                  hasDocumentAccess={false}
                  hasSearchAccess={false}
                  hasNetworkAccess={false}
                />
                
                <ExtensionItem 
                  name="Inventory Manager"
                  version="0.9.3"
                  icon={<Database className="h-6 w-6 text-blue-500" />}
                  description="Track inventory, manage suppliers, and automate ordering processes"
                  hasDocumentAccess={false}
                  hasSearchAccess={false}
                  hasNetworkAccess={false}
                />
                
                <ExtensionItem 
                  name="Manufacturing Suite"
                  version="0.1.1"
                  icon={<Settings className="h-6 w-6 text-gray-500" />}
                  description="Production scheduling, quality control, and equipment maintenance tools"
                  hasDocumentAccess={false}
                  hasSearchAccess={false}
                  hasNetworkAccess={false}
                />
                
                <ExtensionItem 
                  name="Sales Pipeline"
                  version="2.1.3"
                  icon={<ShoppingCart className="h-6 w-6 text-purple-500" />}
                  description="Customer relationship management and sales forecasting"
                  hasDocumentAccess={false}
                  hasSearchAccess={false}
                  hasNetworkAccess={false}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ExtensionsPage;
