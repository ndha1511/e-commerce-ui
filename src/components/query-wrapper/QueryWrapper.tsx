import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { QueryWrapperProps } from "../types";

const QueryWrapper: React.FC<QueryWrapperProps> = (props) => {
    const {children, queriesStatus, skeleton: SkeletonCustom, skWidth, skHeight} = props;
    const allQueriesSuccess = queriesStatus.every(val => val === true);
    return allQueriesSuccess? children : SkeletonCustom ? <SkeletonCustom/> : <Skeleton style={{
        height: skHeight || "100%",
        width: skWidth || "100%"
    }}/>;

}

export default QueryWrapper;