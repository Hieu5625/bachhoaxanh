import React, { useEffect, useState } from "react";
import {
  getInvoices,
  getInvoiceDetails,
  updateInvoiceStatus,
  updateStockAfterPayment,
} from "../../services/InvoiceService";

function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // Mã hóa đơn được chọn
  const [invoiceDetails, setInvoiceDetails] = useState([]); // Chi tiết hóa đơn của hóa đơn được chọn
  const [selectedInvoiceData, setSelectedInvoiceData] = useState(null); // Thông tin hóa đơn được chọn

  // Lấy danh sách hóa đơn khi component được mount
  useEffect(() => {
    async function fetchInvoices() {
      try {
        const data = await getInvoices(); // Gọi API để lấy danh sách hóa đơn
        setInvoices(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách hóa đơn:", error);
        alert("Không thể tải danh sách hóa đơn!");
      }
    }
    fetchInvoices();
  }, []);

  // Lấy chi tiết hóa đơn
  const handleViewDetails = async (invoice) => {
    try {
      const details = await getInvoiceDetails(invoice.MA_HD); // Gọi API để lấy chi tiết hóa đơn
      setInvoiceDetails(details); // Lưu chi tiết hóa đơn vào state
      setSelectedInvoice(invoice.MA_HD); // Lưu mã hóa đơn đã chọn vào state
      setSelectedInvoiceData(invoice); // Lưu thông tin hóa đơn đã chọn
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết hóa đơn:", error);
      alert("Không thể lấy chi tiết hóa đơn!");
    }
  };

  // Cập nhật trạng thái thanh toán và số lượng sản phẩm
  const handlePaymentStatusChange = async () => {
    if (selectedInvoiceData?.DATHANHTOAN) {
      alert("Hóa đơn đã thanh toán không thể thay đổi!");
      return;
    }

    try {
      // Cập nhật trạng thái thanh toán
      await updateInvoiceStatus(selectedInvoiceData.MA_HD, true);

      // Cập nhật số lượng sản phẩm
      await updateStockAfterPayment(selectedInvoiceData.MA_HD);

      // Cập nhật giao diện
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.MA_HD === selectedInvoiceData.MA_HD
            ? { ...inv, DATHANHTOAN: true }
            : inv
        )
      );
      setSelectedInvoiceData((prev) => ({ ...prev, DATHANHTOAN: true }));
      alert("Cập nhật trạng thái thanh toán và số lượng sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Không thể cập nhật trạng thái thanh toán hoặc số lượng sản phẩm!");
    }
  };

  return (
    <div>
      <h2>Danh Sách Hóa Đơn</h2>
      <table>
        <thead>
          <tr>
            <th>Mã HĐ</th>
            <th>Khách Hàng</th>
            <th>Nhân Viên</th>
            <th>Ngày Lập</th>
            <th>Đã Thanh Toán</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.MA_HD}>
              <td>{invoice.MA_HD}</td>
              <td>{invoice.HOTEN_KH}</td>
              <td>{invoice.HOTEN_NV}</td>
              <td>{invoice.NGAYLAPHOADON}</td>
              <td>{invoice.DATHANHTOAN ? "Có" : "Không"}</td>
              <td>
                <button onClick={() => handleViewDetails(invoice)}>
                  Xem Chi Tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hiển thị chi tiết hóa đơn */}
      {selectedInvoice && (
        <div>
          <h3>Chi Tiết Hóa Đơn: {selectedInvoice}</h3>
          <table>
            <thead>
              <tr>
                <th>Sản Phẩm</th>
                <th>Số Lượng</th>
                <th>Giảm Giá</th>
                <th>Thành Tiền</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.TENHANG}</td>
                  <td>{detail.SOLUONGBAN}</td>
                  <td>{detail.GIAMGIA}</td>
                  <td>{detail.THANHTIEN}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handlePaymentStatusChange}
            disabled={selectedInvoiceData?.DATHANHTOAN}
          >
            {selectedInvoiceData?.DATHANHTOAN ? "Đã Thanh Toán" : "Thanh Toán"}
          </button>
        </div>
      )}
    </div>
  );
}

export default InvoiceTable;
