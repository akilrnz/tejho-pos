import { useState } from "react";
import { products } from "../data/products";
import ProductForm from "../components/ProductForm";

function Products() {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState(products);
  const [showForm, setShowForm] = useState(false);

  const filteredProducts = productList.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const addProduct = (newProduct) => {
    const duplicate = productList.some(
      (product) =>
        product.name.trim().toLowerCase() ===
        newProduct.name.trim().toLowerCase()
    );

    if (duplicate) {
      alert("This product already exists.");
      return false;
    }

    setProductList((prevProducts) => [
      ...prevProducts,
      newProduct,
    ]);

    setShowForm(false);

    return true;
  };

  const [editingProduct, setEditingProduct] =
    useState(null);
  
  const updateProduct = (updatedProduct) => {
    const duplicate = productList.some(
      (product) =>
        product.id !== updatedProduct.id &&
        product.name.trim().toLowerCase() ===
          updatedProduct.name.trim().toLowerCase()
    );

    if (duplicate) {
      alert("This product already exists.");
      return false;
    }

    setProductList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );

    setEditingProduct(null);
    setShowForm(false);

    return true;
  };

  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProductList((prevProducts) =>
      prevProducts.filter(
        (product) => product.id !== id
      )
    );
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <div className="flex items-center gap-3">

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-72"
          />

          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Product
          </button>

        </div>

      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Unit</th>
              <th className="text-left p-4">Retail</th>
              <th className="text-left p-4">Wholesale</th>
              <th className="text-left p-4">Partner</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No products found.
                </td>
              </tr>

            ) : (

              filteredProducts.map((product) => (

                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">{product.name}</td>

                  <td className="p-4 uppercase">
                    {product.unit}
                  </td>

                  <td className="p-4">
                    ₱{product.retail.toFixed(2)}
                  </td>

                  <td className="p-4">
                    ₱{product.wholesale.toFixed(2)}
                  </td>

                  <td className="p-4">
                    ₱{product.partner.toFixed(2)}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          addProduct={addProduct}
          updateProduct={updateProduct}
          onClose={() => {
            setEditingProduct(null);
            setShowForm(false);
          }}
        />
      )}

    </div>
  );
}

export default Products;