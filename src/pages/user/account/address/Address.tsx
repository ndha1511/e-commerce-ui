
const Address = () => {
    return <div className="profile-container">
        <div className="d-flex justify-content-between align-items-center">
            <span className="text-large">Địa chỉ</span>
            <button className="button-flex button-hover background-primary text-medium" data-toggle="modal" data-target="#address-modal">
                <i className="bi bi-plus-lg"></i>
                Thêm địa chỉ
            </button>
        </div>
    </div>
}

export default Address;