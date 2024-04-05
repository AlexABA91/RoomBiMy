"use server";

export const getCountries = async () => {
  try {
    const url = process.env.NEXT_GET_COUNTRIES;
    console.log("URL", url);
    if (url === undefined) return null
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("Unable to fetch countries.");
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("HTTP error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};