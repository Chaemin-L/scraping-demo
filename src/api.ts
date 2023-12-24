import axios from "axios";

const request = async (path: string) => {
  try {
    return await axios.get(`/api/${path}`);
  } catch (error) {
    console.error(error);
  }
};

export { request };
