import React from "react";
import { useNavigate } from "react-router";
import { Col } from "antd";
import { BiHotel } from "react-icons/bi";
import "./_house_item.scss";
import { formatCash } from "../../utils/Helper";

function HouseItem(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${props.data._id}`);
  };

  return (
    <Col xs={24} sm={12} lg={8}>
      <div className="house-item" onClick={handleClick}>
        <div className="house-img">
          <img src={props.data.urlAvatar} alt="" />
        </div>
        <div className="house-content">
          <div className="house-name">
            <h3>{props.data.name}</h3>
            <div className="house-capacity">
              <p className="capacity">
                <BiHotel className="icon"></BiHotel>
                {props.data.count} phòng
              </p>
            </div>
          </div>
          <div className="house-intro">
            <div className="intro-item">
              <p className="intro-desc">{props.data.info}</p>
            </div>
            <div className="intro-price">
              <div className="house-price">
                {formatCash(props.data.price) + " đ/đêm"}
              </div>
              <button>Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default HouseItem;
