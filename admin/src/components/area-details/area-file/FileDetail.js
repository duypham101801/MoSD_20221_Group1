import React, { useEffect } from 'react'
import { matchPath, useLocation, useMatch } from 'react-router-dom'
function FileDetail() {
  const location = useLocation()
  // them 1 cai filter can
  const isMatchPath = useMatch('/file/house/:id')
  useEffect(() => {
    if (isMatchPath) {
      console.log('Match')
    } else console.log(' Not Match')
  }, [])

  return <div>FileDetails</div>
}

export default FileDetail
