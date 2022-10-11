import type { FC } from "react"
import type React from "react"

export interface ColorContext {
  color: string[]
  setColor: React.Dispatch<React.SetStateAction<string[]>>
}

export type ColorProviderReturn = FC<{ children: React.ReactNode }>
