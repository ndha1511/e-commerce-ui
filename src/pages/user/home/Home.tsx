import CarouselHome from '../../../components/carousel/CarouselHome';
import CategoriesCarousel from '../../../components/categories/CategoriesCarousel ';
import ProductCard from '../../../components/products/ProductCard';
import Rating from '../../../components/rating/Rating';
import { useGetProductsQuery } from '../../../services/product.service';
import './home.scss'

const Home = () => {
    const {data} = useGetProductsQuery();
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
            {data && data.data.items.map(product => <ProductCard product={product} key={product.id}/>)}
        </div>
    </div>
}

export default Home;