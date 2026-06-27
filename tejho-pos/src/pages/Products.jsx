import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductForm from "../components/ProductForm";

function Products() {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setProductList(data);
  };

  const filteredProducts = productList.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const addProduct = async (newProduct) => {
    const duplicate = productList.some(
      (product) =>
        product.name.trim().toLowerCase() ===
        newProduct.name.trim().toLowerCase()
    );

    if (duplicate) {
      alert("This product already exists.");
      return false;
    }

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name: newProduct.name,
          unit: newProduct.unit,
          retail: newProduct.retail,
          wholesale: newProduct.wholesale,
          partner: newProduct.partner,
        },
      ]);

    if (error) {
      alert(error.message);
      return false;
    }

    await fetchProducts();

    setShowForm(false);

    return true;
  };

  const updateProduct = async (updatedProduct) => {
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

    const { error } = await supabase
      .from("products")
      .update({
        name: updatedProduct.name,
        unit: updatedProduct.unit,
        retail: updatedProduct.retail,
        wholesale: updatedProduct.wholesale,
        partner: updatedProduct.partner,
      })
      .eq("id", updatedProduct.id);

    if (error) {
      alert(error.message);
      return false;
    }

    await fetchProducts();

    setEditingProduct(null);
    setShowForm(false);

    return true;
  };

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to archive this product?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("products")
      .update({
        is_active: false,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchProducts();
  };

  const restoreProduct = async (id) => {
  const { error } = await supabase
    .from("products")
    .update({
      is_active: true,
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  await fetchProducts();
};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
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

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">
                Product
              </th>
              <th className="text-left p-4">
                Unit
              </th>
              <th className="text-left p-4">
                Retail
              </th>
              <th className="text-left p-4">
                Wholesale
              </th>
              <th className="text-left p-4">
                Partner
              </th>
              <th className="text-left p-4">
                Status
              </th>
              <th className="text-center p-4">
                Actions
              </th>
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
                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4 uppercase">
                    {product.unit}
                  </td>

                  <td className="p-4">
                    ₱{Number(
                      product.retail
                    ).toFixed(2)}
                  </td>

                  <td className="p-4">
                    ₱{Number(
                      product.wholesale
                    ).toFixed(2)}
                  </td>

                  <td className="p-4">
                    ₱{Number(
                      product.partner
                    ).toFixed(2)}
                  </td>
                 <td className="p-4">
  {product.is_active ? (
    <span className="text-green-600 font-medium">
      Active
    </span>
  ) : (
    <span className="text-red-600 font-medium">
      Archived
    </span>
  )}
</td>

<td className="p-4 text-center">
  {product.is_active ? (
    <>
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
        onClick={() =>
          deleteProduct(product.id)
        }
        className="text-red-600 hover:underline"
      >
        Archive
      </button>
    </>
  ) : (
    <button
      onClick={() =>
        restoreProduct(product.id)
      }
      className="text-green-600 hover:underline"
    >
      Restore
    </button>
  )}
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