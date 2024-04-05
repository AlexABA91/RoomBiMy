"use server";
export const authLogin = async (requestUser) => {
  try {
    const url = process.env.NEXT_URL_LOGIN;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestUser),
    });

    return res;
  } catch {
    return null;
  }
};