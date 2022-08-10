import React, { useMemo } from 'react'
import useTooltip from '@hooks/useTooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { nanoid } from 'nanoid'

const DivWithTooltip = ({
  children,
  text,
}: {
  children: React.ReactNode
  text: string
}) => {
  const id = useMemo(() => nanoid(), [])
  const [Tooltip, handleMouseMove, setHover, hover] = useTooltip({ id })
  return (
    <div
      style={{ position: 'relative' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`attach-tooltip-${id}`}
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
