export const generateRandomBoard = (n) => {
  return Array.from({ length: n }, () => Math.floor(Math.random() * n));
};

export const generateSafeBoard = (n) => {
  return Array.from({ length: n }, (_, index) => index % n);
};

export const copyBoard = (board) => {
  return [...board];
};
