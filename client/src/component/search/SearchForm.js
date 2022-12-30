import React from "react";
import useLocationForm from "./useLocationForm";
import { Row, Col } from "antd";
import Select from "react-select";
import { FaCity } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoPeopleOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

const style = {
  control: (base) => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: "none",
    // textAlign:"left",
  }),
};

function SearchForm({ isInHomePage, className }) {
  const {
    state,
    onCitySelect,
    onDistrictSelect,
    onPeopleSelect,
    handleSubmit,
  } = useLocationForm(true);

  const {
    cityOptions,
    districtOptions,
    selectedCity,
    selectedDistrict,
    numberPeople,
    selectedPeople,
  } = state;

  if (isInHomePage) {
    return <></>;
  }

  return (
    <div className={`search-form ${className}`} onSubmit={handleSubmit}>
      <Col md={7} className="hero-container">
        <FaCity className="icon" />
        <Select
          className="select"
          components={{
            // DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={style}
          name="cityId"
          key={`cityId_${selectedCity?.value}`}
          isDisabled={cityOptions.length === 0}
          options={cityOptions}
          onChange={(option) => onCitySelect(option)}
          placeholder="Tỉnh/Thành"
          defaultValue={selectedCity}
        />
      </Col>
      <div className="vertical"></div>
      <Col md={8} className="hero-container">
        <HiOutlineLocationMarker className="icon" />
        <Select
          className="select"
          styles={style}
          components={{
            // DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          name="districtId"
          key={`districtId_${selectedDistrict?.value}`}
          isDisabled={districtOptions.length === 0}
          options={districtOptions}
          onChange={(option) => onDistrictSelect(option)}
          placeholder="Quận/Huyện"
          defaultValue={selectedDistrict}
        />
      </Col>
      <div className="vertical"></div>
      <Col md={6} className="hero-container">
        <IoPeopleOutline className="icon" />
        <Select
          name="number"
          className="select"
          key={`number_${selectedPeople?.value}`}
          styles={style}
          components={{
            // DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          options={numberPeople}
          onChange={(option) => onPeopleSelect(option)}
          defaultValue={selectedPeople}
          placeholder="Số lượng"
        />
      </Col>
      <Col md={2} className="submit">
        <button type="submit" className="but-submit" onClick={handleSubmit}>
          <BsSearch />
        </button>
      </Col>
    </div>
  );
}

export default SearchForm;

const peopleOptions = [
  { value: "5", label: "1-5 người" },
  { value: "25", label: "5-25 người" },
  { value: "50", label: "25-50 người" },
  { value: "100", label: "50-100 người" },
];

/*
className= {` ${visible ? "fixed" : ""}`}

<div className="vertical"></div>
*/
