import React, { useEffect, useState } from "react";
import { getEmployees } from "../../services/EmployeeService";
import { getProducts } from "../../services/ProductService";
import {
  getSuppliers,
  addReceipt,
  addReceiptDetail,
} from "../../services/ReceiptService";

// Hàm định dạng ngày hiện tại theo định dạng YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

function ReceiptForm() {
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [receipt, setReceipt] = useState({
    SOPHIEUNHAPHANG: "",
    MA_NV: "",
    NHACUNGCAP: "",
    NGAYNHAPHANG: getTodayDate(), // Ngày mặc định là hôm nay
    details: [],
  });
  const [detail, setDetail] = useState({
    MAVACH: "",
    SOLUONGNHAP: 0,
    DONGIANHAP: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const employeeData = await getEmployees();
        const productData = await getProducts();
        const supplierData = await getSuppliers();
        setEmployees(employeeData);
        setProducts(productData);
        setSuppliers(supplierData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddDetail = () => {
    setReceipt((prev) => ({
      ...prev,
      details: [
        ...prev.details,
        { ...detail, TENHANG: getProductName(detail.MAVACH) },
      ],
    }));
    setDetail({ MAVACH: "", SOLUONGNHAP: 0, DONGIANHAP: 0 });
  };

  const getProductName = (MAVACH) => {
    const product = products.find((p) => p.MAVACH === MAVACH);
    return product ? product.TENHANG : "";
  };

  const handleSubmit = async () => {
    try {
      await addReceipt(receipt);
      for (const d of receipt.details) {
        await addReceiptDetail({
          SOPHIEUNHAPHANG: receipt.SOPHIEUNHAPHANG,
          ...d,
        });
      }
      alert("Phiếu nhập hàng đã được lưu!");
    } catch (error) {
      console.error("Lỗi khi lưu phiếu nhập hàng:", error);
      alert("Không thể lưu phiếu nhập hàng!");
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = getTodayDate();
    if (selectedDate < today) {
      alert("Không thể chọn ngày trước hôm nay!");
      setReceipt({ ...receipt, NGAYNHAPHANG: today }); // Đặt lại là hôm nay
    } else {
      setReceipt({ ...receipt, NGAYNHAPHANG: selectedDate });
    }
  };

  return (
    <div>
      <h2>Lập Phiếu Nhập Hàng</h2>
      <form>
        <label>Mã Phiếu:</label>
        <input
          type="text"
          value={receipt.SOPHIEUNHAPHANG}
          onChange={(e) =>
            setReceipt({ ...receipt, SOPHIEUNHAPHANG: e.target.value })
          }
        />
        <label>Nhân Viên:</label>
        <select
          value={receipt.MA_NV}
          onChange={(e) => setReceipt({ ...receipt, MA_NV: e.target.value })}
        >
          <option value="">Chọn Nhân Viên</option>
          {employees.map((e) => (
            <option key={e.MA_NV} value={e.MA_NV}>
              {e.HOTEN_NV}
            </option>
          ))}
        </select>
        <label>Nhà Cung Cấp:</label>
        <select
          value={receipt.NHACUNGCAP}
          onChange={(e) =>
            setReceipt({ ...receipt, NHACUNGCAP: e.target.value })
          }
        >
          <option value="">Chọn Nhà Cung Cấp</option>
          {suppliers.map((supplier, index) => (
            <option key={index} value={supplier}>
              {supplier}
            </option>
          ))}
        </select>
        <label>Ngày Nhập Hàng:</label>
        <input
          type="date"
          value={receipt.NGAYNHAPHANG}
          onChange={handleDateChange}
        />
        <h3>Chi Tiết Phiếu Nhập</h3>
        <label>Sản Phẩm:</label>
        <select
          value={detail.MAVACH}
          onChange={(e) => setDetail({ ...detail, MAVACH: e.target.value })}
        >
          <option value="">Chọn Sản Phẩm</option>
          {products.map((p) => (
            <option key={p.MAVACH} value={p.MAVACH}>
              {p.TENHANG}
            </option>
          ))}
        </select>
        <label>Số Lượng:</label>
        <input
          type="number"
          value={detail.SOLUONGNHAP}
          onChange={(e) =>
            setDetail({ ...detail, SOLUONGNHAP: e.target.value })
          }
        />
        <label>Đơn Giá:</label>
        <input
          type="number"
          value={detail.DONGIANHAP}
          onChange={(e) => setDetail({ ...detail, DONGIANHAP: e.target.value })}
        />
        <button type="button" onClick={handleAddDetail}>
          Thêm Chi Tiết
        </button>
      </form>

      <h3>Danh Sách Chi Tiết</h3>
      <table>
        <thead>
          <tr>
            <th>Sản Phẩm</th>
            <th>Số Lượng</th>
            <th>Đơn Giá</th>
          </tr>
        </thead>
        <tbody>
          {receipt.details.map((d, index) => (
            <tr key={index}>
              <td>{d.TENHANG}</td>
              <td>{d.SOLUONGNHAP}</td>
              <td>{d.DONGIANHAP}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleSubmit}>
        Lưu Phiếu Nhập
      </button>
    </div>
  );
}

export default ReceiptForm;
