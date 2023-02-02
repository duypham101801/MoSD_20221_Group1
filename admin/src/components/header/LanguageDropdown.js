import React, { useState } from 'react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'src/services/i18n'
import { cifVn, cifGb, cilLanguage } from '@coreui/icons'
const LanguageDropdown = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const [language, setLanguage] = useState(null)
  const onClick = (language) => {
    // change language to response of be
    // dispatch(changeLanguage(language))

    let data = window.localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)
    data = JSON.parse(data)
    data.language = language
    window.localStorage.setItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`, JSON.stringify(data))
    setLanguage(language)
    i18n.changeLanguage(language)
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        {language === 'vi' ? (
          <CIcon icon={cifVn} size="lg" />
        ) : language === 'en' ? (
          <CIcon icon={cifGb} size="lg" />
        ) : (
          <CIcon icon={cilLanguage} size="lg" />
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => onClick('vi')}>
          <div>
            <CIcon icon={cifVn} size="lg" /> &nbsp; {'Vietnamese'}
          </div>
        </CDropdownItem>

        <CDropdownItem onClick={() => onClick('en')}>
          <div>
            <CIcon icon={cifGb} size="lg" /> &nbsp; {'English'}
          </div>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default LanguageDropdown
