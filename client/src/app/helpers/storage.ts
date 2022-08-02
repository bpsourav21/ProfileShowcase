export const authTokenKey = "accessToken";

export const setAuthToken = (authValue: string) => {
  return localStorage.setItem(authTokenKey, authValue);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(authTokenKey);
};
