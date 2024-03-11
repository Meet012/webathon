import { swatch, fileIcon, ai, logoShirt, stylishShirt,editimg, download } from "../assets";

export const EditorTabs = [
  {
    name: "Color Picker",
    icon: swatch,
  },
  {
    name: "File Picker",
    icon: fileIcon,
  },
  {
    name: "AI Picker",
    icon: ai,
  },
  {
    name: "Position Picker",
    icon: editimg,
  },
];

export const FilterTabs = [
  {
    name: "Logo Shirt",
    icon: logoShirt,
  },
  {
    name: "Stylish Shirt",
    icon: stylishShirt,
  },
  {
    name: "Back Logo Shirt",
    icon: logoShirt,
  },
  {
    name: "download",
    icon: download,
  }, 
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "Logo Shirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "Stylish Shirt",
  },
  back:{
    stateProperty: "backDecal",
    filterTab: "Back Logo Shirt", 
  }
};
