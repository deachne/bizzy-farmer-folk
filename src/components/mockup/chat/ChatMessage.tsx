
import React, { ReactNode } from "react";
import { BarChart, Copy, Download } from "lucide-react";

interface ChatMessageProps {
  isUser: boolean;
  content: string | ReactNode;
  title?: string;
  artifacts?: ReactNode[];
}

const ChatMessage = ({ isUser, content, title, artifacts = [] }: ChatMessageProps) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">
        {isUser ? (
          <span className="text-sm font-medium text-gray-700">U</span>
        ) : (
          <span className="text-sm font-medium text-white">AI</span>
        )}
      </div>
      <div className="space-y-2 max-w-lg">
        <div className={`${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
          {title && <p className="text-sm font-semibold mb-1">{title}</p>}
          {typeof content === 'string' ? (
            <p className="text-sm">{content}</p>
          ) : (
            content
          )}
        </div>
        {artifacts && artifacts.length > 0 && artifacts.map((artifact, index) => (
          <React.Fragment key={index}>{artifact}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Additional component for artifacts
export const ChatArtifact = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="bg-gray-50 px-3 py-2 border-b flex justify-between items-center">
        <span className="text-sm font-medium flex items-center">
          <BarChart className="h-4 w-4 mr-1.5 text-blue-500" />
          {title}
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
        {children}
      </div>
    </div>
  );
};

export default ChatMessage;
