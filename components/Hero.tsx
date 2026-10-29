import Image from "next/image";
import MainButton from "@/lib/ui/MainButton";
import { ArrowDownIcon } from "@phosphor-icons/react/ssr";

export default function Hero() {
  return (
    <section
      data-header="light"
      className="relative flex flex-col w-full min-h-svh pt-[120px] lg:pt-[150px] pb-[50px] bg-background"
    >
      <div className="relative w-[90%] mx-auto flex flex-col overflow-hidden rounded-[10px] min-h-full flex-1 shadow-[5px_5px_15px_0px_rgba(0,0,0,0.4)] py-[15px]">
        {/* Háttérkép */}
        <Image
          fill
          preload
          sizes="100vw"
          src="/images/badog-kemeny.jpg"
          alt="Bádogos munka Kaposvár, bádogos szakember Kaposvár és környéke"
          className="object-cover object-bottom"
        />

        {/* Gradient overlay: felül és alul sötét, középen átlátszó */}
        <div className="absolute inset-0 bg-linear-to-b from-foreground/90 via-foreground/30 to-foreground/90" />

        {/* Tartalom */}
        <div className="relative z-10 flex flex-col md:flex-row w-[90%] max-w-[1800px] mt-auto mx-auto lg:my-auto ">
          <div className="flex flex-col w-full md:max-w-[800px] mx-auto mt-[120px] justify-center items-center text-background w-fit">
            <h1 className="text-[25px] md:text-[45px] font-black mr-auto">
              József Zoltán – bádogos mester
            </h1>
            <div className=" flex flex-col  mt-[20px] text-[15px] md:text-[20px]">
              <p>Bádogos munkák Kaposvár és környékén.</p>
              <p>
                Több mint 30 év tapasztalattal vállalunk bádogos munkákat
                Kaposváron és Somogy megyében, ereszcsatornától a
                kéményszegélyen át a teljes lemezfedésig. Új építésnél és
                felújításnál egyaránt.
              </p>
            </div>
            {/* Szolgáltatások gomb--- */}
            <MainButton
              text="Szolgáltatások"
              link="/#szolgaltatasok"
              icon={ArrowDownIcon}
              iconSize={25}
              className="flex flex-row gap-3 mt-[20px] mr-auto md:mr-[0px] !text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
