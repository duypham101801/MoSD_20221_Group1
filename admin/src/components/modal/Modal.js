// rsc
// rfce
import React, { useState } from 'react'
import './_modal.scss'

import firebase from 'firebase/app'
import { useNavigate } from 'react-router'

import { addDocument } from '../../utils/Firebase'
const googleProvider = new firebase.auth.GoogleAuthProvider()
// eslint-disable-next-line react/prop-types
const Modal = ({ open, onClose }) => {
  const navigate = useNavigate()

  if (!open) return null

  const handleClick = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then((result) => {})
      .catch(function (error) {
        // Handle Errors here.
        console.error(error)
      })

    navigate('/chat')
  }

  const handleGoogle = async () => {
    await firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function (result) {
        if (result.additionalUserInfo?.isNewUser) {
          const user = result.user

          addDocument('users', {
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            uid: user?.uid,
          })
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.error(error)
      })

    navigate('/chat')
  }

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="modal-header">
            <div className="modal-img"></div>
            <div className="model-title">Travelo</div>
          </div>
          <div className="modal-content">
            <div className="modal-img">
              <img src="	https://timo.vn/wp-content/uploads/TDB_website-logo-1-300x58.png" alt="" />
            </div>
            <div className="modal-desc">
              <p>Kham pha cung chung toi</p>
            </div>
            <button className="guest-button" onClick={handleClick}>
              Tiếp tục với vai trò khách
            </button>
            <button className="guest-button" onClick={handleGoogle}>
              Login google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
