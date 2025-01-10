import axios from "axios";

const BASE_URL = "https://qaz-b-production.up.railway.app/";

export const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://qaz-b-production.up.railway.app/api/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
