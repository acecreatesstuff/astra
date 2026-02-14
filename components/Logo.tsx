import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
        {/* Precise geometric path matching the provided Dribbble monogram 'A' */}
        <path d="
          M 22,76 
          L 51,26 
          H 73 
          V 48 
          H 91 
          V 76 
          H 71 
          V 64 
          H 53 
          L 45,76 
          H 22 Z
        " />
      </svg>
    </div>
  );
};

export default Logo;