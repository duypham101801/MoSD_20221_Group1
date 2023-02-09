import React from "react";
import { Col } from "antd";
import "./_service_item.scss";
function ServiceItem(props) {
  const handleClick = () => {
    // window.open(props.data.urlFile, "_blank");
    setTimeout(() => {
      window.open(props.data.urlFile, "_blank");
    });
  };
  return (
    <Col xs={24} sm={12} lg={8}>
      <div className="service-item" onClick={handleClick}>
        <div className="service-img">
          <img src={props.data.urlThumb} alt="empty" />
        </div>
        <div className="service-content">
          <div className="service-title">
            <h3>{props.data.title}</h3>
          </div>
          <div className="upload-date">
            {new Date(props.data.createdAt).toLocaleDateString("en-GB")}
          </div>
          <div className="divider"></div>
          <div className="service-intro">
            <p>{props.data.description}</p>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default ServiceItem;
