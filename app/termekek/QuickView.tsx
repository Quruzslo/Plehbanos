import { type Product } from "./products";
import Image from "next/image";

import { useEffect, useRef } from "react";
export default function QuickView({
  item,
  setQuickView,
}: {
  item: Product;
  setQuickView: any;
}) {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const imgRef = useRef(null);

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (imgRef.current) {
      imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    }
  };

  return (
    <section className="fixed inset-0 flex flex-col bg-black/70 pt-[100px] lg:pt-[150px] pb-[35px] z-[100] overflow-y-auto">
      <div className="flex flex-col lg:flex-row w-[90%] max-w-[2560px] bg-white rounded-md mx-auto relative h-full">
        <button
          onClick={() => setQuickView(null)}
          className="absolute top-3 right-3 z-10 bg-black text-white w-[25px] h-[25px] rounded-full cursor-pointer"
        >
          X
        </button>
        <div className="flex flex-col w-full lg:w-1/2">
          <div
            onMouseMove={handleZoom}
            className="relative w-full min-h-[450px] h-full cursor-zoom-in overflow-hidden"
          >
            <Image
              ref={imgRef}
              fill
              alt={item.name}
              src={item.img}
              className="object-contain hover:scale-200"
            />
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-1/2 p-[10px]">
          <div className=" w-full relative flex flex-col  rounded-[10px] ">
            <div className="flex flex-col flex-1 gap-[5px] p-[10px]">
              <p className="text-text text-[15px] font-bold">{item.name}</p>
              <div className=" w-fit z-10">
                {item.stock >= 1 ? (
                  <p className="bg-green-600 text-green-100 w-fit px-[5px] rounded-[7px]">
                    Raktáron
                  </p>
                ) : (
                  <p className="bg-stone-400 text-red-100 w-fit px-[5px] rounded-[7px]">
                    Elfogyott
                  </p>
                )}
              </div>

              <div className="text-text font-bold">
                {item.salePrice ? (
                  <div className="flex flex-row gap-2 items-center">
                    <span className="text-red-500">
                      {item.salePrice.toLocaleString("hu-HU")} Ft.
                    </span>
                    <s className="opacity-50 text-[12px]">
                      {item.price.toLocaleString("hu-HU")} Ft.
                    </s>
                  </div>
                ) : (
                  <>{item.price.toLocaleString("hu-HU")} Ft.</>
                )}
              </div>
              <div className="flex flex-col ">
                <h3 className="text-[20px] border-b-2 border-text w-fit mb-[20px]">
                  Termék paraméterei:
                </h3>
                <div className="flex flex-row gap-3 items-center justify-center w-fit ">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  Magasság: {item.parameters.heightCm} cm
                </div>
                <div className="flex flex-row gap-3 items-center justify-center w-fit ">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  Szélesség: {item.parameters.widthCm} cm
                </div>
                <div className="flex flex-row gap-3 items-center justify-center w-fit ">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  Súly: {item.parameters.weightKg} kg
                </div>
                <div className="flex flex-row gap-3 items-center justify-center w-fit ">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  Szín: {item.parameters.color}
                </div>
              </div>
              <p className="mt-[20px] font-semibold">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
