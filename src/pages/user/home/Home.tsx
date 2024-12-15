import { useEffect } from "react";
import CarouselHome from "../../../components/carousel/CarouselHome";
import CategoriesCarousel from "../../../components/categories/CategoriesCarousel ";
import ListProduct from "../../../components/products/ListProduct";
import useSearchCondition from "../../../hooks/useSearchCondition";
import {
  useGetProductsPageQuery,
  useGetProductsRecommendQuery,
} from "../../../services/product.service";
import "./home.scss";
import QueryWrapper from "../../../components/query-wrapper/QueryWrapper";

const Home = () => {
  const { setSort, query } = useSearchCondition();

  const {
    data: productRecommends,
    isFetching: getProductRecommendsFetching,
    isError: getProductRecommendsError,
  } = useGetProductsRecommendQuery({
    type: "hybrid-filltering",
    nRecommend: 40,
  });

  const {
    data: productBestSellers,
    isFetching: getProductBestSellersFetching,
    isError: getProductBestSellersError,
  } = useGetProductsPageQuery(query);

  useEffect(() => {
    setSort([
      {
        field: "buyQuantity",
        order: "desc",
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryWrapper
      queriesError={[getProductRecommendsError, getProductBestSellersError]}
      queriesSuccess={[!getProductBestSellersFetching, !getProductRecommendsFetching]}
    >
      <div className="container home-container">
        <CarouselHome />

        <CategoriesCarousel />

        <ListProduct
          products={productRecommends?.data}
          loading={!getProductRecommendsFetching}
          title={"Đề xuất cho bạn"}
        />
        <ListProduct
          products={productBestSellers?.data.items}
          loading={!getProductBestSellersFetching}
          title={"Sản phẩm bán chạy"}
        />
      </div>
    </QueryWrapper>
  );
};

export default Home;
