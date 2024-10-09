import { Col, Row, Table } from "react-bootstrap";
import './insert-product.scss'
import { useEffect, useState } from "react";
import BtnGroup from "../../../components/seller/insert-product/BtnGroup";
import ImgAndVideo from "../../../components/seller/insert-product/ImgAndVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import CategoryModal from "../../../components/seller/modal/CategoryModal";
import { useGetCategoriesQuery, useLazyGetCategoriesQuery } from "../../../services/category.service";
import { Category } from "../../../models/category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../rtk/store/store";
import { setDescription, setProductName, setRegularPrice } from "../../../rtk/slice/product-slice";
import { pageQueryHanlder } from "../../../utils/query-handler";
import { useCreateProductMutation } from "../../../services/product.service";
import { setNotify } from "../../../rtk/slice/notify-slice";





function InsertProduct() {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [video, setVideo] = useState<File>();
    const [category, setCategory] = useState<Category | null>(null);
    const products = useSelector((state: RootState) => state.product)
    const params: string = pageQueryHanlder(1, 40, [{ filed: 'parentId', operator: '=', value: 'null' }]);
    const [trigger] = useCreateProductMutation();
    const product = useSelector((state: RootState) => state.product);
    const [regularPrice, setRigularPrice] = useState<number>(0);

    console.log(product);
    const dispatch = useDispatch();
    const handleCategory = (categoryModal?: Category) => {
        if (categoryModal) {
            setCategory(categoryModal);
        }
    }
    const handleCloseCategoryModal = () => {
        setShowCategoryModal(false);
    }
    const handleOpenCategoryModal = () => {
        setShowCategoryModal(true);
    }
    const fetchBlobAndCreateFile = async (url: string[]): Promise<File[]> => {
        try {
            const fileArr: File[] = [];
            for (let i = 0; i < url.length; i++) {
                const response = await fetch(url[i]);
                const blob = await response.blob();
                const newFile = new File([blob], 'image.jfif', { type: blob.type });
                fileArr.push(newFile);
                URL.revokeObjectURL(url[i]);
            }
            return fileArr;
        } catch (error) {
            return [];
        }
    };
    const handleChange = (value: number) => {
        setRigularPrice(value);
        dispatch(setRegularPrice(value))
    }
    const handleAddProduct = async () => {
        const file: File[] = await fetchBlobAndCreateFile(product.images);
        const formData = new FormData();

        if (file) {
            for (let i = 0; i < file.length; i++) {
                formData.append('images', file[i]);
            }
        }
        if (video) {
            formData.append('video', video);
        }
        try {
            formData.append('productName', product.productName);
            formData.append('brandId', product.brandId);
            formData.append('categories', product.categories[0]);
            formData.append('categories', product.categories[1]);
            formData.append('categories', product.categories[2]);
            formData.append('regularPrice', product.regularPrice.toString());
            formData.append('description', product.description);
            await trigger(formData).unwrap();
            dispatch(setNotify({
                type: 'success', message: 'Thêm sản phẩm thành công thành công'
            }))
        } catch (error) {
            dispatch(setNotify({
                type: 'error', message: 'Thêm không thành công'
            }))
        }
    }
    const videoUrl = product.video;
    useEffect(() => {
        const fetchBlobAndCreateFile = async () => {
            try {
                const response = await fetch(videoUrl || '');
                const blob = await response.blob();
                const newVideo = new File([blob], 'image.jfif', { type: blob.type });
                setVideo(newVideo);
            } catch (error) {
                console.error('Error fetching blob:', error);
            }
        };
        fetchBlobAndCreateFile();
        // Giải phóng URL blob khi component unmount
        return () => {
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }

        };
    }, [videoUrl]);
    const { data } = useGetCategoriesQuery(params);
    return (
        <div className="w-100 container-fluid">
            <Row>
                {/* <Col md={3} className="border pt-3">
                    <MenuProductInsert />
                </Col> */}
                <Col md={12} className="border bg-light p-3">
                    <BtnGroup />
                    <div className="bg-white p-4 border-radius-medium" style={{ width: '95%' }}>
                        <h4>Thông tin cơ bản</h4>
                        <ImgAndVideo />
                        <div className="d-flex flex-column gap-4"> <Row>
                            <Col md={2} className="text-end">
                                <div className="mt-2"> <span><span className="primary">*</span> Tên sản phẩm</span></div>
                            </Col>
                            <Col md={10}>
                                <input className="input-basic-information-seller"
                                    value={products.productName ? products.productName : ''}
                                    onChange={(e) => { dispatch(setProductName(e.target.value)) }}
                                    placeholder="Tên sản phẩm + Thương hiệu + Model" type="text" />
                            </Col>
                        </Row>
                            <Row>
                                <Col md={2} className="text-end">
                                    <div className="mt-2"><span><span className="primary" >*</span> Ngành hàng</span></div>
                                </Col>
                                <Col md={10}>

                                    <div className="category-seller" onClick={handleOpenCategoryModal}>
                                        <input readOnly className="input-basic-information-seller" value={category?.categoryName || ""} placeholder="Chọn ngành hàng" type="text" />
                                        <FontAwesomeIcon style={{ position: 'absolute', right: 20 }} icon={faPen} />
                                    </div>

                                </Col>
                            </Row>
                            <Row>
                                <Col md={2} className="text-end">
                                    <div className="mt-2"><span><span className="primary">*</span>Giá:</span></div>
                                </Col>
                                <Col md={10}>
                                    <div className="select-search-sale-info" >
                                        <div className=" p-1 pe-2" style={{ borderRight: '2px solid rgb(241, 236, 236)' }}>
                                            <span >₫</span>
                                        </div>
                                        <input
                                            className="select-sale-info"
                                            placeholder="Giá nhập"
                                            type="text"
                                            value={products.regularPrice || ''}
                                            onChange={(e) => handleChange(Number(e.target.value))}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={2} className="text-end">
                                    <div className="mt-2"><span><span className="primary">*</span> Mô tả sản phẩm</span></div>
                                </Col>
                                <Col md={10}>
                                    <textarea rows={8} cols={50} onChange={(e) => dispatch(setDescription(e.target.value))} className="textarea-basic-information-seller" />
                                </Col>
                            </Row>


                        </div>
                        <div className=" mt-3 w-100 d-flex justify-content-end">
                            <button className="btn-save-all-category-1" onClick={handleAddProduct}>Thêm sản phẩm</button>
                        </div>
                    </div>

                    {/* <div className="bg-white  border-radius-medium mt-3 p-3" style={{ width: '95%' }}>
                        <h4>Thông tin chi tiết</h4>
                        <CategoryInfo />
                    </div>
                    <div className="bg-white  border-radius-medium mt-3 p-3" style={{ width: '95%' }}>
                        <h4>Thông tin bán hàng</h4>
                        <SaleInfo />
                    </div> */}
                    {/* <div className="bg-white border-radius-medium mt-3 p-3" style={{ width: '95%' }}>
                   
                    </div> */}

                </Col>
            </Row>
            <CategoryModal show={showCategoryModal} handleClose={handleCloseCategoryModal} categories={data?.data.items} handleCategory={handleCategory} />
        </div>
    );
}

export default InsertProduct;