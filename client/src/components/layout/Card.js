import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../css/card.css";

function Card({ cards, hasMore, fetchProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);
  return (
    <div className="container mt-3">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {cards.map((card) => (
          <div className="col" key={card._id}>
            <Link to={`/product/${card._id}`} className="text-decoration-none">
              <div className="card h-100 product-card">
                <img
                  src={
                    `http://localhost:3000/${card.singleImage}` ||
                    "https://via.placeholder.com/150"
                  }
                  className="card-img-top"
                  alt={card.productName}
                />
                <div className="card-body">
                  <div className="rating">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`fa fa-star ${
                          index < card.stars ? "checked" : ""
                        }`}
                      ></span>
                    ))}
                  </div>
                  <h5 className="card-title text-dark">{card.productName}</h5>
                  <p className="card-text text-muted">{card.shopName}</p>
                  <p className="card-text text-primary fw-bold">
                    {card.productPrice
                      ? `${card.productPrice.toLocaleString()} VND`
                      : "Liên hệ"}
                  </p>
                </div>
                <div className="card-footer text-center">
                  <button className="btn btn-danger w-100">Mua Ngay</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Xem Thêm
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
