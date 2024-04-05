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


export const getUser = async (token: string) => {
    try {
      const url = process.env.NEXT_GET_USER;
      if (url === undefined) return null
      const response = await fetch(url, {
        cache: "no-store",
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Unable to get user.");
      if (response.ok) {
        const responseData = await response.json();
        console.log('responseData', responseData);
        if (responseData && Object.keys(responseData).length > 0) {
          return responseData;
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