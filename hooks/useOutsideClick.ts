import type React from "react"
import { useEffect, useRef } from "react"

type OutsideClick = (action: VoidFunction) => React.RefObject<HTMLElement | null>

export const useOutsideClick: OutsideClick = (action) => {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref?.current?.contains(event.target as Node)) {
        action()
      }
    }
    document.addEventListener(`mousedown`, handleClickOutside)
    return () => {
      document.removeEventListener(`mousedown`, handleClickOutside)
    }
  }, [ref])
  return ref
}
