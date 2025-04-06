
import { 
  FileText, 
  FileIcon, 
  CheckSquare, 
  MessageSquare, 
  Package, 
  Settings,
  ChevronDown,
  Plus,
  LayoutDashboard,
  Users,
  Activity,
  BarChart2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const NoteSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Extension states
  const [expandedExtensions, setExpandedExtensions] = useState({
    farmer: true,
    bank: false
  });
  
  // Toggle extension expansion
  const toggleExtension = (extension: 'farmer' | 'bank') => {
    setExpandedExtensions(prev => ({
      ...prev,
      [extension]: !prev[extension]
    }));
  };
  
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col h-screen overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-5">
        <h1 className="text-xl font-bold">BizzyPerson</h1>
      </div>
      
      {/* Core Features */}
      <div className="mb-4">
        <div className="flex items-center justify-between px-5 py-1">
          <span className="text-xs font-semibold text-blue-200 uppercase">Core Features</span>
        </div>
        <div className="space-y-1 mt-1">
          <Link 
            to="/notes"
            className={cn(
              "flex items-center px-5 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath.includes("/notes") 
                ? "text-blue-100" 
                : "text-blue-100 hover:bg-blue-700/50"
            )}
          >
            <FileText className="h-4 w-4 mr-3 text-blue-300" />
            Notes
          </Link>
          
          <Link 
            to="/documents"
            className={cn(
              "flex items-center px-5 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath.includes("/documents") 
                ? "text-blue-100" 
                : "text-blue-100 hover:bg-blue-700/50"
            )}
          >
            <FileIcon className="h-4 w-4 mr-3 text-blue-300" />
            Documents
          </Link>
          
          <Link 
            to="/tasks"
            className={cn(
              "flex items-center px-5 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath.includes("/tasks") 
                ? "text-blue-100" 
                : "text-blue-100 hover:bg-blue-700/50"
            )}
          >
            <CheckSquare className="h-4 w-4 mr-3 text-blue-300" />
            Tasks
          </Link>
          
          <Link 
            to="/chat"
            className={cn(
              "flex items-center px-5 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath.includes("/chat") || currentPath.includes("mockup")
                ? "bg-blue-700 text-white" 
                : "text-blue-100 hover:bg-blue-700/50"
            )}
          >
            <MessageSquare className="h-4 w-4 mr-3 text-white" />
            Chat
          </Link>
        </div>
      </div>
      
      {/* Personal Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between px-5 py-1">
          <span className="text-xs font-semibold text-blue-200 uppercase">Personal</span>
          <button className="text-blue-200 hover:text-white p-1">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-1 mt-1">
          <Link 
            to="#"
            className="flex items-center px-5 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40"
          >
            <FileText className="h-4 w-4 mr-2 text-blue-300" />
            <span>Home Renovation</span>
          </Link>
          
          <Link 
            to="#"
            className="flex items-center px-5 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40"
          >
            <FileText className="h-4 w-4 mr-2 text-blue-300" />
            <span>Work Projects</span>
          </Link>
        </div>
      </div>
      
      {/* Extensions */}
      <div className="mb-4">
        <div className="flex items-center justify-between px-5 py-1">
          <span className="text-xs font-semibold text-blue-200 uppercase">Extensions</span>
        </div>
        
        {/* BizzyFarmer */}
        <div className="mt-1">
          <button 
            className="flex items-center justify-between w-full px-5 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50"
            onClick={() => toggleExtension('farmer')}
          >
            <div className="flex items-center">
              <ChevronDown className={cn("h-4 w-4 mr-2 text-blue-300 transition-transform", 
                expandedExtensions.farmer ? "" : "-rotate-90")} 
              />
              <span>🌾 BizzyFarmer</span>
            </div>
            <Plus className="w-4 h-4 text-blue-200 hover:text-white" />
          </button>
          
          {expandedExtensions.farmer && (
            <div className="ml-6 mt-1 space-y-1 border-l border-blue-700 pl-3">
              <Link 
                to="#"
                className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40"
              >
                <FileText className="h-4 w-4 mr-2 text-blue-300" />
                <span>2024 Season</span>
              </Link>
              <Link 
                to="#"
                className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40"
              >
                <FileText className="h-4 w-4 mr-2 text-blue-300" />
                <span>2023 Season</span>
              </Link>
            </div>
          )}
        </div>
        
        {/* BizzyBank */}
        <div className="mt-1">
          <button 
            className="flex items-center justify-between w-full px-5 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50"
            onClick={() => toggleExtension('bank')}
          >
            <div className="flex items-center">
              <ChevronDown className={cn("h-4 w-4 mr-2 text-blue-300 transition-transform", 
                expandedExtensions.bank ? "" : "-rotate-90")} 
              />
              <span>🏦 BizzyBank</span>
            </div>
            <Plus className="w-4 h-4 text-blue-200 hover:text-white" />
          </button>
          
          {expandedExtensions.bank && (
            <div className="ml-6 mt-1 space-y-1 border-l border-blue-700 pl-3">
              {/* Bank items would go here */}
            </div>
          )}
        </div>
      </div>
      
      {/* Admin */}
      <div className="mb-4">
        <div className="flex items-center justify-between px-5 py-1">
          <span className="text-xs font-semibold text-blue-200 uppercase">Admin</span>
        </div>
        <div className="space-y-1 mt-1">
          <Link 
            to="/dashboard"
            className={cn(
              "flex items-center px-5 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath.includes("/dashboard") 
                ? "bg-blue-700 text-white" 
                : "text-blue-100 hover:bg-blue-700/50"
            )}
          >
            <LayoutDashboard className="h-4 w-4 mr-3 text-blue-300" />
            Dashboard
          </Link>
          
          <Link 
            to="/users"
            className={cn(
              "flex items-center px-5 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath.includes("/users") 
                ? "bg-blue-700 text-white" 
                : "text-blue-100 hover:bg-blue-700/50"
            )}
          >
            <Users className="h-4 w-4 mr-3 text-blue-300" />
            Users
          </Link>
          
          <Link 
            to="/extensions"
            className={cn(
              "flex items-center px-5 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath.includes("/extensions") 
                ? "bg-blue-700 text-white" 
                : "text-blue-100 hover:bg-blue-700/50"
            )}
          >
            <Package className="h-4 w-4 mr-3 text-blue-300" />
            Extensions
          </Link>
          
          <Link 
            to="/system"
            className={cn(
              "flex items-center px-5 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath.includes("/system") 
                ? "bg-blue-700 text-white" 
                : "text-blue-100 hover:bg-blue-700/50"
            )}
          >
            <Activity className="h-4 w-4 mr-3 text-blue-300" />
            System
          </Link>
          
          <Link 
            to="/configuration"
            className={cn(
              "flex items-center px-5 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath.includes("/configuration") 
                ? "bg-blue-700 text-white" 
                : "text-blue-100 hover:bg-blue-700/50"
            )}
          >
            <Settings className="h-4 w-4 mr-3 text-blue-300" />
            Configuration
          </Link>
          
          <Link 
            to="/analytics"
            className={cn(
              "flex items-center px-5 py-2 text-sm font-medium rounded-md transition-colors",
              currentPath.includes("/analytics") 
                ? "bg-blue-700 text-white" 
                : "text-blue-100 hover:bg-blue-700/50"
            )}
          >
            <BarChart2 className="h-4 w-4 mr-3 text-blue-300" />
            Analytics
          </Link>
        </div>
      </div>
      
      {/* Settings at bottom */}
      <div className="mt-auto p-4 border-t border-blue-700/50">
        <Link 
          to="/configuration"
          className="flex items-center text-sm text-blue-200 hover:text-white"
        >
          <Settings className="h-5 w-5 mr-2" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default NoteSidebar;
