import { render, screen } from "../utils";
import App from "../../components/App";

import GoogleAPI from "../utils/GoogleAPI";

describe("App", () => {
  window.gapi = GoogleAPI;

  test("renders App component", () => {
    render(<App />);

    // const headerElement = screen.getByText(/Streams/i);
    // expect(headerElement).toBeDefined();
  });
});
