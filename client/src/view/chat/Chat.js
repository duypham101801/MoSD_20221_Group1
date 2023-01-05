import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import "./_chat.scss";
import Message from "../../component/chat/Message";
import Input from "../../component/chat/Input";

// open new tab
function Chat() {
  const { roomId } = useParams();

  return (
    <section className="chat">
      <div className="container">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-img">
              <img
                src="	https://seeklogo.com/images/B/beach-tour-logo-4505456896-seeklogo.com.png"
                alt=""
              />
            </div>
            <span className="chat-name">Travelo</span>
          </div>
          <div className="chat-content">
            <Message roomId={roomId} />
            <Input roomId={roomId} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chat;


