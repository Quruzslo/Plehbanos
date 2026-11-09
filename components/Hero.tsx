import Image from "next/image";
import MainButton from "@/lib/ui/MainButton";
import {
  ArrowDownIcon,
  PaperPlaneTiltIcon,
  PhoneOutgoingIcon,
} from "@phosphor-icons/react/ssr";

export default function Hero() {
  return (
    <section
      data-header="dark"
      className="relative flex flex-col w-full min-h-svh  bg-background"
    >
      <div className="relative w-full gap-[20px] pt-[120px] lg:pt-[150px] mx-auto flex flex-col overflow-hidden min-h-full flex-1 shadow-[5px_5px_15px_0px_rgba(0,0,0,0.4)] ">
        <div className="hidden lg:absolute z-[100] left-[15px] top-[15px] lg:top-[50%] lg:translate-y-[-50%] lg:flex lg:flex-col w-fit gap-[15px]">
          <a
            href="tel:+36203127968"
            className="w-[45px] h-[45px] rounded-full border-2 border-white/50 hover:border-white flex flex-row items-center justify-center"
          >
            <PhoneOutgoingIcon className="w-[35px] h-[35px] mx-auto my-auto text-white" />
          </a>
          <a
            href="tel:+36203127968"
            className="w-[45px] h-[45px] rounded-full border-2 border-white/50 hover:border-white flex flex-row items-center justify-center"
          >
            <PaperPlaneTiltIcon className="w-[35px] h-[35px] mx-auto my-auto text-white" />
          </a>
        </div>
        {/* Háttérkép */}
        <Image
          fill
          preload
          sizes="100vw"
          src="/images/badog-kemeny.jpg"
          alt="Bádogos munka Kaposvár, bádogos szakember Kaposvár és környéke"
          className="object-cover object-bottom"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-foreground/90 via-foreground/30 to-foreground/90" />

        {/* Tartalom */}
        <div className="relative z-10 flex flex-col w-[90%] px-[10px] h-full flex-1 mx-auto  ">
          <div className="flex flex-col w-full md:max-w-[800px] mx-auto my-auto justify-center items-center text-background w-fit">
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
        <div className="hidden lg:flex w-full lg:w-[70%] xl:w-1/2 lg:ml-auto mt-auto z-[100]">
          <div
            tabIndex={0}
            className="w-1/2 group bg-[#2b3944] flex flex-row gap-[15px] p-[15px] text-white"
          >
            <div className="relative h-[50px] w-[50px] shrink-0 rounded-md overflow-hidden p-[5px]">
              <Image alt="" width={45} height={45} src="/icons/speed.svg" />
            </div>

            <div className="flex flex-col gap-[5px] w-full">
              <h2 className="text-[25px] font-bold">Gyors kiszállás</h2>

              <div className="relative h-[2px] w-1/2 bg-white/20 rounded-full before:absolute before:left-0 before:top-1/2 before:h-1 before:w-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:transition-[width] before:duration-300 group-hover:before:w-full group-focus:before:w-full" />

              <p>
                Kaposváron és környékén rövid határidővel kimegyünk. Beázásnál
                vagy viharkárnál nem hetekig várakoztatunk, hanem a lehető
                leghamarabb megállítjuk a bajt.
              </p>
            </div>
          </div>
          <div
            tabIndex={0}
            className="w-1/2 group bg-accent flex flex-row gap-[15px] p-[15px] text-white"
          >
            <div className="relative h-[50px] w-[50px] shrink-0 rounded-md overflow-hidden p-[5px]">
              <Image alt="" width={45} height={45} src="/icons/payment.svg" />
            </div>

            <div className="flex flex-col gap-[5px] w-full">
              <h2 className="text-[25px] font-bold">Átlátható árajánlat</h2>

              <div className="relative h-[2px] w-1/2 bg-white/20 rounded-full before:absolute before:left-0 before:top-1/2 before:h-1 before:w-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:transition-[width] before:duration-300 group-hover:before:w-full group-focus:before:w-full" />

              <p>
                Helyszíni felmérés után írásos ajánlatot adunk, rejtett tételek
                nélkül. Előre látható, mennyibe kerül a munka, és pontosan mit
                tartalmaz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
