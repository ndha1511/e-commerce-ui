import React from "react";
import { OrderStatus } from "../../../../models/order";
import { useCheckLoginQuery } from "../../../../services/auth.service";
import { useGetOrdersByUserIdQuery } from "../../../../services/order.service";
import { pageQueryHanlder } from "../../../../utils/query-handler";

const Purchase = () => {
    const { data: user } = useCheckLoginQuery();

    // default order status is pending
    const param = pageQueryHanlder(1, 40, [{
        filed: "orderStatus",
        operator: "=",
        value: OrderStatus.PENDING
    }], [{ field: "createdAt", order: "desc" }])

    const [paramState, setParamState] = React.useState(param);

    const { data: purchase, isLoading } = useGetOrdersByUserIdQuery(
        {
            userId: user?.data?.id || "",
            param: paramState
        }, {
        skip: !user?.data?.id
    });

    return <div className="profile-container">
        <div className="d-flex justify-content-between align-items-center">
            <span className="text-large">Đơn hàng đã mua</span>
        </div>
        
    </div>
}

export default Purchase;