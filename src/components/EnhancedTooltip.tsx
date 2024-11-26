import React, { createContext, useState, useContext, useRef } from 'react';

interface TooltipContextType {
  showTooltip: (content: React.ReactNode, event: React.MouseEvent) => void;
  hideTooltip: () => void;
  updateTooltipPosition: (event: React.MouseEvent) => void;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
};

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tooltip, setTooltip] = useState<{
    content: React.ReactNode;
    position: { x: number; y: number };
  } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = (x: number, y: number) => {
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Add offset to prevent tooltip from appearing directly under cursor
      let newX = x + 15;
      let newY = y + 15;

      // Adjust if tooltip would go off-screen
      if (newX + tooltipRect.width > viewportWidth) {
        newX = x - tooltipRect.width - 15;
      }
      if (newY + tooltipRect.height > viewportHeight) {
        newY = y - tooltipRect.height - 15;
      }

      setTooltip(prev => prev ? { ...prev, position: { x: newX, y: newY } } : null);
    }
  };

  const showTooltip = (content: React.ReactNode, event: React.MouseEvent) => {
    setTooltip({
      content,
      position: { x: event.clientX, y: event.clientY }
    });
  };

  const updateTooltipPosition = (event: React.MouseEvent) => {
    if (tooltip) {
      updatePosition(event.clientX, event.clientY);
    }
  };

  const hideTooltip = () => {
    setTooltip(null);
  };

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip, updateTooltipPosition }}>
      {children}
      {tooltip && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] bg-[#010A13]/95 border border-[#C89B3C] rounded-lg shadow-lg"
          style={{
            top: `${tooltip.position.y}px`,
            left: `${tooltip.position.x}px`,
            pointerEvents: 'none',
          }}
        >
          {tooltip.content}
        </div>
      )}
    </TooltipContext.Provider>
  );
};

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const { showTooltip, hideTooltip, updateTooltipPosition } = useTooltip();

  return (
    <div
      onMouseEnter={(e) => showTooltip(content, e)}
      onMouseMove={updateTooltipPosition}
      onMouseLeave={hideTooltip}
    >
      {children}
    </div>
  );
};

