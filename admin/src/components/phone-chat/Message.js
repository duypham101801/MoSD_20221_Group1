import React, { useRef, useEffect, useContext, useState } from 'react'

import { AuthContext } from '../../context/AuthContext'

import { AppContext } from '../../context/AppProvider'
import { db } from '../../config/Firebase'

import { debounce, throttle } from 'lodash'
import { useSelector } from 'react-redux'
import { getUser } from 'src/services/user'
// xu ly message thay doi
function Message() {
  const { currentUser } = useContext(AuthContext)
  const { setSelectedRoomId, selectedRoomId, selectedRoom } = useContext(AppContext)
  // const user = useSelector((state) => state.user)
  const user = getUser()

  const messageListRef = useRef(null)

  const [lastKey, setLastKey] = useState(null)
  const [firstKey, setFirstKey] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isEmpty, setEmpty] = useState(false)
  const [messages, setMessage] = useState([])
  const [newMsg, setNewMsg] = useState(false)

  // bat su kien room thay doi
  useEffect(() => {
    if (selectedRoomId) {
      setMessage([])
      setFirstKey(null)
      setLastKey(null)
      setEmpty(false)
      setLoading(false)

      const msgRef = db
        .collection('messages')
        .where('roomId', '==', selectedRoomId)
        .orderBy('createdAt', 'asc')
      // .limitToLast(6)

      msgRef.get().then((collections) => {
        // updateState(collection);
        const isCollectionEmpty = collections.size === 0
        if (!isCollectionEmpty) {
          // da co msg tu trc
          const documents = collections.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          const msgOtherRef = db
            .collection('rooms')
            .where('ownerId', '==', selectedRoom.ownerId)
            .orderBy('createdAt', 'asc')

          msgOtherRef.get().then((collect) => {
            if (collect.size != 0) {
              var msg = []
              const roomIds = []
              var promises = []

              collect.forEach((e) => {
                roomIds.push(e.id)
                const roomId = e.id
                const msgRef = db
                  .collection('messages')
                  .where('roomId', '==', e.id)
                  .orderBy('createdAt', 'asc')
                  .get()
                  .then((collections) => {
                    const docs = collections.docs.map((doc) => ({
                      ...doc.data(),
                      id: doc.id,
                    }))
                    msg.push(docs)
                    setMessage((prevState) => [...prevState, ...docs])
                  })
              })
              // Promise.all(promises)
              // msg = msg.filter((e) => e.roomId !== selectedRoomId)
              // setMessage([...msg, ...documents])
            } else setMessage([...documents])
          })

          const firstDoc = collections.docs[0]
          setFirstKey(firstDoc)
          const lastDoc = collections.docs[collections.docs.length - 1].get('createdAt')
          setLastKey(lastDoc)

          setNewMsg(true)
          // chua bat su kien listener khi chat
        } else {
          // chua co msg lan nao
          // setMessage([]);
          //  setEmpty(true);

          // da co msg tu trc
          const documents = collections.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          const msgOtherRef = db
            .collection('rooms')
            .where('ownerId', '==', selectedRoom.ownerId)
            .orderBy('createdAt', 'asc')

          msgOtherRef.get().then((collect) => {
            if (collect.size != 0) {
              var msg = []
              const roomIds = []
              var promises = []

              collect.forEach((e) => {
                roomIds.push(e.id)
                const roomId = e.id
                const msgRef = db
                  .collection('messages')
                  .where('roomId', '==', e.id)
                  .orderBy('createdAt', 'asc')
                  .get()
                  .then((collections) => {
                    const docs = collections.docs.map((doc) => ({
                      ...doc.data(),
                      id: doc.id,
                    }))
                    msg.push(docs)
                    setMessage((prevState) => [...prevState, ...docs])
                  })
              })
              // Promise.all(promises)
              // msg = msg.filter((e) => e.roomId !== selectedRoomId)
              // setMessage([...msg, ...documents])
            } else setMessage([...documents])
          })

          setNewMsg(true)
          // chua bat su kien listener khi chat

          setLastKey(Date.now())
        }
        // setLoading(false);
      })
    }
  }, [selectedRoomId])

  // lay cac msg cu
  /*
  const fetchMorePosts = async () => {
    if (firstKey != null) {
      setLoading(true)
      setNewMsg(false)
      const msgRef = db
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .where('roomId', '==', selectedRoomId)
        .endBefore(firstKey)
        .limitToLast(1)

      msgRef.get().then((collections) => {
        // updateState(collection);
        const isCollectionEmpty = collections.size === 0
        if (!isCollectionEmpty) {
          const documents = collections.docs.map(
            (doc) =>
              doc && {
                ...doc.data(),
                id: doc.id,
              },
          )
          setMessage((prevState) => [...documents, ...prevState])

          // const lastDoc = collections.docs[collections.docs.length - 1];
          // setLastKey(lastDoc);
          const firstDoc = collections.docs[0]
          setFirstKey(firstDoc)
        } else {
          // het du lieu scroll up
          setFirstKey(null)
          setEmpty(true)
        }
        setLoading(false)
      })
    }
  }  */

  // cap nhat khi co tin nhan moi
  useEffect(() => {
    // get snapshot
    let msgRef
    // && messages

    if (lastKey != null) {
      //   co the setRoom truc tiep luon

      msgRef = db
        .collection('messages')
        .where('roomId', '==', selectedRoomId)
        .orderBy('createdAt', 'asc')
        .startAfter(lastKey)

      msgRef.get().then((collection) => {
        // lang nghe danh sach truoc first key
      })
      const unsubcribe = msgRef.onSnapshot(
        {
          // Listen for document metadata changes
          includeMetadataChanges: false,
        },
        (snapshot) => {
          if (snapshot.docs.length > 0) {
            if (!snapshot.metadata.hasPendingWrites) {
              // doc change since last snap shot
              const documents = snapshot.docChanges().map((newDoc) => {
                if (newDoc.doc.id === selectedRoomId) {
                  return {
                    ...newDoc.doc.data(),
                    id: newDoc.doc.id,
                    unread: 0,
                  }
                }
                return {
                  ...newDoc.doc.data(),
                  id: newDoc.doc.id,
                }
              })
              setMessage((prevState) => [...prevState, ...documents])
              setNewMsg(true)
            }
          }
        },
      )
      return unsubcribe
    }
  }, [lastKey])

  // scroll to bottom after message changed
  useEffect(() => {
    if (newMsg) {
      const node = messageListRef.current
      if (node) {
        node.scrollTop = node.scrollHeight
        // messageListRef.current.scrollTop =
        // messageListRef.current.scrollHeight + 50;
        setNewMsg(false)
      }
    }
  }, [newMsg])

  // khi scroll len top
  /*
  const handleScroll = () => {

    const node = messageListRef.current
    if (node && node.scrollTop === 0) {
      // fetch messages
      if (firstKey && messages.length > 5) {
        fetchMorePosts()

        node.scrollTo(0, 20)
      } else {
      }
    }
  }
 */
  return (
    <>
      {selectedRoomId ? (
        <>
          <div className="message-container" ref={messageListRef}>
            {isLoading && <h3>...</h3>}
            {messages.map((mes) =>
              mes.uid === /*currentUser.uid*/ user.id ? (
                <div className="local" key={mes.id}>
                  {mes.images != null &&
                    mes.images.map((img, index) => <img key={index} src={img}></img>)}
                  {mes.text && <div className="local-message">{mes.text}</div>}
                </div>
              ) : (
                <div className="remote-message" key={mes.id}>
                  <div className="remote-info">
                    <div className="remote-img">
                      <img src={mes.photoURL} alt="" />
                    </div>
                    <span className="remote-name">{mes.displayName}</span>
                  </div>
                  {mes.images != null &&
                    mes.images.map((img, index) => <img key={index} src={img}></img>)}
                  {mes.text && <span className="text-message">{mes.text}</span>}
                </div>
              ),
            )}
          </div>
          {/*<button onClick={() => fetchMorePosts()}>Load prev</button> */}
        </>
      ) : (
        <div className="message-container">
          <h4 style={{ marginLeft: '1rem' }}>Choose a room</h4>
        </div>
      )}
    </>
  )
}

export default Message
