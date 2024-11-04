const correctUser = (username, param) => {
  if(username !== param) {
    return false;
  }
  return true
};

export default correctUser;