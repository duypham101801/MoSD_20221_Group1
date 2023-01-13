import React, { useState, useEffect, Dispatch } from "react";
import { db } from "../config/Firebase";

import { setDoc } from "@firebase/firestore";

const useFirebase = (collection, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = db.collection(collection);

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef
        .where(condition.fieldName, condition.operator, condition.compareValue)
        .orderBy("createdAt", "asc");
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  return documents;
};
export default useFirebase;
