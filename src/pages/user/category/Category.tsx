

import { Link, useParams } from "react-router-dom";
import Select, { SingleValue } from 'react-select'
import MenuCategory from "./MenuCategory";
import { useGetCategoryByUrlQuery } from "../../../services/category.service";
import { Col, Row } from "react-bootstrap";

import CarouseCustom from "../../../components/carousel/CarouseCustom";
import { useGetProductByCategoryQuery } from "../../../services/product.service";
import './category.scss'
import { useEffect, useState } from "react";
import CategoryEmpty from "./CategoryEmpty";
import SkeletonWrapper from "../../../components/query-wrapper/SkeletonWrapper";
import ListProduct from "../../../components/products/ListProduct";
import QueryWrapper from "../../../components/query-wrapper/QueryWrapper";
import PaginationComponent from "../../../components/pagination/PaginationComponent";
import { pageQueryHanlder } from "../../../utils/query-handler";
import { SelectProps } from "../../admin/types";
import { isMobile } from "../../../utils/responsive";


function Category() {
    const mobile = isMobile();
    const { categoryPath } = useParams();
    const { data: parentCategory, isSuccess: getCategoriesSuccess, isError: getCategoriesError, error: categoriesError } = useGetCategoryByUrlQuery(categoryPath || '');
    const [activeButton, setActiveButton] = useState<string | null>(null);


    const images = [
        {
            src: ["https://salt.tikicdn.com/ts/tka/a9/ec/4f/e95b916999b2dd40b3a8e2af30e704e8.png", "https://salt.tikicdn.com/ts/tka/99/ce/6a/9c0a7990ddba5207da7cc37b85bdc2f0.png"],
            alt: "First slide",
            caption: "Here is the description for the first slide",
            title: "First Slide",
        },
        {
            src: ["https://salt.tikicdn.com/ts/tka/45/7b/70/fb7c0e1414d55ae6ea43af2883f2d842.png", "https://salt.tikicdn.com/ts/tka/7f/0b/d3/95916a0bd08a84d64206ce6ef9e72010.png"],
            alt: "Second slide",
            caption: "Here is the description for the second slide",
            title: "Second Slide",
        },
        {
            src: ["https://salt.tikicdn.com/ts/tka/a9/ec/4f/e95b916999b2dd40b3a8e2af30e704e8.png", "https://salt.tikicdn.com/ts/tka/99/ce/6a/9c0a7990ddba5207da7cc37b85bdc2f0.png"],
            alt: "Third slide",
            caption: "Here is the description for the third slide",
            title: "Third Slide",
        },
    ]
    const options = [
        { value: '0', label: 'Tất cả' },
        { value: '0-100000', label: '0 - 100.000đ' },
        { value: '100000-500000', label: '100.000 - 500.000đ' },
        { value: '500000-1000000', label: '500.000 - 1tr' },
        { value: '1000000-1000000000', label: '> 1tr' },
    ];

    const optionRating = [
        { value: '0', label: 'Tất cả' },
        { value: '1-2', label: '⭐' },
        { value: '2-3', label: '⭐⭐' },
        { value: '3-4', label: '⭐⭐⭐' },
        { value: '4-5', label: '⭐⭐⭐⭐' },
        { value: '5-5', label: '⭐⭐⭐⭐⭐' },
    ];
    const handleSubmit = (buttonName: string) => {
        setActiveButton(buttonName);
        if (buttonName === 'best-seller') {
            setFieldSort('buyQuantity');
        }
        if (buttonName === 'latest') {
            setFieldSort('createdAt');
        }
    };
    const [fieldSort, setFieldSort] = useState<string | null>('');
    const [price, setPrice] = useState<SelectProps | null>(null);
    const [rating, setRating] = useState<SelectProps | null>(null);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 40; // Số sản phẩm mỗi trang

    const params = pageQueryHanlder(currentPage, itemsPerPage,
        [],
        [{ field: fieldSort || '', order: 'desc' }]);
    const { data: productByCategory, isSuccess: getProductsSuccess, isError: getProductsError } = useGetProductByCategoryQuery({ categoryUrl: categoryPath || '', param: params, rangeRegularPrice: price?.value, rangeRating: rating?.value || '' });
    const totalPages = productByCategory?.data.totalPage || 0;

    const handlePrice = (newValue: SingleValue<SelectProps>) => {
        if (newValue) {
            setPrice(newValue);
        } else {
            console.log('Không có lựa chọn nào.');
        }
    };
    const handleRating = (newValue: SingleValue<SelectProps>) => {
        if (newValue) {
            setRating(newValue);
        } else {
            console.log('Không có lựa chọn nào.');
        }
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const [breadcrumb, setBreadcrumb] = useState<{ name: string, url: string }[]>([{ name: 'Trang chủ', url: '/' }]);

    useEffect(() => {
        if (parentCategory?.data) {
            const categoryName = parentCategory.data.categoryName;
            const categoryUrl = parentCategory.data.urlPath;
            setBreadcrumb(prevBreadcrumb => {
                const isCategoryExist = prevBreadcrumb.some(item => item.name === categoryName);

                if (!isCategoryExist) {
                    return [...prevBreadcrumb, { name: categoryName, url: `/${categoryUrl}` }];
                }

                return prevBreadcrumb;
            });
        }
    }, [parentCategory, categoryPath]);

    const handleBreadcrumbClick = (index: number) => {
        if (index === 0) {
            setBreadcrumb([{ name: 'Trang chủ', url: '/' }]); // Chỉ giữ "Trang chủ"
        } else {
            const newBreadcrumb = breadcrumb.slice(0, index + 1);
            setBreadcrumb(newBreadcrumb);
        }

    };
    useEffect(() => {
        if (price?.value === '0') {
            setPrice(null);
        }
    }, [price])
    return (
        <QueryWrapper queriesError={[getCategoriesError, getProductsError]} error={categoriesError}>
            <div className="p-3 bg-light">

                <SkeletonWrapper queriesStatus={[getCategoriesSuccess]} skWidth={200}>
                    <div className={`d-flex gap-1 breadcrumb-category`}>
                        {breadcrumb.map((item, index) => (
                            <div key={index} className={`d-flex gap-1 ${(index < breadcrumb.length - 1) ? '' : 'reonly-link'}`}>
                                <div onClick={() => handleBreadcrumbClick(index)}>                                <Link className={`${(index < breadcrumb.length - 1) ? 'link-category' : 'link-category-active'}`} to={'' + item.url || ''}> {item.name}</Link></div>
                                <span> {index < breadcrumb.length - 1 && <i style={{ fontSize: 10 }} className="bi bi-chevron-right"></i>}
                                </span>
                            </div>
                        ))}
                    </div>
                </SkeletonWrapper>
                <Row className=" custom-row p-2 ">
                    <Col md={2} className=" p-2">
                        <SkeletonWrapper queriesStatus={[getCategoriesSuccess]} skHeight={300}>
                            <div className="bg-white border-radius-small">
                                <div className="text-medium p-3 ">Khám phá theo danh mục</div>
                                {parentCategory?.data.children?.map((item) => (
                                    <MenuCategory key={item.id} item={item} />
                                ))}
                            </div>
                        </SkeletonWrapper>
                    </Col>
                    <Col md={10} className="p-2">
                        <div className="mb-2">
                            <SkeletonWrapper queriesStatus={[getProductsSuccess]} skHeight={200}>
                                <div className="p-3 bg-white border-radius-small d-flex align-items-center ">
                                    <span className="text-large">{parentCategory?.data.categoryName}</span>
                                </div>
                                <div className='mt-1'>
                                    <CarouseCustom images={images} height={200} />
                                </div>
                            </SkeletonWrapper>
                        </div>
                        <SkeletonWrapper queriesStatus={[getProductsSuccess]} skHeight={50}>
                            <div className={`mt-3 option-filter-user p-3 ${mobile ? 'd-flex flex-column' : 'd-flex gap-3 align-items-center'} `}>
                                <div className="d-flex gap-3 ">
                                    <div className="text-muted">Sắp xếp theo</div>
                                    <button className={`${activeButton === 'latest' ? 'btn-filter-cate-user-active' : 'btn-filter-cate-user'}`} onClick={() => handleSubmit('latest')}>Mới nhất</button>
                                    <button className={`${activeButton === 'best-seller' ? 'btn-filter-cate-user-active' : 'btn-filter-cate-user'}`} onClick={() => handleSubmit('best-seller')}>Bán chạy</button>
                                </div>
                                <div className={`d-flex gap-3 ${mobile?'mt-2':''}`}>
                                    <div className={` ${mobile ? 'd-flex flex-column ':'d-flex gap-2 align-items-center'}`}>
                                        <span>Phân loại theo giá:</span>
                                        <div style={{ minWidth: mobile ? 150 : 200 }}>
                                            <Select options={options} placeholder="Giá"
                                                value={price}
                                                onChange={handlePrice} />
                                        </div>
                                    </div>
                                    <div className={` ${mobile ? 'd-flex flex-column ':'d-flex gap-2 align-items-center'}`}>
                                        <span>Phân loại theo đánh giá:</span>
                                        <div style={{ minWidth: mobile ? 150 : 200 }}>
                                            <Select options={optionRating}
                                                value={rating}
                                                onChange={handleRating}
                                                placeholder="Đánh giá" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SkeletonWrapper>

                        <ListProduct products={productByCategory?.data.items} />
                        {(getProductsSuccess && (productByCategory?.data.items && productByCategory?.data.items.length === 0)) && <CategoryEmpty />}
                        {(getProductsSuccess && (productByCategory?.data.items && productByCategory?.data.items.length > 0)) &&
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handlePageChange={handlePageChange}
                            />}






                    </Col>
                </Row>
            </div>
        </QueryWrapper>
    );
}

export default Category;