/**
 * Fetches the user info from the Google People API using the given access token.
 * @param {string} accessToken - The access token to use for the request.
 * @returns {Object} The user info, or null if an error occurred.
 * @throws {Error} If an error occurred while fetching the user info.
 */
const getUserInfo = async (accessToken) => {
  try {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

export default getUserInfo;
