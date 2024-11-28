import { Collapse } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import './category.scss'
import { CategoryResponse } from "../../../dtos/response/category/category-response";
import { Link, useNavigate } from "react-router-dom";
import AnimationComponent from "../../../components/animation/AnimationComponent";
import { set } from "react-datepicker/dist/date_utils";

interface Item {
    item: CategoryResponse
}
function MenuCategory({ item }: Item) {
    const [triggerA, setTriggerA] = useState<boolean>(false);
    const [triggerB, setTriggerB] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsSelected(!isSelected);
        setOpen(!open)
        event.stopPropagation();
    }

  
    // Hàm để truyền kích hoạt animation A
    const handleStartAnimationA = () => {
      setTriggerA(true);
    };
  
    // Hàm để truyền kích hoạt animation B
    const handleStartAnimationB = () => {
      if (triggerA) { // Kiểm tra nếu A đã hoàn thành
        setTriggerB(true);
      }
    };
    const onReset = () => {
        setTriggerA(false);
        setTriggerB(false);
      };
      const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();  // Ngừng hành động mặc định để tránh chuyển trang ngay lập tức
        handleStartAnimationA(); // Thực hiện animation trước khi chuyển trang
    
        // Chuyển trang sau khi hoàn thành animation
        setTimeout(() => {
          // Sau khi thực hiện animation hoặc các thao tác khác, mới chuyển trang
        //   window.location.href = '/' + item.urlPath;
          navigate('/' + item.urlPath);
        }, 500); // Thời gian delay cho animation
      };
    return (
        <div>
            {/* <div className="load-run">
                <button onClick={handleStartAnimationA}>Chạy A từ Parent</button>
                <button onClick={handleStartAnimationB} disabled={!triggerA}>Chạy B từ Parent</button>
                <AnimationComponent
                    triggerA={triggerA}
                    triggerB={triggerB}
                    onReset={onReset}
                />
            </div> */}
            <div className={` cursor-pointer menu-cate-user
               d-flex border-top w-100 justify-content-between align-items-center p-3 }
                 ${isSelected ? 'selected-cate-user' : ''}
                `}>
                <Link className="link-all" onClick={(e)=>handleLinkClick(e)} to={'/' + item.urlPath || ''}> {item.categoryName}</Link>
                <div onClick={(e) => handleClick(e)}>    {item.children && (open ? <BsChevronUp /> : <BsChevronDown />)}</div>
            </div>
            {item.children && (
                <Collapse in={open}>
                    <div key={item.id} className='ps-4'>
                        {item.children.map((item) => (
                            <MenuCategory
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                </Collapse>
            )}
        </div>
    );
}

export default MenuCategory;