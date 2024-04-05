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
  export const getProfile = async (token: string) => {
    try {
      const url = `https://roombiserver.azurewebsites.net/api/Profile/id`;
      const response = await fetch(url, {
        cache: "no-store",
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Unable to get profile.");
      if (response.ok) {
        const responseData = await response.json();
        console.log('responseData', responseData);
        if (responseData && Object.keys(responseData).length > 0) {
          return responseData as Profile;
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