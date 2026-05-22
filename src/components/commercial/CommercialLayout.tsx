import React from "react";
import { CommercialHeader } from "./CommercialHeader";
import { CommercialNavigation } from "./CommercialNavigation";
import { ProfileSelector } from "@/components/profile/ProfileSelector";

export function CommercialLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with profile selector */}
      <div className="border-b p-4 flex justify-between items-center">
        <div></div> {/* Empty div for spacing */}
        <div className="w-64">
          <ProfileSelector />
        </div>
      </div>
      
      {/* Main content with navigation */}
      <div className="flex-1 flex">
        {/* Navigation sidebar */}
        <div className="w-64 border-r p-4 bg-white/70 backdrop-blur-sm">
          <CommercialNavigation />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 p-6">
          <CommercialHeader 
            title="Commercial Banking Portal" 
            description="Comprehensive overview of your enterprise operations" 
            showBack={true}
          />
          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
