
import { useState } from "react";
import { Logo } from "./sidebar/logo";
import { UnifiedNavigation } from "./sidebar/unified-navigation";
import { BottomButtons } from "./sidebar/bottom-buttons";
import { CollapseButton } from "./sidebar/collapse-button";
import { OrganizationSelector } from "@/components/organization/OrganizationSelector";

interface SidebarNavProps {
  className?: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function SidebarNav({
  className = "",
  isDarkMode,
  onToggleDarkMode
}: SidebarNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`relative h-full flex flex-col ${className}`}>
      <div className={`
        transition-all duration-300 ease-in-out h-full
        ${isCollapsed ? 'w-20' : 'w-64'}
        bg-white/70 backdrop-blur-sm p-4 border-r
      `}>
        <div className="space-y-4 mb-8">
          <Logo isCollapsed={isCollapsed} />
          {!isCollapsed && (
            <OrganizationSelector />
          )}
        </div>
        
        <UnifiedNavigation isCollapsed={isCollapsed} />

        <BottomButtons 
          isCollapsed={isCollapsed}
          isDarkMode={isDarkMode}
          onToggleDarkMode={onToggleDarkMode}
        />
      </div>

      <CollapseButton 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
    </div>
  );
}
