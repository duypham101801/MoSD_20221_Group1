import React, { useEffect, useState } from 'react'

function useWindowSize() {
  const windowWidth = window.innerWidth
  return [windowWidth]
}

export default useWindowSize

function getWindowSize() {
  const { innerWidth, innerHeight } = window
  return { innerWidth, innerHeight }
}
