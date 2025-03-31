
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SystemSettingsPanel = () => {
  const [systemName, setSystemName] = useState("BizzyPerson Production");
  const [language, setLanguage] = useState("en-US");
  const [debugMode, setDebugMode] = useState(false);
  const [dataRetention, setDataRetention] = useState("30");

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">System Settings</h3>
        <p className="text-sm text-gray-500 mb-4">Configure general system settings, paths, and behavior.</p>
      </div>

      {/* System Name */}
      <div className="space-y-2">
        <div className="font-medium">System Name *</div>
        <p className="text-sm text-gray-500">The name of your BizzyPerson installation.</p>
        <Input 
          value={systemName} 
          onChange={(e) => setSystemName(e.target.value)} 
          className="max-w-md"
        />
      </div>

      {/* Default Language */}
      <div className="space-y-2">
        <div className="font-medium">Default Language</div>
        <p className="text-sm text-gray-500">Default language for the application UI.</p>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="max-w-md">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-US">English (US)</SelectItem>
            <SelectItem value="es-ES">Spanish (Spain)</SelectItem>
            <SelectItem value="fr-FR">French (France)</SelectItem>
            <SelectItem value="de-DE">German (Germany)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Debug Mode */}
      <div className="space-y-2">
        <div className="font-medium">Debug Mode</div>
        <p className="text-sm text-gray-500">Enable detailed logging and debugging features.</p>
        <div className="flex items-center space-x-2">
          <Switch 
            id="debug-mode" 
            checked={debugMode} 
            onCheckedChange={setDebugMode} 
          />
          <Label htmlFor="debug-mode" className="font-normal">
            {debugMode ? "Yes" : "No"}
          </Label>
        </div>
      </div>

      {/* Data Retention */}
      <div className="space-y-2">
        <div className="font-medium">Data Retention (days)</div>
        <p className="text-sm text-gray-500">Number of days to retain log and temporary data before automatic cleanup.</p>
        <Input 
          type="number" 
          value={dataRetention} 
          onChange={(e) => setDataRetention(e.target.value)} 
          className="max-w-md"
        />
      </div>

      {/* Action Log */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">Action Log:</h3>
        <div className="bg-gray-50 p-3 rounded-md max-h-32 overflow-y-auto">
          <div className="text-sm text-gray-600 py-1">Navigated to Notes</div>
          <div className="text-sm text-gray-600 py-1">Navigated to Extensions</div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPanel;
