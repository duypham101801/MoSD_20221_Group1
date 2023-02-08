import React, { useEffect, useRef, useState, useContext } from 'react'
import { FiSend } from 'react-icons/fi'

import { AuthContext } from '../../context/AuthContext'

import firebase from 'firebase'
import { db } from '../../config/Firebase'
import { AppContext } from '../../context/AppProvider'
import { useSelector } from 'react-redux'
import { getUser } from 'src/services/user'
// protect chat bang file
// TODO : ko up dc cai anh giong het vua up
function Input() {
  const [text, setText] = useState('')
  const { currentUser } = useContext(AuthContext)
  // const user = useSelector((state) => state.user)
  const user = getUser()
  const { selectedRoomId, members } = useContext(AppContext)
  const [arrayFiles, setArray] = useState([])
  const handleSend = async () => {
    if (text === '') return
    db.collection('messages').add({
      text: text,
      uid: /*user.data.userId*/ user.id,
      /* photoURL: currentUser.photoURL
        ? currentUser.photoURL
        : 'https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png', */
      photoURL: 'https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      roomId: selectedRoomId,
      displayName: `Guest${/*user.data.userId*/ user.id}`,
    })
    // nen ca nhan unread cho moi user
    db.collection('rooms')
      .doc(selectedRoomId)
      .update({ modifiedAt: firebase.firestore.FieldValue.serverTimestamp() })
    setText('')
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <>
      <div className="chat-container">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Nhap tin nhan"
          className="chat-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend()
            }
          }}
        />

        <FiSend
          style={{
            height: '30px',
            fontSize: '1.5rem',
            margin: '10px 16px 0px 0px',
            color: 'grey',
          }}
          onClick={handleSend}
        />
      </div>
    </>
  )
}

export default Input

/*   `` : expand template string
 `emoji-list ${showEmoji ? "show" : "hidden"}" `
      */
