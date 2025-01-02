import React, { useEffect, useState } from "react";
import { getReceipts, getReceiptDetails } from "../../services/ReceiptService";

function ReceiptTable() {
  const [receipts, setReceipts] = useState([]);
  const [selectedReceiptDetails, setSelectedReceiptDetails] = useState(null);

  // Lấy danh sách phiếu nhập khi component được mount
  useEffect(() => {
    async function fetchReceipts() {
      try {
        const data = await getReceipts();
        setReceipts(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phiếu nhập:", error);
      }
    }
    fetchReceipts();
  }, []);

  // Lấy chi tiết phiếu nhập
  const handleViewDetails = async (SOPHIEUNHAPHANG) => {
    try {
      const details = await getReceiptDetails(SOPHIEUNHAPHANG);
      setSelectedReceiptDetails(details);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết phiếu nhập:", error);
      alert("Không thể xem chi tiết phiếu nhập!");
    }
  };

  return (
    <div>
      <h3>Danh Sách Phiếu Nhập</h3>
      <table>
        <thead>
          <tr>
            <th>Số Phiếu</th>
            <th>Nhân Viên</th>
            <th>Nhà Cung Cấp</th>
            <th>Ngày Nhập</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt) => (
            <tr key={receipt.SOPHIEUNHAPHANG}>
              <td>{receipt.SOPHIEUNHAPHANG}</td>
              <td>{receipt.HOTEN_NV}</td>
              <td>{receipt.NHACUNGCAP}</td>
              <td>{receipt.NGAYNHAPHANG}</td>
              <td>
                <button
                  onClick={() => handleViewDetails(receipt.SOPHIEUNHAPHANG)}
                >
                  Xem Chi Tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hiển thị chi tiết phiếu nhập */}
      {selectedReceiptDetails && (
        <div>
          <h3>
            Chi Tiết Phiếu Nhập: {selectedReceiptDetails[0]?.SOPHIEUNHAPHANG}
          </h3>
          <table>
            <thead>
              <tr>
                <th>Tên Hàng</th>
                <th>Số Lượng</th>
                <th>Đơn Giá</th>
                <th>Chất Lượng</th>
              </tr>
            </thead>
            <tbody>
              {selectedReceiptDetails.map((item, index) => (
                <tr key={index}>
                  <td>{item.TENHANG}</td>
                  <td>{item.SOLUONGNHAP}</td>
                  <td>{item.DONGIANHAP}</td>
                  <td>{item.CHATLUONGHANG ? "Còn Hạn" : "Hết Hạn"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setSelectedReceiptDetails(null)}>Đóng</button>
        </div>
      )}
    </div>
  );
}

export default ReceiptTable;
