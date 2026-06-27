import { useState } from "react";

function ProductForm({
  addProduct,
  updateProduct,
  product,
  onClose,
}) {
  const [name, setName] = useState(product?.name || "");
  const [unit, setUnit] = useState(product?.unit || "kg");
  const [retail, setRetail] = useState(product?.retail || "");
  const [wholesale, setWholesale] = useState(
    product?.wholesale || ""
  );
  const [partner, setPartner] = useState(
    product?.partner || ""
  );

  const handleSubmit = () => {
    if (
      !name.trim() ||
      retail === "" ||
      wholesale === "" ||
      partner === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const productData = {
      id: product ? product.id : Date.now(),
      name: name.trim(),
      unit,
      retail: Number(retail),
      wholesale: Number(wholesale),
      partner: Number(partner),
    };

    const success = product
      ? updateProduct(productData)
      : addProduct(productData);

    if (success) {
      setName("");
      setUnit("kg");
      setRetail("");
      setWholesale("");
      setPartner("");

      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6">

        <h2 className="text-2xl font-bold mb-5">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
          />

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="kg">kg</option>
            <option value="pcs">pcs</option>
            <option value="pack">pack</option>
          </select>

          <input
            type="number"
            placeholder="Retail Price"
            value={retail}
            onChange={(e) => setRetail(e.target.value)}
            className="w-full border rounded p-2"
          />

          <input
            type="number"
            placeholder="Wholesale Price"
            value={wholesale}
            onChange={(e) => setWholesale(e.target.value)}
            className="w-full border rounded p-2"
          />

          <input
            type="number"
            placeholder="Partner Price"
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            className="w-full border rounded p-2"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductForm;