import { FaShoppingCart } from "react-icons/fa"; // Import icon giỏ hàng
import UserContext from "../../context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Thêm nút hiển thị giỏ hàng
const CartProduct = ({ onClick }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(UserContext);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const toggleCartDropdown = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
  };
  return (
    <div>
      <button
        onClick={toggleCartDropdown}
        className="fixed bottom-[20px] right-3 bg-blue-500 text-white px-[16px] py-[10px] rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
        title="Xem giỏ hàng"
      >
        <FaShoppingCart size={20} />
      </button>
      {isCartDropdownOpen && (
        <div className="fixed bottom-[60px] right-[60px] w-[360px] bg-white border rounded shadow-lg z-50">
          {cartItems.length > 0 ? (
            <div>
              <ul className="divide-y">
                {cartItems.map((item) => (
                  <li
                    key={item.productId}
                    className="flex items-center space-x-4 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={`http://localhost:3000/${item.image}`}
                      alt={item.productName}
                      className="px-2 py-2 w-[70px] h-[70px] object-cover rounded"
                      onClick={() => navigate(`/product/${item.productId}`)}
                    />
                    <div
                      className="flex-1 w-[100px]"
                      onClick={() => navigate(`/product/${item.productId}`)}
                    >
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {item.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p
                      className="text-sm font-medium text-gray-800"
                      onClick={() => navigate(`/product/${item.productId}`)}
                    >
                      {(item.productPrice * item.quantity).toLocaleString()}₫
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="font-bol text-red-500 hover:text-red-900 hover:bg-gray-300 h-100 px-4 py-4 border-l"
                    >
                      Xóa
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-4 text-gray-700">Giỏ hàng trống</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartProduct;
