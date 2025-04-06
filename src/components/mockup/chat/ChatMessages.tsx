
import React from "react";
import ChatMessage, { ChatArtifact } from "./ChatMessage";

const ChatMessages = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="flex items-start space-x-3 justify-end">
        <div className="bg-blue-500 text-white rounded-lg p-3 max-w-lg">
          <p className="text-sm">What's the expected crop yield loss from early blight if I treat it promptly?</p>
        </div>
        <div className="flex-shrink-0 bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">U</span>
        </div>
      </div>

      <ChatMessage 
        isUser={false}
        title="Early Blight Yield Impact"
        content={
          <>
            <p className="text-sm">With prompt treatment of early blight, you can expect to minimize yield losses significantly. Here's a typical breakdown:</p>
            <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
              <li><span className="font-medium">Prompt treatment (at first signs):</span> Typically limits yield loss to 5-15%.</li>
              <li><span className="font-medium">Delayed treatment (disease established):</span> May result in 20-40% yield loss.</li>
              <li><span className="font-medium">No treatment:</span> Can lead to 50-80% yield reduction in severe cases.</li>
            </ul>
            <p className="text-sm mt-2">Factors affecting the impact include weather, variety susceptibility, plant vigor, treatment effectiveness, and thoroughness of affected leaf removal.</p>
          </>
        }
      />

      <ChatMessage 
        isUser={false}
        content="I've also created a yield impact chart artifact for early blight treatment timing based on our knowledge sources."
        artifacts={[
          <ChatArtifact title="Yield Impact Chart" key="yield-chart">
            <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-100 rounded flex items-center justify-center text-indigo-600 font-medium">
              [Interactive Yield Chart Placeholder]
            </div>
          </ChatArtifact>
        ]}
      />
    </div>
  );
};

export default ChatMessages;
