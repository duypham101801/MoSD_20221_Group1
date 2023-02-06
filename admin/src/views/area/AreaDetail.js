import React from 'react'
import { CRow } from '@coreui/react'
import House from '../house/House'
import { AreaInfo, AreaImage, AreaFile } from 'src/components/area-details'
function AreaDetail() {
  return (
    <CRow>
      <AreaInfo></AreaInfo>
      <House />
      <AreaImage></AreaImage>
      <AreaFile></AreaFile>
    </CRow>
  )
}

export default AreaDetail
