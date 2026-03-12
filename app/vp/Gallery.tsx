import Image from "next/image";
import vp1 from "@/assets/gallery/vp1.jpg";
import vp2 from "@/assets/gallery/vp2.jpg";
import vp3 from "@/assets/gallery/vp3.jpg";
import vp4 from "@/assets/gallery/vp4.jpg";

export default function Gallery() {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-transparent text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1400px] mx-auto">
        <Image src={vp1} alt="" width={800} height={600} className="w-full h-auto object-cover"/>
        <Image src={vp2} alt="" width={800} height={600} className="w-full h-auto object-cover"/>
        <Image src={vp3} alt="" width={800} height={600} className="w-full h-auto object-cover"/>
        <Image src={vp4} alt="" width={800} height={600} className="w-full h-auto object-cover"/>
      </div>
    </section>
  );
}
