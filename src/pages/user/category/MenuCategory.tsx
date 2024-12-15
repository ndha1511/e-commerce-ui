import { Collapse } from "react-bootstrap";
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "./category.scss";
import { CategoryResponse } from "../../../dtos/response/category/category-response";
import { Link, useNavigate } from "react-router-dom";

interface Item {
  item: CategoryResponse;
}
function MenuCategory({ item }: Item) {
  const [open, setOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsSelected(!isSelected);
    setOpen(!open);
    event.stopPropagation();
  };
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/" + item.urlPath);
  };

  
  return (
    <div>
      <div
        className={` cursor-pointer menu-cate-user
               d-flex border-top w-100 justify-content-between align-items-center p-3 }
                 ${isSelected ? "selected-cate-user" : ""}
                `}
      >
        <Link
          className="link-all"
          onClick={(e) => handleLinkClick(e)}
          to={"/" + item.urlPath || ""}
        >
          {" "}
          {item.categoryName}
        </Link>
        <div onClick={(e) => handleClick(e)}>
          {" "}
          {item.children && (open ? <BsChevronUp /> : <BsChevronDown />)}
        </div>
      </div>
      {item.children && (
        <Collapse in={open}>
          <div key={item.id} className="ps-4">
            {item.children.map((item) => (
              <MenuCategory key={item.id} item={item} />
            ))}
          </div>
        </Collapse>
      )}
    </div>
  );
}

export default MenuCategory;
