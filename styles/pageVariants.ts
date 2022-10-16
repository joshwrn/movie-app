import type { Variants } from "framer-motion"

const transition = {
  type: `spring`,
  bounce: 0,
  duration: 1,
}

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    transition: {
      ...transition,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      ...transition,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ...transition,
      duration: 0.35,
    },
  },
}
