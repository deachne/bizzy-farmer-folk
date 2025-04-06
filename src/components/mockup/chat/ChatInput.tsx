
import React from "react";
import { ArrowUp, Image, Paperclip } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="border-t border-gray-200 p-4 bg-white shrink-0">
      <div className="flex items-end space-x-3">
        <div className="flex-1 border rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 flex flex-col">
          <textarea 
            rows={1} 
            className="w-full focus:outline-none resize-none text-sm placeholder-gray-500" 
            placeholder="Type your message or ask a question..."
          ></textarea>
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
  );
};

export default ChatInput;
