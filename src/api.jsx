import axios from "axios";

const BASE_URL = "http://localhost:10000/";

export const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:10000/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
