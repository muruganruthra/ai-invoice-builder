const defaultInvoice = {
  company: {
    name: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
  },

  customer: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },

  invoiceInfo: {
    invoiceNumber: `INV-${Date.now()}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    currency: "INR",
    status: "Draft",
  },

  items: [
    {
      id: crypto.randomUUID(),
      name: "",
      qty: 1,
      price: 0,
    },
  ],

  tax: {
    gst: 18,
    discount: 0,
    shipping: 0,
  },

  notes:
  "Thank you for your business.",

payment: {
  bankName: "",
  accountName: "",
  accountNumber: "",
  ifsc: "",
  upi: "",
},

terms: [
  "Payment is due within 15 days.",
  "Goods once sold cannot be returned.",
  "Late payments may incur additional charges.",
]
};

export default defaultInvoice;