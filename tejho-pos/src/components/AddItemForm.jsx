function AddItemForm({
  customerName,
  setCustomerName,
  pricingMode,
  setPricingMode,
  selectedProduct,
  setSelectedProduct,
  quantity,
  setQuantity,
  products,
  addItem,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Add Item
      </h2>

      <div className="space-y-4">

        <div>
          <label className="block mb-1">
            Customer Name
          </label>

          <input
            type="text"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Pricing Mode
          </label>

          <select
            value={pricingMode}
            onChange={(e) =>
              setPricingMode(e.target.value)
            }
            className="w-full border rounded p-2"
          >
            <option>Auto</option>
            <option>Retail</option>
            <option>Wholesale</option>
            <option>Partner</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">
            Product
          </label>

          <select
            value={selectedProduct}
            onChange={(e) =>
              setSelectedProduct(e.target.value)
            }
            className="w-full border rounded p-2"
          >
            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">
            Quantity
          </label>

          <input
            type="number"
            step="0.5"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            className="w-full border rounded p-2"
          />
        </div>

        <button
          onClick={addItem}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Item
        </button>

      </div>
    </div>
  );
}

export default AddItemForm;