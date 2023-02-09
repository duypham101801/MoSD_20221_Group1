import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import firebase from "firebase/app";
import { Spin } from "antd";
import "./_chat.scss";
import Message from "../../component/chat/Message";
import Input from "../../component/chat/Input";
import { addDocument } from "../../utils/Firebase";
import { db } from "../../config/Firebase";
import { v4 as uuidv4 } from "uuid";
import { getSaleId } from "../../services/chat";
// open new tab
function Loading() {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [roomId,setRoom] = useState(null)
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const getRooms = async (userId,phone) => {
    try {
      const res = await getSaleId();
      
      console.log(res.saleId);
      const roomRef = await db.collection("rooms").add({
        name: phone, // ten room la so dien thoai
        ownerId: userId,
        members: [
          /*"A6tH7BmMLmYsgEyFMPlB26pzaJ13"*/ res.saleId /*"6353993e26705194525e103f"*/,
          userId,
        ],
        modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        unread: 0,
      });

      //navigate(`/chat/${roomRef.id}/${userId}`)
      setRoom(roomRef.id);
      return roomRef.id;
    } catch (e) {
      setError("Có lỗi bất thường.Vui lòng thử lại.");
      return e;
    }
  };

  useEffect(() => {
       const phone = window['phone']
       const displayName = window['displayName']
       console.log(phone)
      const userRef = db.collection("users").where("phone", "==", phone);
      let userId;
      userRef.get().then((collections) => {
        const isAccountExist = collections.size === 0;
        if (!isAccountExist) {
          // neu chua co sdt nay co tai khoan thi ko tao
          // co cap nhat ten neu bi trung so dien thoai k
          userId = collections.docs[0].get("uid");
          getRooms(userId,phone).then((res) =>{
             console.log(res);
            navigate(`/chat/${res}/${userId}`);
            // luu du lieu theo user id va xoa di theo userId
            setCurrentUser(collections.docs[0].data())
        });
          console.log("toi o day");
        } else {
          // chua co tai khoan
          userId = uuidv4();
          getRooms(userId,phone).then((res) => {
            console.log(res)
            navigate(`/chat/${res}/${userId}`);
            addDocument("users", {
              displayName: displayName,
              phone: phone,
              photoURL:
                "https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png",
              uid: userId,
            });
            setCurrentUser({
              displayName: displayName,
              phone: phone,
              photoURL:
                "https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png",
              uid: userId,
            });
          });
        }
      });
    
  }, []);

  if (!roomId) {
    return (
      <div style={divStyle}>
        <div className="loading">
          <Spin size="large" />
          <h3 style={{ paddingTop: "0.4rem" }}>Loading room...</h3>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div style={divStyle}>
        <p className="error" style={{ fontSize: "1.5rem" }}>
          {error}
        </p>
      </div>
    );
  }
}

export default Loading;



const divStyle = {
  position: "absolute",
  top: "50%",
  marginTop: "-50px",
  width: "100%",
  height: "100px",
  textAlign: "center",
};
