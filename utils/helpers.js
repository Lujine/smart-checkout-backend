
module.exports = function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  // eslint-disable-next-line no-var
  var age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    // eslint-disable-next-line no-plusplus
    age--;
  }
  return age;
};
