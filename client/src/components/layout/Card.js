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
    <div className="container mx-auto mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <Link
              to={`/product/${card._id}`}
              className="block transition-transform transform hover:scale-105"
            >
              <img
                src={
                  `http://localhost:3000/${card.singleImage}` ||
                  "https://via.placeholder.com/150"
                }
                alt={card.productName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`fa fa-star ${
                        index < card.stars ? "text-yellow-500" : "text-gray-300"
                      }`}
                    ></span>
                  ))}
                </div>
                <h5 className="text-lg font-semibold text-gray-800">
                  {card.productName}
                </h5>
                <p className="text-sm text-gray-600">{card.shopName}</p>
                <p className="text-lg font-bold text-blue-600">
                  {card.productPrice
                    ? `${card.productPrice.toLocaleString()} VND`
                    : "Liên hệ"}
                </p>
              </div>
              <div className="p-4 bg-gray-100">
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                  Mua Ngay
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-6">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={handleLoadMore}
          >
            Xem Thêm
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
