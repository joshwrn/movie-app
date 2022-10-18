import type { FC } from "react"
import React from "react"

import { useScrollToTop } from "@hooks/useScrollToTop"
import { pageVariants } from "@styles/pageVariants"
import { motion } from "framer-motion"
import type { GetServerSideProps } from "next"
import styled from "styled-components"

const User: FC = () => {
  useScrollToTop()
  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    ></PageContainer>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
// }

const PageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 75px;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 1440px;
`

export default User
