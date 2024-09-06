type Props = {
    star: number,
    variant?: 'primary' | 'secondary' | 'warning',
    size?: 'text-small' | 'text-medium' | 'text-large'
}

const Rating = ({star, variant, size} : Props) => {
   
    const stars = [
        <i className="bi bi-star-fill"></i>,
        <i className="bi bi-star-fill"></i>,
        <i className="bi bi-star-fill"></i>,
        <i className="bi bi-star-fill"></i>,
        <i className="bi bi-star-fill"></i>,
        <i className="bi bi-star"></i>,
        <i className="bi bi-star"></i>,
        <i className="bi bi-star"></i>,
        <i className="bi bi-star"></i>,
        <i className="bi bi-star"></i>,
    ];

    const getStars = () => {
        let intStar: number = Math.floor(star);
        let floatStar: number = star - intStar;
        const rs = stars.slice(5 - intStar, stars.length - intStar);
        if (floatStar >= 0.5) {
            rs[intStar] = <i className="bi bi-star-half"></i>;
        }
        return rs;
    }

    return (
        <div className={`${variant} ${size} d-inline-flex gap-1`}>
            {getStars().map((star, index) => <div key={index}>{star}</div>)}
        </div>
    );

}

export default Rating;