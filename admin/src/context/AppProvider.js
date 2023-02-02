import React, { useState, createContext } from 'react'
import useFirestore from '../hooks/useFirebase'
import { AuthContext } from './AuthContext'
import { useSelector } from 'react-redux'
import { getUser } from 'src/services/user'
/*
export type AppContextType = {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  members: { [key: string]: any }[];
  selectedRoom: Room;
  selectedRoomId: string;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<string>>;
 
  clearState: () => void;
};*/

export const AppContext = createContext(null)

/*
interface Condition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: string | { id: string }[] | undefined;
} */

// eslint-disable-next-line react/prop-types
export default function AppProvider({ children }) {
  const [selectedRoomId, setSelectedRoomId] = useState('')
  const { currentUser } = React.useContext(AuthContext)
  const user = useSelector((state) => state.user)
  // check room co chua ten nay trong phonpg
  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: /*currentUser.uid,*/ user.data.id,
    }
  }, [/*currentUser.uid*/ user.data.id])

  const [rooms, setRooms] = useState([])

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId],
  )

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    }
  }, [selectedRoom.members])

  const members = useFirestore('users', usersCondition, { type: 'asc', size: 50 })

  const clearState = () => {
    setSelectedRoomId('')
  }

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        selectedRoomId,
        setSelectedRoomId,
        clearState,
        setRooms,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
