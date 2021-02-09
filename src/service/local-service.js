export const addLocalData = (username, token) => {
  localStorage.setItem('localUser', username);
  localStorage.setItem('token', token);
};

export const removeLocalData = () => {
  localStorage.clear();
};

export const getLocalData = (property) => {
  switch(property) {
    case 'token':
      return localStorage.getItem('token');
    case 'localUser':
      return localStorage.getItem('localUser');
    default:
      return {
        token: localStorage.getItem('token'),
        localUser: localStorage.getItem('localUser')
      }
  };
};
  
/*   
  if (property === 'token') {
    return localStorage.getItem('token');
  }

  
  const localUser = localStorage.getItem('localUser');
  const token = localStorage.getItem('token');

  return { localUser, token }
 */