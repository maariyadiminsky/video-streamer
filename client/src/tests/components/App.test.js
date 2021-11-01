import { render, screen } from "../utils";
import GoogleAPI from "../utils/GoogleAPI";

import App from "../../components/App";

describe("App", () => {
    window.gapi = GoogleAPI;

    test("renders App component", async () => {
        render(<App />);

        const headerElement = await screen.findByText(/Video Streamer/i);
        const titleInStreamsListElement = await screen.findByText(/Streams/i);

        // Header component is loaded
        expect(headerElement).toBeInTheDocument();

        // Streams List component is loaded
        expect(titleInStreamsListElement).toBeInTheDocument();
    });

    test("doesn't render other components on initial load", () => {
        render(<App />);

        const titleInStreamCreateElement = screen.queryByText(/Create a Stream/i);

        // components like StreamCreate should not be rendered initially
        expect(titleInStreamCreateElement).toBeNull();
    });

    test("renders correct component based on route", () => {
        render(<App />, { route: "/streams/new" });

        const titleInStreamCreateElement = screen.queryByText(/Create a Stream/i);

        // components like StreamCreate should not be rendered initially
        expect(titleInStreamCreateElement).toBeInTheDocument();
    });

    test("renders initial App page if user enters unusable route", () => {
        render(<App />, { route: "/this-route-doesnt-exist" })

        // "Streams"" text only shows on initial "/" route.
        expect(screen.queryByText(/Streams/i)).toBeInTheDocument()
    })
});
