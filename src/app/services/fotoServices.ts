export const saveFoto = async (fileData: FormData) => {
  try {
    const url = process.env.NEXT_SAVE_FOTO;
    if (!url) {
      throw new Error("URL is undefined.");
    }
    const response = await fetch(url, {
      method: "POST",
      body: fileData,
      headers: {
        Accept: "application/json",
      },
    });

    console.log("HTTP error: status", response.status);
    if (!response.ok) throw new Error("Unable to fetch houses.");
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
