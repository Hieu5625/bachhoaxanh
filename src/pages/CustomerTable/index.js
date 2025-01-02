import React, { useEffect, useState } from "react";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/CustomerService";

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    MA_KH: "",
    HOTEN_KH: "",
    SDT_KH: "",
    EMAIL_KH: "",
  });
  const [editedCustomer, setEditedCustomer] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
      }
    }
    fetchCustomers();
  }, []);

  // Lọc danh sách khách hàng dựa trên từ khóa tìm kiếm
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.HOTEN_KH?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      customer.MA_KH?.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancelAddClick = () => {
    setNewCustomer({
      MA_KH: "",
      HOTEN_KH: "",
      SDT_KH: "",
      EMAIL_KH: "",
    });
    setIsAdding(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const addedCustomer = await addCustomer(newCustomer);
      setCustomers([...customers, addedCustomer]);
      setNewCustomer({
        MA_KH: "",
        HOTEN_KH: "",
        SDT_KH: "",
        EMAIL_KH: "",
      });
      setIsAdding(false);
      alert("Khách hàng đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm khách hàng:", error);
      alert("Không thể thêm khách hàng!");
    }
  };

  const handleEditClick = (customer) => {
    setEditingCustomerId(customer.MA_KH);
    setEditedCustomer(customer);
  };

  const handleSaveEditClick = async () => {
    try {
      await updateCustomer(editingCustomerId, editedCustomer);
      setCustomers(
        customers.map((customer) =>
          customer.MA_KH === editingCustomerId ? editedCustomer : customer
        )
      );
      setEditingCustomerId(null);
      alert("Cập nhật khách hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật khách hàng:", error);
      alert("Không thể cập nhật khách hàng!");
    }
  };

  const handleDeleteClick = async (MA_KH) => {
    try {
      const result = await deleteCustomer(MA_KH);
      if (result && result.message === "Xóa khách hàng thành công!") {
        setCustomers(customers.filter((customer) => customer.MA_KH !== MA_KH));
        alert(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa khách hàng:", error);
      alert("Không thể xóa khách hàng!");
    }
  };

  return (
    <div>
      <h3>Danh Sách Khách Hàng</h3>
      <div>
        <button onClick={handleAddClick} className="add-customer-button">
          Thêm Khách Hàng
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng..."
          value={searchKeyword}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã Khách</th>
            <th>Họ Tên Khách</th>
            <th>Số Điện Thoại</th>
            <th>Email</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {isAdding && (
            <tr>
              <td>
                <input
                  type="text"
                  name="MA_KH"
                  value={newCustomer.MA_KH}
                  onChange={handleInputChange}
                  placeholder="Mã Khách"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="HOTEN_KH"
                  value={newCustomer.HOTEN_KH}
                  onChange={handleInputChange}
                  placeholder="Họ Tên"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="SDT_KH"
                  value={newCustomer.SDT_KH}
                  onChange={handleInputChange}
                  placeholder="Số Điện Thoại"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="EMAIL_KH"
                  value={newCustomer.EMAIL_KH}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </td>
              <td>
                <button onClick={handleSaveClick} className="save-button">
                  Lưu
                </button>
                <button
                  onClick={handleCancelAddClick}
                  className="cancel-button"
                >
                  Hủy
                </button>
              </td>
            </tr>
          )}

          {filteredCustomers.map((customer) =>
            editingCustomerId === customer.MA_KH ? (
              <tr key={customer.MA_KH}>
                <td>{customer.MA_KH}</td>
                <td>
                  <input
                    type="text"
                    name="HOTEN_KH"
                    value={editedCustomer.HOTEN_KH}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="SDT_KH"
                    value={editedCustomer.SDT_KH}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="EMAIL_KH"
                    value={editedCustomer.EMAIL_KH}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <button onClick={handleSaveEditClick} className="save-button">
                    Lưu
                  </button>
                  <button
                    onClick={() => setEditingCustomerId(null)}
                    className="cancel-button"
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={customer.MA_KH}>
                <td>{customer.MA_KH}</td>
                <td>{customer.HOTEN_KH}</td>
                <td>{customer.SDT_KH}</td>
                <td>{customer.EMAIL_KH}</td>
                <td>
                  <button onClick={() => handleEditClick(customer)}>Sửa</button>
                  <button onClick={() => handleDeleteClick(customer.MA_KH)}>
                    Xóa
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
