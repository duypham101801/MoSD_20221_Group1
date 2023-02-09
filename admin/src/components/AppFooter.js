import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        Copyright
        <span className="ms-1">&copy; 2022 Travelo. All Rights Reserved.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Travelo Team
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
