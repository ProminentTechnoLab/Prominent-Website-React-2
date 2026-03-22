'use client'

import React from 'react'
import useSmoothScroll from '../hooks/useSmoothScroll'

const AppWrapper = ({ children }) => {
  useSmoothScroll()
  return <>{children}</>
}

export default AppWrapper
