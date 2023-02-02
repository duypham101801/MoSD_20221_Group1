import React, { useState, useEffect, Dispatch, useRef } from 'react'
import { db } from '../config/Firebase'

/*
interface Message {
  text: string;
  uid: string;
  photoURL: string;
  createdAt: string;
  roomId: string;
  displayName: string;
  id: string;
}
export interface Condition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: string | { id: string }[] | undefined;
}
export interface Sort {
  type: OrderByDirection | undefined;
  size: number;
}
*/
const useFirebase = (collection, condition, pagination) => {
  const [documents, setDocuments] = useState([])

  const last = useRef()

  useEffect(() => {
    let collectionRef = db
      .collection(collection)
      .orderBy('createdAt', pagination.type)
      .limit(pagination.size)

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([])
        return
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue,
      )
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      setDocuments(documents)
    })

    return unsubscribe
  }, [collection, condition])

  return documents
}
export default useFirebase
