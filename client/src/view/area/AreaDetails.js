import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./_area_detail.scss";
import useScroll from "../../hooks/useScroll";
import { getAreaDetail } from "../../services/area";
import { formatCash } from "../../utils/Helper";
import HouseList from "../../component/house/HouseList";
import ImageList from "../../component/image-list/ImageList";
import ServiceList from "../../component/service/ServiceList";
import Modal from "../../component/modal/Modal";

//tach service list thanh component rieng
function AreaDetails() {
  const { areaId } = useParams();
  const [visible, setVisible] = useScroll(600);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleClick = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAreaDetail(areaId);
        // neu co du lieu
        if (res.area) {
          setError(null);
          setData(res.area);
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
      <Modal open={openModal} onClose={() => setOpenModal(false)} />

      {/* <SearchForm /> */}
      {visible && (
        <div className="area-sticky">
          <div className="area-name">
            <p className="name-title">Giá từ</p>
            <p className="area-price">
              {formatCash(data.minPrice) + "-" + formatCash(data.maxPrice)} đ/đêm
            </p>
          </div>
          <button onClick={handleClick}>Tư vấn ngay</button>
        </div>
      )}
      <section className="area-details">
        <div className="container">
          {error && (
            <>
              <h1
                className="error"
                style={{ textAlign: "left", paddingLeft: "0.9rem" }}
              >
                {"Thông tin chi tiết hiện tại đang lỗi.Vui lòng thử lại sau."}
              </h1>
            </>
          )}
          {data && (
            <div className="area-info">
              <div className="area-name">
                <h1 className="area-heading">{data.name}</h1>
              </div>
              <div className="area-desc">
                <p>{data.description}</p>
              </div>
              <div className="button">
                <button onClick={handleClick}>Tư vấn ngay</button>
              </div>
              <hr className="break" />
            </div>
          )}
          {/* tao component itemList */}

          <ImageList areaId={areaId} />

          <div className="houses">
            <div className="heading">
              <h2 className="title">Danh sách căn</h2>
            </div>
            <HouseList areaId={areaId} />
            {/*
            <div className="house-list">
              {houses.map((service) => (
                <HouseItem data={service} />
              ))}
            </div>
              */}
            <hr className="break" />
          </div>

          <div className="services">
            <div className="heading">
              <h2 className="title">Thông tin khác</h2>
            </div>
            <ServiceList areaId={areaId} />
          </div>
        </div>
      </section>
    </>
  );
}

export default AreaDetails;


