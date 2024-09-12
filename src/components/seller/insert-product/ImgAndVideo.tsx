import { faImage, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import useChangeFile from "../../../hooks/useChangeFile";

function ImgAndVideo() {
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string>();
  const { files, previewUrls, handleFileChange, shouldHideInput, handleDeleteImage,setPreviewUrls } = useChangeFile(9, [], []);
  
  const handleDeleteVideo = () => {
    setPreviewVideoUrl(''); // Xóa URL vào state
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setPreviewVideoUrl(videoUrl); // Lưu URL vào state
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedUrls = Array.from(previewUrls);
    const [movedItem] = reorderedUrls.splice(result.source.index, 1);
    reorderedUrls.splice(result.destination.index, 0, movedItem);

    setPreviewUrls(reorderedUrls);
  };


  return (
    <div>
      <div className="d-flex gap-5 mt-4 p-3">
        <Row className="w-100">
          <Col md={2} className="text-end">
            <span>
              <span className="primary">*</span> Hình ảnh sản phẩm
            </span>
          </Col>
          <Col md={10} className="d-flex gap-4">
            <div className="d-flex align-items-center gap-2">
              <input className="radio-insert-product-seller" type="radio" name="image11" id="" />
              <span>Hình ảnh tỷ lệ 1:1</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input className="radio-insert-product-seller" type="radio" name="image11" id="" />
              <span>Hình ảnh tỷ lệ 3:4</span>
            </div>
          </Col>
        </Row>
      </div>
      <div className="w-100 bg-white">
        <Row className="mb-2">
          <Col md={2}></Col>
          <Col md={10}>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="images" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="d-flex align-items-center gap-2"
                    style={{ flexWrap: 'wrap', width: '90%' }}
                  >
                    {previewUrls.map((url, index) => (
                      <Draggable key={`draggable-${index}`} draggableId={`draggable-${index}`} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`ps-3 img-container ${snapshot.isDragging ? 'draggable-shadow' : ''}`}
                            style={{
                              position: 'relative',
                              transform: snapshot.isDragging ? 'scale(1.05)' : 'none',
                              transition: 'transform 0.2s ease',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <img
                              src={url as string}
                              className="border-radius-small"
                              alt={`Preview ${index}`}
                              style={{ width: '80px', height: '80px' }}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="icon-delete"
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                right: -6,
                                cursor: 'pointer',
                                color: 'red',
                                backgroundColor: 'white',
                                borderRadius: '6px',
                                padding: '4px',
                              }}
                              onClick={() => handleDeleteImage(index)}
                            />
                          </div>
                        )}
                      </Draggable>


                    ))}
                    {provided.placeholder}
                    {!shouldHideInput && (
                      <>
                        <input
                          type="file"
                          id="fileInput"
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                        <label htmlFor="fileInput" className="d-flex align-items-center primary p-3">
                          <div className="image-insert-product-seller p-2">
                            <div className="icon-image-insert">
                              <FontAwesomeIcon icon={faImage} fontSize={25} />
                              <FontAwesomeIcon
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  fontSize: 12,
                                  position: 'absolute',
                                  height: 15,
                                  width: 15,
                                  backgroundColor: 'white',
                                  borderRadius: '50%',
                                  right: -6,
                                  bottom: 0,
                                }}
                                icon={faPlus}
                              />
                            </div>
                            <span className="w-100 text-center">
                              Thêm hình ảnh ({files.length}/9)
                            </span>
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={2} className="text-end mt-3">
            <span>
              <span className="primary">* </span>Ảnh bìa
            </span>
          </Col>
          <Col md={10} className="d-flex gap-3">
            <div className="d-flex align-items-center gap-2">
              {previewUrls[0] && (
                <div className="ps-3">
                  <img
                    src={previewUrls[0] as string}
                    className="border-radius-small"
                    style={{ width: '80px', height: '80px' }}
                  />
                </div>
              )}
              {files.length < 1 && (
                <>
                  <label htmlFor="" className="d-flex align-items-center primary ps-3">
                    <div className="image-insert-product-seller p-2">
                      <div className="icon-image-insert">
                        <FontAwesomeIcon icon={faImage} fontSize={25} />
                        <FontAwesomeIcon
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 12,
                            position: 'absolute',
                            height: 15,
                            width: 15,
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            right: -6,
                            bottom: 0,
                          }}
                          icon={faPlus}
                        />
                      </div>
                      <span className="w-100 text-center">({files.length}/1)</span>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="p-2">
              <pre className="text-muted" style={{ whiteSpace: 'pre-wrap' }}>
                • Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp
                sẽ thu hút thêm lượt truy cập vào sản phẩm của bạn.
              </pre>
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={2} className="text-end mt-3">
            <span>Video sản phẩm</span>
          </Col>
          <Col md={10} className="d-flex gap-3">
            <div className="d-flex align-items-center">
              <div style={{ position: 'relative' }}>
                {previewVideoUrl && (
                  <>
                    <div className="ps-3">
                      <video
                        src={previewVideoUrl}
                        className="border-radius-small"
                        style={{ width: '80px', height: '80px' }}
                        // controls
                        autoPlay={false}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          cursor: 'pointer',
                          color: 'red',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          padding: '4px',
                        }}
                        onClick={() => handleDeleteVideo()}
                      />
                    </div>
                  </>
                )}
              </div>
              {!previewVideoUrl && (
                <>
                  <input
                    type="file"
                    id="fileInputVideo"
                    style={{ display: 'none' }} // Ẩn input file
                    onChange={handleVideoChange}
                    accept="video/*" // Chỉ chấp nhận file video
                  />
                  <label htmlFor="fileInputVideo" className="d-flex align-items-center primary ps-3">
                    <div className="image-insert-product-seller p-2">
                      <div className="icon-image-insert">
                        <i style={{ fontSize: 29 }} className="bi bi-play-btn"></i>
                        <FontAwesomeIcon
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 12,
                            position: 'absolute',
                            height: 15,
                            width: 15,
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            right: -6,
                            bottom: 5,
                          }}
                          icon={faPlus}
                        />
                      </div>
                      <span className="w-100 text-center">({previewVideoUrl ? '1' : '0'}/1)</span>
                    </div>
                  </label>
                </>
              )}
            </div>
            <div className="p-2">
              <pre className="text-muted mt-2" style={{ whiteSpace: 'pre-wrap' }}>
                • Kích thước tối đa 30Mb, độ phân giải không vượt quá 1280x1280px <br />
                • Độ dài: 10s-60s <br />
                • Định dạng: MP4 <br />
                • Lưu ý: sản phẩm có thể hiện thị trong khi video đang được xử lý. Video sẽ tự động hiển thị sau khi xử
                lý thành công.
              </pre>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ImgAndVideo;
