const getCallbackURL = () => {
  const AUTH_ENDPOINT = `https://accounts.spotify.com`;
  const REQUEST_SCOPES =  ["streaming", "user-read-birthdate", "user-read-email", "user-read-private",
  "playlist-read-private", "playlist-read-collaborative", "playlist-modify-public", "user-read-recently-played",
  "playlist-modify-private", "ugc-image-upload", "user-follow-modify", "user-follow-read",
  "user-library-read", "user-library-modify", "user-top-read", "user-read-playback-state"];
  const RESPONSE_TYPE = `token`;

  let result = `${AUTH_ENDPOINT}/authorize?`;
  result += `client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}`;
  result += `&scope=${REQUEST_SCOPES.join('%20')}`;
  result += `&response_type=${RESPONSE_TYPE}`;
  result += `&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}`;

  return result;
};

const parseAccessToken = () => {
  const ACCESS_TOKEN_KEY = "access_token";
  let accessToken = null;

  let params = window.location.hash.substring(1).split("&");
  params.forEach(keyVal => {
    let key = keyVal.split("=")[0];
    let value = keyVal.split("=")[1];
    if (key === ACCESS_TOKEN_KEY) {
      accessToken = value
    }
  });
  return accessToken;
};


export const getAccessToken = () => {
  let accessToken = null;
  const pathname = window.location.pathname;
  if (pathname === '/callback') {
    accessToken = parseAccessToken();
  } else {
    window.location.href = getCallbackURL();
  }
  return accessToken;
};
