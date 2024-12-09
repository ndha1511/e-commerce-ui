import CarouselHome from '../../../components/carousel/CarouselHome';
import CategoriesCarousel from '../../../components/categories/CategoriesCarousel ';
import ListProduct from '../../../components/products/ListProduct';
import { useGetProductsRecommendQuery } from '../../../services/product.service';
import './home.scss';

const Home = () => {

    const { data: productRecommends } = useGetProductsRecommendQuery({
        type: "hybrid-filltering",
        nRecommend: 40
    });

    return <div className='container home-container'>

        <CarouselHome />

        <CategoriesCarousel />


        <ListProduct products={productRecommends?.data} title={"Đề xuất cho bạn"} />

    </div>
}

export default Home;