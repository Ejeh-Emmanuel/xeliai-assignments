# Class 19+20 — Full Code Solutions
## Country Explorer App (Tailwind + React Hook Form)

This is the **reference implementation** for the Class 19+20 homework using
**Option 3: Country Explorer** (restcountries.com — no API key required).

If you chose the Movie Database or Recipe Finder, the component structure
and patterns are identical — only the API URL and field names differ.

---

## What's Included

| File | Covers |
|------|--------|
| `src/components/Navbar.jsx` | Tailwind-styled NavLink with active highlighting |
| `src/components/CountryCard.jsx` | Responsive card with hover states |
| `src/components/LoadingSpinner.jsx` | Reusable loading state component |
| `src/components/SearchForm.jsx` | **HW20** — React Hook Form with 2 validation rules |
| `src/pages/HomePage.jsx` | Data fetch + responsive grid + search integration |
| `src/pages/CountryPage.jsx` | Dynamic route via useParams + detail view |
| `src/pages/NotFound.jsx` | 404 catch-all page |

---

## How to Run

```bash
npm install
npm run dev
```

---

## Key Concepts Demonstrated

### Homework 19 (Tailwind)
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` — responsive grid
- `hover:-translate-y-1 hover:shadow-lg transition-all` — card hover effect
- `NavLink` with `isActive` function for active link styling
- Zero custom .css files (only `@import "tailwindcss"` in index.css)

### Homework 20 (React Hook Form)
- `useForm()` — register, handleSubmit, errors, isSubmitting
- `required` + `minLength` validation rules with custom messages
- Conditional border: `errors.query ? 'border-red-500' : 'border-gray-300'`
- `{errors.field && <p>{errors.field.message}</p>}` error display pattern
- `disabled={isSubmitting}` on the submit button

---

*XELI AI Labs · Class 19+20 Reference Solution · Do not distribute before homework deadline*
