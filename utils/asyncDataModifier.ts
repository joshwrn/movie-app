export type UseAsyncState<INITIAL, RETURN = INITIAL> = {
  get: () => Promise<INITIAL>
  modifier?: (data: INITIAL) => Promise<RETURN> | RETURN
  initial?: RETURN
}

export const asyncDataModifier = async <INITIAL, RETURN = INITIAL>({
  get,
  modifier,
}: UseAsyncState<INITIAL, RETURN>): Promise<INITIAL | RETURN> => {
  const data = await get()
  const modifiedData = modifier ? await modifier(data) : data
  return modifiedData
}
