window.gapi = { 
    auth2: {}, 
    client: {}
};
window.gapi.auth2.getAuthInstance = () => 
    () => {
        this.isSignedIn = () => {
            this.signedIn = false;
            this.get = () => this.signedIn;
            this.listen = (f) => f();
        };
        this.signIn = () => Promise.resolve(this.isSignedIn.signedIn = true);
        this.signOut = () => Promise.resolve(this.isSignedIn.signedIn = false);
        this.currentUser = () => {
        this.get = () => 
            () => {
                this.getId = () => "XYZ";
                this.getAuthResponse = () => () => {
                this.id_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
                };
                this.getBasicProfile = () => () => {
                this.getName = () => "Mr Test";
                this.getEmail = () => "test@email.com";
                this.getImageUrl = () => "http://email.com/image";
                };
            };
        };
    };
window.gapi.auth2.init = () => {return Promise.resolve({});}
window.gapi.client.init = (v) => true;
window.gapi.load = (a, f) => Promise.resolve();

const GoogleAPI = window.gapi;

export default GoogleAPI;