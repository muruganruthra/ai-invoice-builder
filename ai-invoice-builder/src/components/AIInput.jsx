import { useState } from "react";
import { FaRobot, FaMagic } from "react-icons/fa";
import { generateInvoice } from "../services/gemini";

export default function AIInput({ invoice, setInvoice }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter an invoice prompt.");
      return;
    }

    setLoading(true);

    try {
      const aiInvoice = await generateInvoice(prompt);

      const formattedItems = (aiInvoice.items || []).map((item) => ({
        id: crypto.randomUUID(),
        name: item.name || "",
        qty: Number(item.qty) || 1,
        price: Number(item.price) || 0,
      }));

      setInvoice({
        ...invoice,

        company: {
          ...invoice.company,
          ...(aiInvoice.company || {}),
        },

        customer: {
          ...invoice.customer,
          ...(aiInvoice.customer || {}),
        },

        invoiceInfo: {
          ...invoice.invoiceInfo,
          ...(aiInvoice.invoiceInfo || {}),
        },

        tax: {
          ...invoice.tax,
          ...(aiInvoice.tax || {}),
        },

        items:
          formattedItems.length > 0
            ? formattedItems
            : invoice.items,
      });

      alert("Invoice generated successfully!");
    } catch (error) {
      console.error(error);

      alert(
        "Unable to generate invoice.\n\nPlease check your Gemini API key or try another prompt."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearPrompt = () => {
    setPrompt("");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex items-center gap-3 mb-6">

        <FaRobot className="text-blue-600 text-3xl" />

        <div>
          <h2 className="text-2xl font-bold">
            AI Invoice Generator
          </h2>

          <p className="text-gray-500">
            Describe the invoice in plain English.
          </p>
        </div>

      </div>

      <textarea
        rows={10}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`Example:

Generate an invoice for ABC Technologies.

Company Email:
sales@abc.com

Company Phone:
9876543210

GST:
33ABCDE1234F1Z5

Customer:
John Doe

Customer Email:
john@gmail.com

Customer Phone:
9999999999

Customer Address:
Chennai

Products:

2 Dell Laptop ₹55000

3 Logitech Mouse ₹800

Shipping ₹500

Discount ₹1000

GST 18%
`}
        className="w-full border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-3 mt-6">

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg transition"
        >
          <FaMagic />

          {loading ? "Generating..." : "Generate Invoice"}
        </button>

        <button
          onClick={clearPrompt}
          className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg transition"
        >
          Clear
        </button>

      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4">

        <h3 className="font-semibold text-blue-700 mb-2">
          Example Prompt
        </h3>

        <p className="text-sm text-gray-700 whitespace-pre-line">
{`Generate an invoice for ABC Technologies.

Customer John Doe purchased:

• 2 Dell Laptop at ₹55,000 each
• 3 Logitech Mouse at ₹800 each

Shipping ₹500

Discount ₹1000

GST 18%

Payment Status: Pending`}
        </p>

      </div>

    </div>
  );
}