// temporary function to generate ids client side
export const ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};
