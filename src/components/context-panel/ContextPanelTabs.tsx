
import { cn } from "@/lib/utils";

interface ContextPanelTabsProps {
  activeTab: 'knowledge' | 'conversations' | 'media';
  setActiveTab: (tab: 'knowledge' | 'conversations' | 'media') => void;
}

const ContextPanelTabs = ({ activeTab, setActiveTab }: ContextPanelTabsProps) => {
  return (
    <div className="flex border-b border-gray-200 bg-white text-sm font-medium text-center text-gray-500">
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
      <button 
        className={cn(
          "flex-1 py-2.5 px-1 border-b-2",
          activeTab === 'conversations' 
            ? 'border-blue-600 text-blue-600' 
            : 'border-transparent hover:text-gray-700 hover:border-gray-300'
        )}
        onClick={() => setActiveTab('conversations')}
      >
        Conversations
      </button>
      <button 
        className={cn(
          "flex-1 py-2.5 px-1 border-b-2",
          activeTab === 'media' 
            ? 'border-blue-600 text-blue-600' 
            : 'border-transparent hover:text-gray-700 hover:border-gray-300'
        )}
        onClick={() => setActiveTab('media')}
      >
        Media
      </button>
    </div>
  );
};

export default ContextPanelTabs;
