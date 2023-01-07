import React, { useState, useEffect } from "react";
import { Row } from "antd";
import { getHouseList } from "../../services/house";
import HouseItem from "./HouseItem";

function HouseList(props) {
  const [houses, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getHouseList(props.areaId);

        if (res.houses) {
          setError(null);
          setData(res.houses);
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
            {"Danh sách căn hiện tại đang lỗi.Vui lòng thử lại sau."}
          </h1>
        </>
      )}
      <div className="house-list">
        <Row gutter={[30, 30]} justify="start" wrap="true">
          {houses &&
            houses.map((house) => <HouseItem data={house} key={house._id} />)}
        </Row>
      </div>
    </>
  );
}

export default HouseList;
