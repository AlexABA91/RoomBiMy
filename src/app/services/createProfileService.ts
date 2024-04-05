export interface Profile {
  schoolYears?: string;
  pets?: string;
  job?: string;
  myLocation?: string;
  myLanguages?: string;
  generation?: string;
  favoriteSchoolSong?: string;
  passion?: string;
  interestingFact?: string;
  uselessSkill?: string;
  biographyTitle?: string;
  dailyActivity?: string;
  aboutMe?: string;
}

export const createProfile = async (profileData: Profile, token: string) => {
  try {
    const url = "https://roombiserver.azurewebsites.net/api/Profile/profile";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) throw new Error("Unable to update profile.");
    if (response.ok) {
      const responseData = await response.text(); 
      console.log('responseData', responseData);
      if (responseData === "Ok") {
        console.log("Profile updated successfully");
      } else {
        console.error("Unexpected response from server");
      }
    } else {
      console.error("HTTP error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};