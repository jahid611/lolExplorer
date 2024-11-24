import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

interface TooltipContextType {
  showTooltip: (content: React.ReactNode, event: React.MouseEvent) => void;
  hideTooltip: () => void;
  updateTooltipPosition: (event: React.MouseEvent) => void;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

export const useCustomTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('useCustomTooltip must be used within a CustomTooltipProvider');
  }
  return context;
};

export const CustomTooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tooltip, setTooltip] = useState<{
    content: React.ReactNode;
    position: { x: number; y: number };
  } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMouseOverTooltipRef = useRef(false);

  const updatePosition = (x: number, y: number) => {
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newX = x + 15;
      let newY = y + 15;

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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only hide if mouse is not over tooltip
    if (!isMouseOverTooltipRef.current) {
      timeoutRef.current = setTimeout(() => {
        setTooltip(null);
      }, 100);
    }
  };

  const handleTooltipMouseEnter = () => {
    isMouseOverTooltipRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleTooltipMouseLeave = () => {
    isMouseOverTooltipRef.current = false;
    hideTooltip();
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
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          {tooltip.content}
        </div>
      )}
    </TooltipContext.Provider>
  );
};

interface CustomTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ content, children }) => {
  const { showTooltip, hideTooltip, updateTooltipPosition } = useCustomTooltip();

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

