// rsc
// rfce
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import firebase from "firebase/app";
import { Spin } from "antd";
import "./_modal.scss";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import logo from "../../asset/logo192.png";
const Modal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const phoneRef = useRef(null); // la sdt
  const nameRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleNameChange = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      phoneRef.current.value !== "" && nameRef.current.value !== ""
        ? handleClick()
        : phoneRef.current.focus();
    }
  };
  const handlePhoneChange = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleClick();
    }
  };
  const handleClose = () => {
    phoneRef.current.value = null;
    nameRef.current.value = null;
    setError(null);
    onClose();
  };
  useEffect(() => {
    window.localStorage.removeItem(`room`);
    window.localStorage.removeItem(`user`);
  }, []);
  if (!open) return null;

  const handleClick = async () => {
    const phone = phoneRef.current.value;
    const name = nameRef.current.value;

    if (phone === "" || name === "") {
      setError("Chưa nhập tên hoặc số điện thoại");
      return;
    }
    let newWindow = window.open(`/chat`, "_blank");
    newWindow["displayName"] = name;
    newWindow["phone"] = phone;
    setCurrentUser({
      displayName: name,
      phone: phone,
    });
    phoneRef.current.value = null;
    nameRef.current.value = null;
    /* 
    setError(null);
    setLoading(true);
    const userRef = db.collection("users").where("phone", "==", phone);
    let userId;
    userRef.get().then((collections) => {
      const isAccountExist = collections.size === 0;
      if (!isAccountExist) {
        // neu co tai khoan thi ko tao
        // co cap nhat ten neu bi trung so dien thoai k
        userId = collections.docs[0].get("uid");
        getRooms(userId).then((res) =>
          setCurrentUser(collections.docs[0].data())
        );
      } else {
        // chua co tai khoan
        userId = uuidv4();
        getRooms(userId).then((res) => {
          addDocument("users", {
            displayName: name,
            phone: phone,
            photoURL:
              "https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png",
            uid: userId,
          });
          setCurrentUser({
            displayName: name,
            phone: phone,
            photoURL:
              "https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png",
            uid: userId,
          });
        });
      }
    });
    */

    /*
    firebase
      .auth()
      //.signInAnonymously()
      .then((result) => {
        console.log(result.user.uid);
        window.open(`/chat/${result.user.uid}`, "_blank");
       
      })
      .catch(function (error) {
        console.log("error");
        // Handle Errors here.
        console.error(error);
      }); */

    /*
    await firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function (result) {
        if (result.additionalUserInfo?.isNewUser) {
          const user = result.user;
           const { displayName, email, uid, photoURL } = result.user;
          addDocument("users", {
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            uid: user?.uid,
          });
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.error(error);
      });  */
  };

  return (
    <div onClick={handleClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p className="closeBtn" onClick={handleClose}>
            X
          </p>
          <div className="modal-header">
            <div className="modal-img"></div>
            <h6 className="model-title">Travelo</h6>
          </div>
          <div className="modal-content">
            <div className="modal-img">
              <img src={logo} alt="" />
            </div>

            <div className="modal-desc">
              <h2 className="title">Chat với Travelo</h2>
              <p className="desc">
                Sau khi bạn nhấn vào tiếp tực.Travelo có thể tư vấn phòng cho
                bạn với mức giá tốt nhất.
              </p>
              {error && <p className="error">{error}</p>}
              {loading && <Spin size="large" />}
              <div className="form">
                <div className=" input name">
                  <input
                    type="text"
                    placeholder="Nhập tên"
                    ref={nameRef}
                    onKeyUp={(e) => handleNameChange(e)}
                  />
                </div>
                <div className="input phone">
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại của bạn"
                    ref={phoneRef}
                    onKeyUp={(e) => handlePhoneChange(e)}
                  />
                </div>
              </div>
              <button className="guest-button" onClick={handleClick}>
                Tiếp tục với vai trò khách
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
