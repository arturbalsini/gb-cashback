const sizeWidth = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

const sizeHeight = {
  mobileS: "600px",
};

export const deviceWidth = {
  mobileS: `(max-width: ${sizeWidth.mobileS})`,
  mobileM: `(max-width: ${sizeWidth.mobileM})`,
  mobileL: `(max-width: ${sizeWidth.mobileL})`,
  tablet: `(max-width: ${sizeWidth.tablet})`,
  laptop: `(max-width: ${sizeWidth.laptop})`,
  laptopL: `(max-width: ${sizeWidth.laptopL})`,
  desktoph: `(max-width: ${sizeWidth.desktop})`,
  desktopL: `(max-width: ${sizeWidth.desktop})`,
};

export const deviceHeight = {
  mobileS: `(max-height: ${sizeHeight.mobileS})`,
};
