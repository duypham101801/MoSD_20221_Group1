/* eslint-disable react/react-in-jsx-scope */

import { useContext } from 'react'
import './_box_chat.scss'
import { AppContext } from '../../context/AppProvider'
import { Input, Message } from '../../components/chat'
import { CCol, CContainer, CRow } from '@coreui/react'
function BoxChat() {
  const { selectedRoom } = useContext(AppContext)
  return (
    <>
      <CContainer className="box-chat">
        <CCol xs="12" md="12" className="mb-4">
          <div className="chat-header">
            <div className="chat-img">
              <img
                src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
                alt=""
              />
            </div>
            {/*TODO: selectedRoom.roomName  */}
            <span className="chat-name">{selectedRoom.name}</span>
          </div>
          <div className="chat-content">
            <Message />
            <Input />
          </div>
        </CCol>
      </CContainer>
    </>
  )
}

export default BoxChat
