import Image from "next/image";
export default function Footer() {
  return (
    <section className="w-full mt-[50px] bg-text text-white flex flex-col py-[50px]">
      <div className="footer-img relative mx-auto mt-[-50px] mb-[50px] bg-white p-[10px] rounded-b-[25px]">
        <Image
          src="/icon.svg"
          width={100}
          height={100}
          alt="Somogy megye Bádogos, kézzel készített bádogos díszek, szélkakasok"
          className="bg-text rounded-[15px]"
        ></Image>
      </div>
      <div className="w-[90%] max-w-[2560px] grid grid-cols-1 lg:grid-cols-3 mx-auto rounded-[10px] bg-accent">
        <div className="flex flex-col gap-[10px] w-full p-[10px]">
          <h3>Első blokk</h3>
          <p>blablabla</p>
        </div>
        <div className="flex flex-col gap-[10px] w-full p-[10px]">
          <h3>Második blokk</h3>
        </div>
        <div className="flex flex-col gap-[10px] w-full p-[10px]">
          <h3>Harmadik blokk</h3>
        </div>
      </div>
    </section>
  );
}
