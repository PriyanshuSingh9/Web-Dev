# Concepts Used

## React Hooks
- **useMemo**: Returns a memoized value.
  - "It 'memoizes' a value, which is a fancy way of saying it caches or saves the result of a calculation."
  - "It takes two arguments: 1. A function that performs the expensive calculation... 2. A 'dependency array'[]"

## Core Concepts
- **Performance Optimization**: Avoiding expensive calculations on every render.
  - "now the computations are not calculated for each re render thus the page becomes smoother and responsive"
- **Dependency Array**: Controls when the memoized value is recomputed.

## Implementation Details

### Expensive Calculation (`App.jsx`)
Without `useMemo`, this find operation would run on every render (e.g., when `count` changes).
```javascript
const nums = new Array(30_000_000).fill(0).map((_, i) => {
  return {
    index: i,
    isMagical: i === 29_000_000
  }
})

function App() {
  const [count, setCount] = useState(0)
  const [numbers, setNumbers] = useState(nums)

  // This result is cached and only re-calculated if 'numbers' changes
  const magical = useMemo(() => numbers.find(item => item.isMagical === true), [numbers])

  return (
    <>
      <span>Magical number is {magical.index}</span>
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
    </>
  )
}
```