import React, { useEffect } from 'react'
import { matchPath, useLocation, useMatch } from 'react-router-dom'
function ImageDetail() {
  const location = useLocation()
  // them 1 cai filter can
  const isMatchPath = useMatch('/image/house/:id')
  useEffect(() => {
    if (isMatchPath) {
      console.log('Match')
    } else console.log(' Not Match')
  }, [])
}

export default ImageDetail
