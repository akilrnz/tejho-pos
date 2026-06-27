import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import AddItemForm from "../components/AddItemForm";
import ReceiptItem from "../components/ReceiptItem";

function POS() {
  const [customerName, setCustomerName] = useState("");
  const [pricingMode, setPricingMode] = useState("Auto");

  const [products, setProducts] = useState([]);
  console.log(products);
  
  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  
  const [wholesaleThreshold, setWholesaleThreshold] =
    useState(20);
  const [partnerThreshold, setPartnerThreshold] =
  useState(200);

  useEffect(() => {
    fetchProducts();
    fetchSettings();
        }, 
    []);
  const fetchProducts = async () => {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("name");
        
    console.log(data);
    console.log(error);

    if (error) return;

    setProducts(data);
    };

    const fetchSettings = async () => {
        const { data, error } = await supabase
            .from("businessinfo")
            .select("*")
            .single();

        if (error) {
            console.error(error);
            return;
        }

        setWholesaleThreshold(
            Number(data.wholesale_threshold)
        );

        setPartnerThreshold(
            Number(data.partner_threshold)
        );
    };
        
  const addItem = () => {
    if (!selectedProduct) return;

    if (!quantity || Number(quantity) <= 0)
      return;

    const product = products.find(
      (p) => p.id === Number(selectedProduct)
    );

    if (!product) return;

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
                  item.quantity +
                  Number(quantity),
              }
            : item
        )
      );
    } else {
      const newItem = {
        ...product,
        quantity: Number(quantity),
      };

      setItems((prevItems) => [
        ...prevItems,
        newItem,
      ]);
    }

    setQuantity("");
  };

  const removeItem = (indexToRemove) => {
    setItems((prevItems) =>
      prevItems.filter(
        (_, index) =>
          index !== indexToRemove
      )
    );
  };

  const updateQuantity = (
    indexToUpdate,
    change
  ) => {
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

  const totalKG = items.reduce(
    (total, item) => {
      if (item.unit === "kg") {
        return total + item.quantity;
      }

      return total;
    },
    0
  );

  let autoTier = "Retail";
    
  if (totalKG >= partnerThreshold) {
    autoTier = "Partner";
    } else if (
        totalKG >= wholesaleThreshold
    ) {
        autoTier = "Wholesale";
    }

  const activeTier =
    pricingMode === "Auto"
      ? autoTier
      : pricingMode;

  const getPrice = (item) => {
    switch (activeTier) {
      case "Wholesale":
        return Number(item.wholesale);

      case "Partner":
        return Number(item.partner);

      default:
        return Number(item.retail);
    }
  };

  const grandTotal = items.reduce(
    (total, item) =>
      total +
      getPrice(item) * item.quantity,
    0
  );

  const completeSale = async () => {
    if (items.length === 0) return;

    const { data: transaction, error: transactionError } =
        await supabase
        .from("transactions")
        .insert([
            {
            customer_name:
                customerName || "Walk-in",
            pricing_tier: activeTier,
            total_amount: grandTotal,
            },
        ])
        .select()
        .single();

    if (transactionError) {
        alert(transactionError.message);
        return;
    }

    const transactionItems = items.map(
        (item) => ({
        transaction_id: transaction.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: getPrice(item),
        subtotal:
            getPrice(item) * item.quantity,
        })
    );

    const { error: itemsError } =
        await supabase
        .from("transaction_items")
        .insert(transactionItems);

    if (itemsError) {
        alert(itemsError.message);
        return;
    }

    alert("Sale completed successfully!");

    setItems([]);
    setCustomerName("");
    setSelectedProduct("");
    setQuantity("");
    };

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
          setSelectedProduct={
            setSelectedProduct
          }
          quantity={quantity}
          setQuantity={setQuantity}
          products={products}
          addItem={addItem}
        />

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Receipt Preview
          </h2>

          <p>
            Customer:{" "}
            {customerName || "Walk-in"}
          </p>

          <p>
            Pricing Mode: {pricingMode}
          </p>

          <hr className="my-4" />

          {items.length === 0 ? (
            <p>No items yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map(
                (item, index) => (
                  <ReceiptItem
                    key={item.id}
                    item={item}
                    index={index}
                    getPrice={getPrice}
                    updateQuantity={
                      updateQuantity
                    }
                    removeItem={removeItem}
                  />
                )
              )}
            </div>
          )}

          <hr className="my-4" />

          <p>
            Total KG:
            <strong>
              {" "}
              {totalKG.toFixed(2)} kg
            </strong>
          </p>

          <hr className="my-4" />

          <h2 className="text-2xl font-bold">
            ₱{grandTotal.toFixed(2)}
          </h2>

          <div
            className={
              activeTier === "Retail"
                ? "bg-green-100 text-green-700 p-3 rounded-lg font-bold mt-2"
                : activeTier ===
                  "Wholesale"
                ? "bg-yellow-100 text-yellow-700 p-3 rounded-lg font-bold mt-2"
                : "bg-blue-100 text-blue-700 p-3 rounded-lg font-bold mt-2"
            }
          >
            {activeTier} {/*Shows current pricing tier based on total KG and thresholds*/}
          </div>

          <button
            onClick={completeSale}
            disabled={
              items.length === 0
            }
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            Complete Sale
          </button>

        </div>
      </div>
    </div>
  );
}

export default POS;