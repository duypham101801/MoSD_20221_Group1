import React, { useContext, useEffect, useState, useRef } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthContext'
import { useSelector } from 'react-redux'
import { db } from '../../config/Firebase'

import { throttle } from 'lodash'
import { getUser } from 'src/services/user'
import { useNavigate } from 'react-router-dom'
import useWindowSize from 'src/hooks/useWindowSize'

function SideBar() {
  const [lastKey, setLastKey] = useState(null)
  const [firstKey, setFirstKey] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isEmpty, setEmpty] = useState(false)
  const [currentRoom, setCurrent] = useState([])
  const { currentUser } = useContext(AuthContext)
  const [width] = useWindowSize()
  const navigate = useNavigate()
  const { setSelectedRoomId, selectedRoomId, rooms, setRooms, selectedRoom } =
    useContext(AppContext)
  const user = getUser()
  const sideRef = useRef(null)
  useEffect(() => {}, [selectedRoomId])

  // const user = useSelector((state) => state.user)
  useEffect(() => {
    // 6 latest read
    const roomRef = db
      .collection('rooms')
      .orderBy('modifiedAt', 'desc')
      .where(
        'members',
        'array-contains',
        user.id,
        /*currentUser.uid*/
      )
      .where('unread', '==', 0)
      .limit(34)

    // chua xu ly neu chua co bar chat nao thi lsao
    roomRef.get().then((collections) => {
      // updateState(collection);
      const isCollectionEmpty = collections.size === 0
      if (!isCollectionEmpty) {
        const documents = collections.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))

        // set first room have read msg
        if (width > 997) {
          setSelectedRoomId(documents[0].id)
        }
        // last key
        const lastDoc = collections.docs[collections.docs.length - 1]
        setLastKey(lastDoc)
        // first key
        const firstDoc = collections.docs[0]
        // unread doc before time

        let unreadBefore = db
          .collection('rooms')
          .where('members', 'array-contains', user.id)
          .where('unread', '>', 0)
          .startAfter(firstDoc)
        unreadBefore.get().then((unread) => {
          const isCollectionEmpty = unread.size === 0
          if (!isCollectionEmpty) {
            const unreadDoc = unread.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
            // get unique phone msg + case nhieu ng nhan se k rep dc
            unreadDoc.filter((a, i) => unreadDoc.findIndex((s) => a.name === s.name) === i)
            // remove old room in oldDoc
            const uniqueDoc = documents.filter((e) => {
              return !unreadDoc.includes(e.name)
            })
            setRooms([...unreadDoc, ...uniqueDoc])
          } else {
            // const uniqueDoc = [...new Map(documents.map((item) => [item['name'], item])).values()]
            const uniqueDoc = documents.filter(
              (a, i) => documents.findIndex((s) => a.name === s.name) === i,
            )
            setRooms([...uniqueDoc])
          }
          //first key

          setFirstKey(firstDoc)
        })
      } else {
        // xu ly case chua co msg chat lan nao
        setEmpty(true)
        const roomRef = db
          .collection('rooms')
          .orderBy('modifiedAt', 'desc')
          .where('members', 'array-contains', /*currentUser.uid*/ user.id)
          .endBefore(Date.now())

        roomRef.get().then((collection) => {
          // lang nghe danh sach truoc first key
        })
        const unsubscribe = roomRef.onSnapshot((snapshot) => {
          if (snapshot.docs.length > 0) {
            // doc change since last snap shot
            const documents = snapshot.docChanges().map((newDoc) => {
              // todo neu trung id room cap nhat unread = 0

              return {
                ...newDoc.doc.data(),
                id: newDoc.doc.id,
              }
            })
            // push room have new msg to top
            setRooms((prevState) => {
              prevState = prevState.filter((item) => {
                return documents.find((e) => e.id !== item.id)
              })
              // chi giu unique doc
              const uniqueDoc = documents.filter(
                (a, i) => documents.findIndex((s) => a.name === s.name) === i,
              )
              return [...uniqueDoc, ...prevState]
            })
          }
        })
        return unsubscribe
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (selectedRoomId) {
      db.collection('rooms').doc(selectedRoomId).update({
        unread: 0,
      })
    }
  }, [rooms])

  const fetchMorePosts = async () => {
    setLoading(true)
    if (lastKey) {
      const roomRef = db
        .collection('rooms')
        .orderBy('modifiedAt', 'desc')
        .where('members', 'array-contains', /*currentUser.uid*/ user.id)
        .startAfter(lastKey)
        .limit(20)

      roomRef.get().then((collections) => {
        const isCollectionEmpty = collections.size === 0
        if (!isCollectionEmpty) {
          const documents = collections.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))

          setRooms((prevState) => {
            // loai bo cac room cu bi trung ten voi room da xuat hien
            /*
            const uniqueDoc = documents.filter((e) => {
              const roomName = e.name
              return e.name !== prevState.find((a) => roomName === a.name)?.name
            }) */
            const uniqueDoc = [...prevState, ...documents]
            return uniqueDoc.filter((a, i) => uniqueDoc.findIndex((s) => a.name === s.name) === i)
          })
          // update last key
          const lastDoc = collections.docs[collections.docs.length - 1]
          setLastKey(lastDoc)
        } else {
          setEmpty(true)
          setLastKey(null)
        }
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    // get snapshot

    let roomRef
    //   co the setRoom truc tiep luon
    // loi o cai first key
    if (firstKey != null) {
      roomRef = db
        .collection('rooms')
        .where('members', 'array-contains', /*currentUser.uid*/ user.id)
        .orderBy('modifiedAt', 'desc')
        .endBefore(firstKey)
      // Todo: end Before
      //.where('unread', '>', 0)

      const unsubcribe = roomRef.onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          // doc change since last snap shot
          const documents = snapshot.docChanges().map((newDoc) => {
            // todo neu trung id room cap nhat unread = 0

            return {
              ...newDoc.doc.data(),
              id: newDoc.doc.id,
            }
          })
          /*
          documents.sort(function (x, y) {
            return y.modifiedAt - x.modifiedAt
          }) */
          // push room have new msg to top
          setRooms((prevState) => {
            prevState = prevState.filter((item) => {
              return documents.find((e) => e.id !== item.id)
            })

            const newDoc = [...documents, ...prevState]
            // lay cac unique msg sdt
            let uniqueDoc = newDoc.filter(
              (a, i) => newDoc.findIndex((s) => a.name === s.name) === i,
            )
            documents.find((e) => {
              if (e.name === selectedRoom.name) {
                setSelectedRoomId(e.id)
              }
              return e.name === selectedRoom.name
            })
            return uniqueDoc
          })
        }
      })

      return unsubcribe
    }
  }, [firstKey])

  const handleScroll = () => {
    const node = sideRef.current

    if (node) {
      const isBottom = node.scrollHeight - node.scrollTop - node.clientHeight - 1
      // fetch messages
      if (lastKey && rooms.length >= 5 && isBottom <= 0) {
        fetchMorePosts()
        node.scrollTop = node.scrollHeight + 20
      } else {
      }
    }
  }

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId)

    db.collection('rooms').doc(roomId).update({
      unread: 0,
    })
    if (width <= 997) {
      navigate(`/chat/${roomId}`)
    }
  }

  return (
    <div className="side-bar">
      <div className="bar-header">
        <h3>Chat</h3>
        <div className="search-input">
          <AiOutlineSearch />
          <input type="text" placeholder="Tìm kiếm cuộc trò chuyện" />
        </div>
      </div>
      <div
        className="chat-list"
        ref={sideRef}
        onScroll={throttle(handleScroll, 300, { leading: true })}
      >
        {rooms &&
          rooms.map((room) => (
            <div
              className={`chat-item`}
              key={room.id}
              style={
                room.id === selectedRoomId
                  ? { background: '#ECF3FF' }
                  : { background: `${room.unread > 0 ? '#FFF' : '#F5F6F7'}` }
              }
              onClick={() => handleSelectRoom(room.id)}
            >
              <div className="chat-img">
                <img
                  src="https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
                  alt=""
                />
              </div>
              <div className="chat-name">{room.name}</div>
              {room.unread !== 0 && <div className="chat-noti">{room.unread}</div>}
            </div>
          ))}
      </div>
      {/*<button onClick={() => fetchMorePosts()}>Load More</button>*/}
    </div>
  )
}

export default SideBar
