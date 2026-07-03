import { calculateInvoice } from "../utils/calculate";
import { downloadInvoicePDF } from "../Services/pdf";

export default function InvoicePreview({ invoice }) {
  const totals = calculateInvoice(invoice);

  const handleDownload = async () => {
    try {
      await downloadInvoicePDF(
        invoice.invoiceInfo.invoiceNumber || "Invoice"
      );
    } catch (error) {
      console.error(error);
      alert("Unable to generate PDF.");
    }
  };

  return (
    <>
      {/* ================= ACTION BUTTONS ================= */}

      <div className="flex justify-end gap-4 mb-6">

        <button
          onClick={handleDownload}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          📄 Download PDF
        </button>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          🖨 Print
        </button>

      </div>

      <div
        id="invoice-preview"
        className="bg-white shadow-xl rounded-xl p-10 max-w-5xl mx-auto"
      >

        {/* ================= HEADER ================= */}

        <div className="flex justify-between items-start border-b pb-8">

          <div>

            <h1 className="text-5xl font-extrabold text-blue-700">
              INVOICE
            </h1>

            <p className="text-gray-500 mt-2">
              AI Powered Invoice Builder
            </p>

          </div>

          <div className="text-right">

            <h2 className="text-3xl font-bold">
              {invoice.company.name || "Company Name"}
            </h2>

            <p>{invoice.company.address}</p>

            <p>{invoice.company.phone}</p>

            <p>{invoice.company.email}</p>

            <p className="mt-2 font-semibold">
              GST : {invoice.company.gstNumber}
            </p>

          </div>

        </div>

        {/* ================= FROM / BILL TO ================= */}

        <div className="grid md:grid-cols-2 gap-10 mt-10">

          <div>

            <h3 className="text-xl font-bold text-blue-700 mb-4">
              From
            </h3>

            <div className="space-y-2">

              <p className="font-semibold">
                {invoice.company.name}
              </p>

              <p>{invoice.company.address}</p>

              <p>{invoice.company.phone}</p>

              <p>{invoice.company.email}</p>

            </div>

          </div>

          <div>

            <h3 className="text-xl font-bold text-blue-700 mb-4">
              Bill To
            </h3>

            <div className="space-y-2">

              <p className="font-semibold">
                {invoice.customer.name}
              </p>

              <p>{invoice.customer.address}</p>

              <p>{invoice.customer.phone}</p>

              <p>{invoice.customer.email}</p>

            </div>

          </div>

        </div>

        {/* ================= INVOICE DETAILS ================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

          <div className="bg-gray-100 rounded-lg p-4">

            <p className="text-sm text-gray-500">
              Invoice No.
            </p>

            <h4 className="font-bold mt-1">
              {invoice.invoiceInfo.invoiceNumber}
            </h4>

          </div>

          <div className="bg-gray-100 rounded-lg p-4">

            <p className="text-sm text-gray-500">
              Invoice Date
            </p>

            <h4 className="font-bold mt-1">
              {invoice.invoiceInfo.invoiceDate}
            </h4>

          </div>

          <div className="bg-gray-100 rounded-lg p-4">

            <p className="text-sm text-gray-500">
              Due Date
            </p>

            <h4 className="font-bold mt-1">
              {invoice.invoiceInfo.dueDate || "-"}
            </h4>

          </div>

          <div className="bg-gray-100 rounded-lg p-4">

            <p className="text-sm text-gray-500">
              Status
            </p>

            <h4 className="font-bold text-green-600 mt-1">
              {invoice.invoiceInfo.status}
            </h4>

          </div>

        </div>

        {/* ================= PRODUCT TABLE ================= */}
        <div className="mt-12 overflow-x-auto">

  <table className="w-full border-collapse border border-gray-300">

    <thead className="bg-blue-600 text-white">

      <tr>

        <th className="border border-gray-300 p-3 w-16">
          #
        </th>

        <th className="border border-gray-300 p-3 text-left">
          Product
        </th>

        <th className="border border-gray-300 p-3 w-24">
          Qty
        </th>

        <th className="border border-gray-300 p-3 w-40">
          Unit Price
        </th>

        <th className="border border-gray-300 p-3 w-40">
          Total
        </th>

      </tr>

    </thead>

    <tbody>

      {invoice.items.length === 0 ? (

        <tr>

          <td
            colSpan={5}
            className="border border-gray-300 text-center py-8 text-gray-500"
          >
            No Products Added
          </td>

        </tr>

      ) : (

        invoice.items.map((item, index) => (

          <tr
            key={item.id}
            className="hover:bg-gray-50"
          >

            <td className="border border-gray-300 p-3 text-center">
              {index + 1}
            </td>

            <td className="border border-gray-300 p-3">
              {item.name || "-"}
            </td>

            <td className="border border-gray-300 p-3 text-center">
              {item.qty}
            </td>

            <td className="border border-gray-300 p-3 text-right">
              ₹{Number(item.price).toLocaleString()}
            </td>

            <td className="border border-gray-300 p-3 text-right font-semibold">
              ₹{(item.qty * item.price).toLocaleString()}
            </td>

          </tr>

        ))

      )}

    </tbody>

  </table>

</div>

{/* ================= TOTALS ================= */}

<div className="flex justify-end mt-10">

  <div className="w-full md:w-96 bg-gray-50 rounded-xl border p-6">

    <div className="flex justify-between py-2">

      <span className="text-gray-600">
        Subtotal
      </span>

      <span className="font-semibold">
        ₹{totals.subtotal.toLocaleString()}
      </span>

    </div>

    <div className="flex justify-between py-2">

      <span className="text-gray-600">
        GST ({invoice.tax.gst}%)
      </span>

      <span className="font-semibold">
        ₹{totals.gstAmount.toLocaleString()}
      </span>

    </div>

    <div className="flex justify-between py-2">

      <span className="text-gray-600">
        Shipping
      </span>

      <span className="font-semibold">
        ₹{totals.shipping.toLocaleString()}
      </span>

    </div>

    <div className="flex justify-between py-2">

      <span className="text-gray-600">
        Discount
      </span>

      <span className="font-semibold text-red-600">
        - ₹{totals.discount.toLocaleString()}
      </span>

    </div>

    <hr className="my-4" />

    <div className="flex justify-between text-2xl font-bold text-blue-700">

      <span>Grand Total</span>

      <span>
        ₹{totals.grandTotal.toLocaleString()}
      </span>

    </div>

  </div>

</div>

{/* ================= NOTES ================= */}
{/* ================= NOTES & PAYMENT DETAILS ================= */}

<div className="grid md:grid-cols-2 gap-10 mt-16">

  <div>

    <h3 className="text-xl font-bold text-blue-700 mb-4">
      Notes
    </h3>

    <div className="bg-gray-50 border rounded-lg p-5 min-h-[180px]">

      <p className="whitespace-pre-wrap text-gray-700">
        {invoice.notes || "Thank you for your business."}
      </p>

    </div>

  </div>

  <div>

    <h3 className="text-xl font-bold text-blue-700 mb-4">
      Payment Details
    </h3>

    <div className="bg-gray-50 border rounded-lg p-5 space-y-3">

      <div className="flex justify-between">
        <span className="font-medium">Bank</span>
        <span>{invoice.payment?.bankName || "-"}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Account Name</span>
        <span>{invoice.payment?.accountName || "-"}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Account Number</span>
        <span>{invoice.payment?.accountNumber || "-"}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">IFSC</span>
        <span>{invoice.payment?.ifsc || "-"}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">UPI</span>
        <span>{invoice.payment?.upi || "-"}</span>
      </div>

    </div>

  </div>

</div>

{/* ================= TERMS ================= */}

<div className="mt-16">

  <h3 className="text-xl font-bold text-blue-700 mb-4">
    Terms & Conditions
  </h3>

  {(invoice.terms || []).length > 0 ? (

    <ul className="list-disc pl-6 space-y-2 text-gray-700">

      {invoice.terms.map((term, index) => (

        <li key={index}>
          {term}
        </li>

      ))}

    </ul>

  ) : (

    <p className="text-gray-500">
      No terms available.
    </p>

  )}

</div>

{/* ================= SIGNATURE ================= */}

<div className="mt-24 flex justify-end">

  <div className="text-center">

    <div className="w-64 border-b-2 border-gray-500 mb-3"></div>

    <p className="font-semibold">
      Authorized Signature
    </p>

  </div>

</div>

{/* ================= FOOTER ================= */}

<div className="mt-20 border-t pt-6">

  <div className="flex flex-col md:flex-row justify-between items-center gap-4">

    <div className="text-gray-500 text-sm">
      Generated using AI Invoice Builder
    </div>

  </div>

</div>

      </div>
    </>
  );
}