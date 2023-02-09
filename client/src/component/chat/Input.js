import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  MutableRefObject,
  memo,
} from "react";
import { useParams } from "react-router";
import { FiSend } from "react-icons/fi";
import "./_input.scss";
import { db, storage } from "../../config/Firebase";
import firebase from "firebase";

function Input(props) {
  // xoa di sau khi close browser  token luu id phpong o local storage
  const { userId } = useParams();

  const user = JSON.parse(sessionStorage.getItem(userId));

  const [text, setText] = useState("");
  const handleSend = async () => {
    if (text.trim().length === 0) return;

    db.collection("messages").add({
      text: text,
      uid: userId,
      photoURL:
        "https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      roomId: props.roomId,
      displayName: user.displayName,
    });

    db.collection("rooms")
      .doc(props.roomId)
      .get("unread")
      .then((res) => {
        db.collection("rooms")
          .doc(props.roomId)
          .update({
            modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
            unread: res.get("unread") + 1,
          });
      });

    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Nhap tin nhan"
          className="chat-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <FiSend
          style={{
            height: "30px",
            fontSize: "1.5rem",
            margin: "10px 16px 0px 0px",
            color: "grey",
          }}
          onClick={handleSend}
        />
      </div>
    </>
  );
}

export default memo(Input);

/*   `` : expand template string
 `emoji-list ${showEmoji ? "show" : "hidden"}" `
      */
