import ProductCard from '../../../components/products/ProductCard';
import './home.scss'

const Home = () => {
    return <div className='container home-container'>
        <div className='carousel'>
            CAROUSELS
        </div>
        <div className='category'>
            PHÂN LOẠI
        </div>
        <div className='suggested'>
            ĐỀ XUẤT
        </div>
        <div className='d-flex flex-wrap justify-content-center' style={{
            gap: '12.5px'
        }}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>

    </div>
}

export default Home;