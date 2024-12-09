import { useState } from "react";
import { useGetProductByKeywordQuery } from "../../../services/product.service";
import useGetParam from "../../../hooks/useGetParam";
import ListProduct from "../../../components/products/ListProduct";
import { Container } from "react-bootstrap";
import useSearchCondition from "../../../hooks/useSearchCondition";
import PaginationComponent from "../../../components/pagination/PaginationComponent";
import SkeltetonWrapper from "../../../components/query-wrapper/SkeletonWrapper";
import Select, { SingleValue } from 'react-select'
import { ratingOptions, regularPriceOptions } from "../utils";
import { SelectProps } from "../../admin/types";

export interface ProductKeywordSearchParams {
    rangeRegularPrice: SelectProps;
    rangeRating: SelectProps;
}

const ProductKeyword: React.FC = () => {
    const keyword = useGetParam("keyword");
    const { query, page, setPage, setSort } = useSearchCondition();
    const [detailCondition, setDetailCondition] = useState<ProductKeywordSearchParams>({
        rangeRegularPrice: {
            label: "Tất cả",
            value: "",
        },
        rangeRating: {
            label: "Tất cả",
            value: "",
        },
    });

    const [activeButton, setActiveButton] = useState<string | null>(null);


    const queryResultGetProductByKeyword = useGetProductByKeywordQuery({
        keyWord: keyword || "",
        param: query,
        rangeRegularPrice: detailCondition.rangeRegularPrice.value,
        rangeRating: detailCondition.rangeRating.value,
    });

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handleChangeSelect = (newValue: SingleValue<SelectProps> , type: 'price' | 'rating') => {
        if(type === 'price') {
            setDetailCondition((prev) => {
                return {
                   ...prev,
                   rangeRegularPrice: newValue || {
                    label: "Tất cả",
                    value: ""
                },
                };
            })
        } else {
            setDetailCondition(prev => {
                return {...prev, rangeRating: newValue || {
                    label: "Tất cả",
                    value: ""
                }}
            })
        }
    }

    const handleSubmit = (buttonName: string) => {
        setActiveButton(buttonName);
        if (buttonName === 'best-seller') {
            setSort([{
                field: 'buyQuantity',
                order: 'desc',
            }]);
        }
        if (buttonName === 'latest') {
            setSort([{
                field: 'createdAt',
                order: 'desc',
            }]);
        }
    };

    return <Container className="bg-light pt-2">
        <SkeltetonWrapper queriesStatus={[queryResultGetProductByKeyword.isSuccess]} skHeight={50}>
            <span>Kết quả tìm kiếm cho từ khóa: {keyword || "Tất cả"}</span>
            <div className='mt-3 p-3  d-flex gap-3 align-items-center'>
                <div className="text-muted">Sắp xếp theo</div>
                <button className={`${activeButton === 'latest' ? 'btn-filter-cate-user-active' : 'btn-filter-cate-user'}`} onClick={() => handleSubmit('latest')}>Mới nhất</button>
                <button className={`${activeButton === 'best-seller' ? 'btn-filter-cate-user-active' : 'btn-filter-cate-user'}`} onClick={() => handleSubmit('best-seller')}>Bán chạy</button>
                <div style={{ minWidth: 200 }}><Select options={regularPriceOptions} placeholder="Giá"
                    value={detailCondition.rangeRegularPrice}
                    onChange={(val) => handleChangeSelect(val, 'price')}
                /></div>
                <div style={{ minWidth: 200 }}><Select options={ratingOptions}
                    value={detailCondition.rangeRating}
                    onChange={(val) => handleChangeSelect(val, 'rating')}
                    placeholder="Đánh giá" /></div>
            </div>
        </SkeltetonWrapper>
        <ListProduct products={queryResultGetProductByKeyword.data?.data.items} />
        <PaginationComponent
            currentPage={page}
            totalPages={queryResultGetProductByKeyword.data?.data.totalPage || 0}
            handlePageChange={handlePageChange}
        />
    </Container>
}

export default ProductKeyword;