import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";
import "./_area.scss";
import { SearchContext } from "../../context/SearchContext";
import { getAreaList } from "../../services/area";
import AreaItem from "../../component/area/AreaItem";

function Area() {
  const { searchState } = useContext(SearchContext);

  const [data, setData] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAreaList(searchState);

        if (res.areas) {
          setError(null);
          setData(res.areas);
        }
      } catch (e) {
        setError(e.message);
        setData([]);
      }
    };
    getData();
  }, [searchState]);

  return (
    <>
      <section className="area">
        <div className="container">
          {/* <SearchForm/> */}
          <div className="area-results">
            <div className="title">
              <h1>Đã tìm thấy {data.length} khu nghỉ dưỡng</h1>
            </div>
            {error && (
              <h1 className="error">
                {"Trang hiện tại đang lỗi.Vui lòng thử lại sau."}
              </h1>
            )}
            <div className="area-lists">
              <Row
                gutter={[18, 20]}
                justify={data.length === 1 ? "center" : "start"}
                type="flex"
              >
                {data &&
                  data.map((area) => <AreaItem data={area} key={area._id} />)}
              </Row>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Area;

const datas = [
  {
    _id: 1,
    url: "https://nghiduongngoaio.com/wp-content/uploads/2022/02/canh-quan-48.jpg",
    name: "Onsen Villas Resort, Dân Hòa, Kỳ Sơn, Hoà Bình",
    price: "1.300.000 ~ 4.500.000/đêm",
  },
  {
    _id: 2,
    url: "https://nghiduongngoaio.com/wp-content/uploads/2022/02/canh-quan-48.jpg",
    name: "Onsen Villas Resort, Dân Hòa, Kỳ Sơn, Hoà Bình",
    price: "1.300.000 ~ 4.500.000/đêm",
  },
  {
    _id: 3,
    url: "https://nghiduongngoaio.com/wp-content/uploads/2022/02/canh-quan-48.jpg",
    name: "Onsen Villas Resort, Dân Hòa, Kỳ Sơn, Hoà Bình",
    price: "1.300.000 ~ 4.500.000/đêm",
  },
  {
    _id: 4,
    url: "https://nghiduongngoaio.com/wp-content/uploads/2022/02/canh-quan-48.jpg",
    name: "Onsen Villas Resort, Dân Hòa, Kỳ Sơn, Hoà Bình",
    price: "1.300.000 ~ 4.500.000/đêm",
  },
];
