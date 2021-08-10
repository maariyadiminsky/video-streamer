import axios from "axios";

import { findBaseURL } from "../utils";

export default axios.create({
    baseURL: findBaseURL()
});