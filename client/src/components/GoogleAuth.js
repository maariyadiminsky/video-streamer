import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isUserSignedInSelector } from "../redux/selectors/auth";
import { signUserIn, signUserOut } from "../redux/actions/auth";
import { LOADING, EMAIL, SIGN_IN, SIGN_OUT } from "../const";

// NOTE: Google API's authentication status persists between page reloads
const GoogleAuth = () => {
    const isUserSignedIn = useSelector(isUserSignedInSelector);

    const dispatch = useDispatch();

    const auth = useRef("");

    useEffect(() => {
        // loads up google api OAuth client library (I only need email for this app)
        window.gapi.load("client:auth2", () => {
            // return a promise so can pass in callback or .then when complete
            window.gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
                scope: EMAIL
            }).then(() => {
                // api is ready to be used so get auth instance
                auth.current = window.gapi.auth2.getAuthInstance();

                // check if user is signed in on initial load
                handleShouldUserSignIn(auth.isSignedIn.get());

                // event listener that listens if user has signed in
                // callback passed in will get the boolean value
                auth.current.isSignedIn.listen(handleShouldUserSignIn);
            });
        });
    }, [dispatch]);

    // for setting user sign in status
    const handleShouldUserSignIn = (shouldUserSignIn = null) => {
        // nothing should happen while google api is still loading sign in status
        if (shouldUserSignIn === null) return;

        // sign user in or out
        shouldUserSignIn ? dispatch(signUserIn(getUserId())) : dispatch(signUserOut(getUserId()));
    }

    const getUserId = () => auth ? auth.currentUser.get().getId() : null;

    // for when user clicks sign in/ sign out auth button
    const handleUpdateUserAuth = () => {
        // nothing should happen while google api is still loading sign in status
        if (isUserSignedIn === null) return;

        // if signed in, then when user clicks they want to sign out 
        // if signed out, then when user clicks they want to sign in
        if (isUserSignedIn) {
            console.log("in handleUpdateUserAuth", auth);
            auth.signOut();
            handleShouldUserSignIn(false);
        } else {
            auth.signIn();
            handleShouldUserSignIn(true);
        }
    }

    const renderButtonForAuthUser = () => {
        // null means, on initial load
        if (isUserSignedIn === null) return LOADING;
        return isUserSignedIn ? SIGN_OUT : SIGN_IN;
    }

    const renderButtonLoaderTry = () => isUserSignedIn == null && LOADING;

    return (
        <button className={`ui red ${renderButtonLoaderTry()} button`} onClick={handleUpdateUserAuth}>
            <i className="google icon" />
            {renderButtonForAuthUser()}
        </button>
    );
}

export default GoogleAuth;