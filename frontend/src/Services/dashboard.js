import axios from "axios";
import {url} from "../url";

const getDashboardData = async () => {
  try {
    const response = await axios.get(`${url}/dashboard/get-dashboard-data`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getFilteredData = async (data) => {
  try {
    const response = await axios.post(`${url}/dashboard/get-state-data`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { getDashboardData, getFilteredData };