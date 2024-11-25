import CarouselHome from '../../../components/carousel/CarouselHome';
import CategoriesCarousel from '../../../components/categories/CategoriesCarousel ';
import ListProduct from '../../../components/products/ListProduct';
import Rating from '../../../components/rating/Rating';
import { useGetProductsRecommendQuery } from '../../../services/product.service';
import './home.scss';

const Home = () => {

    const { data: productRecommends } = useGetProductsRecommendQuery({
        type: "hybrid-filltering"
    });

    return <div className='container home-container'>

        <CarouselHome />

        <CategoriesCarousel />

        <Rating star={1.5} variant={'warning'} size='text-medium' />

        <ListProduct products={productRecommends?.data} title={"Đề xuất cho bạn"} />

    </div>
}

export default Home;