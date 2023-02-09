import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Badge } from 'antd'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilUser,
  cilCheck,
  cilCheckCircle,
} from '@coreui/icons'
import { db } from 'src/config/Firebase'
function NotificationDropdown() {
  const navigate = useNavigate()
  const [unread, setUnread] = useState(0)
  const handleClick = () => {
    navigate('/chat')
  }
  const user = useSelector((state) => state.user)
  const id = JSON.parse(localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)).id
  useEffect(() => {
    const roomRef = db
      .collection('rooms')
      .where('members', 'array-contains', user.data.userId) //user.data.userId)
      .where('unread', '>', 0)
    const unsubscribe = roomRef.onSnapshot((snapshot) => {
      setUnread(snapshot.docs.length)
    })
    return unsubscribe
  }, [])
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <Badge size="small" count={unread}>
          <CIcon icon={cilBell} size="lg" />
        </Badge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={handleClick}>
          {/* neu co unread msg thi hien len */}
          <CIcon icon={cilCheckCircle} className="me-2" />
          {unread ? <> Bạn có {unread} tin nhắn mới </> : <> Không có tin nhắn </>}
        </CDropdownItem>
        <CDropdownDivider />
      </CDropdownMenu>
    </CDropdown>
  )
}

export default NotificationDropdown
