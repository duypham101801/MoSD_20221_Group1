import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { IoCloseOutline } from "react-icons/io5";


import "./_header.scss";
import Modalv2 from "../../component/modal/Modalv2";
import SearchForm from "../../component/search/SearchForm";
import SeachOpenButton from "./SeachOpenButton";
import { ModalContext } from "../../context/ModalContext";
import { SearchContext } from "../../context/SearchContext";
import { BusinessBox } from "../../component/header/business-box/BusinessBox";

function Header({ isInHomePage = false }) {
  const [isVisible, setVisible] = useState(false);
  const location = useLocation();

  const { modalCtx, modalDispatch } = useContext(ModalContext);

  const navigate = useNavigate();
  

  useEffect(() => {
    setVisible(false);
    if (location.pathname === "/area") {
      setVisible(true);
    }
  }, [location.pathname]);

  const handleClick = () => {
    window.location.href = "https://pippip.vn";
  };

  const handleOpenFormModal = () => {
    modalDispatch({ type: "openModal" });
  };

  const handleCloseFormModal = () => {
    // setVisible(false);

    modalDispatch({ type: "closeModal" });
  };

  const { searchState } = useContext(SearchContext);

  return (
    <>
      {modalCtx.isVisibleOnMobile && (
        <Modalv2 classModal="modal">
          <IoCloseOutline className="btn-close" onClick={handleCloseFormModal}>
            Close
          </IoCloseOutline>
          <SearchForm className="form" />
        </Modalv2>
      )}
      <header
        id="nav"
        className="header"
        style={
          location.pathname === "/" ? { justifyContent: "flex-end" } : null
        }
      >
        <div
          className="header-left"
          // style={location.pathname === "/" ? { display: "none" } : null}
          style={headerLeft(location.pathname)}
          onClick={(e) => {
            navigate("/");
          }}
        >
          Travelo
        </div>
        {isVisible && <SeachOpenButton onClick={handleOpenFormModal} />}

        {isVisible && (
          <>
            <SearchForm className="search-form" />
          </>
        )}
        <div
          className="header-right"
          style={location.pathname !== "/area" ? { display: "flex" } : null}
        >
          {/*<button
              className="button button--outline"
              style={!isVisible ? style : null}
              onClick={handleClick}
              id="but"
            >
              Đặt xe Pippip
          </button> */}
          <div className="service">
            
            <BusinessBox
            >
              {" "}
            </BusinessBox>
          </div>
          <button id="but" className="button button--none">
            Đăng nhập
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
/*

*/

const headerLeft = (path) => {
  // Adding media query..

  switch (path) {
    case "/":
      return { display: "none" };
    case "/area":
      return null;
    default:
      return { display: "flex" };
  }
};
