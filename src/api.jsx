import axios from "axios";

const BASE_URL = "http://localhost:10000/";

export const fetchUserData = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${BASE_URL}api/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response.data;
};
