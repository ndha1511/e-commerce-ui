
import { Product } from "../../models/product";
import {
  calcPercentDiscount,
  calcPromotion,
  convertPrice,
} from "../../utils/convert-price";
import { formatRating } from "../../utils/covert-rating";
import "./product-card.scss";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div
      className="card-container card-container-size a-disable-default"
      onClick={() => {
        window.location.href = "/product/" + product.urlPath;
      }}
    >
      <div className="img-container">
        <img src={product.thumbnail} alt="image" className="card-image " />
        {product.promotion && (
          <span className="text-medium border-color-primary background-primary discount-tag">
            -{calcPercentDiscount(product.regularPrice, product.promotion)}%
          </span>
        )}
      </div>
      <div className="card-content">
        <div className="card-text">
          <span>{product.productName}</span>
        </div>
        {product.promotion && (
          <div className="card-deal">
            <span className="text-small primary border-color-primary card-span">
              {product.promotion?.promotionName}
            </span>
          </div>
        )}
        <div className="card-rating">
          {product.rating != 0 && product.buyQuantity !== 0 ? (
            <>
              {" "}
              <div>
                <span>{formatRating(product.rating)}/5</span>
                <i className="bi bi-star-fill warning text-small"></i>
              </div>
              <div>
                <span>Đã bán {product.buyQuantity}</span>
              </div>{" "}
            </>
          ) : (
            <>
              <div className="text-muted">Chưa có đánh giá</div>
              {product.buyQuantity !== 0 && (
                <div>
                  <span>Đã bán {product.buyQuantity}</span>
                </div>
              )}
            </>
          )}
        </div>
        <div className="card-price">
          <div className="d-inline-flex gap-1 align-items-center">
            <span
              className={
                !product.promotion ? "text-medium primary" : "text-line-through"
              }
            >
              {convertPrice(product.regularPrice)}
            </span>
            {product.promotion && (
              <span className="text-medium primary">
                {calcPromotion(product.regularPrice, product.promotion)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
