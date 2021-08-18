# Video Streamer

A CRUD React app setup with an RTMP server!

Things you can do:
1. Google Auth - Login/Logout.
2. See a list of video streams (yours and others).
3. Create a video stream.
4. Edit your video stream.
5. Delete your video stream.

*Note: You can only edit/remove video streams you've created. You can't remove another user's video streams.*

## About
An older version of this project with older React syntax(ie. React Class Components, lifecycle methods etc.) is available [here](https://github.com/maariyadiminsky/twitch-clone).

The main changes from the older version are:
1. Refactor from React classes to React Hooks.
2. Use React Final Form instead of Redux Form.
3. Other small updates for better folder structure and other best practices.
## Setup

### What's included
This project includes:
1. Client App
2. Mock API Server
3. [RTMP](https://blog.stackpath.com/rtmp/) Server

### Let's get started!

Follow these steps carefully to get the project working on your end. Please let me know if you run into any issues.

1. **Initial Setup**
    1. Clone the project.
    2. Go into `client` folder and run `yarn install`.
    3. Go into `streams-mock-api` folder and run `yarn install`.
    4. Go into `rtmp-server` folder and run `yarn install`.

2. **Setup Google Auth**
    1. Make sure you're logged into a Google account and go to [https://console.cloud.google.com/](https://console.cloud.google.com/). Type in `cred` within the search box. Click `Credentials - APIs and Services`. 
    2. **Make sure you're not in an existing project.** Make a new project. Wait until it finishes loading and select the new project. Click `Create Credentials` -> `OAuth client ID`.
    3. If they request you do some `OAuth consent`—When you go through it click `External`. Then fill out the first screen(ie. App name, support email, developer contact), no need to fill out the next page etc scopes etc. Click `Save and Continue`. When it takes you to the next page, just ignore that and click `Credentials` on the left menu. 
    4. Click `Create Credentials` -> `OAuth client ID` -> `Web Application`. Give it a name and enter `http://localhost:3000` in the `Authorized JavaScript origins` section.
    5. You will get a `Client ID`. Copy that— you will need it soon.
    6. Create `.env.local` within the `client` folder—an example is provided. Add your client id to `REACT_APP_GOOGLE_AUTH_CLIENT_ID=""`
3. **Run the servers!**
    1. There are 3 servers total so make sure to have 3 tabs open. One separate tab for each folder ie. `client`, `streams-mock-api` and `rtmp-server`.
    2. Run `yarn start`, inside `client` and `rtmp-server` so you will be running this command twice. Run `yarn start-dev` inside of `streams-database`.
    3. Go to `http://localhost:3000` to see the React client side. Go to `http://localhost:3001` to view the API server. For the `rtmp-server`, you don't need to go anywhere(unless you want to go eat sushi or something—*ba dum tss*), just make sure the server is running.
4. **Test a few features**
    1. You should see a list of streams.
    2. You should be able to create, edit, and delete streams.
    3. You should be able to go to an edit/delete/show page of a stream and see the stream still loaded. Although the stream page itself ie. `/streams/:id` will just show a loading video until the next step.
5. **Create a stream!**
    1. [Download and install OBS](https://obsproject.com/download), you’ll have to give it permission to record your screen and microphone.
    2. Create two sources inside of OBS: `Display Capture` and `Audio Input Capture`.
    3. Configure OBS (Go to `Settings` -> `Stream` -> choose `Custom`.
        * Server: `rtmp://localhost/live`
        * The `Stream key` will be the `Stream Id` in our client app. So if your client is currently on: `http://localhost:3000/streams/2` enter `2` (you will see an error if your RTMP server is not running)
    4. Hit `Ok` to confirm Stream settings then hit `Start Streaming`. Keep it going for a few seconds, try saying something. Then hit `Stop Streaming`.
   5. Click the `play` button inside your client's video and enjoy your stream!

## Todo
- Tests for each component
- Improved styles

