import React, { useState } from "react";

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
    <div className="container mt-5">
      {/* Thông tin shop */}
      <div className="d-flex align-items-center mb-4">
        <img
          src={`http://localhost:3000/${
            shopInfo?.avatar || "images/avatar_default.png"
          }`}
          alt="Shop Avatar"
          className="rounded-circle me-3"
          style={{ width: "100px", height: "100px" }}
        />
        <div>
          <h2 className="fw-bold">{shopInfo?.displayName || "Đang tải..."}</h2>
          <p className="text-muted mb-0">⭐⭐⭐⭐⭐ (200 reviews)</p>
        </div>
      </div>

      {/* Đánh giá */}
      <div className="mb-5">
        <h4 className="fw-bold">Customer Reviews</h4>
        <ul className="list-group mb-3">
          {comments.map((comment) => (
            <li className="list-group-item" key={comment.id}>
              <strong>{comment.author}:</strong> {comment.text}
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleAddComment}>
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerShopLayout;
