
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

// Simple tokenizer function - this is a very basic approximation
// In a real app, you would use a proper tokenizer like GPT-3-Encoder or TikToken
const countTokens = (text: string): number => {
  // Simple approximation - around 4 chars per token for English text
  return Math.ceil(text.length / 4);
};

// Model pricing constants (per 1K tokens)
const MODEL_PRICING = {
  "Claude 3.5 Sonnet": { input: 3, output: 15 },
  "Claude 3.7 Sonnet": { input: 3.5, output: 15.5 },
  "GPT-4o": { input: 5, output: 15 },
  "GPT-4o-mini": { input: 0.5, output: 1.5 },
};

// Context window sizes (in tokens)
const CONTEXT_SIZES = {
  "Claude 3.5 Sonnet": 200000,
  "Claude 3.7 Sonnet": 200000,
  "GPT-4o": 128000,
  "GPT-4o-mini": 128000,
};

interface TokenCounterProps {
  messages?: { content: string; sender: "user" | "ai" }[];
  currentModel?: string;
}

const TokenCounter = ({ 
  messages = [], 
  currentModel = "Claude 3.7 Sonnet" 
}: TokenCounterProps) => {
  const [totalTokens, setTotalTokens] = useState(0);
  const [inputTokens, setInputTokens] = useState(0);
  const [outputTokens, setOutputTokens] = useState(0);
  const [cost, setCost] = useState(0);
  const [contextWindowPercentage, setContextWindowPercentage] = useState(0);

  // For demo purposes, we'll simulate a conversation with random token counts
  useEffect(() => {
    // In a real application, you would analyze the actual messages
    // For this demo, we'll use simulated values
    const simulatedInputTokens = 3250;
    const simulatedOutputTokens = 2860;
    const total = simulatedInputTokens + simulatedOutputTokens;
    
    setInputTokens(simulatedInputTokens);
    setOutputTokens(simulatedOutputTokens);
    setTotalTokens(total);
    
    // Calculate cost
    const pricing = MODEL_PRICING[currentModel as keyof typeof MODEL_PRICING] || MODEL_PRICING["Claude 3.7 Sonnet"];
    const inputCost = (simulatedInputTokens / 1000) * pricing.input;
    const outputCost = (simulatedOutputTokens / 1000) * pricing.output;
    setCost(inputCost + outputCost);
    
    // Calculate context window usage
    const contextSize = CONTEXT_SIZES[currentModel as keyof typeof CONTEXT_SIZES] || CONTEXT_SIZES["Claude 3.7 Sonnet"];
    setContextWindowPercentage((total / contextSize) * 100);
  }, [messages, currentModel]);

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-medium text-gray-700">Model:</span>
          <span className="ml-2 text-gray-600">{currentModel}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700">Est. Cost:</span>
          <span className="ml-1 text-gray-600">${cost.toFixed(4)}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 ml-1 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Input: ${((inputTokens / 1000) * MODEL_PRICING[currentModel as keyof typeof MODEL_PRICING]?.input || 0).toFixed(4)}</p>
                <p>Output: ${((outputTokens / 1000) * MODEL_PRICING[currentModel as keyof typeof MODEL_PRICING]?.output || 0).toFixed(4)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-600">Context Window</span>
          <span className="text-gray-600">
            {totalTokens.toLocaleString()} / {CONTEXT_SIZES[currentModel as keyof typeof CONTEXT_SIZES]?.toLocaleString() || 0} tokens
          </span>
        </div>
        <Progress value={contextWindowPercentage} className="h-2" />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-gray-50 rounded">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Input Tokens</span>
            <span className="font-medium text-gray-700">{inputTokens.toLocaleString()}</span>
          </div>
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Output Tokens</span>
            <span className="font-medium text-gray-700">{outputTokens.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCounter;
