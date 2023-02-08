/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react'
import './_chat.scss'
import { AppContext } from '../../context/AppProvider'
import { SideBar, Input, Message } from '../../components/chat'
import { CCol, CContainer, CRow } from '@coreui/react'
function Chat() {
  const { selectedRoom } = useContext(AppContext)
  return (
    <>
      <CContainer className="chat">
        <CCol xs="12" md="12" className="mb-4">
          <CRow>
            <CCol lg={3}>
              <SideBar />
            </CCol>
            <CCol lg={9} style={{ paddingRight: 0 }}>
              <div className="chat-container">
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
              </div>
            </CCol>
          </CRow>
        </CCol>
      </CContainer>
    </>
  )
}

export default Chat
