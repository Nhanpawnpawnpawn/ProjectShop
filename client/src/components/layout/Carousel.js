import React from "react";
import "../../css/home.css";

function Carousel() {
  return (
    <div className="container pt-2">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/home/la.jpg"
              className="d-block w-100"
              alt="Sản Phẩm 1"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Sản Phẩm 1</h5>
              <p>Miêu tả ngắn về sản phẩm 1. Sản phẩm này rất hot!</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/images/home/chicago.jpg"
              className="d-block w-100"
              alt="Sản Phẩm 2"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Sản Phẩm 2</h5>
              <p>
                Miêu tả ngắn về sản phẩm 2. Sản phẩm này được yêu thích bởi
                khách hàng.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/images/home/ny1.jpg"
              className="d-block w-100"
              alt="Sản Phẩm 3"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Sản Phẩm 3</h5>
              <p>
                Miêu tả ngắn về sản phẩm 3. Đây là lựa chọn tuyệt vời cho bạn!
              </p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Trước</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Sau</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
