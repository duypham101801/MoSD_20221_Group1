import React from "react";
import { useNavigate } from "react-router";
import { Col } from "antd";
import { formatCash } from "../../utils/Helper";
import "./_area_item.scss";
// TODO : xoay ngang hoac xoay doc / sua file area.scss
function AreaItem(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/area/${props.data._id}`);
  };

  return (
    <Col xs={24} sm={12} lg={8} xl={6}>
      <div className="area-item" onClick={handleClick}>
        <div className="area-img">
          <img src={props.data.urlAvatar} alt={props.data.name} />
        </div>
        <div className="area-content">
          <div className="area-name">
            <h1>{props.data.name}</h1>
          </div>
          <h3 className="area-price">
            {formatCash(props.data.minPrice) +
              " - " +
              formatCash(props.data.maxPrice)}{" "}
            đ/đêm
          </h3>
        </div>
      </div>
    </Col>
  );
}

export default AreaItem;
