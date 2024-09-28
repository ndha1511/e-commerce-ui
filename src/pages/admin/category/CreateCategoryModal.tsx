import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useCreateCategoryMutation } from "../../../services/category.service";

interface Props {
  show: boolean;
  handleClose: () => void;
  refetch?: () => void;
  parentId?: string;
}

const CreateCategoryModal = ({ show, handleClose, refetch, parentId }: Props) => {
  const [file, setFile] = React.useState<File>();
  const [url, setUrl] = React.useState('');
  const [categoryName, setCategoryName] = React.useState('');
  const [trigger] = useCreateCategoryMutation();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
      setUrl(URL.createObjectURL(files[0]));
    }
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    }
  }, [url]);

  const handleAdd = async () => {
    if (categoryName === '') {
      alert('Vui lòng nhập tên danh mục');
      return;
    }
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    if(parentId) {
      formData.append('parentId', parentId);
    }
    try {
      formData.append('categoryName', categoryName);
      await trigger(formData).unwrap();
      if (refetch) refetch();
      handleClose();
      alert('Thêm danh mục thành công');

    } catch (error) {
      alert('Thêm không thành công');
    }
  }

  return <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <h5>Thêm danh mục</h5>
    </Modal.Header>
    <Modal.Body>
      <div className="w-100 d-flex gap-2 align-items-center">
        <>
          {url === '' ? <><input onChange={handleFileUpload} id="category-img" type="file" accept="image/*" style={{ display: 'none' }} />
            <label htmlFor="category-img">
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                padding: '0 5px 0 5px',
                fontSize: '30px',
                backgroundColor: '#f0f0f0',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <i className="bi bi-image"></i>
              </div>
            </label></> : <img src={url} width={50} height={50} />}
        </>
        <div className="form-group">
          <input className="form-control" placeholder="Tên danh mục" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Đóng
      </Button>
      <Button variant="primary" onClick={handleAdd}>
        Thêm
      </Button>
    </Modal.Footer>
  </Modal>
}

export default CreateCategoryModal;