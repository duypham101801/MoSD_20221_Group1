import React, { useRef, useEffect, useContext, useState } from "react";
import { useParams } from "react-router";

import { AuthContext } from "../../context/AuthContext";
import "./_message.scss";
import { db } from "../../config/Firebase";
/*
interface Message {
  text?: string;
  uid?: string;
  images?: string[];
  photoURL?: string;
  createdAt?: string;
  roomId?: string;
  displayName?: string;
  id?: string;
}
*/

// TODO : save State room when reload , chuc nang loading cho anh dang load , lam cho anh ro net hon

// TODO : moi 1 cai message la 1 cai component con
// xu ly message thay doi
function Message(props) {
  const { userId } = useParams();

  const messageListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: props.roomId,
    }),
    [props.roomId]
  );

  useEffect(() => {
    const messageRef = db
      .collection("messages")
      .where("roomId", "==", props.roomId)
      //.where("createdAt", ">",new Date())
      .orderBy("createdAt", "asc");
    const unsubscribe = messageRef.onSnapshot(
      {
        // Listen for document metadata changes
        includeMetadataChanges: false,
      },
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          if (!snapshot.metadata.hasPendingWrites) {
            const documents = snapshot.docChanges().map((newDoc) => {
              return {
                ...newDoc.doc.data(),
                id: newDoc.doc.id,
              };
            });

            setMessages((prevState) => {
              return [...prevState, ...documents];
            });
          }
        }
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);
  return (
    <div className="message-container" ref={messageListRef}>
      {messages.map((mes) =>
        mes.uid === userId ? (
          <div className="local" key={mes.id}>
            {mes.text && <div className="local-message">{mes.text}</div>}
          </div>
        ) : (
          <div className="remote-message" key={mes.id}>
            <div className="remote-info">
              <div className="remote-img">
                <img
                  src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
                  alt=""
                />
              </div>
              <span className="remote-name">Travelo</span>
            </div>
            {mes.images != null &&
              mes.images.map((img, index) => <img key={index} src={img}></img>)}
            {mes.text && <span className="text-message">{mes.text}</span>}
          </div>
        )
      )}
    </div>
  );
}

export default Message;

/*
   <div className="remote-message">
        <div className="remote-info">
          <div className="remote-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <span className="remote-name">Travelo</span>
        </div>
        <span className="text-message">
          Hi Using min-content is therefore one possibility for overflowing
          boxes. If it is possible to allow the box to grow to be the minimum
          size required for the content, but no bigger, using this keyword will
          give you that size.
        </span>
      </div>
      <div className="local">
        <div className="local-message">
          {" "}
          Hi Using min-content is therefore one possibility for overflowing
          boxes. If it is possible to allow the box to grow to be the minimum
          size required for the content, but no bigger, using this keyword will
          give you that size.
        </div>
      </div>
      <div className="local">
        <div className="local-message">
          {" "}
          Hi Using min-content is therefore one possibility for overflowing
          boxes. If it is possible to allow the box to grow to be the minimum
          size required for the content, but no bigger, using this keyword will
          give you that size.
        </div>
      </div>
      <div className="remote-message">
        <div className="remote-info">
          <div className="remote-img">
            <img
              src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
              alt=""
            />
          </div>
          <span className="remote-name">Travelo</span>
        </div>
        <span className="text-message">
          Hi Using min-content is therefore one possibility for overflowing
          boxes. If it is possible to allow the box to grow to be the minimum
          size required for the content, but no bigger, using this keyword will
          give you that size.
        </span>
      </div>
      <div className="local">
        <div className="local-message">
          {" "}
          Hi Using min-content is therefore one possibility for overflowing
          boxes. If it is possible to allow the box to grow to be the minimum
          size required for the content, but no bigger, using this keyword will
          give you that size.
        </div>
      </div>

*/
