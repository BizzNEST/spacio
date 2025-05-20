const getUserInfo = async (accessToken) => {
  console.log('Access token: ', accessToken);
  try {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

export default getUserInfo;
