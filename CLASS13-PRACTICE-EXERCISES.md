# Class 13: Practice Exercises
In-Class Activities — Introduction to React

---

## Exercise 1: Convert HTML to JSX (15 minutes)

**Goal:** Understand the differences between HTML and JSX

**Task:** Rewrite the following HTML snippet as a valid JSX component called `ProfileCard`. Fix every HTML mistake that JSX doesn't allow.

**Given HTML:**
```html
<div class="profile-card">
    <img src="photo.jpg">
    <h2 class="profile-name">Amara Obi</h2>
    <p class="profile-role">UI Designer</p>
    <p style="color: green; font-size: 14px;">Available for hire</p>
    <button onclick="sendMessage()">Message</button>
    <!-- Contact info -->
    <p>Lagos, Nigeria</p>
</div>
```

**Requirements:**
- Fix `class` → `className`
- Fix unclosed `<img>`
- Fix `style` attribute (must be an object)
- Fix `onclick` → `onClick` (point to an arrow function)
- Convert the HTML comment to a JSX comment
- Wrap it all in a proper functional component with export

**Expected Answer:**
```jsx
// src/components/ProfileCard.jsx

const ProfileCard = () => {
    const sendMessage = () => console.log("Message sent!");

    return (
        <div className="profile-card">
            <img src="photo.jpg" alt="Amara Obi" />
            <h2 className="profile-name">Amara Obi</h2>
            <p className="profile-role">UI Designer</p>
            <p style={{ color: 'green', fontSize: 14 }}>Available for hire</p>
            <button onClick={sendMessage}>Message</button>
            {/* Contact info */}
            <p>Lagos, Nigeria</p>
        </div>
    );
};

export default ProfileCard;
```

**Discussion:** What would break if you used `class` instead of `className`? Would the app crash or just give a warning?

---

## Exercise 2: JSX Expressions (15 minutes)

**Goal:** Practice using JavaScript expressions inside JSX

**Given data (put this inside the component):**
```javascript
const student = {
    name: "Chiamaka Nwosu",
    score: 74,
    city: "Onitsha",
    subjects: ["HTML", "CSS", "JavaScript", "React"],
    graduated: false
};
```

**Task:** Build a `StudentProfile` component that renders:
1. The student's name in an `<h2>`
2. Their score and whether they're passing (`>= 60`) or failing
3. Their city, in ALL CAPS using `.toUpperCase()`
4. A "🎓 Graduated" badge — but only if `graduated` is `true`
5. All their subjects as a `<ul>` list, using `.map()`
6. The number of subjects they're taking: `"Taking 4 subjects"`

**Expected Answer:**
```jsx
const StudentProfile = () => {
    const student = {
        name: "Chiamaka Nwosu",
        score: 74,
        city: "Onitsha",
        subjects: ["HTML", "CSS", "JavaScript", "React"],
        graduated: false
    };

    return (
        <div className="student-profile">
            <h2>{student.name}</h2>
            <p>Score: {student.score} — {student.score >= 60 ? "✅ Passing" : "❌ Failing"}</p>
            <p>City: {student.city.toUpperCase()}</p>
            {student.graduated && <span className="badge">🎓 Graduated</span>}
            <p>Taking {student.subjects.length} subjects</p>
            <ul>
                {student.subjects.map(subject => (
                    <li key={subject}>{subject}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentProfile;
```

**Challenge:** Change `graduated` to `true` and watch the badge appear. Add a new subject to the array and watch the list update automatically.

---

## Exercise 3: Create a Reusable UserCard Component (20 minutes)

**Goal:** Build a reusable component that accepts props

**Task:** Create a `UserCard` component that:
- Accepts these props: `name`, `role`, `city`, `photo`
- Has a default value for `role` of `"Team Member"`
- Renders the photo in a circular `<img>` tag
- Shows the name in an `<h3>`
- Shows the role and city in separate `<p>` tags

Then use it **three times** in `App.jsx` with completely different data.

**Expected Answer:**
```jsx
// src/components/UserCard.jsx
const UserCard = ({ name, role = "Team Member", city, photo }) => (
    <div className="user-card">
        <img src={photo} alt={name} className="avatar" />
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <p className="city">📍 {city}</p>
    </div>
);

export default UserCard;
```

```jsx
// src/App.jsx
import UserCard from './components/UserCard';

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
        <UserCard
            name="Ngozi Ike"
            city="Enugu"
            photo="https://i.pravatar.cc/80?img=3"
        />
        {/* No role prop — defaults to "Team Member" */}
    </div>
);
```

**Discussion:** What happens to Ngozi's card? Which value does the `role` show?

---

## Exercise 4: Pass Custom Data via Props (20 minutes)

**Goal:** Use an array of objects with .map() to render components

**Given data:**
```javascript
const products = [
    { id: 1, name: "Cap",      price: 1500,  category: "clothing",  inStock: true  },
    { id: 2, name: "Sneakers", price: 15000, category: "footwear",  inStock: false },
    { id: 3, name: "Watch",    price: 25000, category: "accessory", inStock: true  },
    { id: 4, name: "Shirt",    price: 3500,  category: "clothing",  inStock: true  },
];
```

**Task:**
1. Build a `ProductCard` component that accepts `name`, `price`, `category`, and `inStock` as props
2. Show "Out of Stock" text (conditionally) when `inStock` is `false`
3. Format the price with `₦` and `.toLocaleString()`
4. In `App.jsx`, render all products using `.map()` — don't repeat `<ProductCard />` four times

**Expected Answer:**
```jsx
// src/components/ProductCard.jsx
const ProductCard = ({ name, price, category, inStock }) => (
    <div className="product-card">
        <h3>{name}</h3>
        <p className="price">₦{price.toLocaleString()}</p>
        <p className="category">{category}</p>
        {!inStock && <p className="out-of-stock">Out of Stock</p>}
        <button disabled={!inStock} className={inStock ? "btn-add" : "btn-disabled"}>
            {inStock ? "Add to Cart" : "Unavailable"}
        </button>
    </div>
);

export default ProductCard;
```

```jsx
// src/App.jsx
import ProductCard from './components/ProductCard';

const products = [
    { id: 1, name: "Cap",      price: 1500,  category: "clothing",  inStock: true  },
    { id: 2, name: "Sneakers", price: 15000, category: "footwear",  inStock: false },
    { id: 3, name: "Watch",    price: 25000, category: "accessory", inStock: true  },
    { id: 4, name: "Shirt",    price: 3500,  category: "clothing",  inStock: true  },
];

const App = () => (
    <div className="product-grid">
        {products.map(product => (
            <ProductCard key={product.id} {...product} />
        ))}
    </div>
);
```

**Challenge:** Add a `.filter()` step to only show in-stock products: `products.filter(p => p.inStock).map(...)`.

---

## Exercise 5: The Badge Component — Variants with Props (15 minutes)

**Goal:** Create a component that changes appearance based on a prop value

**Task:** Build a `Badge` component that:
- Accepts `label` and `variant` props
- `variant` can be: `"success"`, `"danger"`, `"warning"`, `"info"`, or `"default"`
- The badge's CSS class should change based on the variant: `badge-success`, `badge-danger`, etc.
- Default variant is `"default"` if nothing is passed
- Render it 5 times with all different variants

**Expected Answer:**
```jsx
// src/components/Badge.jsx
const Badge = ({ label, variant = "default" }) => (
    <span className={`badge badge-${variant}`}>
        {label}
    </span>
);

export default Badge;
```

```jsx
// In App.jsx
import Badge from './components/Badge';

const App = () => (
    <div>
        <Badge label="Passed" variant="success" />
        <Badge label="Failed" variant="danger" />
        <Badge label="Pending" variant="warning" />
        <Badge label="New" variant="info" />
        <Badge label="Unknown" />   {/* defaults to "default" */}
    </div>
);
```

```css
/* App.css */
.badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.badge-success { background: rgba(16,185,129,0.2); color: #10b981; }
.badge-danger  { background: rgba(239,68,68,0.2);  color: #ef4444; }
.badge-warning { background: rgba(255,180,0,0.2);  color: #ffb400; }
.badge-info    { background: rgba(99,102,241,0.2); color: #6366f1; }
.badge-default { background: rgba(160,174,192,0.2);color: #a0aec0; }
```

**Discussion:** What's the benefit of using `badge-${variant}` in the className instead of using if/else?

---

## Exercise 6: Challenge — Component Assembly (30 minutes)

**Goal:** Combine multiple components into one complete layout

**Task:** Build a mini profile page that uses at least three components working together. Your page should have:
- A `Header` component that shows a logo (emoji) and nav title
- A `UserCard` component reused from Exercise 3
- A `Badge` component reused from Exercise 5
- All rendered inside `App.jsx`

**Requirements:**
- The UserCard should display the `Badge` component inside it for the user's role/status
- Data comes from a `users` array, rendered with `.map()`
- At least 4 users in the array

**Expected Structure:**
```jsx
// App.jsx
import Header from './components/Header';
import UserCard from './components/UserCard';

const users = [
    { id: 1, name: "Tolu Adeyemi",  role: "Frontend Dev",    status: "active",   city: "Lagos",  photo: "https://i.pravatar.cc/80?img=1" },
    { id: 2, name: "Emeka Obi",     role: "UI Designer",     status: "inactive", city: "Abuja",  photo: "https://i.pravatar.cc/80?img=2" },
    { id: 3, name: "Amara Eze",     role: "Product Manager", status: "active",   city: "Enugu",  photo: "https://i.pravatar.cc/80?img=3" },
    { id: 4, name: "Bayo Martins",  role: "Backend Dev",     status: "active",   city: "Ibadan", photo: "https://i.pravatar.cc/80?img=4" },
];

const App = () => (
    <div className="app">
        <Header />
        <main>
            <h2>Team Members</h2>
            <div className="team-grid">
                {users.map(user => (
                    <UserCard key={user.id} {...user} />
                ))}
            </div>
        </main>
    </div>
);
```

```jsx
// UserCard now uses Badge internally
import Badge from './Badge';

const UserCard = ({ name, role, city, photo, status }) => (
    <div className="user-card">
        <img src={photo} alt={name} className="avatar" />
        <h3>{name}</h3>
        <p>{role}</p>
        <p>📍 {city}</p>
        <Badge
            label={status === 'active' ? '● Active' : '○ Inactive'}
            variant={status === 'active' ? 'success' : 'default'}
        />
    </div>
);
```

---

## Solutions & Key Checks

**For each exercise, verify:**

1. Component name starts with a **capital letter**
2. The component **returns JSX** (not just JSX without return for multi-line bodies)
3. Every file has **`export default`** at the bottom
4. Props are **destructured** in the parameter (not `props.x`)
5. Every `.map()` has a **`key` prop** on the outermost element
6. `className` is used, **not `class`**
7. Self-closing tags end with **` />`** not just `>`

**Red flags to correct:**
- Using `var` anywhere — always `const` or `let`
- Writing `class=` instead of `className=`
- Forgetting `key` in lists (check browser console for warning)
- Returning two sibling elements without a wrapper
- Component name in lowercase (React will treat it as an HTML tag)
