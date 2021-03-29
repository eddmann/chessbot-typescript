let ticker = () => {
  //
};

global.setInterval(() => ticker(), 1000);

export const setTimeFunc: (func: () => void) => void = func => {
  ticker = func;
};
