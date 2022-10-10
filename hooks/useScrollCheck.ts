import { useCallback, useRef, useState } from "react"

import { debounce } from "lodash"

interface ScrollCheck {
  scrollRef: React.RefObject<HTMLDivElement>
  wrapperRef: React.RefObject<HTMLDivElement>
  scrollX: number
  setScrollX: React.Dispatch<React.SetStateAction<number>>
  scrollEnd: boolean
  setScrollEnd: React.Dispatch<React.SetStateAction<boolean>>
  slide: (dir: number) => void
  scrollCheck: () => void
}

const useScrollCheck = (): ScrollCheck => {
  const scrollRef = useRef(null)
  const wrapperRef = useRef(null)
  const [scrollX, setScrollX] = useState<number>(0)
  const [scrollEnd, setScrollEnd] = useState<boolean>(false)

  const slideFunc = (direction: number) => {
    const wrapper = window.getComputedStyle(wrapperRef?.current)
    const wrapperPadding =
      parseInt(wrapper.getPropertyValue(`padding-right`)) ?? 0
    const shift = (scrollRef.current.clientWidth + wrapperPadding) * direction
    scrollRef.current.scrollLeft += shift
    setScrollX(scrollX + shift)
    scrollCheck()
  }

  const slide = useCallback(
    debounce(
      (dir: number) => {
        slideFunc(dir)
      },
      600,
      { leading: true, trailing: false, maxWait: 600 }
    ),
    []
  )

  const scrollCheck = () => {
    setScrollX(scrollRef.current.scrollLeft)
    if (
      Math.floor(scrollRef.current.scrollWidth - scrollRef.current.scrollLeft) <=
      scrollRef.current.offsetWidth
    ) {
      setScrollEnd(true)
    } else {
      setScrollEnd(false)
    }
  }

  return {
    scrollRef,
    wrapperRef,
    scrollX,
    setScrollX,
    scrollEnd,
    setScrollEnd,
    slide,
    scrollCheck,
  }
}

export default useScrollCheck
