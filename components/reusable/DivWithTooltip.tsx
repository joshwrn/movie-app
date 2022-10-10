import type { FC } from "react"
import React from "react"

import useTooltip from "@reusable/useTooltip"
import { AnimatePresence, motion } from "framer-motion"

const DivWithTooltip: FC<{ children: React.ReactNode; text: string }> = ({
  children,
  text,
}) => {
  const { Tooltip, handleMouseMove, setHover, hover, ref } = useTooltip()
  return (
    <div
      style={{ position: `relative` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={ref}
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            key={`tooltip`}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tooltip>{text}</Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  )
}

export default DivWithTooltip
