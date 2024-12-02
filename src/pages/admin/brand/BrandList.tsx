import { useEffect, useState } from 'react';
import { useGetBrandsQuery } from "../../../services/brand.service";
import { pageQueryHanlder } from "../../../utils/query-handler";
import { Collapse } from 'react-bootstrap';
import './brand.scss';
import { Brand } from '../../../models/brand';
import useRedirect from '../../../hooks/useRedirect';
import { BsGear, BsTrash } from 'react-icons/bs';
import { isMobile } from '../../../utils/responsive';
import UpdateBrand from './UpdateBrand';

interface BrandProps {
    brand: Brand;
    refetch: ()=>void;
}

function BrandList() {
    const mobile = isMobile();
    const params = pageQueryHanlder(1, 40);
    const { data, refetch } = useGetBrandsQuery(params);
    const brands = data?.data.items;
    const redirect = useRedirect();

    useEffect(() => {
        refetch();
    }, [data])
    return (
        <div className={`${mobile ? "w-50" : "p-3  bg-light w-100"}`}>
            <div className='d-flex w-100 justify-content-between'>
                <span className="text-large">Danh sách thương hiệu</span>
                <div className={`${mobile ? "p-2  d-flex justify-content-start mt-5" : "p-2  d-flex justify-content-start"}`}>
                    <button className="btn-save-all-category p-2" onClick={() => redirect('/admin/brand')} >Thêm thương hiệu</button>
                </div>
            </div>
            <div className="p-3 bg-light border-radius-small row border ">
                {brands?.map((brand) => (
                    <BrandCard key={brand.brandName} brand={brand} refetch={refetch} />
                ))}
            </div>

        </div>
    );
}

function BrandCard({ brand, refetch}: BrandProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    // Hàm chuyển đổi giữa mở rộng và thu gọn
    const toggleExpand = () => setIsExpanded(!isExpanded);

    // Giới hạn 100 ký tự cho mô tả
    const shortDescription = brand.description.slice(0, 100);
    const isLongDescription = brand.description.length > 100;

    return (
        <div className=" col-xs-12 col-md-6 bg-white p-3 border">
            <div className="bg-white d-flex flex-column p-3 brand-shadow" style={{ position: 'relative', }}>
                <img src={brand.image} alt={brand.image} style={{ objectFit: 'fill' }} height={200} />
                <span>{brand.brandName}</span>

                <span>
                    {isLongDescription ? shortDescription : brand.description}
                    {isLongDescription && !isExpanded && (
                        <span
                            onClick={toggleExpand}
                            style={{ color: 'orange', cursor: 'pointer' }}
                        >
                            ... xem thêm
                        </span>
                    )}
                </span>
                <div style={{ position: 'absolute', bottom: 13, right: 13, display: 'flex', gap: 13 }}>
                    <BsGear style={{ fontSize: '18px', color: 'orange', cursor: 'pointer' }} onClick={() => handleOpenModal()} />
                    <BsTrash style={{ fontSize: '18px', color: 'red', cursor: 'pointer' }} />
                </div>

                <Collapse in={isExpanded}>
                    <div>
                        <span>{brand.description.slice(100)}</span>
                        <span
                            onClick={toggleExpand}
                            style={{ color: 'orange', cursor: 'pointer', display: 'block', marginTop: '10px' }}
                        >
                            thu gọn
                        </span>
                    </div>
                </Collapse>
            </div>
            {showModal && <UpdateBrand show={showModal} handleClose={handleCloseModal} brand={brand} refetch={refetch} />}
        </div>
    );
}

export default BrandList;
