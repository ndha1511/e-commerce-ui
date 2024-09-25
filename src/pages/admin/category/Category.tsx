import { faAngleDown, faAngleUp, faCirclePlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Collapse } from "react-bootstrap";
import CreateCategoryModal from "./CreateCategoryModal";

const CategoryItem = () => {
    const [open, setOpen] = React.useState(false);

    const openCollapse = () => {
        setOpen(!open);
    }
    return <div className="d-flex flex-column border border-radius-small p-1 pe-2">
        <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
                <img src="cat" alt="category" width={50} height={50} />
                <h6>Category Name</h6>
            </div>
            <div className="d-flex align-items-center gap-2"> 
                Trạng thái: <span className="text-large cursor-pointer text-success"><i className="bi bi-toggle-on"></i></span>
            </div>
            <div className="d-flex align-items-center gap-3">
                <span className="text-medium cursor-pointer secondary" data-toggle="tooltip" title="chỉnh sửa"><FontAwesomeIcon icon={faPenToSquare} /></span>
                <span className="text-medium cursor-pointer text-success" data-toggle="tooltip" title="thêm danh mục con"><FontAwesomeIcon icon={faCirclePlus} /></span>
                <span className="text-medium cursor-pointer primary" data-toggle="tooltip" title="xóa"><FontAwesomeIcon icon={faTrash} /></span>
            </div>
            <span onClick={openCollapse} className="text-primary text-large cursor-pointer">
                {open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
            </span>
        </div>
        {open && <Collapse in={open}>
            <div className="ps-2 d-flex flex-column gap-1">
                <CategoryItem />
                <CategoryItem />
                <CategoryItem />
                <CategoryItem />
            </div>
        </Collapse>}
    </div>
}


const Category = () => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => {
        setShow(false);
    }
    return <div className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between">
            <h5>Danh mục</h5>
            <button onClick={() => setShow(true)} className="button-hover button-flex background-primary"><i className="bi bi-plus-lg"></i> Thêm danh mục</button>
        </div>
        <div className="d-flex">
            search
        </div>
        <div className="d-flex flex-column gap-3 ps-3 pe-3">
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
        </div>
        {show && <CreateCategoryModal show={show} handleClose={handleClose}/>}
    </div>
}

export default Category;