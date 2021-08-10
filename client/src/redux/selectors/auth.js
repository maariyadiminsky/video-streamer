export const getCurrentlyLoggedInUserIdSelector = (({ auth: { userId }}) => userId );
export const isUserSignedInSelector = (({ auth: { isUserSignedIn }}) => isUserSignedIn );