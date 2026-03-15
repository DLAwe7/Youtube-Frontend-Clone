import { forwardRef } from 'react';


export const ToggleButton = forwardRef(function ToggleButton({ level, className, isOpen, toggle, controlsId, ariaLabel, children, stopPropagation, preventDefault }, ref) {
  return (
    <button
      ref={ref}
      className={className}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
        if (preventDefault) e.preventDefault();
        toggle?.(e);
      }}
      aria-controls={controlsId}
      aria-expanded={
        typeof isOpen === "boolean" ? isOpen : undefined
      }
      aria-label={ariaLabel ? ariaLabel : undefined}

      style={level ? { marginLeft: (level + 1) * 20 } : {}}
    >

      {children}

    </button>
  );
});


