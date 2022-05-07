import React, { useState, useContext } from 'react';

// Create context
const ColorContext = React.createContext();

// Function allows you to use the context
export function useColor() {
  return useContext(ColorContext);
}

export function ColorProvider({ children }) {
  const [color, setColor] = useState('white');

  const value = {
    color,
    setColor,
  };

  // Takes all value props
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}
