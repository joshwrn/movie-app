import { useEffect } from "react"

export const useScrollToTop: VoidFunction = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
}
