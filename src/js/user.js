export let userData = {};

// Load user.json file
export async function loadUserData() {
  try {
    const response = await fetch('src/config/user.json');
    if (!response.ok) {
      throw new Error('Failed to load user data');
    }
    
    userData = await response.json();
    console.log("User data loaded successfully.");
  } catch (error) {
    console.error("Error loading user data:", error);
    userData = null;
  }
}

// Check if user data is available
export const isUserDataAvailable = (key) => {
  return userData && (key ? userData[key] && Object.keys(userData[key]).length > 0 : Object.keys(userData).length > 0);
};
