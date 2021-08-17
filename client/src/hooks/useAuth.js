import { useSelector } from "react-redux";
import { getCurrentlyLoggedInUserIdSelector, isUserSignedInSelector } from "../redux/selectors/auth";

export const useAuth = () => {
    const currentLoggedInUserId = useSelector(getCurrentlyLoggedInUserIdSelector);
    const isUserSignedIn = useSelector(isUserSignedInSelector);

    return {
        isUserSignedIn, 
        currentLoggedInUserId
    };
};