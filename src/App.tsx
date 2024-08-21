import ProductCard from "./components/products/ProductCard"
import UserLayout from "./layout/user/UserLayout"



function App() {

  return (
    <>
      <UserLayout children={<div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>} />
    </>
  )
}

export default App
