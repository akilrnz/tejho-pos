function ReceiptItem({
  item,
  index,
  getPrice,
  updateQuantity,
  removeItem,
}) {
  return (
    <div className="border-b pb-3 mb-3">
      <p className="font-semibold">
        {item.name}
      </p>

      <div className="flex items-center gap-3 my-2">
        <button
          onClick={() => updateQuantity(index, -0.5)}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          -
        </button>

        <span className="font-medium">
          {item.quantity} {item.unit}
        </span>

        <button
          onClick={() => updateQuantity(index, 0.5)}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          +
        </button>
      </div>

      <p>
        ₱{getPrice(item)} × {item.quantity}
      </p>

      <p className="font-bold">
        ₱{(getPrice(item) * item.quantity).toFixed(2)}
      </p>

      <button
        onClick={() => removeItem(index)}
        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
      >
        Remove
      </button>
    </div>
  );
}

export default ReceiptItem;