# Class 19+20: Code Samples & Practice Exercises
Tailwind CSS & Forms + Validation

---

## CODE SAMPLES

### Sample 1: The Tailwind Spacing Scale Reference

```jsx
// All padding/margin classes follow: number × 4px (in rem: number × 0.25rem)
//
// p-0  = 0px      p-1  = 4px      p-2  = 8px
// p-3  = 12px     p-4  = 16px     p-5  = 20px
// p-6  = 24px     p-8  = 32px     p-10 = 40px
// p-12 = 48px     p-16 = 64px     p-20 = 80px

// Directional variants:
// pt- (top)    pb- (bottom)   pl- (left)   pr- (right)
// px- (left + right)          py- (top + bottom)

// Same scale applies to margin (m-), gap (gap-), width (w-), height (h-)

// Example: a card with consistent spacing
const Card = () => (
    <div className="p-6 m-4 rounded-lg bg-white shadow-md">
        <h2 className="text-xl font-bold mb-2">Title</h2>
        <p className="text-gray-600">Description text goes here.</p>
    </div>
);
```

---

### Sample 2: Flexbox Layouts — The Patterns You'll Use Constantly

```jsx
// PATTERN 1: Horizontal row, items centered, space between
const Header = () => (
    <div className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-xl font-bold">My App</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">
            Sign In
        </button>
    </div>
);

// PATTERN 2: Vertical stack with consistent spacing
const Sidebar = () => (
    <div className="flex flex-col gap-2 p-4 bg-gray-100 h-screen w-64">
        <a className="p-2 rounded hover:bg-gray-200">Dashboard</a>
        <a className="p-2 rounded hover:bg-gray-200">Settings</a>
        <a className="p-2 rounded hover:bg-gray-200">Profile</a>
    </div>
);

// PATTERN 3: Centering anything (the famous one)
const CenteredModal = () => (
    <div className="flex items-center justify-center min-h-screen bg-black/50">
        <div className="bg-white p-6 rounded-lg max-w-md">
            <h2 className="text-lg font-bold">Modal Title</h2>
            <p className="text-gray-600 mt-2">Modal content here.</p>
        </div>
    </div>
);
```

---

### Sample 3: Responsive Grid — Mobile-First

```jsx
// In Plain English: write the mobile version with NO prefix.
// Add md: and lg: prefixes only for what CHANGES at bigger sizes.

const ProductGrid = ({ products }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img className="w-full h-40 object-cover" src={product.image} alt={product.title} />
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                    <p className="text-gray-500">${product.price}</p>
                </div>
            </div>
        ))}
    </div>
);

// Read the grid line like a sentence:
// "1 column by default (mobile), 2 on tablets (md), 3 on laptops (lg), 4 on big screens (xl)"
```

---

### Sample 4: Buttons with States — Hover, Focus, Disabled

```jsx
// Primary button — the pattern you'll reuse everywhere
const PrimaryButton = ({ children, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold
                   hover:bg-indigo-700
                   focus:outline-none focus:ring-2 focus:ring-indigo-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
    >
        {children}
    </button>
);

// Secondary / outline button
const SecondaryButton = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold
                   hover:bg-indigo-50
                   transition-colors"
    >
        {children}
    </button>
);
```

---

### Sample 5: Complete Validated Form — Copy This Pattern

```jsx
// components/SearchForm.jsx
import { useForm } from 'react-hook-form';

const SearchForm = ({ onSearch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        onSearch(data.query);  // pass the search term up to the parent
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 max-w-md mx-auto">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Search..."
                    className={`flex-1 p-2 border rounded-lg
                        ${errors.query ? 'border-red-500' : 'border-gray-300'}
                        focus:outline-none focus:ring-2 focus:ring-indigo-300`}
                    {...register('query', {
                        required: 'Please enter a search term',
                        minLength: { value: 2, message: 'Search term must be at least 2 characters' }
                    })}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold
                               hover:bg-indigo-700 transition-colors"
                >
                    Search
                </button>
            </div>

            {/* Error message — only shows if there's an error */}
            {errors.query && (
                <p className="text-red-500 text-sm">{errors.query.message}</p>
            )}
        </form>
    );
};

export default SearchForm;
```

---

### Sample 6: Multi-Field Form with Multiple Validation Rules

```jsx
// components/SignupForm.jsx
import { useForm } from 'react-hook-form';

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        await new Promise(r => setTimeout(r, 1000)); // simulate API call
        console.log('Form data:', data);
    };

    // Reusable input class — keeps things DRY
    const inputClass = (fieldError) =>
        `w-full p-2 border rounded ${fieldError ? 'border-red-500' : 'border-gray-300'}
         focus:outline-none focus:ring-2 focus:ring-indigo-300`;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>

            {/* Name field */}
            <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input
                    className={inputClass(errors.name)}
                    {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email field */}
            <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                    type="email"
                    className={inputClass(errors.email)}
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email address'
                        }
                    })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password field */}
            <div>
                <label className="block text-sm font-semibold mb-1">Password</label>
                <input
                    type="password"
                    className={inputClass(errors.password)}
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' }
                    })}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Age field */}
            <div>
                <label className="block text-sm font-semibold mb-1">Age</label>
                <input
                    type="number"
                    className={inputClass(errors.age)}
                    {...register('age', {
                        required: 'Age is required',
                        min: { value: 18, message: 'You must be at least 18' }
                    })}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-2 rounded font-semibold
                           hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
        </form>
    );
};

export default SignupForm;
```

---

### Sample 7: AI Prompts for This Class

```
// Converting CSS to Tailwind:
"Convert this CSS to Tailwind utility classes. Explain each class you choose:
[paste CSS]"

// Exploring style variations:
"Give me 3 different Tailwind class combinations for a [pricing card / hero section / nav bar] —
one minimal, one bold/colourful, one dark mode. Show the JSX for each."

// Responsive debugging:
"My grid looks right on desktop but the cards overlap on mobile. 
Here's my className: [paste]. What's wrong?"

// Validation rules + regex:
"Write a React Hook Form validation object for a [field type] with these rules: [list rules].
Include clear error messages for each rule."

// Regex explanation (always do this after AI gives you a regex):
"Break down this regex character by character: [paste regex]. 
What does each part match?"

// Debugging a form that submits when it shouldn't:
"My form submits even when required fields are empty. I'm using React Hook Form.
Here's my code: [paste]. What's wrong?"
```

---

## PRACTICE EXERCISES

### Exercise 1: Tailwind Quick Drills (20 exercises, ~30 minutes, NO AI)

**Goal:** Build muscle memory with common utility classes. Do these without AI — the repetition is the point.

For each, write the Tailwind className(s) that achieve the described style. Test in play.tailwindcss.com.

1. A div with 16px padding on all sides
2. A div with 24px padding on top and bottom only, 12px on left and right
3. White text on a dark blue background
4. Bold text, centered, size large
5. A box with rounded corners (large) and a medium shadow
6. A flex container with items centered both horizontally and vertically
7. A flex container with space between its children
8. A grid with 2 columns and 16px gap between items
9. A button that turns slightly darker blue when hovered
10. An image that is exactly 48px by 48px and perfectly circular
11. A div with a 2px solid grey border
12. Text that is grey-500 colour and small size
13. A button with horizontal padding 16px and vertical padding 8px
14. A div that takes the full width of its parent
15. A grid that shows 1 column on mobile and 3 columns on desktop (lg breakpoint)
16. A heading that is extra large and has bottom margin of 16px
17. An input with a focus ring in indigo when clicked into
18. A disabled button with reduced opacity and no pointer cursor
19. A div with vertical spacing of 16px automatically applied between all its children
20. A card that lifts up slightly and gets a bigger shadow on hover, with smooth transition

**Answers (check after attempting):**
```
1.  p-4
2.  py-6 px-3
3.  text-white bg-blue-900
4.  font-bold text-center text-lg
5.  rounded-lg shadow-md
6.  flex items-center justify-center
7.  flex justify-between
8.  grid grid-cols-2 gap-4
9.  bg-blue-500 hover:bg-blue-600
10. w-12 h-12 rounded-full
11. border-2 border-gray-300
12. text-gray-500 text-sm
13. px-4 py-2
14. w-full
15. grid grid-cols-1 lg:grid-cols-3
16. text-2xl mb-4
17. focus:ring-2 focus:ring-indigo-300 (often with focus:outline-none)
18. disabled:opacity-50 disabled:cursor-not-allowed
19. space-y-4
20. hover:-translate-y-1 hover:shadow-lg transition-all (or transition-transform + transition-shadow)
```

---

### Exercise 2: Convert a Component to Tailwind (15 minutes)

**Goal:** Take an existing CSS-styled component from your mini project and convert it.

**Steps:**
1. Pick one component (e.g. your MovieCard, RecipeCard, or CountryCard)
2. Open its CSS file side by side with the JSX
3. For each CSS rule, find the matching Tailwind class
4. Move all classes into `className` in the JSX
5. Delete the CSS file and its import
6. Test — does it look the same (or better)?

**If stuck on any specific rule:** Use the AI prompt "Convert this CSS to Tailwind: [paste rule]. Explain the class you chose."

---

### Exercise 3: Build a Responsive Card Grid (15 minutes)

**Goal:** Take your existing card list (movies, recipes, or countries) and make it properly responsive.

**Requirements:**
- 1 column on mobile (no prefix)
- 2 columns on tablet (`md:`)
- 3 or 4 columns on desktop (`lg:` or `xl:`)
- Consistent gap between cards
- Cards have hover effect (shadow increase or slight lift)

**Test:** Open your browser DevTools, toggle device toolbar, and resize through mobile, tablet, and desktop widths. The grid should adjust at each breakpoint.

---

### Exercise 4: Build a Validated Search Form (20 minutes)

**Goal:** Add React Hook Form to a search input in your mini project.

**Requirements:**
1. `npm install react-hook-form`
2. Create `SearchForm.jsx` using Sample 5 above as your template
3. Validation: required, minimum 2 characters
4. Style with Tailwind: input + button in a flex row
5. Show the error message in red below the input
6. Connect `onSearch` to actually filter/search your data

**Test:**
- Submit empty → see error
- Submit 1 character → see error
- Submit valid search → form works, no error

---

### Exercise 5: AI Regex Challenge (10 minutes)

**Goal:** Use AI to generate AND explain a validation regex.

**Task:**
1. Pick a field relevant to your project: Nigerian phone number, postal code, username (letters/numbers only), or URL
2. Ask AI: "Write a React Hook Form pattern validation for [your field]. Include an error message."
3. Then ask: "Break down this regex character by character: [paste it]"
4. Write out, in your own words, what each part of the regex does
5. Add this validation to a field in your project

**Discussion:** Could you have written this regex yourself? What part was hardest to understand?

---

## Quick Reference

### Tailwind Setup (Vite)
```bash
npm install tailwindcss @tailwindcss/vite
```
```js
// vite.config.js
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```
```css
/* index.css */
@import "tailwindcss";
```

### React Hook Form Setup
```bash
npm install react-hook-form
```
```jsx
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('field', { required: 'Required' })} />
  {errors.field && <p>{errors.field.message}</p>}
</form>
```

### The Combined Pattern
```jsx
<input
  className={`border rounded p-2 w-full ${errors.field ? 'border-red-500' : 'border-gray-300'}`}
  {...register('field', { required: 'This field is required' })}
/>
{errors.field && <p className="text-red-500 text-sm mt-1">{errors.field.message}</p>}
```
