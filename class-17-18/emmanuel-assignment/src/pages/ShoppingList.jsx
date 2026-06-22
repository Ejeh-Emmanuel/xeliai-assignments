import { useEffect, useState } from "react";

function ShoppingList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shoppingList")) || [];
    setItems(stored);
  }, []);

  function removeItem(indexToRemove) {
    const updated = items.filter((_, index) => index !== indexToRemove);

    setItems(updated);
    localStorage.setItem("shoppingList", JSON.stringify(updated));
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🛒 Shopping List</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your shopping list is empty</p>
      ) : (
        <div className="bg-white shadow rounded-xl p-4">
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-gray-700">{item}</span>

                <button
                  onClick={() => removeItem(index)}
                  className="
                    text-red-500
                    hover:text-red-700
                    text-sm
                    font-medium
                    cursor-pointer
                  "
                >
                  ✕ Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
