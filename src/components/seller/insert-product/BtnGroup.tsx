import { useState } from "react";

function BtnGroup() {
    const [activeTab, setActiveTab] = useState('Thông tin cơ bản');
    const handleButtonClick = (tabName: any) => {
        setActiveTab(tabName);
    }
    return (
        <div className="btn-group mb-3" role="group">
            <button
                className={`btn-group-insert-product-seller ${activeTab === 'Thông tin cơ bản' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Thông tin cơ bản')}
            >
                Thông tin cơ bản
            </button>
            <button
                className={`btn-group-insert-product-seller ${activeTab === 'Thông tin bán hàng' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Thông tin bán hàng')}
            >
                Thông tin bán hàng
            </button>
            <button
                className={`btn-group-insert-product-seller ${activeTab === 'Vận chuyển' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Vận chuyển')}
            >
                Vận chuyển
            </button>
            <button
                className={`btn-group-insert-product-seller ${activeTab === 'Thông tin khác' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Thông tin khác')}
            >
                Thông tin khác
            </button>
        </div>
    );
}

export default BtnGroup;