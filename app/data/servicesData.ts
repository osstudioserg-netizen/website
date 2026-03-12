import type { StaticImageData } from "next/image";
import virtual from "@/assets/services/virtual.webp";
import virtualMobile from "@/assets/services/virtual-mobile.webp";
import pavilion from "@/assets/services/pavilion.webp";
import pavilionMobile from "@/assets/services/pavilion-mobile.webp";
import chromakey from "@/assets/services/chromakey.webp";
import chromakeyMobile from "@/assets/services/chromakey-mobile.webp";
import threeD from "@/assets/services/3d.webp";
import threeDMobile from "@/assets/services/3d-mobile.webp";
import vfx from "@/assets/services/vfx.webp";
import vfxMobile from "@/assets/services/vfx-mobile.webp";
import rent from "@/assets/services/rent.webp";
import rentMobile from "@/assets/services/rent-mobile.webp";

export const services = [
  {
    id: 0,
    title: "VIRTUAL PRODUCTION",
    subtitle:
      "Control the world. Control the frame.\nShoot complex environments on our LED volume with real-time rendering, dynamic lighting integration, and precise camera tracking — without location constraints.",
    img: virtual as StaticImageData,
    imgMobile: virtualMobile as StaticImageData,
  },
  {
    id: 1,
    title: "SHOOTING IN LED PAVILION",
    subtitle:
      "Next-generation LED volume filmmaking.\nHigh-resolution LED walls, advanced camera tracking, real-time rendering, and physically accurate lighting integration — engineered for directors who demand precision.",
    img: pavilion as StaticImageData,
    imgMobile: pavilionMobile as StaticImageData,
  },
  {
    id: 2,
    title: "LIVE CHROMAKEY",
    subtitle:
      "High-performance chromakey stage.\nDesigned for feature films, commercials, and broadcast productions — delivering clean keys, accurate edge detail, and full production control.",
    img: chromakey as StaticImageData,
    imgMobile: chromakeyMobile as StaticImageData,
  },
  {
    id: 3,
    title: "3D LOCATION & CHARACTER CREATION",
    subtitle:
      "Any scale. Any style. Real-time ready.\nFantasy, sci-fi, historical, commercial — we craft virtual locations and characters designed for immediate integration into your production workflow.",
    img: threeD as StaticImageData,
    imgMobile: threeDMobile as StaticImageData,
  },
  {
    id: 4,
    title: "VFX AND POST-PRODUCTION",
    subtitle:
      "Advanced VFX pipeline.\nHigh-end compositing, digital environments, simulations, and color workflows — engineered for feature films, commercials, and broadcast.",
    img: vfx as StaticImageData,
    imgMobile: vfxMobile as StaticImageData,
  },
  {
    id: 5,
    title: "STUDIO AND LED WALL RENT",
    subtitle:
      "Your production. Our infrastructure.\nLED walls, stage, tracking, power, crew — ready when you are.",
    img: rent as StaticImageData,
    imgMobile: rentMobile as StaticImageData,
  },
];
