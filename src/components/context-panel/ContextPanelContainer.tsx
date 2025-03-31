
import { ReactNode } from "react";

interface ContextPanelContainerProps {
  children: ReactNode;
}

const ContextPanelContainer = ({ children }: ContextPanelContainerProps) => {
  return (
    <div className="h-full border-l flex flex-col">
      {children}
    </div>
  );
};

export default ContextPanelContainer;
