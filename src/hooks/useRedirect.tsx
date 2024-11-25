import { useNavigate } from "react-router-dom";

const useRedirect = () => {

    const navigate = useNavigate();

    const redirect = (path: string,data?: any) => {
        navigate(path,{ state: data });
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        }, 0);
    };

    return redirect;

}

export default useRedirect;