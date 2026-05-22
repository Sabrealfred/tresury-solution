import React from "react";
import { CommercialNavigation } from "./CommercialNavigation";
import { ProfileSelector } from "@/components/profile/ProfileSelector";
import { Building2 } from "lucide-react";

export function CommercialLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-950 dark:text-gray-200">
      {/* Header with profile selector */}
      <div className="p-4 flex justify-between items-center dark:bg-gray-900 dark:text-gray-200">
        <div className="flex items-center">
          <Building2 className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">Datacloud AI</span>
        </div>
        <div className="w-64">
          <ProfileSelector />
        </div>
      </div>
      
      {/* Main content with navigation */}
      <div className="flex-1 flex">
        {/* Navigation sidebar */}
        <div className="w-64 border-r p-4 dark:bg-gray-700">
          <CommercialNavigation />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 p-6 dark:bg-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
}
