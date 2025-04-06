
import React from "react";

const ConversationsTabContent = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="bg-blue-50 border border-blue-200 rounded p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">Crop Planning</span>
            <span className="text-xs text-green-700 px-2 py-0.5 bg-green-100 rounded-full">Active</span>
          </div>
          <div className="text-xs text-blue-600 mt-1">3 conversations</div>
        </div>
        
        <div className="bg-white border rounded p-3 hover:border-blue-400 hover:bg-blue-50/30">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Pest Management</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">5 conversations</div>
        </div>
        
        <div className="bg-white border rounded p-3 hover:border-blue-400 hover:bg-blue-50/30">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Field Health Monitoring</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">2 conversations</div>
        </div>
      </div>
      
      <h4 className="text-sm font-semibold text-gray-700 mt-6 mb-3">Recent Conversations</h4>
      
      <div className="space-y-2">
        <div className="p-2 border rounded bg-white">
          <div className="text-sm text-gray-700 font-medium">Early blight treatment options</div>
          <div className="text-xs text-gray-400 mt-1">Today, 2:45 PM • Crop Planning</div>
        </div>
        
        <div className="p-2 border rounded bg-white">
          <div className="text-sm text-gray-700 font-medium">Soil test results for North Field</div>
          <div className="text-xs text-gray-400 mt-1">Yesterday, 11:10 AM • Field Health</div>
        </div>
        
        <div className="p-2 border rounded bg-white">
          <div className="text-sm text-gray-700 font-medium">Irrigation scheduling</div>
          <div className="text-xs text-gray-400 mt-1">2 days ago • Crop Planning</div>
        </div>
      </div>
    </div>
  );
};

export default ConversationsTabContent;
