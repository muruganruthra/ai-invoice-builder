export default function TotalCard({
  invoice,
  setInvoice,
  totals,
}) {
  const updateTax = (field, value) => {
    setInvoice({
      ...invoice,
      tax: {
        ...invoice.tax,
        [field]: Number(value),
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">

      <h2 className="text-2xl font-bold mb-6">
        Invoice Summary
      </h2>

      {/* Subtotal */}

      <div className="flex justify-between mb-4">

        <span className="font-medium">
          Subtotal
        </span>

        <span className="font-semibold">
          ₹{totals.subtotal.toLocaleString()}
        </span>

      </div>

      {/* GST */}

      <div className="mb-4">

        <label className="block mb-2 font-medium">
          GST (%)
        </label>

        <input
          type="number"
          min="0"
          max="100"
          value={invoice.tax.gst}
          onChange={(e) =>
            updateTax("gst", e.target.value)
          }
          className="w-full border rounded-lg p-2"
        />

      </div>

      {/* Discount */}

      <div className="mb-4">

        <label className="block mb-2 font-medium">
          Discount
        </label>

        <input
          type="number"
          min="0"
          value={invoice.tax.discount}
          onChange={(e) =>
            updateTax("discount", e.target.value)
          }
          className="w-full border rounded-lg p-2"
        />

      </div>

      {/* Shipping */}

      <div className="mb-4">

        <label className="block mb-2 font-medium">
          Shipping
        </label>

        <input
          type="number"
          min="0"
          value={invoice.tax.shipping}
          onChange={(e) =>
            updateTax("shipping", e.target.value)
          }
          className="w-full border rounded-lg p-2"
        />

      </div>

      <hr className="my-5"/>

      {/* GST Amount */}

      <div className="flex justify-between mb-3">

        <span>GST Amount</span>

        <span>
          ₹{totals.gstAmount.toLocaleString()}
        </span>

      </div>

      {/* Shipping */}

      <div className="flex justify-between mb-3">

        <span>Shipping</span>

        <span>
          ₹{totals.shipping.toLocaleString()}
        </span>

      </div>

      {/* Discount */}

      <div className="flex justify-between mb-3">

        <span>Discount</span>

        <span>
          - ₹{totals.discount.toLocaleString()}
        </span>

      </div>

      <hr className="my-5"/>

      {/* Grand Total */}

      <div className="flex justify-between text-2xl font-bold text-blue-700">

        <span>Grand Total</span>

        <span>
          ₹{totals.grandTotal.toLocaleString()}
        </span>

      </div>

      <button
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Save Invoice
      </button>

      <button
        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Preview Invoice
      </button>

    </div>
  );
}