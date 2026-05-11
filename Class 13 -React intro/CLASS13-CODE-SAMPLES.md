# Class 13: Code Samples
Introduction to React — Functional Components & Props

---

## Example 1: Your First Functional Component

```jsx
// src/components/Greeting.jsx

// A component is just a function that returns JSX
const Greeting = () => {
    return (
        <div className="greeting">
            <h1>Hello, World!</h1>
            <p>Welcome to React.</p>
        </div>
    );
};

export default Greeting;
```

```jsx
// src/App.jsx — use your component like a custom HTML tag
import Greeting from './components/Greeting';

const App = () => (
    <div>
        <Greeting />
        <Greeting />   {/* reuse it as many times as you want */}
        <Greeting />
    </div>
);

export default App;
```

---

## Example 2: JSX Expressions — Everything Inside {}

```jsx
const Dashboard = () => {
    const studentName = "Tolu Adeyemi";
    const score = 87;
    const isPassing = score >= 60;
    const subject = "React";
    const foods = ["Jollof Rice", "Suya", "Puff Puff"];

    return (
        <div className="dashboard">
            {/* Variable */}
            <h1>Welcome, {studentName}!</h1>

            {/* Math expression */}
            <p>Score: {score}/100 ({(score / 100 * 100).toFixed(1)}%)</p>

            {/* Method call */}
            <p>Subject: {subject.toUpperCase()}</p>

            {/* Ternary — if/else in one line */}
            <p>Status: {isPassing ? "✅ Passing" : "❌ Failing"}</p>

            {/* Short-circuit — only shows if isPassing is true */}
            {isPassing && <span className="badge">🎉 Congrats!</span>}

            {/* .map() — render an array as a list */}
            <ul>
                {foods.map(food => (
                    <li key={food}>{food}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
```

---

## Example 3: JSX Rules — HTML vs JSX

```jsx
// In HTML:                          In JSX:
// <div class="box">                 <div className="box">
// <label for="email">               <label htmlFor="email">
// <img src="photo.jpg">             <img src="photo.jpg" />
// onclick="handleClick()"           onClick={handleClick}
// style="color: red; font-size:16px" style={{ color: 'red', fontSize: 16 }}
// <!-- This is a comment -->        {/* This is a JSX comment */}

// One root element required:
// ❌ Wrong
const Bad = () => (
    <h1>Title</h1>
    <p>Paragraph</p>    // Two roots — Error!
);

// ✅ Use a wrapping div
const GoodDiv = () => (
    <div>
        <h1>Title</h1>
        <p>Paragraph</p>
    </div>
);

// ✅ Or use a Fragment — no extra div in the DOM
const GoodFragment = () => (
    <>
        <h1>Title</h1>
        <p>Paragraph</p>
    </>
);
```

---

## Example 4: Props — Passing Data Into Components

```jsx
// The component blueprint — accepts data through props
const UserCard = (props) => (
    <div className="user-card">
        <img src={props.photo} alt={props.name} className="avatar" />
        <div className="user-info">
            <h3>{props.name}</h3>
            <p className="role">{props.role}</p>
            <p className="city">📍 {props.city}</p>
        </div>
    </div>
);

// Use it with different data each time
const App = () => (
    <div>
        <UserCard
            name="Tolu Adeyemi"
            role="Frontend Developer"
            city="Lagos"
            photo="https://i.pravatar.cc/80?img=1"
        />
        <UserCard
            name="Emeka Obi"
            role="UI Designer"
            city="Abuja"
            photo="https://i.pravatar.cc/80?img=2"
        />
    </div>
);
```

---

## Example 5: Props Destructuring — The Professional Way

```jsx
// Version 1: Access via props.x
const Badge = (props) => (
    <span className="badge">{props.label}</span>
);

// Version 2: Destructure in the parameter ✅ (industry standard)
const Badge = ({ label }) => (
    <span className="badge">{label}</span>
);

// Version 3: Destructure with default values
const Badge = ({ label = "Default", color = "blue", size = "medium" }) => (
    <span className={`badge badge-${color} badge-${size}`}>
        {label}
    </span>
);

// Use with different props:
<Badge label="Admin" color="purple" />
<Badge label="Student" />          {/* color defaults to "blue" */}
<Badge label="Premium" color="gold" size="large" />
```

---

## Example 6: Full UserCard — Props Destructuring in Action

```jsx
// src/components/UserCard.jsx
import './UserCard.css';

const UserCard = ({ name, role, city, photo, active = false }) => (
    <div className={`user-card ${active ? 'user-card--active' : ''}`}>
        <img src={photo} alt={name} className="user-card__avatar" />

        <div className="user-card__info">
            <h3 className="user-card__name">{name}</h3>
            <p className="user-card__role">{role}</p>
            <p className="user-card__city">📍 {city}</p>
        </div>

        {active && (
            <span className="user-card__badge">● Active</span>
        )}
    </div>
);

export default UserCard;
```

```jsx
// src/App.jsx
import UserCard from './components/UserCard';

const App = () => (
    <div className="app">
        <UserCard
            name="Tolu Adeyemi"
            role="Frontend Developer"
            city="Lagos"
            photo="https://i.pravatar.cc/80?img=1"
            active={true}
        />
        <UserCard
            name="Emeka Obi"
            role="UI Designer"
            city="Abuja"
            photo="https://i.pravatar.cc/80?img=2"
            active={false}
        />
    </div>
);

export default App;
```

---

## Example 7: Props + .map() — The Killer Combo

```jsx
import UserCard from './components/UserCard';

// 1. Store your data as an array of objects
const users = [
    { id: 1, name: "Tolu Adeyemi",  role: "Frontend Dev",    city: "Lagos",  photo: "https://i.pravatar.cc/80?img=1", active: true  },
    { id: 2, name: "Emeka Obi",     role: "UI Designer",     city: "Abuja",  photo: "https://i.pravatar.cc/80?img=2", active: false },
    { id: 3, name: "Amara Eze",     role: "Product Manager", city: "Enugu",  photo: "https://i.pravatar.cc/80?img=3", active: true  },
    { id: 4, name: "Bayo Martins",  role: "Backend Dev",     city: "Ibadan", photo: "https://i.pravatar.cc/80?img=4", active: true  },
];

// 2. Render them all with .map() + spread operator
const App = () => (
    <div className="user-grid">
        {users.map(user => (
            <UserCard
                key={user.id}     // Required! Use the unique ID, not index
                {...user}         // Spread all fields as individual props
            />
        ))}
    </div>
);

export default App;
```

---

## Example 8: Conditional Rendering Patterns

```jsx
const ProductCard = ({ name, price, inStock, discount }) => {
    const finalPrice = discount ? price * (1 - discount) : price;

    return (
        <div className="product-card">
            <h3>{name}</h3>

            {/* Pattern 1: && — show only if condition is true */}
            {!inStock && <p className="out-of-stock">Out of Stock</p>}

            {/* Pattern 2: Ternary — show one or the other */}
            <p className="price">
                {discount
                    ? <><s>₦{price.toLocaleString()}</s> ₦{finalPrice.toLocaleString()}</>
                    : `₦${price.toLocaleString()}`
                }
            </p>

            {/* Pattern 3: Conditional className */}
            <button
                className={`btn ${inStock ? 'btn-primary' : 'btn-disabled'}`}
                disabled={!inStock}
            >
                {inStock ? 'Add to Cart' : 'Unavailable'}
            </button>

            {/* Pattern 4: Early return — skip rendering entirely */}
        </div>
    );
};
```

---

## Example 9: The children Prop — Wrapper Components

```jsx
// A component that wraps other components
const Card = ({ children, title, className = '' }) => (
    <div className={`card ${className}`}>
        {title && <h3 className="card__title">{title}</h3>}
        <div className="card__body">
            {children}   {/* renders whatever is between the tags */}
        </div>
    </div>
);

// Use it — anything between <Card></Card> becomes children
const App = () => (
    <div>
        <Card title="Profile">
            <p>Name: Tolu</p>
            <p>City: Lagos</p>
        </Card>

        <Card title="Products" className="card--wide">
            <ul>
                <li>Shirt — ₦3,500</li>
                <li>Cap — ₦1,500</li>
            </ul>
        </Card>
    </div>
);
```

---

## Example 10: Cleaning Up App.jsx — Real Project Structure

```jsx
// src/App.jsx — clean, production-ready structure
import './App.css';
import UserCard from './components/UserCard';
import WelcomeBanner from './components/WelcomeBanner';

const users = [
    { id: 1, name: "Tolu Adeyemi",  role: "Frontend Dev",    city: "Lagos",  photo: "https://i.pravatar.cc/80?img=1", active: true  },
    { id: 2, name: "Emeka Obi",     role: "UI Designer",     city: "Abuja",  photo: "https://i.pravatar.cc/80?img=2", active: false },
    { id: 3, name: "Amara Eze",     role: "Product Manager", city: "Enugu",  photo: "https://i.pravatar.cc/80?img=3", active: true  },
];

const App = () => (
    <div className="app">
        <WelcomeBanner name="XELI Students" />

        <main className="main-content">
            <h2>Our Team</h2>
            <div className="user-grid">
                {users.map(user => (
                    <UserCard key={user.id} {...user} />
                ))}
            </div>
        </main>
    </div>
);

export default App;
```

---

## Quick Reference

### Component Checklist
```
✅ PascalCase name (UserCard, not userCard)
✅ Returns JSX
✅ export default at the bottom
✅ Props destructured in the parameter
✅ Default values for optional props
✅ .map() lists have a key prop
```

### JSX Cheat Sheet
```jsx
{variable}                          // Insert a variable
{2 + 2}                             // Math expression
{name.toUpperCase()}                // Method call
{isActive ? "Yes" : "No"}          // Ternary (if/else)
{isAdmin && <AdminBadge />}         // Short-circuit (show if)
{items.map(i => <Item key={i.id} />)} // Render a list
```

### Props Patterns
```jsx
// Receive and destructure
const Card = ({ title, score = 0, active }) => ...

// Pass to component
<Card title="React" score={95} active={true} />

// Spread an object as props
<Card key={item.id} {...item} />

// children prop
<Wrapper><p>I'm the child</p></Wrapper>
```
