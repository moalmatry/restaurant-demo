export const addProfileAvatar = (fullName: string) => {
  const filteredName = fullName.replace(' ', '+');
  return `https://ui-avatars.com/api/?name=${filteredName}&size=250&background=E31837&color=fff`;
};
