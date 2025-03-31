
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Shield, Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import TokenCounter from "@/components/TokenCounter";

const AIModelsPanel = () => {
  const [activeProvider, setActiveProvider] = useState<string>("openai");
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [openAIConfig, setOpenAIConfig] = useState({
    apiKey: "sk-••••••••••••••••••••••••••••••",
    organizationId: "",
    model: "gpt-4o",
    temperature: 0.7,
    maxTokens: 4000,
    connectionStatus: "connected" // 'connected', 'failed', 'pending'
  });

  const [anthropicConfig, setAnthropicConfig] = useState({
    apiKey: "sk-••••••••••••••••••••••••••••••",
    model: "claude-3-opus-20240229",
    temperature: 0.5,
    maxTokens: 4000,
    connectionStatus: "pending" // 'connected', 'failed', 'pending'
  });

  const [geminiConfig, setGeminiConfig] = useState({
    apiKey: "",
    model: "gemini-pro",
    temperature: 0.8,
    maxTokens: 2048,
    connectionStatus: "failed" // 'connected', 'failed', 'pending'
  });

  const [embeddingProvider, setEmbeddingProvider] = useState<string>("openai");
  const [multimodalSettings, setMultimodalSettings] = useState({
    imageProcessing: {
      enabled: true,
      model: "gpt-4o",
      maxDimensions: { width: 1024, height: 1024 },
      compressionLevel: 80
    },
    audioProcessing: {
      enabled: true,
      transcriptionModel: "whisper-1",
      maxDuration: 300,
      languages: ["en", "es", "fr"]
    }
  });

  const handleTestConnection = (provider: string) => {
    // This would normally call an API to test the connection
    console.log(`Testing connection for ${provider}...`);
    // Update connection status based on API response
  };

  const handleToggleApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  const statusColors = {
    connected: "bg-green-500",
    failed: "bg-red-500",
    pending: "bg-yellow-500"
  };

  const statusIcons = {
    connected: <Check className="h-4 w-4 text-white" />,
    failed: <AlertCircle className="h-4 w-4 text-white" />,
    pending: <Shield className="h-4 w-4 text-white" />
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">AI Model Settings</h3>
        <p className="text-sm text-gray-500 mb-4">Configure AI models, API keys, and behavior settings for LLM integration.</p>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="llm" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="llm" className="flex items-center gap-2">
              <span>LLM Models</span>
              <span className="bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">3</span>
            </TabsTrigger>
            <TabsTrigger value="embedding" className="flex items-center gap-2">
              <span>Embedding Models</span>
              <span className="bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">2</span>
            </TabsTrigger>
            <TabsTrigger value="multimodal" className="flex items-center gap-2">
              <span>Multi-Modal Settings</span>
              <span className="bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">4</span>
            </TabsTrigger>
          </TabsList>

          {/* LLM Models Tab */}
          <TabsContent value="llm" className="space-y-6">
            <div className="mb-4">
              <Label className="mb-2 block">Primary LLM Provider</Label>
              <Select value={activeProvider} onValueChange={setActiveProvider}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                  <SelectItem value="gemini">Google (Gemini)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* OpenAI Configuration */}
            <Collapsible 
              open={activeProvider === "openai"} 
              className="border rounded-md p-4 bg-slate-50"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${statusColors[openAIConfig.connectionStatus as keyof typeof statusColors]}`}>
                    {statusIcons[openAIConfig.connectionStatus as keyof typeof statusIcons]}
                  </div>
                  <h4 className="text-md font-medium ml-2">OpenAI Configuration</h4>
                </div>
                {activeProvider === "openai" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label htmlFor="openai-api-key">API Key</Label>
                    <button 
                      onClick={handleToggleApiKey} 
                      className="text-blue-500 text-xs flex items-center"
                    >
                      {showApiKey ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                      {showApiKey ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="relative">
                    <Input 
                      id="openai-api-key"
                      type={showApiKey ? "text" : "password"} 
                      value={openAIConfig.apiKey} 
                      onChange={(e) => setOpenAIConfig({...openAIConfig, apiKey: e.target.value})} 
                      className="max-w-md"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="openai-org-id" className="mb-1 block">Organization ID (Optional)</Label>
                  <Input 
                    id="openai-org-id"
                    value={openAIConfig.organizationId} 
                    onChange={(e) => setOpenAIConfig({...openAIConfig, organizationId: e.target.value})} 
                    className="max-w-md"
                  />
                </div>

                <div>
                  <Label htmlFor="openai-model" className="mb-1 block">Model</Label>
                  <Select 
                    value={openAIConfig.model} 
                    onValueChange={(value) => setOpenAIConfig({...openAIConfig, model: value})}
                  >
                    <SelectTrigger id="openai-model" className="max-w-md">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="mb-2">
                    <Label className="mb-1 block">Temperature: {openAIConfig.temperature}</Label>
                    <div className="max-w-md">
                      <Slider 
                        value={[openAIConfig.temperature * 100]} 
                        min={0} 
                        max={100} 
                        step={1}
                        onValueChange={(value) => setOpenAIConfig({...openAIConfig, temperature: value[0] / 100})}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>More Deterministic</span>
                        <span>More Creative</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="openai-max-tokens" className="mb-1 block">Max Tokens</Label>
                  <Input 
                    id="openai-max-tokens"
                    type="number" 
                    value={openAIConfig.maxTokens} 
                    onChange={(e) => setOpenAIConfig({...openAIConfig, maxTokens: parseInt(e.target.value) || 0})} 
                    className="max-w-md"
                  />
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button 
                    onClick={() => handleTestConnection("openai")}
                    variant="outline"
                  >
                    Test Connection
                  </Button>
                  <Button>Save Configuration</Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Anthropic Configuration */}
            <Collapsible 
              open={activeProvider === "anthropic"} 
              className="border rounded-md p-4 bg-slate-50"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${statusColors[anthropicConfig.connectionStatus as keyof typeof statusColors]}`}>
                    {statusIcons[anthropicConfig.connectionStatus as keyof typeof statusIcons]}
                  </div>
                  <h4 className="text-md font-medium ml-2">Anthropic (Claude) Configuration</h4>
                </div>
                {activeProvider === "anthropic" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-4">
                {/* Similar structure to OpenAI, with Claude-specific options */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label htmlFor="claude-api-key">API Key</Label>
                    <button 
                      onClick={handleToggleApiKey} 
                      className="text-blue-500 text-xs flex items-center"
                    >
                      {showApiKey ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                      {showApiKey ? "Hide" : "Show"}
                    </button>
                  </div>
                  <Input 
                    id="claude-api-key"
                    type={showApiKey ? "text" : "password"} 
                    value={anthropicConfig.apiKey} 
                    onChange={(e) => setAnthropicConfig({...anthropicConfig, apiKey: e.target.value})} 
                    className="max-w-md"
                  />
                </div>

                <div>
                  <Label htmlFor="claude-model" className="mb-1 block">Model</Label>
                  <Select 
                    value={anthropicConfig.model} 
                    onValueChange={(value) => setAnthropicConfig({...anthropicConfig, model: value})}
                  >
                    <SelectTrigger id="claude-model" className="max-w-md">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claude-3-opus-20240229">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet</SelectItem>
                      <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="mb-2">
                    <Label className="mb-1 block">Temperature: {anthropicConfig.temperature}</Label>
                    <div className="max-w-md">
                      <Slider 
                        value={[anthropicConfig.temperature * 100]} 
                        min={0} 
                        max={100} 
                        step={1}
                        onValueChange={(value) => setAnthropicConfig({...anthropicConfig, temperature: value[0] / 100})}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>More Deterministic</span>
                        <span>More Creative</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="claude-max-tokens" className="mb-1 block">Max Tokens</Label>
                  <Input 
                    id="claude-max-tokens"
                    type="number" 
                    value={anthropicConfig.maxTokens} 
                    onChange={(e) => setAnthropicConfig({...anthropicConfig, maxTokens: parseInt(e.target.value) || 0})} 
                    className="max-w-md"
                  />
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button 
                    onClick={() => handleTestConnection("anthropic")}
                    variant="outline"
                  >
                    Test Connection
                  </Button>
                  <Button>Save Configuration</Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Google (Gemini) Configuration */}
            <Collapsible 
              open={activeProvider === "gemini"} 
              className="border rounded-md p-4 bg-slate-50"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${statusColors[geminiConfig.connectionStatus as keyof typeof statusColors]}`}>
                    {statusIcons[geminiConfig.connectionStatus as keyof typeof statusIcons]}
                  </div>
                  <h4 className="text-md font-medium ml-2">Google (Gemini) Configuration</h4>
                </div>
                {activeProvider === "gemini" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-4">
                {/* Similar structure to OpenAI, with Gemini-specific options */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label htmlFor="gemini-api-key">API Key</Label>
                    <button 
                      onClick={handleToggleApiKey} 
                      className="text-blue-500 text-xs flex items-center"
                    >
                      {showApiKey ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                      {showApiKey ? "Hide" : "Show"}
                    </button>
                  </div>
                  <Input 
                    id="gemini-api-key"
                    type={showApiKey ? "text" : "password"} 
                    value={geminiConfig.apiKey} 
                    onChange={(e) => setGeminiConfig({...geminiConfig, apiKey: e.target.value})} 
                    className="max-w-md"
                  />
                </div>

                <div>
                  <Label htmlFor="gemini-model" className="mb-1 block">Model</Label>
                  <Select 
                    value={geminiConfig.model} 
                    onValueChange={(value) => setGeminiConfig({...geminiConfig, model: value})}
                  >
                    <SelectTrigger id="gemini-model" className="max-w-md">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="gemini-ultra">Gemini Ultra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="mb-2">
                    <Label className="mb-1 block">Temperature: {geminiConfig.temperature}</Label>
                    <div className="max-w-md">
                      <Slider 
                        value={[geminiConfig.temperature * 100]} 
                        min={0} 
                        max={100} 
                        step={1}
                        onValueChange={(value) => setGeminiConfig({...geminiConfig, temperature: value[0] / 100})}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>More Deterministic</span>
                        <span>More Creative</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="gemini-max-tokens" className="mb-1 block">Max Tokens</Label>
                  <Input 
                    id="gemini-max-tokens"
                    type="number" 
                    value={geminiConfig.maxTokens} 
                    onChange={(e) => setGeminiConfig({...geminiConfig, maxTokens: parseInt(e.target.value) || 0})} 
                    className="max-w-md"
                  />
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button 
                    onClick={() => handleTestConnection("gemini")}
                    variant="outline"
                  >
                    Test Connection
                  </Button>
                  <Button>Save Configuration</Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Usage Metrics */}
            <div className="mt-8 border p-4 rounded-md">
              <h4 className="text-md font-medium mb-4">Usage Metrics & Token Management</h4>
              <TokenCounter currentModel="Claude 3.7 Sonnet" />
            </div>
          </TabsContent>

          {/* Embedding Models Tab */}
          <TabsContent value="embedding" className="space-y-6">
            <div className="mb-4">
              <Label className="mb-2 block">Primary Embedding Provider</Label>
              <Select value={embeddingProvider} onValueChange={setEmbeddingProvider}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select embedding provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="azure">Azure OpenAI</SelectItem>
                  <SelectItem value="cohere">Cohere</SelectItem>
                  <SelectItem value="local">LocalAI (Self-hosted)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:border-blue-400 cursor-pointer bg-white">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                    <div className="text-blue-600 font-bold">OAI</div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">OpenAI Embeddings</h3>
                    <p className="text-sm text-gray-500">text-embedding-3-large, 3072 dimensions</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:border-blue-400 cursor-pointer bg-white">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-purple-100 rounded-md flex items-center justify-center">
                    <div className="text-purple-600 font-bold">Co</div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Cohere Embeddings</h3>
                    <p className="text-sm text-gray-500">embed-english-v3.0, 4096 dimensions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-md font-medium mb-4">Embedding Cache Settings</h4>
              <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cache-enabled">Enable Embedding Cache</Label>
                  <Switch id="cache-enabled" checked={true} />
                </div>
                
                <div>
                  <Label htmlFor="cache-duration" className="mb-1 block">Cache Duration (days)</Label>
                  <Input 
                    id="cache-duration"
                    type="number" 
                    value={30} 
                    className="max-w-md"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cache-size" className="mb-1 block">Maximum Cache Size (MB)</Label>
                  <Input 
                    id="cache-size"
                    type="number" 
                    value={1000} 
                    className="max-w-md"
                  />
                </div>
                
                <Button variant="outline" className="mt-2">Clear Embedding Cache</Button>
              </div>
            </div>
          </TabsContent>

          {/* Multi-Modal Settings Tab */}
          <TabsContent value="multimodal" className="space-y-6">
            <div className="border rounded-md p-4 bg-slate-50 space-y-4">
              <h4 className="text-md font-medium">Image Processing</h4>
              <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between">
                  <Label htmlFor="image-processing-enabled">Enable Image Processing</Label>
                  <Switch 
                    id="image-processing-enabled" 
                    checked={multimodalSettings.imageProcessing.enabled}
                    onCheckedChange={(checked) => 
                      setMultimodalSettings({
                        ...multimodalSettings, 
                        imageProcessing: {
                          ...multimodalSettings.imageProcessing,
                          enabled: checked
                        }
                      })
                    }
                  />
                </div>
                
                <div>
                  <Label htmlFor="image-model" className="mb-1 block">Image Processing Model</Label>
                  <Select 
                    value={multimodalSettings.imageProcessing.model}
                    onValueChange={(value) => 
                      setMultimodalSettings({
                        ...multimodalSettings, 
                        imageProcessing: {
                          ...multimodalSettings.imageProcessing,
                          model: value
                        }
                      })
                    }
                  >
                    <SelectTrigger id="image-model" className="max-w-md">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gemini-pro-vision">Gemini Pro Vision</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="max-image-dimensions" className="mb-1 block">Maximum Image Dimensions</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="max-image-width"
                      type="number" 
                      placeholder="Width"
                      value={multimodalSettings.imageProcessing.maxDimensions.width} 
                      onChange={(e) => 
                        setMultimodalSettings({
                          ...multimodalSettings, 
                          imageProcessing: {
                            ...multimodalSettings.imageProcessing,
                            maxDimensions: {
                              ...multimodalSettings.imageProcessing.maxDimensions,
                              width: parseInt(e.target.value) || 0
                            }
                          }
                        })
                      }
                    />
                    <Input 
                      id="max-image-height"
                      type="number" 
                      placeholder="Height"
                      value={multimodalSettings.imageProcessing.maxDimensions.height} 
                      onChange={(e) => 
                        setMultimodalSettings({
                          ...multimodalSettings, 
                          imageProcessing: {
                            ...multimodalSettings.imageProcessing,
                            maxDimensions: {
                              ...multimodalSettings.imageProcessing.maxDimensions,
                              height: parseInt(e.target.value) || 0
                            }
                          }
                        })
                      }
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-1 block">Image Compression Level: {multimodalSettings.imageProcessing.compressionLevel}%</Label>
                  <Slider 
                    value={[multimodalSettings.imageProcessing.compressionLevel]} 
                    min={0} 
                    max={100} 
                    step={1}
                    onValueChange={(value) => 
                      setMultimodalSettings({
                        ...multimodalSettings, 
                        imageProcessing: {
                          ...multimodalSettings.imageProcessing,
                          compressionLevel: value[0]
                        }
                      })
                    }
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Lower Quality (Smaller)</span>
                    <span>Higher Quality (Larger)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 bg-slate-50 space-y-4">
              <h4 className="text-md font-medium">Audio Processing</h4>
              <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between">
                  <Label htmlFor="audio-processing-enabled">Enable Audio Processing</Label>
                  <Switch 
                    id="audio-processing-enabled" 
                    checked={multimodalSettings.audioProcessing.enabled}
                    onCheckedChange={(checked) => 
                      setMultimodalSettings({
                        ...multimodalSettings, 
                        audioProcessing: {
                          ...multimodalSettings.audioProcessing,
                          enabled: checked
                        }
                      })
                    }
                  />
                </div>
                
                <div>
                  <Label htmlFor="audio-model" className="mb-1 block">Transcription Model</Label>
                  <Select 
                    value={multimodalSettings.audioProcessing.transcriptionModel}
                    onValueChange={(value) => 
                      setMultimodalSettings({
                        ...multimodalSettings, 
                        audioProcessing: {
                          ...multimodalSettings.audioProcessing,
                          transcriptionModel: value
                        }
                      })
                    }
                  >
                    <SelectTrigger id="audio-model" className="max-w-md">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whisper-1">Whisper v1</SelectItem>
                      <SelectItem value="whisper-2">Whisper v2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="max-audio-duration" className="mb-1 block">Maximum Audio Duration (seconds)</Label>
                  <Input 
                    id="max-audio-duration"
                    type="number" 
                    value={multimodalSettings.audioProcessing.maxDuration} 
                    onChange={(e) => 
                      setMultimodalSettings({
                        ...multimodalSettings, 
                        audioProcessing: {
                          ...multimodalSettings.audioProcessing,
                          maxDuration: parseInt(e.target.value) || 0
                        }
                      })
                    }
                    className="max-w-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>Save Multi-Modal Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIModelsPanel;
