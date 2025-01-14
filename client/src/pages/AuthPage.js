import React from "react";
import { Modal, Button } from "react-bootstrap";

const AuthPage = ({
  handleToggle,
  handleChange,
  handleCloseModal,
  handleSubmit,
  isLogin,
  formData,
  cities,
  districts,
  wards,
  message,
  showModal,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className={`card shadow-lg ${isLogin ? "w-96" : "w-[750px]"}`}>
        <div className="card-body p-6">
          <h2 className="text-center font-bold text-[25px] text-primary mb-6">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Tài khoản
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nhập tài khoản"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="displayName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên hiển thị
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="Nhập tên hiển thị"
                    required
                  />
                </div>

                <div className="mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Thành phố
                      </label>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Thành phố</option>
                        {cities.map((city) => (
                          <option key={city._id} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Quận/Huyện
                      </label>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        name="address.district"
                        value={formData.address.district}
                        onChange={handleChange}
                        required
                        disabled={!districts.length}
                      >
                        <option value="">Quận/Huyện</option>
                        {districts.map((district) => (
                          <option key={district.code} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phường/Xã
                      </label>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        name="address.ward"
                        value={formData.address.ward}
                        onChange={handleChange}
                        required
                        disabled={!wards.length}
                      >
                        <option value="">Phường/Xã</option>
                        {wards.map((ward) => (
                          <option key={ward.code} value={ward.name}>
                            {ward.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="specificAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Địa chỉ cụ thể
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="specificAddress"
                    name="address.specificAddress"
                    value={formData.address.specificAddress}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ nhà"
                    required
                  />
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <div className="mr-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Loại tài khoản
                      </label>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <input
                            className="mr-2"
                            type="radio"
                            name="accountType"
                            id="personalAccount"
                            value="personal"
                            checked={formData.accountType === "personal"}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="personalAccount" className="text-sm">
                            Tài khoản cá nhân
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            className="mr-2"
                            type="radio"
                            name="accountType"
                            id="shopAccount"
                            value="shop"
                            checked={formData.accountType === "shop"}
                            onChange={handleChange}
                          />
                          <label htmlFor="shopAccount" className="text-sm">
                            Shop bán hàng
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            className="mr-2"
                            type="radio"
                            name="accountType"
                            id="shipperAccount"
                            value="shipper"
                            checked={formData.accountType === "shipper"}
                            onChange={handleChange}
                          />
                          <label htmlFor="shipperAccount" className="text-sm">
                            Shipper
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-2 border-gray-300 h-12 mx-4"></div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Giới tính
                      </label>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <input
                            className="mr-2"
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                          />
                          <label htmlFor="male" className="text-sm">
                            Nam
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            className="mr-2"
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                          />
                          <label htmlFor="female" className="text-sm">
                            Nữ
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>
            )}

            <div className="d-grid mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-lg hover:bg-blue-700"
              >
                {isLogin ? "Đăng nhập" : "Đăng ký"}
              </button>
            </div>
          </form>

          {message && (
            <p className="text-center text-red-600 mt-3">{message}</p>
          )}

          <div className="text-center mt-3">
            <p>
              {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={handleToggle}
              >
                {isLogin ? "Đăng ký" : "Đăng nhập"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Modal khi đăng ký thành công */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn đã đăng ký thành công. Bạn có thể đăng nhập ngay bây giờ.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AuthPage;
