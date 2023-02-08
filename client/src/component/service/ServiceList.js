import React, { useState, useEffect } from "react";
import { useMatch } from "react-router";
import { Row } from "antd";
import { getAreaServices } from "../../services/service";
import { getHouseServices } from "../../services/service";
import ServiceItem from "./ServiceItem";
function ServiceList(props) {
  const isMatchPath = useMatch("/area/:areaId");
  const [services, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        let res;
        if (isMatchPath) {
          res = await getAreaServices(props.areaId);
        } else {
          res = await getHouseServices(props.houseId);
        }
        if (res.files) {
          setError(null);
          setData(res.files);
        }
      } catch (e) {
        setData([]);
        setError(e.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      {error && (
        <>
          <h1 className="error" style={{ textAlign: "left" }}>
            {"Thông tin khác hiện tại đang lỗi.Vui lòng thử lại sau."}
          </h1>
        </>
      )}

      {services && (
        <div className="service-list">
          <Row gutter={[30, 30]} justify="start" wrap="true">
            {services.map((service) => (
              <ServiceItem data={service} key={service._id} />
            ))}
          </Row>
        </div>
      )}
    </>
  );
}

export default ServiceList;
