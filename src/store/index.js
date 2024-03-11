import { proxy } from "valtio";

const state = proxy({
    into:true,
    rotate:false,
    color: '#000',
    isLogoTexture:true,
    isFullTexture:false,
    isBackLogoTexture:true,
    logoDecal:'./nexus.png',
    fullDecal:'./nexus.png',
    backDecal:'./mindbend.png',
    logoX: 0,
    logoY: 0.04,
    logoSize: 0.15,
    backLogoX: 0,
    backLogoY: 0.04,
    backLogoSize: 0.15,
});

export default state;