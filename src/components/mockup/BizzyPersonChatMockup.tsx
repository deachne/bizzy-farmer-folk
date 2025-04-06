
import React, { useState } from "react";
import {
  ChevronDown,
  Plus,
  MoreHorizontal,
  ArrowUp,
  Paperclip,
  Image,
  X,
  Copy,
  Download,
  BarChart,
  Maximize,
  ChevronUp,
  Settings,
  MessageSquare,
  FileText,
  CheckSquare,
  Home,
  CreditCard,
  Folder,
  Check,
  RefreshCw,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const BizzyPersonChatMockup = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeExtension, setActiveExtension] = useState("farm");
  const [expandedProject, setExpandedProject] = useState<string | null>("crop-planning");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [knowledgeSources, setKnowledgeSources] = useState([
    {
      id: "ks1",
      type: "note",
      title: "Field Observation (Yesterday)",
      active: true
    },
    {
      id: "ks2",
      type: "document",
      title: "Tomato Diseases PDF",
      active: true
    },
    {
      id: "ks3",
      type: "web",
      title: "University Extension Articles",
      active: true,
      source: "extension.org"
    }
  ]);

  const extensionProjects = {
    farm: [
      { id: "crop-planning", name: "Crop Planning", active: true, conversations: 3, conversations_list: ["Early blight treatment options", "Irrigation scheduling", "Crop rotation planning"] },
      { id: "pest-management", name: "Pest Management", active: false, conversations: 5, conversations_list: ["Aphid control methods", "Integrated pest management", "Beneficial insects", "Organic treatments", "Prevention strategies"] },
      { id: "field-health", name: "Field Health Monitoring", active: false, conversations: 2, conversations_list: ["Soil test results for North Field", "Nutrient deficiency signs"] }
    ],
    personal: [
      { id: "home-renovation", name: "Home Renovation", active: false, conversations: 8, conversations_list: ["Kitchen design ideas", "Bathroom contractors", "Flooring options"] },
      { id: "vacation", name: "Vacation Planning", active: false, conversations: 4, conversations_list: ["Hotel bookings", "Flight options", "Local attractions", "Packing list"] }
    ],
    bank: [
      { id: "budgeting", name: "Budgeting", active: false, conversations: 2, conversations_list: ["Monthly expense tracking", "Savings goals"] },
      { id: "investments", name: "Investments", active: false, conversations: 3, conversations_list: ["Portfolio diversification", "Retirement planning", "Tax strategies"] }
    ]
  };

  const handleExtensionChange = (extension: "farm" | "personal" | "bank") => {
    setActiveExtension(extension);
    setDropdownOpen(false);
  };

  const toggleProjectExpansion = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
    }
  };
  
  const toggleKnowledgeSource = (id: string) => {
    setKnowledgeSources(prev => 
      prev.map(source => 
        source.id === id
          ? { ...source, active: !source.active }
          : source
      )
    );
  };
  
  const refreshContext = () => {
    setIsRefreshing(true);
    
    // Simulate refreshing context
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-4 flex flex-col shrink-0">
        <div className="mb-6">
          <div className="flex items-center">
            <span className="text-xl font-bold">BizzyPerson</span>
          </div>
        </div>

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

        <div className="mb-4">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-blue-200 uppercase">Extensions</span>
          </div>
          <div className="space-y-1">
            <div>
              <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50 cursor-pointer">
                <div className="flex items-center">
                  <ChevronDown className="h-4 w-4 mr-2 text-blue-300" />
                  <span>🌾 BizzyFarmer</span>
                </div>
                <button className="text-blue-200 hover:text-white p-1">
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
            <div>
              <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50 cursor-pointer">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-blue-300" />
                  <span>🏦 BizzyBank</span>
                </div>
                <button className="text-blue-200 hover:text-white p-1">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="ml-6 mt-1 space-y-1 border-l border-blue-700 pl-3">
                {/* Add BizzyBank specific items here */}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-blue-200 uppercase">Personal</span>
            <button className="text-blue-200 hover:text-white p-1">
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

      <div className="flex-1 flex flex-col bg-white">
        <div className="border-b border-gray-200 px-6 py-3 flex justify-between items-center shrink-0">
          <div className="flex items-center">
            <div className="relative">
              <button 
                className="flex items-center text-lg font-medium hover:bg-gray-100 p-1 rounded"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>
                  {activeExtension === "farm" && "🌾 BizzyFarmer"}
                  {activeExtension === "personal" && "🏠 Personal"}
                  {activeExtension === "bank" && "🏦 Bank Management"}
                </span>
                <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                  {activeExtension !== "farm" && (
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleExtensionChange("farm")}
                    >
                      🌾 BizzyFarmer
                    </a>
                  )}
                  {activeExtension !== "bank" && (
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleExtensionChange("bank")}
                    >
                      🏦 Bank Management
                    </a>
                  )}
                  {activeExtension !== "personal" && (
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleExtensionChange("personal")}
                    >
                      🏠 Personal
                    </a>
                  )}
                </div>
              )}
            </div>
            <span className="ml-4 text-sm text-gray-500">» Crop Planning</span>
            <span className="ml-4 text-sm text-gray-500">» Early blight treatment options</span>
          </div>
          <div className="flex space-x-2">
            <span className="text-sm text-gray-500">Model: Claude 3.7 Sonnet</span>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-start space-x-3 justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-lg">
              <p className="text-sm">What's the expected crop yield loss from early blight if I treat it promptly?</p>
            </div>
            <div className="flex-shrink-0 bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">U</span>
            </div>
          </div>

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
                  <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-100 rounded flex items-center justify-center text-indigo-600 font-medium">
                    [Interactive Yield Chart Placeholder]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

      <div className="w-80 border-l border-gray-200 bg-gray-50 flex flex-col shrink-0">
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h3 className="font-medium text-lg">Context</h3>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshContext}
              disabled={isRefreshing}
              className="h-8 text-xs"
            >
              <RefreshCw className={cn(
                "h-4 w-4 mr-1",
                isRefreshing && "animate-spin"
              )} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200 bg-white text-sm font-medium text-center text-gray-500">
          <button 
            className={cn(
              "flex-1 py-2.5 px-1 border-b-2",
              activeTab === 'projects' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent hover:text-gray-700 hover:border-gray-300'
            )}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={cn(
              "flex-1 py-2.5 px-1 border-b-2",
              activeTab === 'knowledge' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent hover:text-gray-700 hover:border-gray-300'
            )}
            onClick={() => setActiveTab('knowledge')}
          >
            Knowledge
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center">
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Projects Tab Content */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  {activeExtension === "farm" && <h4 className="text-sm font-semibold text-gray-800 flex items-center">🌾 BizzyFarmer</h4>}
                  {activeExtension === "personal" && <h4 className="text-sm font-semibold text-gray-800 flex items-center">🏠 Personal</h4>}
                  {activeExtension === "bank" && <h4 className="text-sm font-semibold text-gray-800 flex items-center">🏦 BizzyBank</h4>}
                </div>
                
                <div className="space-y-2">
                  {extensionProjects[activeExtension as keyof typeof extensionProjects].map((project) => (
                    <div 
                      key={project.id} 
                      className={`${project.active ? 'bg-blue-50 border-blue-200' : 'bg-white hover:border-blue-400 hover:bg-blue-50/30'} border rounded-md p-3 cursor-pointer`}
                      onClick={() => toggleProjectExpansion(project.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${project.active ? 'text-blue-800' : 'text-gray-700'}`}>{project.name}</span>
                        {project.active && (
                          <span className="text-xs text-green-700 px-2 py-0.5 bg-green-100 rounded-full font-medium">Active</span>
                        )}
                      </div>
                      <div className={`text-xs ${project.active ? 'text-blue-600' : 'text-gray-500'} mt-1`}>{project.conversations} conversations</div>
                      {expandedProject === project.id && (
                        <div className="ml-4 mt-2 space-y-1.5">
                          {project.conversations_list.map((conversation, idx) => (
                            <div 
                              key={idx} 
                              className="p-2 bg-white border rounded-md text-sm hover:bg-blue-50 cursor-pointer"
                            >
                              {conversation}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Knowledge Tab Content */}
          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              {/* Knowledge Sources Section */}
              <Collapsible defaultOpen={true}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-500">KNOWLEDGE SOURCES</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                      <ChevronRight className={cn("h-4 w-4 transition-transform rotate-90")} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="space-y-4">
                  {/* Your Notes */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Your Notes</h4>
                    <div 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">Field Observation (Yesterday)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-6 w-6 text-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Crop Knowledge Base */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Crop Knowledge Base</h4>
                    <div 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">Tomato Diseases PDF</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-6 w-6 text-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Web Sources */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Web Sources</h4>
                    <div 
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">University Extension Articles</span>
                        <span className="text-xs text-gray-500 ml-1">(extension.org)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-6 w-6 text-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Images & Documents Section */}
              <Collapsible defaultOpen={true}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-500">IMAGES & DOCUMENTS</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                      <ChevronRight className={cn("h-4 w-4 transition-transform rotate-90")} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent>
                  <div className="p-4 text-center text-gray-500 text-sm border rounded bg-white">
                    No media shared in this conversation
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>
        
        {/* Token Usage Panel */}
        <div className="border-t border-gray-200 p-4">
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-sm font-semibold text-gray-500">TOKEN USAGE</h3>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Model:</span>
                <span>Claude 3.7 Sonnet</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Est. Cost:</span>
                <span>$0.0250</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Input Tokens:</span>
                <span>3,250</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Output Tokens:</span>
                <span>2,860</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default BizzyPersonChatMockup;
