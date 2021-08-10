export const getCurrentlyLoggedInUserIdSelector = (({ auth: { userId }}) => userId );
export const IsUserSignedInSelector = (({ auth: { isUserSignedIn }}) => isUserSignedIn );