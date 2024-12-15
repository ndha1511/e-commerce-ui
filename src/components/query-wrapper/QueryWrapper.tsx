import { useDispatch } from "react-redux";
import AccessDenied from "../../pages/access-denied/AccessDenied";
import NotFound from "../../pages/not-found/NotFound";
import { QueryWrapperProps } from "../types";
import { useEffect } from "react";
import { setTriggerA, setTriggerB } from "../../rtk/slice/loading-slice";

const QueryWrapper: React.FC<QueryWrapperProps> = (props) => {
  const { children, queriesError, error, queriesSuccess } = props;
  const dispatch = useDispatch();
  const notError = queriesError.every((val) => val === false);
  const allQueriesSuccess = queriesSuccess.every((val) => val === true);

  useEffect(() => {
    if (!allQueriesSuccess) {
      dispatch(setTriggerA(true));
    }
    if (allQueriesSuccess) {
      dispatch(setTriggerB(allQueriesSuccess));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQueriesSuccess]);
  if (notError) {
    return children;
  } else {
    if (error && typeof error === "object" && "status" in error) {
      console.log(error.status);
      if (error.status === 404) {
        return <NotFound />;
      }
      if (error.status === 403) {
        return <AccessDenied />;
      }
    }
    return <div>Error: {queriesError.join(", ")}</div>;
  }
};

export default QueryWrapper;
