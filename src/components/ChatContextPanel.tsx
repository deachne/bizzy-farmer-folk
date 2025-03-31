
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  RefreshCw, 
  ChevronRight, 
  Check,
  FileText,
  Book,
  Globe,
  MessageSquare,
  Image
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import TokenCounter from "@/components/TokenCounter";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface KnowledgeSource {
  id: string;
  type: "note" | "document" | "web";
  title: string;
  active: boolean;
  source?: string;
}

interface ContextImage {
  id: string;
  url: string;
  name: string;
  addedAt: string;
}

interface ChatContextPanelProps {
  contextImages?: ContextImage[];
}

const ChatContextPanel = ({ contextImages = [] }: ChatContextPanelProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sections, setSections] = useState({
    knowledgeSources: true,
    suggestedQuestions: true,
    images: true,
    tokenCounter: true
  });
  
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([
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
  
  const suggestedQuestions = [
    "How do I prevent tomato blight?",
    "Will it spread to other plants?",
    "Show more resistant varieties"
  ];
  
  const toggleSection = (section: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const refreshContext = () => {
    setIsRefreshing(true);
    
    // Simulate refreshing context
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Context refreshed",
        description: "Knowledge sources have been updated",
        duration: 3000,
      });
    }, 1500);
  };
  
  const toggleKnowledgeSource = (id: string) => {
    setKnowledgeSources(prev => 
      prev.map(source => 
        source.id === id
          ? { ...source, active: !source.active }
          : source
      )
    );
    
    const source = knowledgeSources.find(s => s.id === id);
    if (source) {
      toast({
        title: source.active ? "Source deactivated" : "Source activated",
        description: `${source.title} is now ${source.active ? "excluded from" : "included in"} context`,
        duration: 3000,
      });
    }
  };
  
  const askQuestion = (question: string) => {
    // In a real app, we would send the question to the chat
    console.log(`Asking: ${question}`);
    toast({
      description: `Question added: "${question}"`,
      duration: 3000,
    });
  };
  
  return (
    <div className="h-full border-l flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Context</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={refreshContext}
          disabled={isRefreshing}
        >
          <RefreshCw className={cn(
            "h-4 w-4 mr-1",
            isRefreshing && "animate-spin"
          )} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
      
      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        {/* Knowledge Sources */}
        <div>
          <Collapsible
            open={sections.knowledgeSources}
            onOpenChange={() => toggleSection("knowledgeSources")}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-500">KNOWLEDGE SOURCES</h3>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    sections.knowledgeSources && "rotate-90"
                  )} />
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="space-y-4">
              {/* Notes */}
              <div>
                <h4 className="text-sm font-medium mb-2">Your Notes</h4>
                {knowledgeSources
                  .filter(source => source.type === "note")
                  .map(source => (
                    <div 
                      key={source.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">{source.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "p-0 h-6 w-6",
                          source.active ? "text-green-600" : "text-gray-400"
                        )}
                        onClick={() => toggleKnowledgeSource(source.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
              
              {/* Knowledge Base */}
              <div>
                <h4 className="text-sm font-medium mb-2">Crop Knowledge Base</h4>
                {knowledgeSources
                  .filter(source => source.type === "document")
                  .map(source => (
                    <div 
                      key={source.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <Book className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">{source.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "p-0 h-6 w-6",
                          source.active ? "text-green-600" : "text-gray-400"
                        )}
                        onClick={() => toggleKnowledgeSource(source.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
              
              {/* Web Sources */}
              <div>
                <h4 className="text-sm font-medium mb-2">Web Sources</h4>
                {knowledgeSources
                  .filter(source => source.type === "web")
                  .map(source => (
                    <div 
                      key={source.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">{source.title}</span>
                        {source.source && (
                          <span className="text-xs text-gray-500 ml-1">({source.source})</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-6 w-6 text-gray-400 hover:text-gray-700"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "p-0 h-6 w-6",
                            source.active ? "text-green-600" : "text-gray-400"
                          )}
                          onClick={() => toggleKnowledgeSource(source.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Images Section */}
        <div>
          <Collapsible
            open={sections.images}
            onOpenChange={() => toggleSection("images")}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-500">CONVERSATION IMAGES</h3>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    sections.images && "rotate-90"
                  )} />
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="space-y-2">
              {contextImages.length === 0 ? (
                <div className="text-sm text-gray-500 italic">No images shared in this conversation</div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {contextImages.map(img => (
                    <Dialog key={img.id}>
                      <DialogTrigger asChild>
                        <div className="group relative cursor-pointer">
                          <img 
                            src={img.url} 
                            alt={img.name}
                            className="h-16 w-16 object-cover rounded border border-gray-200"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                            <Image className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl p-1 bg-transparent border-0">
                        <img 
                          src={img.url} 
                          alt={img.name}
                          className="max-h-[80vh] max-w-full rounded"
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Suggested Questions */}
        <div>
          <Collapsible
            open={sections.suggestedQuestions}
            onOpenChange={() => toggleSection("suggestedQuestions")}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-500">SUGGESTED QUESTIONS</h3>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    sections.suggestedQuestions && "rotate-90"
                  )} />
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-sm font-normal"
                  onClick={() => askQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      
      {/* Token Counter Panel */}
      <div className="mt-auto border-t">
        <Collapsible
          open={sections.tokenCounter}
          onOpenChange={() => toggleSection("tokenCounter")}
        >
          <div className="flex items-center justify-between p-3 hover:bg-gray-50">
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
              <h3 className="text-sm font-medium">TOKEN USAGE</h3>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  sections.tokenCounter && "rotate-90"
                )} />
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="px-3 pb-3">
              <TokenCounter />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ChatContextPanel;
