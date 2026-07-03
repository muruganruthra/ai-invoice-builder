export default function CustomerInfo({ invoice, setInvoice }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInvoice({
      ...invoice,
      customer: {
        ...invoice.customer,
        [name]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">
        Customer Details
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={invoice.customer.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Customer Email"
          value={invoice.customer.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          name="phone"
          placeholder="Customer Phone"
          value={invoice.customer.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          rows={3}
          name="address"
          placeholder="Customer Address"
          value={invoice.customer.address}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
  );
}