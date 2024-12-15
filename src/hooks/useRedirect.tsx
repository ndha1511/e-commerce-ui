import { useNavigate } from "react-router-dom";

const useRedirect = () => {

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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