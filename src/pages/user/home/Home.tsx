import CarouselHome from '../../../components/carousel/CarouselHome';
import CategoriesCarousel from '../../../components/categories/CategoriesCarousel ';
import ProductCard from '../../../components/products/ProductCard';
import Rating from '../../../components/rating/Rating';
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
           <Rating star={1.5} variant={'warning'} size='text-medium'/>
        </div>
        <div className='products'>
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