import { isMobile } from "../../utils/responsive";

interface Props {
    name: string;
    url?: string;
    width?: number;
    height?: number;
}

const Avatar = ({ name, url, width = 30, height = 30}: Props) => {
    const mobile = isMobile();
    return <div className="d-flex gap-1 align-items-center">
        {url ? <img src={url} alt={name} width={width} height={height} /> :
            <i className="bi bi-person-circle" style={{fontSize: mobile ?16:20}}></i>}
      {mobile ? <></>:   <span className="side-bar-item text-white" style={{fontSize:12}}>{name}</span>}
    </div>
}

export default Avatar;