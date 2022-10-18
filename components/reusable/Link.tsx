import type { FC } from "react"
import React from "react"

import type { LinkProps } from "next/link"
import NextLink from "next/link"

export const Link: FC<
  LinkProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    React.RefAttributes<HTMLAnchorElement> & {
      children?: React.ReactNode
    }
> = ({ children, ...props }) => {
  return (
    <NextLink scroll={false} {...props}>
      {children}
    </NextLink>
  )
}
