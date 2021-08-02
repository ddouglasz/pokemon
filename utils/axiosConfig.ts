import axios from "axios";
import { urls } from "../constants";

export const Axios = axios.create({
  baseURL: urls.BASE_URL,
});