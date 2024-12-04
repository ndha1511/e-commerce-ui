import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../../models/user";
import { useDeleteHistorySearchMutation, useGetHistorySearchQuery } from "../../../services/history-search.service";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import useRedirect from "../../../hooks/useRedirect";

interface Props {
    user?: User | undefined | null;
    content?: string;
}

const PopoverSearch = ({ user, content }: Props) => {
    const { data, refetch } = useGetHistorySearchQuery({ userId: user?.username, content: content });
    const redirect = useRedirect();
    const [remove]= useDeleteHistorySearchMutation();
    const handleDelete = async (e: React.MouseEvent<HTMLSpanElement>, id: string) => {
        e.stopPropagation();
        try {
            // Nếu id không có, không làm gì
            if (!id) {
                return;
            }
            await remove(id);
            refetch();
        } catch (error) {
            console.error("Xóa không thành công", error);
            // Xử lý thông báo lỗi tại đây nếu cần
        }
    };
    return <div className="p-2"
    >
        {data?.data.map((rs, idx) => <div key={idx} onClick={() => redirect("/products?keyword=" + rs.content)} className="search-content" style={{
            padding: "5px",
            paddingLeft: "15px",
            paddingRight: "15px",
            cursor: "pointer",
            borderBottom: "1px solid #F2F2F2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <div>
                {rs.userId && <FontAwesomeIcon icon={faClockRotateLeft} className="me-1 text-muted" />}
                <span className="text-muted">  {rs.content}</span>
            </div>
            {rs.userId && <span className="primary "  onClick={(e)=>handleDelete(e,rs.id || '')}>Xóa</span>}
        </div>)}
    </div>

}

export default PopoverSearch;