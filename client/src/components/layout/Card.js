import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../css/card.css";

function Card({ cards, hasMore, fetchProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchProducts(currentPage, searchQuery); // Truyền từ khóa vào hàm fetchProducts
  }, [currentPage, searchQuery]);
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="container mx-auto mt-8 px-4">
      {/* Nếu không có sản phẩm nào */}
      {cards.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-xl">Không có sản phẩm nào phù hợp</p>
        </div>
      ) : (
        <>
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {cards.map((card) => (
              <div
                key={card._id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border"
              >
                <Link to={`/product/${card._id}`} className="block">
                  <div className="relative">
                    <img
                      src={
                        `http://localhost:3000/${card.singleImage}` ||
                        "https://via.placeholder.com/150"
                      }
                      alt={card.productName}
                      className="w-full h-56 object-cover"
                    />
                    {card.isOnSale && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-lg shadow">
                        Sale
                      </span>
                    )}
                  </div>
                  <div className="px-4 pt-4">
                    <h5 className="text-lg font-semibold text-gray-800 truncate">
                      {card.productName}
                    </h5>
                    <p className="text-sm text-gray-500">{card.shopName}</p>
                    <div className="flex items-center my-2">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fa fa-star ${
                            index < card.stars
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-right text-blue-600">
                      {card.productPrice
                        ? `${card.productPrice.toLocaleString()}`
                        : "Liên hệ"}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-medium">
                      Mua Ngay
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Load more button */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow font-medium"
                onClick={handleLoadMore}
              >
                Xem Thêm
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Card;
