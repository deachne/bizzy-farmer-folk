
import React from "react";
import { Users, Package, FileText, Database, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SystemOverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="border shadow-sm hover:shadow transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-6 w-6 text-blue-500" />
            <span className="text-3xl font-bold">24</span>
          </div>
          <p className="text-gray-600">Active Users</p>
          <div className="mt-3 flex items-center text-green-500 text-sm">
            <span className="inline-block mr-1">4%</span>
            <span>this month</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border shadow-sm hover:shadow transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="h-6 w-6 text-green-500" />
            <span className="text-3xl font-bold">3</span>
          </div>
          <p className="text-gray-600">Active Extensions</p>
          <div className="mt-3 flex items-center text-gray-500 text-sm">
            <Clock className="h-3 w-3 mr-1" />
            <span>No change</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border shadow-sm hover:shadow transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <FileText className="h-6 w-6 text-purple-500" />
            <span className="text-3xl font-bold">142</span>
          </div>
          <p className="text-gray-600">Documents</p>
          <div className="mt-3 flex items-center text-green-500 text-sm">
            <span className="inline-block mr-1">23%</span>
            <span>this week</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border shadow-sm hover:shadow transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Database className="h-6 w-6 text-gray-500" />
            <span className="text-3xl font-bold">68%</span>
          </div>
          <p className="text-gray-600">Storage Used</p>
          <div className="mt-3 flex items-center text-green-500 text-sm">
            <span className="inline-block mr-1">5%</span>
            <span>this month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOverviewCards;
