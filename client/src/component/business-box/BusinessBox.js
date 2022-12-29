import React from "react";

import { useEffect, useRef,useState } from "react";
import pippip from "../../../asset/pippip.png";
import { TbGridDots } from "react-icons/tb";
export function BusinessBox() {
  const ref = useRef(null);
 const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowInfo(false)
        // console.log("hi")
      }
    };
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  

  return (
    <>
      <div ref={ref}>
        <TbGridDots
          className="service-icon"
          onClick={() => {
            setShowInfo((prevState) => !prevState);
          }}
        />
      </div>
      {showInfo && (
        <div className="business-list">
          <a className="business-item" href="https://pippip.vn" target="_blank">
            <div className="business-image">
              <img src={pippip} alt="pip" />
            </div>
            <div className="business-title">Pippip</div>
          </a>
        </div>
      )}
    </>
  );
}
