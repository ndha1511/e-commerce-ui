import useRedirect from "../../../hooks/useRedirect";

function LoginMessage() {
    const redirect = useRedirect();
  return (
    <div className="d-flex justify-content-center align-items-center flex-column gap-3">
      <span className="primary"> Đăng nhập để nhắn tin với chủ shop</span>
      <button className="button-flex button-hover background-primary " onClick={()=>redirect("/auth/login")} >Đăng nhập ngay</button>
    </div>
  );
}

export default LoginMessage;
