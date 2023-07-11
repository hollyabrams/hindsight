const HindsightApi = {
    saveProfile(username, profileData) {
      return new Promise((resolve, reject) => {
        // This is just a placeholder function.
        // In a real-world app, you would make an API call here.
  
        // If the API call is successful, resolve with the user data.
        // For now, let's just return the profileData.
  
        // Wait for 1 second to simulate an API call.
        setTimeout(() => resolve(profileData), 1000);
      });
    },
  };
  
  export default HindsightApi;
  