import { Carousel } from "react-bootstrap";
import { useGetPromotionCarouselQuery } from "../../services/promotion.service";
import useRedirect from "../../hooks/useRedirect";
import SkeltetonWrapper from "../query-wrapper/SkeletonWrapper";

const CarouselHome = () => {

  const {data: promotionQueryResult, isSuccess} = useGetPromotionCarouselQuery();
  const redirect = useRedirect();

  return (
    <SkeltetonWrapper queriesStatus={[isSuccess]} skHeight={100}>
    <div className="home-carousel">
      <Carousel fade>
        {promotionQueryResult?.data.map((promotion) => (
          <Carousel.Item key={promotion.id}>
            <img
              className="d-block w-100 border-radius-medium"
              style={{width: '100%', maxHeight: "350px" , objectFit:'contain'}}
              src={promotion.image}
              alt={promotion.promotionName}
            />
            <Carousel.Caption>
              <h3>{promotion.promotionName}</h3>
              <p>{promotion.description}</p>
              <button className="btn btn-primary" onClick={() => {
                redirect(`/promotion/${promotion.url}`)
              }}>Mua sắm ngay</button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
    </SkeltetonWrapper>
  );
};

export default CarouselHome;
