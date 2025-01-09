import React, { useState } from "react";
import { FaComment } from "react-icons/fa"; // Importing the comment icon
import CartProduct from "./actions/CartProduct";

const CustomerShopLayout = ({ shopInfo }) => {
  const [comments, setComments] = useState([
    { id: 1, author: "John", text: "Great shop, fast shipping!" },
    { id: 2, author: "Jane", text: "Excellent quality products." },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment) {
      setComments([
        ...comments,
        { id: comments.length + 1, author: "Customer", text: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Shop Info */}
      <div className="flex items-center mb-8 space-x-6">
        <img
          src={`http://localhost:3000/${
            shopInfo?.avatar || "images/avatar_default.png"
          }`}
          alt="Shop Avatar"
          className="rounded-full w-24 h-24 border-4 border-gray-300 shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            {shopInfo?.displayName || "Loading..."}
          </h2>
          <p className="text-sm text-gray-500 mt-1">⭐⭐⭐⭐⭐ (200 reviews)</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-8">
        <h4 className="text-2xl font-semibold text-gray-800 mb-4">
          Customer Reviews
        </h4>
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              className="bg-white p-3 rounded-lg shadow-md border-l-4 border-blue-500 hover:border-blue-600 transition-all"
              key={comment.id}
            >
              <strong className="text-lg font-medium text-gray-700">
                {comment.author}:
              </strong>
              <p className="text-gray-600 mt-1 text-sm">{comment.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Comment Section */}
      <div className="relative mt-6">
        <input
          type="text"
          className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm mb-4"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="absolute bottom-[27px] right-[2px] w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none transition-all"
          onClick={handleAddComment}
        >
          <FaComment size={20} />
        </button>
      </div>
      <CartProduct />
    </div>
  );
};

export default CustomerShopLayout;
