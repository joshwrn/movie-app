import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react"

import type { UrlArgs } from "@lib/tmdb"

export type AsyncStateHook<INITIAL, ARGS = UrlArgs, RETURN = INITIAL> = (
  props: Partial<UseAsyncState<INITIAL, ARGS, RETURN>>
) => { [key: string]: RETURN }

export type UseAsyncState<INITIAL, ARGS, RETURN = INITIAL> = {
  get: (args: ARGS) => Promise<INITIAL>
  args?: ARGS
  modifier?: (data: INITIAL) => RETURN
  asyncModifier?: (data: INITIAL) => Promise<RETURN>
  initial?: RETURN
}

export const useAsyncState = <INITIAL, ARGS, RETURN>({
  get,
  args,
  modifier,
  asyncModifier,
  initial,
}: UseAsyncState<INITIAL, ARGS, RETURN>): { state: RETURN } => {
  const [state, setState] = useState<RETURN>(initial)
  useEffect(() => {
    console.log(args)
    asyncStateSetter({
      set: setState,
      get,
      asyncModifier,
      modifier,
      args,
    })
  }, [])
  return { state }
}

export const asyncStateSetter = async <INITIAL, ARGS, RETURN>({
  set,
  get,
  args,
  modifier,
  asyncModifier,
}: UseAsyncState<INITIAL, ARGS, RETURN> & {
  set: Dispatch<SetStateAction<INITIAL | RETURN>>
}): Promise<INITIAL | RETURN> => {
  const data = await get(args)
  const useModifier = asyncModifier ?? modifier
  const modifiedData = useModifier ? await useModifier(data) : data
  set(modifiedData)
  return data
}
