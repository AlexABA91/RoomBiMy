"use server";

export interface User {
    Id: number;
    Name?: string;
    Password?: string;
    Email?: string;
    Address?: string;
    PhoneNumber?: string;
    DateOfBirth?: Date;
    AirbnbRegistrationYear?: Date;
    ProfilePicture?: string;
    CurrentStatus: boolean;
    UserStatus: boolean;
    RefreshToken?: string;
    Language?: string;
    Country?: string;
}

export const updateUser = async (userData: User, token: string) => {
  try {
    const url = process.env.NEXT_PUT_USER;
    if (url === undefined) return null
    const response = await fetch(url, {
      cache: "no-store",
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("Unable to update user.");
    if (response.ok) {
      const responseData = await response.json();
      console.log('responseData', responseData);
      if (responseData && Object.keys(responseData).length > 0) {
        const { token, refreshToken } = responseData;
        return { token, refreshToken };
      } else {
        console.error("Empty response from server");
      }
    } else {
      console.error("HTTP error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};