import { render, screen } from "../../utils";
import StreamCreate from "../../../components/streams/StreamCreate";

describe("StreamCreate", () => {
    test("renders StreamCreate component", async () => {
        render(<StreamCreate />);

        const titleElement = await screen.findByText(/Create a Stream/i);
        const fieldTitleElement = await screen.findByText(/Enter title/i);
        const descriptionElement = await screen.findByText(/Enter Description/i);
        const submitStreamButtonElement = await screen.findByText(/Create Stream/i);

        expect(titleElement).toBeInTheDocument();
        expect(fieldTitleElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
        expect(submitStreamButtonElement).toBeInTheDocument();
    });
});