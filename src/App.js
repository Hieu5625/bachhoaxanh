import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import LayoutDefault from "./layout/LayoutDefault";
import ProductTable from "./pages/productTable";
import CustomerTable from "./pages/CustomerTable";
import Home from "./pages/Home";
import EmployeeTable from "./pages/EmployeeTable";
import ReceiptForm from "./pages/Receipt";
import ReceiptTable from "./pages/ReceiptTable";
import InvoiceTable from "./pages/InvoiceTable";
import CreateInvoice from "./pages/CreateInvoice";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<LayoutDefault />}>
          <Route path="home" element={<Home />} />
          <Route path="products" element={<ProductTable />} />
          <Route path="customer" element={<CustomerTable />} />
          <Route path="employees" element={<EmployeeTable />} />
          <Route path="Receipt" element={<ReceiptForm />} />
          <Route path="receipts" element={<ReceiptTable />} />
          <Route path="invoice" element={<CreateInvoice />} />
          <Route path="invoices" element={<InvoiceTable />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
