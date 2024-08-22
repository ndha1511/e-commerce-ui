import React from 'react';
import { Carousel } from 'react-bootstrap';
import './CategoriesCarousel .scss'; // Optional: Create a separate CSS file for additional styling.

const CategoriesCarousel = () => {
  const categories = [
    { name: 'Thời Trang Nam', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Điện Thoại & Phụ Kiện', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Thiết Bị Điện Tử', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Máy Tính & Laptop', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Máy Ảnh & Máy Quay Phim', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Đồng Hồ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Giày Dép Nam', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Thiết Bị Điện Gia Dụng', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Thể Thao & Du Lịch', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Ô Tô & Xe Máy & Xe Đạp', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Thời Trang Nữ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Mẹ & Bé', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Nhà Cửa & Đời Sống', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Sắc Đẹp', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Sức Khỏe', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Giày Dép Nữ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Túi Ví Nữ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Phụ Kiện & Trang Sức Nữ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Bách Hóa Online', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Nhà Sách Online', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Thời Trang Nam', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Điện Thoại & Phụ Kiện', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Thiết Bị Điện Tử', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Máy Tính & Laptop', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Máy Ảnh & Máy Quay Phim', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Đồng Hồ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Giày Dép Nam', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Thiết Bị Điện Gia Dụng', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Thể Thao & Du Lịch', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Ô Tô & Xe Máy & Xe Đạp', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Thời Trang Nữ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Mẹ & Bé', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Nhà Cửa & Đời Sống', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Sắc Đẹp', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Sức Khỏe', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Giày Dép Nữ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Túi Ví Nữ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Phụ Kiện & Trang Sức Nữ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Bách Hóa Online', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
    { name: 'Nhà Sách Online', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' }
  ];


  const itemsPerSlide = 20; // Number of items per slide
  const totalSlides = Math.ceil(categories.length / itemsPerSlide);

  const renderCarouselItems = () => {
    const slides = [];
    for (let i = 0; i < totalSlides; i++) {
      slides.push(
        <Carousel.Item key={i}>
          <div className="d-flex justify-content-center align-items-center flex-wrap items-categories">
            {categories.slice(i * itemsPerSlide, (i + 1) * itemsPerSlide).map((category, idx) => (
              <div className="category-item text-center  " key={idx}>
                <img src={category.icon} alt={category.name} className="category-icon" />
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        </Carousel.Item>
      );
    }
    return slides;
  };

  return (
    <div className="categories-carousel">
      <div className='title-categories'>
        <span >Danh mục</span>
      </div>
        <Carousel interval={null} indicators={false} controls={true}>
          {renderCarouselItems()}
        </Carousel>
    </div>
  );
};

export default CategoriesCarousel;
