import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../../models/user";
import { useGetHistorySearchQuery } from "../../../services/history-search.service";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import useRedirect from "../../../hooks/useRedirect";

interface Props {
    user?: User | undefined | null;
    content?: string;
}

const PopoverSearch = ({user, content}: Props) => {
    const {data} = useGetHistorySearchQuery({userId: user?.username, content: content});
    const redirect = useRedirect();

    return <div 
    >
        {data?.data.map((rs, idx) => <div  key={idx} onClick={() => redirect("/products?keyword=" + rs.content)} className="search-content" style={{
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
           {rs.userId &&  <FontAwesomeIcon icon={faClockRotateLeft} />}
           {rs.content}
           </div>
            {rs.userId &&  <span className="primary">Xóa</span>}
        </div>)}
    </div>

}

export default PopoverSearch;