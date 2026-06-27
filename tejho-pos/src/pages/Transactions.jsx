import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Transactions() {
  const [transactions, setTransactions] =
    useState([]);
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const [transactionItems, setTransactionItems] =
    useState([]);
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setTransactions(data);
  };
  const viewTransaction = async (
    transaction
  ) => {
    setSelectedTransaction(transaction);

    const { data, error } = await supabase
      .from("transaction_items")
      .select(`
        *,
        products(name)
      `)
      .eq("transaction_id", transaction.id);

    if (error) {
      console.error(error);
      return;
    }

    setTransactionItems(data);
  };
  const filteredTransactions =
    transactions.filter((transaction) =>
      transaction.customer_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Transactions
        </h1>

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-72"
        />

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">
                ID
              </th>

              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left p-4">
                Tier
              </th>

              <th className="text-left p-4">
                Total
              </th>

              <th className="text-left p-4">
                Date
              </th>
              <th className="text-left p-4">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length ===
            0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map(
                (transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">
                      #{transaction.id}
                    </td>

                    <td className="p-4">
                      {
                        transaction.customer_name
                      }
                    </td>

                    <td className="p-4">
                      {
                        transaction.pricing_tier
                      }
                    </td>

                    <td className="p-4">
                      ₱
                      {Number(
                        transaction.total_amount
                      ).toFixed(2)}
                    </td>

                    <td className="p-4">
                      {new Date(
                        transaction.created_at
                      ).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          viewTransaction(transaction)
                        }
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>

        </table>
      </div>
      {selectedTransaction && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

    <div className="bg-white w-[600px] rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        Transaction #
        {selectedTransaction.id}
      </h2>

      <p>
        Customer:
        {" "}
        {selectedTransaction.customer_name}
      </p>

      <p>
        Tier:
        {" "}
        {selectedTransaction.pricing_tier}
      </p>

      <p className="mb-4">
        Total:
        {" "}
        ₱
        {Number(
          selectedTransaction.total_amount
        ).toFixed(2)}
      </p>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">
              Product
            </th>

            <th className="p-2 text-left">
              Qty
            </th>

            <th className="p-2 text-left">
              Price
            </th>

            <th className="p-2 text-left">
              Subtotal
            </th>
          </tr>
        </thead>

        <tbody>

          {transactionItems.map((item) => (
            <tr
              key={item.id}
              className="border-t"
            >
              <td className="p-2">
                {item.products?.name}
              </td>

              <td className="p-2">
                {item.quantity}
              </td>

              <td className="p-2">
                ₱
                {Number(
                  item.unit_price
                ).toFixed(2)}
              </td>

              <td className="p-2">
                ₱
                {Number(
                  item.subtotal
                ).toFixed(2)}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

        <button
          onClick={() => {
            setSelectedTransaction(null);
            setTransactionItems([]);
          }}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>
  )}
  
    </div>
  );
}

export default Transactions;