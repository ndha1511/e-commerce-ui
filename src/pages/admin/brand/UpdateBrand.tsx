import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import { pageQueryHanlder } from "../../../utils/query-handler";
import PromotionRow from "../../../components/promotion/PromotionRow";
import useValidText from "../../../hooks/useValidText";
import CustomTooltip from "../../../components/tooltip/CustomTooltipProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Brand } from "../../../models/brand";
import ModalCategoryBrand, {
  CategoryItems,
  DeleteCategoryItems,
} from "./ModalCategoryBrand";
import { useGetCategoriesQuery } from "../../../services/category.service";
import { useUpdateBrandsMutation } from "../../../services/brand.service";
import { useDispatch } from "react-redux";
import { setNotify } from "../../../rtk/slice/notify-slice";
interface ProductApplyProps {
  show: boolean;
  handleClose: () => void;
  brand: Brand;
  refetch: () => void;
}
const UpdateBrand: React.FC<ProductApplyProps> = ({
  show,
  handleClose,
  brand,
  refetch,
}) => {
  const [avt, setAvt] = useState<File>();
  const [url, setUrl] = useState<string>(brand.image || "");
  const {
    value: brandName,
    setValue: setBrandName,
    err: errBrandName,
  } = useValidText();
  const [btnSubmit, setBtnSubmit] = useState<boolean>(false);
  const [descriptionBrand, setDescriptionBrand] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryItems[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const chilRef = useRef<DeleteCategoryItems>(null);
  const params: string = pageQueryHanlder(1, 40);
  const { data } = useGetCategoriesQuery(params);
  const [updateBrand] = useUpdateBrandsMutation();
  const dispatch = useDispatch();
  const handleOpenCategoryModal = () => {
    setShowCategoryModal(true);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredCategories = data?.data.items.filter((category: any) =>
    brand.categories.includes(category.id)
  );
  useEffect(() => {
    // Kiểm tra xem filteredCategories có thay đổi và khác với categories hiện tại không
    if (filteredCategories && filteredCategories.length > 0) {
      const newCategories = filteredCategories.map((category) => ({
        id: category.id,
        name: category.categoryName,
      }));

      // So sánh sự thay đổi của categories mới với categories hiện tại
      const hasChanges =
        !categories.length ||
        !filteredCategories.every(
          (category, index) => category.id === categories[index]?.id
        );

      // Cập nhật categories chỉ khi filteredCategories khác với categories hiện tại
      if (hasChanges) {
        setCategories(newCategories);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCategories]); // Chỉ theo dõi filteredCategories

  const handleCategory = (selectedCategories?: CategoryItems[]) => {
    setCategories(selectedCategories || []);
  };
  console.log(categories);
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUrl(URL.createObjectURL(files[0]));
      setAvt(files[0]);
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "brandName") {
      setBrandName(value);
    } else if (name === "description") {
      setDescriptionBrand(value);
    }
  };
  const handleRemoveCategory = (id: string) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
    if (chilRef.current) {
      chilRef.current.handleRemoveCategory(id);
    }
  };
  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };
  const handleUpdate = async () => {
    setBtnSubmit(true);
    const resquets = {
      image: avt ? avt : brand.image,
      name: brandName ? brandName : brand.brandName,
      description: descriptionBrand ? descriptionBrand : brand.description,
      categories: brand.categories.map((category) => category),
    };
    console.log(resquets);
    const formData = new FormData();
    if (avt) {
      formData.append("img", avt);
    }
    if (brandName || brand.brandName) {
      formData.append("brandName", brandName ? brandName : brand.brandName);
    }
    formData.append(
      "description",
      descriptionBrand ? descriptionBrand : brand.description
    );
    brand.categories.forEach((category) => {
      formData.append("categories", category);
    });
    try {
      await updateBrand({
        id: brand.id,
        formData: formData,
      });
      handleClose();
      refetch();
      dispatch(
        setNotify({
          type: "success",
          message: "Cập nhật thành công",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        setNotify({
          type: "error",
          message: "Cập nhật không thành công",
        })
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <div className="text-medium">Cập nhật thương hiệu </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <PromotionRow label="Hình ảnh thương hiệu:">
            <div className="d-flex align-items-center gap-3">
              <div>
                {url ? (
                  <img
                    src={url}
                    alt="User Avatar"
                    className=""
                    width={280}
                    height={100}
                  />
                ) : null}
              </div>
              <input
                type="file"
                id="file=brand"
                style={{ display: "none" }}
                onChange={handleChangeImage}
                accept="image/*"
              />
              <OverlayTrigger
                placement="right"
                overlay={
                  url.trim() === "" && btnSubmit ? (
                    CustomTooltip("Không được để trống!", "img")
                  ) : (
                    <></>
                  )
                }
                show={url.trim() === ""}
              >
                <label
                  htmlFor="file=brand"
                  className="primary"
                  style={{ cursor: "pointer" }}
                >
                  <div className="image-insert-product-seller p-2">
                    <div className="icon-image-insert">
                      <FontAwesomeIcon icon={faImage} fontSize={25} />
                      <FontAwesomeIcon
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 12,
                          position: "absolute",
                          height: 15,
                          width: 15,
                          backgroundColor: "white",
                          borderRadius: "50%",
                          right: -6,
                          bottom: 0,
                        }}
                        icon={faPlus}
                      />
                    </div>
                    <span className="w-100 text-center primary">
                      {url ? "Thay đổi " : "Thêm hình ảnh"}
                    </span>
                  </div>
                </label>
              </OverlayTrigger>
            </div>
          </PromotionRow>
          <PromotionRow label="Tên thương hiệu:">
            <OverlayTrigger
              placement="bottom"
              overlay={
                errBrandName.trim() !== "" ||
                (brandName === null && btnSubmit) ? (
                  CustomTooltip(
                    brandName ? brandName : "Vui lòng không để trống"
                  )
                ) : (
                  <></>
                )
              }
              show={
                (errBrandName.trim() !== "" && btnSubmit) ||
                (brandName === null && brand.brandName === "")
              }
            >
              <input
                className="input-basic-information-seller"
                value={brandName !== null ? brandName || "" : brand.brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Tên thương hiệu"
                type="text"
              />
            </OverlayTrigger>
          </PromotionRow>
          <PromotionRow label="Ngành hàng:">
            <OverlayTrigger
              placement="bottom"
              overlay={
                categories.length === 0 && btnSubmit ? (
                  CustomTooltip("Không được để trống!")
                ) : (
                  <></>
                )
              }
              show={categories.length === 0 && brand.categories.length === 0}
            >
              <div className="border p-3 border-radius-small d-flex justify-content-between align-items-center">
                <div className="d-flex flex-wrap justify-content-start col-11 ">
                  {categories?.map((category, index) => (
                    <div key={index} className="border me-3 p-1 mb-2">
                      <span>{category.name}</span>
                      <button
                        onClick={() => handleRemoveCategory(category.id)}
                        style={{
                          marginLeft: "5px",
                          background: "transparent",
                          border: "none",
                          color: "#999",
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="col-1 d-flex justify-content-end ">
                  <div
                    className="brand-shadow d-flex justify-content-center align-items-center"
                    onClick={handleOpenCategoryModal}
                    style={{ cursor: "pointer", width: 30, height: 20 }}
                  >
                    <FontAwesomeIcon
                      style={{ right: 20, fontSize: 11 }}
                      icon={faPen}
                    />
                  </div>
                </div>
              </div>
            </OverlayTrigger>
          </PromotionRow>
          <PromotionRow label="Mô tả chi tiết:" obligatory={false}>
            <textarea
              rows={8}
              cols={50}
              value={
                descriptionBrand !== null
                  ? descriptionBrand || ""
                  : brand.description
              }
              onChange={handleChange}
              name="description"
              className="textarea-basic-information-seller"
            />
          </PromotionRow>
          <ModalCategoryBrand
            show={showCategoryModal}
            handleClose={handleCloseCategoryModal}
            brand={brand}
            categories={data?.data.items}
            handleCategory={handleCategory}
            ref={chilRef}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateBrand;
