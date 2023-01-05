import React, { useContext } from "react";
import { BsDot } from "react-icons/bs";
import { IoOptions, IoSearch } from "react-icons/io5";
import { SearchContext } from "../../context/SearchContext";
import "./_header.scss";

function SeachOpenButton({ onClick }) {
  const { searchState } = useContext(SearchContext);

  return (
    <button className={"search-open-btn"} onClick={onClick}>
      {/* <ResultSearchButton /> */}
      <div className="icon-container">
        <IoSearch size={25} className="search-icon--search" />
      </div>
      <div className="search-content">
        {searchState.provinceName === null &&
        searchState.districtName === null &&
        searchState.capacity === null ? (
          <div className="search-content-top title">Đi đâu?</div>
        ) : (
          <div className="search-content-top location">
            <div className="item">
              {searchState.provinceName
                ? `${searchState.provinceName}`
                : "Tỉnh"}
            </div>
            <BsDot />
            <div className="item">
              {searchState.districtName
                ? `${searchState.districtName}`
                : "Huyện"}
            </div>
          </div>
        )}
        <div className="search-content-bottom">
          {searchState.provinceName === null &&
          searchState.districtName === null &&
          searchState.capacity === null ? (
            <>
              <div className="search-content-bottom__item search-content-bottom--province">
                Tỉnh
              </div>
              <BsDot />

              <div className="search-content-bottom__item search-content-bottom--district">
                Huyện
              </div>
              <BsDot />

              <div className="search-content-bottom__item search-content-bottom--capacity">
                Số người
              </div>
            </>
          ) : (
            <div className="search-content-bottom__item--occpancy">
              {searchState.capacity
                ? `${searchState.capacity} `
                : `Số người`}
            </div>
          )}
        </div>
      </div>

      <div className="icon-container last">
        <IoOptions size={25} className="search-icon--options" />
      </div>
    </button>
  );
}

export default SeachOpenButton;
