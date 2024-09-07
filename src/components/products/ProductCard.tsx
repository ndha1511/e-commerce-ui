import { Link } from 'react-router-dom';
import { Product } from '../../models/product';
import { convertPrice } from '../../utils/convert-price';
import './product-card.scss';

const ProductCard = ({ product }: { product: Product }) => {
    return <Link className='card-container card-container-size a-disable-default' to={'/product/' + product.urlPath}>
        <div className='img-container'>
            <img src={product.thumbnail}
                alt='image'
                className='card-image '
            />
            <span className='text-medium border-color-primary background-primary discount-tag'>-20%</span>
        </div>
        <div className='card-content'>
            <div className='card-text'>
                <span>{product.productName}</span>
            </div>
            <div className='card-deal'>
                <span className='text-small primary border-color-primary card-span'>
                    Deal sốc
                </span>
                <span className='text-small secondary border-color-secondary card-span'>
                    Siêu sale 8/8
                </span>
            </div>
            <div className='card-rating'>
                {product.rating != 0 ? <> <div>
                    <span className='text-small'>4.9/5</span>
                    <i className="bi bi-star-fill warning text-small"></i>
                </div>
                    <div>
                        <span className='text-small'>Đã bán 42,5k</span>
                    </div> </> : <div className='text-muted'>Chưa có đánh giá</div>}
            </div>
            <div className='card-price'>
                <div className='d-inline-flex gap-1 align-items-center'>
                    <span className='text-medium primary'>{convertPrice(product.regularPrice)}</span>
                    <span className='text-small text-line-through'>500.000 đ</span>
                </div>
                <span className='text-blur text-small'>{product.city}</span>
            </div>
        </div>
    </Link>
}

export default ProductCard;