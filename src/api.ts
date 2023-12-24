import axios from "axios";
import puppeteer from "puppeteer-core";

const request = async (path: string) => {
  try {
    return await axios.get(`/api/${path}`);
  } catch (error) {
    console.error(error);
  }
};

export { request };
