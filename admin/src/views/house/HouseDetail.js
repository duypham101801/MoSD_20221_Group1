import React, { useEffect } from 'react'
import { HouseInfo, HouseImage, HouseFile } from 'src/components/house-details'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { useParams } from 'react-router'
import { getHouseFile } from 'src/services/file'
function HouseDetail() {
  const { id } = useParams()

  useEffect(() => {
    const getHouseDetail = async () => {
      const res = await getHouseFile(id)
    }

    getHouseDetail()
  }, [id])

  return (
    <CRow>
      <HouseInfo />
      <HouseImage />
      <HouseFile />
    </CRow>
  )
}

export default HouseDetail
