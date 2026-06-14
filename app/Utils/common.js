
export const loadUser = async () => {
    const user = await getDecodedToken();

    if (user) {
      console.log('User Name:', user.userName);
      console.log('Email:', user.email);
      console.log('Role:', user.roleName);
      console.log('Expires:', user.expiresAt);
    }
  };

  export function showDateNa(isoDate) {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
    }).split(",")[0];
}