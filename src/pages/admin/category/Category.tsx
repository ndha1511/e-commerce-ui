import { faAngleDown, faAngleUp, faCirclePlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Collapse } from "react-bootstrap";
import CreateCategoryModal from "./CreateCategoryModal";
import useGetParam from "../../../hooks/useGetParam";
import { useGetCategoriesQuery, useLazyGetCategoriesQuery } from "../../../services/category.service";
import { pageQueryHanlder } from "../../../utils/query-handler";
import ClipLoader from "react-spinners/ClipLoader";
import { Category as CategoryModel } from "../../../models/category";

interface ItemProps {
    category: CategoryModel;
}

const CategoryItem = ({category} : ItemProps) => {
    const [open, setOpen] = React.useState(false);
    const [getCategory, {isLoading}] = useLazyGetCategoriesQuery();
    const [childCategory, setChildCategory]  = React.useState<CategoryModel[]>([]);
    const [showModal, setShowModal] = React.useState(false);
    const paramsChild: string = pageQueryHanlder(1, 100, [{filed: 'parentId', operator: '=', value: category.id}]);
    

    const openCollapse = async () => {
        setOpen(!open);
        try {
            const result = await getCategory(paramsChild)
            .unwrap();
            setChildCategory(result.data?.items);
        } catch (error) {
            console.log(error);
        }

    }

    const handleClose = () => {
        setShowModal(false);
    }
    
    const refetch = async () => {
        await getCategory(paramsChild).refetch();
    }

    return <div className="d-flex flex-column border border-radius-small p-1 pe-2">
        <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-5 w-50">
                {category.image && <img src={category.image} alt="category" width={50} height={50} />}
                <h6>{category.categoryName}</h6>
            </div>
            <div className="d-flex align-items-center gap-2"> 
                Active: <span className="text-large cursor-pointer text-success">
                    {category.inActive ? <i className="bi bi-toggle-off"></i> : <i className="bi bi-toggle-on"></i>}
                </span>
            </div>
            <div className="d-flex align-items-center gap-3">
                <span className="text-medium cursor-pointer secondary" data-toggle="tooltip" title="chỉnh sửa"><FontAwesomeIcon icon={faPenToSquare} /></span>
                <span className="text-medium cursor-pointer text-success" data-toggle="tooltip" title="thêm danh mục con" onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faCirclePlus} /></span>
                <span className="text-medium cursor-pointer primary" data-toggle="tooltip" title="xóa"><FontAwesomeIcon icon={faTrash} /></span>
            </div>
           {category.children !== 0 &&  <span onClick={openCollapse} className="text-primary text-large cursor-pointer">
                {open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
            </span>}
        </div>
        {open && <Collapse in={open}>
            <div className="ps-2 d-flex flex-column gap-1">
                {childCategory.map(item => <CategoryItem key={item.id} category={item}/>)}
                {isLoading && <div className="loading-content"><ClipLoader color={'red'} loading={isLoading} /></div>}
            </div>
        </Collapse>}
        {showModal && <CreateCategoryModal refetch={refetch} show={showModal} handleClose={handleClose} parentId={category.id}/>}
    </div>
}


const Category = () => {
    const pageParams = useGetParam('page');
    const [show, setShow] = React.useState(false);
    const [page, setPage] = React.useState<number>(pageParams ? Number(pageParams) : 1);

    const {data, isFetching, refetch} = useGetCategoriesQuery(pageQueryHanlder(page, 20, [{filed: 'parentId', operator: ':', value: 'null'}]));

    const handleClose = () => {
        setShow(false);
    }
    return <div className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between loading-container">
            <h5>Danh mục</h5>
            <button onClick={() => setShow(true)} className="button-hover button-flex background-primary"><i className="bi bi-plus-lg"></i> Thêm danh mục</button>
        </div>
        <div className="d-flex">
            search
        </div>
        <div className="d-flex flex-column gap-3 ps-3 pe-3 flex-1">
            {data?.data.items.map((item) => <CategoryItem key={item.id} category={item}/>)}
            {isFetching && <div className="loading-content"><ClipLoader color={'red'} loading={isFetching} /></div>}
        </div>
        {show && <CreateCategoryModal refetch={refetch} show={show} handleClose={handleClose}/>}
       
    </div>
}

export default Category;