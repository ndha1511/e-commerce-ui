import { faAngleDown, faAngleUp, faCirclePlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Collapse, Table } from "react-bootstrap";
import CreateCategoryModal from "./CreateCategoryModal";
import useGetParam from "../../../hooks/useGetParam";
import { useGetCategoriesQuery, useLazyGetCategoriesQuery } from "../../../services/category.service";
import { pageQueryHanlder } from "../../../utils/query-handler";
import ClipLoader from "react-spinners/ClipLoader";
import { Category as CategoryModel } from "../../../models/category";
import SimpleBar from "simplebar-react";
import './../../../layout/admin/navbar/navbar.scss'

const Category = () => {
    const [open, setOpen] = React.useState<string | null>(null); // Sử dụng ID thay vì boolean
    const [getCategory, { isLoading }] = useLazyGetCategoriesQuery();
    const [childCategory, setChildCategory] = React.useState<CategoryModel[]>([]);
    const [categoryId, setCategoryId] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    const paramsChild: string = pageQueryHanlder(1, 100, [{ filed: 'parentId', operator: '=', value: categoryId }]);

    const openCollapse = async (itemId: string) => {
        if (open === itemId) {
            setOpen(null); // Đóng nếu click vào cùng một mục
        } else {
            try {
                const result = await getCategory(paramsChild).unwrap();
                setChildCategory(result.data?.items);
                setCategoryId(itemId);
                setOpen(itemId); // Mở mục hiện tại
            } catch (error) {
                console.log(error);
            }
        }
    };

    const pageParams = useGetParam('page');
    const [show, setShow] = React.useState(false);
    const [page, setPage] = React.useState<number>(pageParams ? Number(pageParams) : 1);

    const { data, isFetching, refetch } = useGetCategoriesQuery(pageQueryHanlder(page, 20, [{ filed: 'parentId', operator: ':', value: 'null' }]));

    const handleClose = () => setShow(false);

    useEffect(() => { console.log(childCategory) }, [childCategory])
    return (
        <div className="d-flex flex-column p-3">
            <SimpleBar style={{ height: 600 }}>
                <div className="d-flex align-items-center justify-content-between loading-container ">
                    <h5>Danh mục</h5>
                    <button onClick={() => setShow(true)} className="button-hover button-flex background-primary">
                        <i className="bi bi-plus-lg"></i> Thêm danh mục
                    </button>
                </div>
                <div className="d-flex mb-3">
                    <div className="search-category-admin">
                        <input className="input-search-category-admin" placeholder="Nhập từ khóa tìm kiếm" type="text" />
                        <i className="bi bi-search"></i>
                    </div>
                </div>

                <div className="d-flex flex-column gap-3 flex-1">
                    <Table className='table-bordered table-responsive  custom-table-category'>
                        <thead>
                            <tr className='text-center'>
                                <th>Hình ảnh</th>
                                <th>Danh mục</th>
                                <th>Cấp bậc</th>
                                <th>Trạng thái</th>
                                <th>Các chức năng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.items.map((item) => (
                                <React.Fragment key={item.id}>
                                    <tr className='text-center'>
                                        <td>
                                            {item.image && <img src={item.image} alt="category" width={50} height={50} />}
                                        </td>
                                        <td><h6>{item.categoryName}</h6></td>
                                        <td><h6>{item.children}</h6></td>
                                        <td>
                                            <span className="text-large cursor-pointer text-success">
                                                {item.inActive ? <i className="bi bi-toggle-off"></i> : <i className="bi bi-toggle-on"></i>}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3 justify-content-center">
                                                <span className="text-medium cursor-pointer secondary" data-toggle="tooltip" title="chỉnh sửa">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </span>
                                                <span className="text-medium cursor-pointer text-success" data-toggle="tooltip" title="thêm danh mục con" onClick={() => setShowModal(true)}>
                                                    <FontAwesomeIcon icon={faCirclePlus} />
                                                </span>
                                                <span className="text-medium cursor-pointer primary" data-toggle="tooltip" title="xóa">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            {item.children === 0 && (
                                                <span onClick={() => openCollapse(item.id)} className="text-primary text-large cursor-pointer">
                                                    {open === item.id ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} style={{ padding: 0 }}>
                                            <Collapse in={open === item.id} >
                                                <div className="custom-background-category border border-0">
                                                    <Table className='table-bordered table-responsive  custom-table-category'>
                                                        {/* <thead>
                                                            <tr>
                                                                <th>Hình ảnh</th>
                                                                <th>Tên danh mục</th>
                                                                <th>Cấp bậc</th>
                                                                <th>Trạng thái</th>
                                                                <th>Các chức năng</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead> */}
                                                        <tbody>
                                                            {childCategory.map((childItem) => (
                                                                <tr key={childItem.id} className='text-center'>
                                                                    <td>{childItem.image && <img src={childItem.image} alt="category" width={50} height={50} />}</td>
                                                                    <td>{childItem.categoryName}</td>
                                                                    <td>{childItem.children}</td>
                                                                    <td>
                                                                        <span className="text-large cursor-pointer text-success">
                                                                            {childItem.inActive ? <i className="bi bi-toggle-off"></i> : <i className="bi bi-toggle-on"></i>}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center justify-content-center gap-3  w-100">
                                                                            <span className="text-medium cursor-pointer secondary" data-toggle="tooltip" title="chỉnh sửa">
                                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                                            </span>
                                                                            <span className="text-medium cursor-pointer text-success" data-toggle="tooltip" title="thêm danh mục con" onClick={() => setShowModal(true)}>
                                                                                <FontAwesomeIcon icon={faCirclePlus} />
                                                                            </span>
                                                                            <span className="text-medium cursor-pointer primary" data-toggle="tooltip" title="xóa">
                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        {childItem.children === 0 && (
                                                                            <span onClick={() => openCollapse(childItem.id)} className="text-primary text-large cursor-pointer">
                                                                                {open === childItem.id ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            {isLoading && (
                                                                <tr>
                                                                    <td colSpan={5} className="loading-content">
                                                                        <ClipLoader color="red" loading={isLoading} />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Collapse>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </Table>

                    {isFetching && <div className="loading-content"><ClipLoader color={'red'} loading={isFetching} /></div>}
                </div>
            </SimpleBar>

            {show && <CreateCategoryModal refetch={refetch} show={show} handleClose={handleClose} />}
        </div>
    );
};

export default Category;
