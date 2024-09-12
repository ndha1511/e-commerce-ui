import { faImage, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import './sale-info.scss';
import { useState } from "react";

interface SaleInfoDetailsProps {
    previewUrls: (string | ArrayBuffer | null)[];
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCloseAtribute: () => void;
}

const AttributeSaleInfo: React.FC<SaleInfoDetailsProps> = ({ previewUrls, handleFileChange, handleCloseAtribute }) => {

    const [isFocused, setIsFocused] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsFocused(false);
        setIsHidden(true);
    };

    const handleSelectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsFocused(false);
            setIsHidden(true);
        }
    };
    const [variants, setVariants] = useState([
        { id: 1, img: '', variant: '' },

    ]);

    const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedVariants = variants.map(attr =>
            attr.id === id ? { ...attr, variant: e.target.value } : attr
        );
        setVariants(updatedVariants);
        const lastVariant = updatedVariants[updatedVariants.length - 1];
        if (lastVariant.variant.trim() !== '') {
            setVariants([...updatedVariants, { id: updatedVariants.length + 1, img: '', variant: '' }]);
        }
    };
    const attributes = [
        { id: 1, name: 'Màu sắc' },
        { id: 2, name: 'Size' },
        { id: 3, name: 'Giới tính' },
    ]
    return (
        <div className="bg-light p-3 border-radius-small" >
            <Row>
                <Col md={12}>
                    <div className="d-flex justify-content-between">
                        {isHidden && <span style={{ fontWeight: 600 }}>{selectedOption}</span>}
                        <div className={`select-search-sale-info bg-white w-50 ${isHidden ? 'hidden-input' : ''}`}>
                            <input
                                className={`select-sale-info`}
                                placeholder="Vui lòng chọn"
                                type="text"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                value={selectedOption}
                                onChange={handleSelectInput}
                                onKeyDown={handleKeyDown} // Capture Enter key event
                            />
                            <div className={`p-1 ps-2 ${isFocused ? 'visible' : 'hidden'}`} style={{ borderLeft: '2px solid rgb(241, 236, 236)' }}>
                                <span>0/14</span>
                            </div>
                            {isFocused && (
                                <div className="suggestions">
                                    {attributes.map((attribute) => (
                                        <div className="ats" key={attribute.id} onClick={() => handleOptionClick(attribute.name)}>{attribute.name}</div>
                                    ))}

                                </div>
                            )}
                        </div>
                        <FontAwesomeIcon style={{ fontSize: 20 }} icon={faXmark} onClick={handleCloseAtribute} />
                    </div>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={12} className={`d-grid ${selectedOption ? 'gap-4' :''}`} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    {variants.map((attr) => (
                        <div key={attr.id} className="d-flex align-items-center justify-content-between w-100">
                            {selectedOption === 'Màu sắc' && <div>
                                {previewUrls.map((url, index) => (
                                    <div key={index}>
                                        <img
                                            src={url as string}
                                            className="border-radius-small"
                                            alt={`Preview ${index}`}
                                            style={{ width: '40px', height: '40px', marginRight: 10 }}
                                        />
                                    </div>
                                ))}
                                {previewUrls.length === 0 && (
                                    <>
                                        <input
                                            type="file"
                                            id="fileInput1"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                        <label htmlFor="fileInput1" className="d-flex align-items-center primary">
                                            <div className="image-color p-2">
                                                <div className="icon-image-insert">
                                                    <FontAwesomeIcon icon={faImage} fontSize={15} />
                                                    <FontAwesomeIcon className="icon-plus-image" icon={faPlus} />
                                                </div>
                                            </div>
                                        </label>
                                    </>
                                )}
                            </div>}
                            <div className="select-search-sale-info bg-white">
                                <input
                                    className="select-sale-info"
                                    placeholder="Vui lòng nhập"
                                    type="text"
                                    value={attr.variant}
                                    onChange={(e) => handleVariantChange(e, attr.id)}
                                />
                                <div className="p-1 ps-2" style={{ borderLeft: '2px solid rgb(241, 236, 236)' }}>
                                    <span>0/20</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Col>
            </Row>
        </div>
    );
};

export default AttributeSaleInfo;
