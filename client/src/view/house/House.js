import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import "./house.scss";
import useScroll from "../../hooks/useScroll";
import { getHouseDetail } from "../../services/house";
import { formatCash } from "../../utils/Helper";

import ServiceList from "../../component/service/ServiceList";
import ImageList from "../../component/image-list/ImageList";
import Modal from "../../component/modal/Modal";

function House() {
  const { houseId } = useParams();
  const [visible, setVisible] = useScroll(600);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getHouseDetail(houseId);
        // neu co du lieu
        if (res.house) {
          setError(null);
          setData(res.house);
        }
      } catch (e) {
        setData([]);
        setError(e.message);
      }
    };
    getData();
  }, []);

  const handleClick = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)} />

      {data != null
        ? visible && (
            <div className="house-sticky">
              <div className="house-name">
                <p className="name-title">Giá từ</p>
                <p className="house-price">
                  {formatCash(data.price) + "  đ/đêm"}
                </p>
              </div>
              <button onClick={handleClick}>Tư vấn ngay</button>
            </div>
          )
        : null}
      <section className="house-details">
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
            <div className="house-info">
              <div className="house-name">
                <h1 className="house-heading">{data.name}</h1>
              </div>
              <div className="house-desc">
                <p>{data.info}</p>
              </div>
              <div className="button">
                <button onClick={handleClick}>Tư vấn ngay</button>
              </div>
              <hr className="break" />
            </div>
          )}

          {/* tao component itemList */}
          <ImageList houseId={houseId} />

          <div className="services">
            <div className="heading">
              <h2 className="title">Thông tin khác</h2>
            </div>
            {<ServiceList houseId={houseId} />}
          </div>
        </div>
      </section>
    </>
  );
}

export default House;

const services = [
  {
    id: 1,
    name: "Life Is A Journey,Not A Destination",
    desc: "Lorem imsum Dolor Sit Amet Consectetur ADIPISICING eLIT.pARIATUR,nATUS",
    date: "23/09/2022",
    url: "https://nghiduongngoaio.com/wp-content/uploads/2022/02/canh-quan-48.jpg",
  },
  {
    id: 2,
    name: "Life Is A Journey,Not A Destination",
    desc: "Lorem imsum Dolor Sit Amet Consectetur ADIPISICING eLIT.pARIATUR,nATUS",
    date: "23/09/2022",
    url: "https://nghiduongngoaio.com/wp-content/uploads/2022/02/canh-quan-48.jpg",
  },
  {
    id: 3,
    name: "Life Is A Journey,Not A Destination",
    desc: "Lorem imsum Dolor Sit Amet Consectetur ADIPISICING eLIT.pARIATUR,nATUS",
    date: "23/09/2022",
    url: "https://nghiduongngoaio.com/wp-content/uploads/2022/02/canh-quan-48.jpg",
  },
  {
    id: 4,
    name: "Life Is A Journey,Not A Destination",
    desc: "Lorem imsum Dolor Sit Amet Consectetur ADIPISICING eLIT.pARIATUR,nATUS",
    date: "23/09/2022",
    url: "https://nghiduongngoaio.com/wp-content/uploads/2022/02/canh-quan-48.jpg",
  },
  {
    id: 5,
    name: "Life Is A Journey,Not A Destination",
    desc: "Lorem imsum Dolor Sit Amet Consectetur ADIPISICING eLIT.pARIATUR,nATUS",
    date: "23/09/2022",
    url: "https://nghiduongngoaio.com/wp-content/uploads/2022/02/canh-quan-48.jpg",
  },
  {
    id: 6,
    name: "Life Is A Journey,Not A Destination",
    desc: "Lorem imsum Dolor Sit Amet Consectetur ADIPISICING eLIT.pARIATUR,nATUS",
    date: "23/09/2022",
    url: "https://nghiduongngoaio.com/wp-content/uploads/2022/02/canh-quan-48.jpg",
  },
];
