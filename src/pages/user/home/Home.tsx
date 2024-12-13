import { useEffect } from 'react';
import CarouselHome from '../../../components/carousel/CarouselHome';
import CategoriesCarousel from '../../../components/categories/CategoriesCarousel ';
import ListProduct from '../../../components/products/ListProduct';
import useSearchCondition from '../../../hooks/useSearchCondition';
import { useGetProductsPageQuery, useGetProductsRecommendQuery } from '../../../services/product.service';
import './home.scss';

const Home = () => {

    const {setSort, query} = useSearchCondition();

    const { data: productRecommends } = useGetProductsRecommendQuery({
        type: "hybrid-filltering",
        nRecommend: 40
    });

    const {data: productBestSellers} = useGetProductsPageQuery(query);

    useEffect(() => {
        setSort([{
            field: "buyQuantity",
            order: "desc"
        }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className='container home-container'>

        <CarouselHome />

        <CategoriesCarousel />


        <ListProduct products={productRecommends?.data} title={"Đề xuất cho bạn"} />
        <ListProduct products={productBestSellers?.data.items} title={"Sản phẩm bán chạy"} />

    </div>
}

export default Home;