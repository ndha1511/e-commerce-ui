import './product-card.scss';

const ProductCard = () => {
    return <a className='card-container card-container-size a-disable-default' href='#'>
        <div className='img-container'>
            <img src='https://img.alicdn.com/bao/uploaded/i2/2200675516807/O1CN01OjgC41209esL41uZm_!!0-item_pic.jpg'
                alt='image'
                className='card-image '
            />
            <span className='text-medium border-color-primary background-primary discount-tag'>-20%</span>
        </div>
        <div className='card-content'>
            <div className='card-text'>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
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
                <div>
                    <span className='text-small'>4.9/5</span>
                    <i className="bi bi-star-fill warning text-small"></i>
                </div>
                <div>
                    <span className='text-small'>Đã bán 42,5k</span>
                </div>
            </div>
            <div className='card-price'>
                <span className='text-medium primary'>400.000 đ</span>
                <span className='text-small text-line-through'>500.000 đ</span>
                <div></div>
                <span className='text-blur text-small'>Vũng Tàu</span>
            </div>
        </div>
    </a>
}

export default ProductCard;