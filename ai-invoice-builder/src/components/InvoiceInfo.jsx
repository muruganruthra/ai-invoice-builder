export default function InvoiceInfo({ invoice, setInvoice }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInvoice({
      ...invoice,
      invoiceInfo: {
        ...invoice.invoiceInfo,
        [name]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Invoice Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-medium">
            Invoice Number
          </label>

          <input
            type="text"
            name="invoiceNumber"
            value={invoice.invoiceInfo.invoiceNumber}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Invoice Date
          </label>

          <input
            type="date"
            name="invoiceDate"
            value={invoice.invoiceInfo.invoiceDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Due Date
          </label>

          <input
            type="date"
            name="dueDate"
            value={invoice.invoiceInfo.dueDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Currency
          </label>

          <select
            name="currency"
            value={invoice.invoiceInfo.currency}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            value={invoice.invoiceInfo.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>
    </div>
  );
}