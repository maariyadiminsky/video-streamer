import { render, screen } from "../utils";
import GoogleAPI from "../utils/GoogleAPI";

import Header from "../../components/Header";

describe("Header", () => {
    window.gapi = GoogleAPI;

    test("renders Header component", () => {
        render(<Header />);

        const logoElement = screen.getByText(/Video Streamer/i);
        const streamsLinkElement = screen.getByText(/Streams/i);

        expect(logoElement).toBeInTheDocument();
        expect(streamsLinkElement).toBeInTheDocument();
    })
});