import CarouselHome from '../../../components/carousel/CarouselHome';
import CategoriesCarousel from '../../../components/categories/CategoriesCarousel ';
import ProductCard from '../../../components/products/ProductCard';
import './home.scss'

const Home = () => {
    return <div className='container home-container'>
        <div className='carousel-home'>
            <CarouselHome/>
        </div>
        <div className='category'>
            <CategoriesCarousel/>
        </div>
        <div className='suggested'>
            ĐỀ XUẤT
        </div>
        <div className='d-flex flex-wrap gap-2 justify-content-center'>
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