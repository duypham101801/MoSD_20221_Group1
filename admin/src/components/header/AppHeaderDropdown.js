import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import logo from './../../assets/images/avatars/anonymous-user.png'
import avatar8 from './../../assets/images/avatars/8.jpg'

import { logOut } from 'src/services/auth'
const AppHeaderDropdown = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const lgOut = () => {
    const logoutThunk = logOut()
    dispatch(logoutThunk)
    navigate('/login')
  }

  const handleProfile = () => {
    navigate('./profile')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={logo} size="xs" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={handleProfile}>
          <CIcon icon={cilUser} className="me-2" />
          {t('Profile')}
        </CDropdownItem>
        <CDropdownItem onClick={() => lgOut()}>
          <CIcon icon={cilSettings} className="me-2" />
          {t('Logout')}
        </CDropdownItem>
        <CDropdownDivider />
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
