import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import { Search, BarChart2, Users, Package, Database, FileText, Clock, Settings, HardDrive, Network, File, AlertTriangle, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExtensionCardProps {
  name: string;
  version: string;
  icon: React.ReactNode;
  isActive: boolean;
  hasDocumentAccess: boolean;
  hasSearchAccess: boolean;
  hasNetworkAccess: boolean;
  userCount: string;
  storageUsed: string;
}

const ExtensionCard: React.FC<ExtensionCardProps> = ({
  name,
  version,
  icon,
  isActive,
  hasDocumentAccess,
  hasSearchAccess,
  hasNetworkAccess,
  userCount,
  storageUsed
}) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="mr-3 text-green-500">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="text-sm text-gray-500">v{version}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isActive ? (
            <>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">Configure</Button>
            </>
          ) : (
            <>
              <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
              <Button variant="outline">Activate</Button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center">
          <File className="h-4 w-4 mr-1 text-blue-600" />
          <span className={hasDocumentAccess ? "text-gray-800" : "text-gray-400"}>
            Document Access
          </span>
        </div>
        
        <div className="flex items-center">
          <Search className="h-4 w-4 mr-1 text-purple-600" />
          <span className={hasSearchAccess ? "text-gray-800" : "text-gray-400"}>
            {hasSearchAccess ? "Search Access" : "No Search Access"}
          </span>
        </div>
        
        <div className="flex items-center">
          <Network className="h-4 w-4 mr-1 text-green-600" />
          <span className={hasNetworkAccess ? "text-gray-800" : "text-gray-400"}>
            {hasNetworkAccess ? "Network Access" : "No Network Access"}
          </span>
        </div>
        
        <div className="flex items-center ml-auto">
          <Users className="h-4 w-4 mr-1 text-blue-500" />
          <span>{userCount}</span>
        </div>
        
        <div className="flex items-center">
          <HardDrive className="h-4 w-4 mr-1 text-blue-500" />
          <span>{storageUsed}</span>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
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
              <div className="text-xl font-semibold ml-2 text-gray-700">Admin Dashboard</div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Input
                  type="search"
                  placeholder="Search admin..."
                  className="pl-10"
                />
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              </div>
              <Button variant="outline" className="flex items-center">
                <BarChart2 className="h-4 w-4 mr-2" />
                System Status
              </Button>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h2 className="text-lg font-semibold text-blue-700">Dashboard UI Updated!</h2>
                <p className="text-blue-600">New design with enhanced visuals and better user experience.</p>
              </div>
              
              <h2 className="text-xl font-bold mb-4">System Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="border shadow-sm hover:shadow transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="h-6 w-6 text-blue-500" />
                      <span className="text-3xl font-bold">24</span>
                    </div>
                    <p className="text-gray-600">Active Users</p>
                    <div className="mt-3 flex items-center text-green-500 text-sm">
                      <span className="inline-block mr-1">4%</span>
                      <span>this month</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-sm hover:shadow transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Package className="h-6 w-6 text-green-500" />
                      <span className="text-3xl font-bold">3</span>
                    </div>
                    <p className="text-gray-600">Active Extensions</p>
                    <div className="mt-3 flex items-center text-gray-500 text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>No change</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-sm hover:shadow transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="h-6 w-6 text-purple-500" />
                      <span className="text-3xl font-bold">142</span>
                    </div>
                    <p className="text-gray-600">Documents</p>
                    <div className="mt-3 flex items-center text-green-500 text-sm">
                      <span className="inline-block mr-1">23%</span>
                      <span>this week</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-sm hover:shadow transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Database className="h-6 w-6 text-gray-500" />
                      <span className="text-3xl font-bold">68%</span>
                    </div>
                    <p className="text-gray-600">Storage Used</p>
                    <div className="mt-3 flex items-center text-green-500 text-sm">
                      <span className="inline-block mr-1">5%</span>
                      <span>this month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Extension Management</h2>
                <div className="flex space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Extension
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Permissions
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update All
                  </Button>
                </div>
              </div>
              
              <div>
                <ExtensionCard
                  name="Farm Management"
                  version="1.2.3"
                  icon={<Package className="h-6 w-6" />}
                  isActive={true}
                  hasDocumentAccess={true}
                  hasSearchAccess={true}
                  hasNetworkAccess={true}
                  userCount="12Users"
                  storageUsed="2.3 GB"
                />
                
                <ExtensionCard
                  name="BizzyBank"
                  version="0.9.1"
                  icon={<Database className="h-6 w-6" />}
                  isActive={true}
                  hasDocumentAccess={true}
                  hasSearchAccess={false}
                  hasNetworkAccess={false}
                  userCount="5Users"
                  storageUsed="1.2 GB"
                />
                
                <ExtensionCard
                  name="Manufacturing"
                  version="1.0.0"
                  icon={<Settings className="h-6 w-6" />}
                  isActive={false}
                  hasDocumentAccess={true}
                  hasSearchAccess={true}
                  hasNetworkAccess={true}
                  userCount="0Users"
                  storageUsed="0 GB"
                />
              </div>
            </div>
            
            <div className="bg-blue-600 text-white rounded-lg p-6 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold mb-2">BizzyPerson UI Updated</h2>
                  <p>Improve your workspace experience with our new dashboard design</p>
                </div>
                <Button variant="outline" className="text-white border-white hover:bg-blue-700">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardPage;
