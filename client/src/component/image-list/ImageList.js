import React, { useState, useEffect } from "react";
import { useMatch } from "react-router";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./_image_list.scss";
import { getAreaImages } from "../../services/image";
import { getHouseImages } from "../../services/image";


// pass vao name va loai anh can goi
function ImageList(props) {
  const isMatchPath = useMatch("/area/:areaId");
  const [isVisible, setVisible] = useState(false);
  const [key, setKey] = useState([]);
  const [data, setData] = useState(image);
  const [error, setError] = useState("");
  const [images, setImage] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  
  

  useEffect(() => {
    const getData = async () => {
      try {
        let res;
        if (isMatchPath) {
          res = await getAreaImages(props.areaId);
        } else {
          res = await getHouseImages(props.houseId);
        }
        if (res) {
          
          let img = [];
          for (const property in res) {
           

            res[property].forEach((element) => {
              img.push({
                id:element._id,
                url: element.url,
                category: property,
                description: element.description,
              });
            });
          }
          setError(null);
          setImage(img);
          setData(res);
          setKey(Object.keys(res));
        }
      } catch (e) {
        
        setImage([])
        setError(e.message);
      }
    };
    getData();
  }, []);


  const handleClick = () => {
    setVisible(true);
  };
  return (
    <div className="image-gallery">
      {error && (
        <>
          <h2 className="title">{"Danh sách ảnh"}</h2>
          <h1 className="error" style={{ textAlign: "left" }}>
            {"Danh sách ảnh hiện tại đang lỗi.Vui lòng thử lại sau."}
          </h1>
          <hr className="break" />
        </>
      )}
      <div className="image-container">
        {isVisible && (
          <Lightbox
            mainSrc={images[photoIndex].url}
            nextSrc={images[(photoIndex + 1) % images.length].url}
            prevSrc={
              images[(photoIndex + images.length - 1) % images.length].url
            }
            onCloseRequest={() => setVisible(false)}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (prevIndex) => (prevIndex + images.length - 1) % images.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((prevIndex) => (prevIndex + 1) % images.length)
            }
            imageTitle={images[photoIndex].category}
            imageCaption={images[photoIndex].description}
          />
        )}
        {key && (
          <>
            {key.map((index) => (
              <div key={index}>
                <h2 className="title">{index}</h2>
                <div className="images">
                  {data[index].map((image) => (
                    <img
                      key={image._id}
                      src={image.url}
                      onClick={() => {
                        const idx = images.findIndex((e) => e.id === image._id);
                        setPhotoIndex(idx);
                        handleClick();
                      }}
                      alt={image.description}
                    />
                  ))}
                </div>
                <hr className="break" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const image = [];
export default ImageList;
