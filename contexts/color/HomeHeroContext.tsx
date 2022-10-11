import React, { useState, useContext } from "react"

import type { ColorProviderReturn } from "./types"
import { ColorContext } from "./types"

// Create context
const ColorContext = React.createContext<ColorContext | null>(null)

// Function allows you to use the context
export const useHomeHeroColor = (): ColorContext => {
  return useContext(ColorContext)
}

export const HomeHeroColorProvider: ColorProviderReturn = ({ children }) => {
  const [color, setColor] = useState<string[]>([`white`, `white`])

  const value = {
    color,
    setColor,
  }

  // Takes all value props
  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
}
