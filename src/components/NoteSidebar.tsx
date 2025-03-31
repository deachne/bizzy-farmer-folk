import { 
  FileText, 
  FileIcon, 
  ClipboardList, 
  MessageSquare, 
  LayoutDashboard, 
  Users, 
  Package, 
  Settings, 
  BarChart,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const NoteSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Define menu sections and items
  const coreItems = [
    { icon: FileText, label: "Notes", path: "/notes", active: currentPath.includes("/notes") },
    { icon: FileIcon, label: "Documents", path: "/documents", active: currentPath.includes("/documents") },
    { icon: ClipboardList, label: "Tasks", path: "/tasks", active: currentPath.includes("/tasks") },
    { icon: MessageSquare, label: "Chat", path: "/chat", active: currentPath.includes("/chat") },
  ];
  
  const adminItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", active: currentPath.includes("/dashboard") },
    { icon: Users, label: "Users", path: "/users", active: currentPath.includes("/users") },
    { icon: Package, label: "Extensions", path: "/extensions", active: currentPath.includes("/extensions") },
    { icon: Settings, label: "System", path: "/system", active: currentPath.includes("/system") },
    { icon: Settings, label: "Configuration", path: "/configuration", active: currentPath.includes("/configuration") },
    { icon: BarChart, label: "Analytics", path: "/analytics", active: currentPath.includes("/analytics") },
  ];

  const renderMenuItem = (item: { icon: any, label: string, path: string, active?: boolean }) => {
    const Icon = item.icon;
    return (
      <Link 
        key={item.label}
        to={item.path}
        className={cn(
          "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
          item.active 
            ? "bg-blue-700 text-white" 
            : "text-white/80 hover:bg-blue-700/50 hover:text-white"
        )}
      >
        <Icon className="h-5 w-5 mr-3" />
        {item.label}
      </Link>
    );
  };

  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col h-screen">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-blue-500 flex items-center">
        <div className="h-8 w-8 bg-white text-blue-600 rounded-md flex items-center justify-center font-bold mr-2">
          BP
        </div>
        <h1 className="text-lg font-semibold">BizzyPerson</h1>
      </div>
      
      {/* New Workspace Button */}
      <div className="p-3">
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-400 text-white border border-blue-400"
        >
          <Plus className="h-4 w-4 mr-2" /> New Workspace
        </Button>
      </div>
      
      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="pt-4">
          <div className="px-4 mb-1 flex items-center justify-between">
            <h2 className="uppercase text-xs font-semibold text-blue-200">Core</h2>
            <button className="text-blue-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>
          <div className="space-y-1 px-2">
            {coreItems.map(renderMenuItem)}
          </div>
        </div>
        
        <div className="pt-4">
          <div className="px-4 mb-1 flex items-center justify-between">
            <h2 className="uppercase text-xs font-semibold text-blue-200">Admin</h2>
            <button className="text-blue-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>
          <div className="space-y-1 px-2">
            {adminItems.map(renderMenuItem)}
          </div>
        </div>
        
        <div className="pt-4">
          <div className="px-4 mb-1 flex items-center justify-between">
            <h2 className="uppercase text-xs font-semibold text-blue-200">Extensions</h2>
            <button className="text-blue-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteSidebar;
