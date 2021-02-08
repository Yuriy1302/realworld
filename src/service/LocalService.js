export const addLocal = (username, token) => {
  localStorage.setItem('localUser', username);
  localStorage.setItem('token', token);
};

export const removeLocal = () => {
  localStorage.clear();
};

export const getLocal = () => {
  const localUser = localStorage.getItem('localUser');
  const token = localStorage.getItem('token');

  return { localUser, token };
};
