import type React from "react"

export const asyncStateSetter = async <T, A>(
  setAction: React.Dispatch<React.SetStateAction<T>>,
  getFunction: (args: A) => Promise<T>,
  args: A
): Promise<T> => {
  const data = await getFunction(args)
  setAction(data)
  return data
}
