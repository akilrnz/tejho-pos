import { useState } from "react";
import { products } from "./data/products";
import AddItemForm from "./components/AddItemForm";
import ReceiptItem from "./components/ReceiptItem";

function App() {
  const [customerName, setCustomerName] = useState("");
  const [pricingMode, setPricingMode] = useState("Auto");
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!quantity || Number(quantity) <= 0) return;

    const product = products.find(
      (p) => p.id === Number(selectedProduct)
    );

    const existingItem = items.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + Number(quantity),
              }
            : item
        )
      );
        setQuantity(""); 
    } else {
      const newItem = {
        ...product,
        quantity: Number(quantity),
      };

      setItems((prevItems) => [...prevItems, newItem]);
      setQuantity(""); // Clear the quantity input after adding
    }
  };

  const removeItem = (indexToRemove) => {
    setItems((prevItems) =>
      prevItems.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  const updateQuantity = (indexToUpdate, change) => {
    setItems((prevItems) =>
      prevItems.map((item, index) => {
        if (index === indexToUpdate) {
          return {
            ...item,
            quantity: Math.max(
              0.5,
              item.quantity + change
            ),
          };
        }

        return item;
      })
    );
  };

    const totalKG = items.reduce((total, item) => {
      if (item.unit === "kg") {
        return total + item.quantity;
      }

      return total;
    }, 0);
    
    let autoTier = "Retail";

      if (totalKG >= 200) {
        autoTier = "Partner";
      } else if (totalKG >= 20) {
        autoTier = "Wholesale";
      }
    const activeTier =
      pricingMode === "Auto"
        ? autoTier
        : pricingMode;
    
    const getPrice = (item) => {
      switch (activeTier) {
        case "Wholesale":
          return item.wholesale;

        case "Partner":
          return item.partner;

        default:
          return item.retail;
      }
    };
    const grandTotal = items.reduce((total, item) => {
      return total + getPrice(item) * item.quantity;
    }, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Tejho POS
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

       <AddItemForm
          customerName={customerName}
          setCustomerName={setCustomerName}
          pricingMode={pricingMode}
          setPricingMode={setPricingMode}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          products={products}
          addItem={addItem}
        />

        {/* RIGHT PANEL */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Receipt Preview
          </h2>

          <p>
            Customer: {customerName || "Walk-in"}
          </p>

          <p>
            Pricing Mode: {pricingMode}
          </p>

          <hr className="my-4" />

          {items.length === 0 ? (
            <p>No items yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <ReceiptItem
                  key={item.id}
                  item={item}
                  index={index}
                  getPrice={getPrice}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
          )}

          <hr className="my-4" />

          <p>
            Total KG: <strong>{totalKG.toFixed(2)} kg</strong>
          </p>
          <hr className="my-4" />

          <h2 className="text-2xl font-bold">
            ₱{grandTotal.toFixed(2)}
          </h2>

          <p>
            Auto Tier: {autoTier}
          </p>

          <div
            className={
              activeTier === "Retail"
                ? "bg-green-100 text-green-700 p-3 rounded-lg font-bold mt-2"
                : activeTier === "Wholesale"
                ? "bg-yellow-100 text-yellow-700 p-3 rounded-lg font-bold mt-2"
                : "bg-blue-100 text-blue-700 p-3 rounded-lg font-bold mt-2"
            }
          >
            Current Tier: {activeTier}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;