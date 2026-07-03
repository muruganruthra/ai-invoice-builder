export default function CompanyInfo({ invoice, setInvoice }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInvoice({
      ...invoice,
      company: {
        ...invoice.company,
        [name]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">
        Company Details
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={invoice.company.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Company Email"
          value={invoice.company.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={invoice.company.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          rows={3}
          name="address"
          placeholder="Company Address"
          value={invoice.company.address}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          name="gstNumber"
          placeholder="GST Number"
          value={invoice.company.gstNumber}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
  );
}