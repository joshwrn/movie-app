import React from 'react'
import useTooltip from '@hooks/useTooltip'
import { AnimatePresence, motion } from 'framer-motion'

const DivWithTooltip = ({
  children,
  text,
}: {
  children: React.ReactNode
  text: string
}) => {
  const [Tooltip, handleMouseMove, setHover, hover] = useTooltip()
  return (
    <div
      style={{ position: 'relative' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="attach-tooltip"
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            key={'tooltip'}
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
