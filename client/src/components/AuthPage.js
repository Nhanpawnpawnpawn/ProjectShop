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
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg border-0"
        style={{ width: isLogin ? "500px" : "740px" }}
      >
        <div className="card-body p-3">
          <h2 className="text-center fw-bold text-primary mb-3">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Tài khoản
              </label>
              <input
                type="text"
                className="form-control"
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
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="displayName" className="form-label">
                    Tên hiển thị
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="Nhập tên hiển thị"
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="form-label">Thành phố</label>
                        <select
                          className="form-control"
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
                      <div className="col-md-4">
                        <label className="form-label">Quận/Huyện</label>
                        <select
                          className="form-control"
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
                      <div className="col-md-4">
                        <label className="form-label">Phường/Xã</label>
                        <select
                          className="form-control"
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

                  <div className="mb-3">
                    <label htmlFor="specificAddress" className="form-label">
                      Địa chỉ cụ thể
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="specificAddress"
                      name="address.specificAddress"
                      value={formData.address.specificAddress}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ nhà"
                      required
                    />
                  </div>
                  {/* Loại tài khoản (Cá nhân, Shop bán hàng) */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="me-4">
                        <label className="form-label">Loại tài khoản</label>
                        <div className="d-flex">
                          <div className="form-check me-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="accountType"
                              id="personalAccount"
                              value="personal"
                              checked={formData.accountType === "personal"}
                              onChange={handleChange}
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="personalAccount"
                            >
                              Tài khoản cá nhân
                            </label>
                          </div>
                          <div className="form-check me-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="accountType"
                              id="shopAccount"
                              value="shop"
                              checked={formData.accountType === "shop"}
                              onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="shopAccount"
                            >
                              Shop bán hàng
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="accountType"
                              id="shipperAccount"
                              value="shipper"
                              checked={formData.accountType === "shipper"}
                              onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="ShipperAccount"
                            >
                              Shipper
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Vạch ngăn cách */}
                      <div
                        className="border-start mx-4"
                        style={{ height: "50px" }}
                      ></div>

                      <div>
                        <label className="form-label">Giới tính</label>
                        <div className="d-flex">
                          <div className="form-check me-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="male"
                              value="male"
                              checked={formData.gender === "male"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="male">
                              Nam
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="female"
                              value="female"
                              checked={formData.gender === "female"}
                              onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="female"
                            >
                              Nữ
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>
            )}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary shadow">
                {isLogin ? "Đăng nhập" : "Đăng ký"}
              </button>
            </div>
          </form>
          {message && <p className="text-center text-danger mt-3">{message}</p>}
          <div className="text-center mt-3">
            <p>
              {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}{" "}
              <button
                type="button"
                className="btn btn-link text-decoration-none p-0"
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
