import { render } from "@testing-library/react";
import Provider from "react-redux";
import store from "../../redux/store";

// note: this makes sure all components tested 
// are wrapped by a Provider and store is passed in
const ReduxProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
);

const reduxRender = (ui, options) => 
    render(ui, { wrapper: ReduxProvider }, ...options);

export * from "@testing-library/react";

export { reduxRender as render };