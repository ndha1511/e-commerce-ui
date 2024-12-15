import { isMobile } from "../../utils/responsive";
import avatar from "../../assets/avatar-default.jpg";
interface Props {
  name?: string;
  url?: string;
  width?: number;
  height?: number;
}

const Avatar = ({ name, url, width = 30, height = 30 }: Props) => {
  const mobile = isMobile();
  return (
    <div className="d-flex gap-1 align-items-center">
      {url ? (
        <img src={url} alt={name} width={width} height={height} style={{    objectFit: "cover", borderRadius:'50%'}} />
      ) : (
        <img
          src={avatar}
          width={width}
          height={height}
          alt={name}
          style={{ borderRadius: "50%" }}
        />
      )}
      {mobile ? (
        <></>
      ) : (
        <span className="side-bar-item text-white" style={{ fontSize: 12 }}>
          {name}
        </span>
      )}
    </div>
  );
};

export default Avatar;
