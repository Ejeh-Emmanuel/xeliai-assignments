export default function ShoppingList({ shoppingList, removeFromShoppingList }) {
  return (
    <div className="shopping-list-page">
      <h2>My Grocery Shopping List</h2>
      {shoppingList.length === 0 ? (
        <p className="empty-state">Your list is clear! Go into recipe details to add items.</p>
      ) : (
        <ul className="shopping-list">
          {shoppingList.map((item, index) => (
            <li key={index} className="shopping-list-item">
              <span className="item-text">
                <input type="checkbox" className="item-checkbox" />
                <span><strong>{item.measure}</strong> {item.name}</span>
              </span>
              <button 
                onClick={() => removeFromShoppingList(index)} 
                className="delete-item-btn"
                title="Remove item"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}