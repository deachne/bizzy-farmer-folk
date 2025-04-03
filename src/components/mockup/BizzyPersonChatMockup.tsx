
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Menu,
  Settings,
  MessageSquare,
  FileText,
  CheckSquare,
  Home,
  CreditCard,
  Folder,
  MoreHorizontal,
  Paperclip,
  Image,
  ArrowUp,
  X,
  Copy,
  Download,
  BarChart,
  Maximize
} from "lucide-react";
import OrganizedContextPanel from "../context-panel/OrganizedContextPanel";

const BizzyPersonChatMockup = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Sample data for the context panel
  const mockContextItems = [
    { id: "1", name: "Your Notes", type: "document", url: "#", addedAt: "2:45 PM" },
    { id: "2", name: "Field Observation (Yesterday)", type: "document", url: "#", addedAt: "11:30 AM" },
    { id: "3", name: "Crop Knowledge Base", type: "document", url: "#", addedAt: "Yesterday" },
    { id: "4", name: "Tomato Diseases PDF", type: "document", url: "#", addedAt: "2 days ago" },
    { id: "5", name: "Field photo 1", type: "image", url: "https://images.unsplash.com/photo-1601410459457-fde3ae84c658?q=80&w=400", addedAt: "Today" },
    { id: "6", name: "Disease sample", type: "image", url: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=400", addedAt: "Yesterday" },
  ];
  
  const mockConversations = [
    { name: "Crop Planning", count: 3, active: true },
    { name: "Pest Management", count: 5 },
    { name: "Field Health Monitoring", count: 2 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Main Navigation */}
      <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-4 flex flex-col shrink-0">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center">
            <span className="text-xl font-bold">BizzyPerson</span>
          </div>
        </div>

        {/* Core Features Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-blue-200 uppercase">Core Features</span>
          </div>
          <div className="space-y-1">
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50">
              <FileText className="h-4 w-4 mr-3 text-blue-300" />Notes
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50">
              <FileText className="h-4 w-4 mr-3 text-blue-300" />Documents
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50">
              <CheckSquare className="h-4 w-4 mr-3 text-blue-300" />Tasks
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium bg-blue-700 text-white rounded-md">
              <MessageSquare className="h-4 w-4 mr-3 text-white" />Chat
            </a>
          </div>
        </div>

        {/* Extensions Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-blue-200 uppercase">Extensions</span>
          </div>
          <div className="space-y-1">
            {/* BizzyFarmer Extension */}
            <div>
              <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50 cursor-pointer">
                <div className="flex items-center">
                  <ChevronDown className="h-4 w-4 mr-2 text-blue-300" />
                  <span>🌾 BizzyFarmer</span>
                </div>
                <button className="text-blue-200 hover:text-white p-1 rounded-full hover:bg-blue-600/50">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="ml-6 mt-1 space-y-1 border-l border-blue-700 pl-3">
                <a href="#" className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40">
                  <Folder className="h-4 w-4 mr-2 text-blue-300" />
                  <span>2024 Season</span>
                </a>
                <a href="#" className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40">
                  <Folder className="h-4 w-4 mr-2 text-blue-300" />
                  <span>2023 Season</span>
                </a>
              </div>
            </div>
            {/* BizzyBank Extension */}
            <div>
              <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50 cursor-pointer">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-blue-300" />
                  <span>🏦 BizzyBank</span>
                </div>
                <button className="text-blue-200 hover:text-white p-1 rounded-full hover:bg-blue-600/50">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {/* Add BizzyBank specific items here */}
            </div>
          </div>
        </div>

        {/* Personal Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-blue-200 uppercase">Personal</span>
            <button className="text-blue-200 hover:text-white p-1 rounded-full hover:bg-blue-600/50">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1">
            <a href="#" className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40">
              <Home className="h-4 w-4 mr-2 text-blue-300" />
              <span>Home Renovation</span>
            </a>
            <a href="#" className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40">
              <FileText className="h-4 w-4 mr-2 text-blue-300" />
              <span>Work Projects</span>
            </a>
          </div>
        </div>

        {/* Admin Section (Example) */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-blue-200 uppercase">Admin</span>
          </div>
          <div className="space-y-1">
            <a href="#" className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40">
              <Settings className="h-4 w-4 mr-2 text-blue-300" />
              <span>Manage Extensions</span>
            </a>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-blue-700/50">
          <button className="flex items-center text-sm text-blue-200 hover:text-white w-full">
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-3 flex justify-between items-center shrink-0">
          <div className="flex items-center">
            {/* Extension Switcher Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center text-lg font-medium hover:bg-gray-100 p-1 rounded"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>🌾 Farm Management</span>
                <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">🌾 Farm Management</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">🏦 Bank Management</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">🏠 Personal</a>
                </div>
              )}
            </div>
            {/* Active Project Indicator (Example) */}
            <span className="ml-4 text-sm text-gray-500">» Crop Planning</span>
          </div>
          <div className="flex space-x-2">
            {/* Header Actions */}
            <span className="text-sm text-gray-500">Model: Claude 3.7 Sonnet</span>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Message */}
          <div className="flex items-start space-x-3 justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-lg">
              <p className="text-sm">What's the expected crop yield loss from early blight if I treat it promptly?</p>
            </div>
            <div className="flex-shrink-0 bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">U</span>
            </div>
          </div>

          {/* AI Message */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-sm font-medium text-white">AI</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-lg">
              <p className="text-sm font-semibold mb-1">Early Blight Yield Impact</p>
              <p className="text-sm">With prompt treatment of early blight, you can expect to minimize yield losses significantly. Here's a typical breakdown:</p>
              <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
                <li><span className="font-medium">Prompt treatment (at first signs):</span> Typically limits yield loss to 5-15%.</li>
                <li><span className="font-medium">Delayed treatment (disease established):</span> May result in 20-40% yield loss.</li>
                <li><span className="font-medium">No treatment:</span> Can lead to 50-80% yield reduction in severe cases.</li>
              </ul>
              <p className="text-sm mt-2">Factors affecting the impact include weather, variety susceptibility, plant vigor, treatment effectiveness, and thoroughness of affected leaf removal.</p>
            </div>
          </div>

          {/* AI Message with Artifact */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-sm font-medium text-white">AI</span>
            </div>
            <div className="space-y-2 max-w-lg">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm">I've also created a yield impact chart artifact for early blight treatment timing based on our knowledge sources.</p>
              </div>
              <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
                <div className="bg-gray-50 px-3 py-2 border-b flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center">
                    <BarChart className="h-4 w-4 mr-1.5 text-blue-500" />
                    Yield Impact Chart
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {/* Chart placeholder */}
                  <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-100 rounded flex items-center justify-center text-indigo-600 font-medium">
                    [Interactive Yield Chart Placeholder]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200 p-4 bg-white shrink-0">
          <div className="flex items-end space-x-3">
            <div className="flex-1 border rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 flex flex-col">
              <textarea rows={1} className="w-full focus:outline-none resize-none text-sm placeholder-gray-500" placeholder="Type your message or ask a question..."></textarea>
              <div className="flex justify-between items-center pt-2 mt-1 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
                    <Image className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-xs text-gray-400">0/4000</div>
              </div>
            </div>
            <button className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Context Panel */}
      <div className="w-80 border-l border-gray-200 bg-gray-50 flex flex-col shrink-0">
        <OrganizedContextPanel 
          contextItems={mockContextItems}
          conversations={mockConversations}
          onAddSource={() => console.log('Adding source')}
          onUploadMedia={() => console.log('Uploading media')}
        />
      </div>
    </div>
  );
};

export default BizzyPersonChatMockup;
