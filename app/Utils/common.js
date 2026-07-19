
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
export function getTags() {
  const tags = [
    { label: "All", value: "0" },
    { label: "Due", value: "1" },
    { label: "Overdue", value: "2" },
    { label: "Upcoming", value: "3" },
  ];
  return tags;
}

export function getStatus() {
  const status = [
    { label: "All Status", value: "0" },
    { label: "New", value: "1" },
    { label: "In progress", value: "2" },
    { label: "Follow Up", value: "3" },
    { label: "Site Visit Fixed", value: "4" },
    { label: "Site Visit Done", value: "5" },
    { label: "Dead", value: "6" },
    { label: "Closed", value: "7" },
    { label: "F2F Fixed", value: "8" },
    { label: "F2F Done", value: "9" }
  ];
  return status;
}