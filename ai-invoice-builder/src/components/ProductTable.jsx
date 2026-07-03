import { FaPlus, FaTrash } from "react-icons/fa";

export default function ProductTable({ invoice, setInvoice }) {
  // Update product field
  const updateProduct = (id, field, value) => {
    const updatedItems = invoice.items.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]:
              field === "qty" || field === "price"
                ? Number(value)
                : value,
          }
        : item
    );

    setInvoice({
      ...invoice,
      items: updatedItems,
    });
  };

  // Add new product
  const addProduct = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        {
          id: crypto.randomUUID(),
          name: "",
          qty: 1,
          price: 0,
        },
      ],
    });
  };

  // Delete product
  const deleteProduct = (id) => {
    if (invoice.items.length === 1) return;

    setInvoice({
      ...invoice,
      items: invoice.items.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Products
        </h2>

        <button
          onClick={addProduct}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus />
          Add Product
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">Product</th>

              <th className="border p-3">Quantity</th>

              <th className="border p-3">Price</th>

              <th className="border p-3">Total</th>

              <th className="border p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {invoice.items.map((item) => (

              <tr key={item.id}>

                <td className="border p-2">

                  <input
                    type="text"
                    value={item.name}
                    placeholder="Product Name"
                    onChange={(e) =>
                      updateProduct(
                        item.id,
                        "name",
                        e.target.value
                      )
                    }
                    className="w-full border rounded p-2"
                  />

                </td>

                <td className="border p-2">

                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      updateProduct(
                        item.id,
                        "qty",
                        e.target.value
                      )
                    }
                    className="w-24 border rounded p-2"
                  />

                </td>

                <td className="border p-2">

                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) =>
                      updateProduct(
                        item.id,
                        "price",
                        e.target.value
                      )
                    }
                    className="w-full border rounded p-2"
                  />

                </td>

                <td className="border p-2 text-center font-semibold">

                  ₹{(item.qty * item.price).toLocaleString()}

                </td>

                <td className="border p-2 text-center">

                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-6">

        <h3 className="text-lg font-semibold">

          Products Added: {invoice.items.length}

        </h3>

      </div>

    </div>
  );
}