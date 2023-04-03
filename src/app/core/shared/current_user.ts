export const setUser = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
  console.log(user);
};

export const getUser = () => {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : undefined;
};
