import Image from "next/image";
import Link from "next/link";
import navItems from "@/lib/datas/navItems";

const EMAIL = "info@pelda.hu";
const PHONE = "+36 30 123 4567";

async function Year() {
  "use cache";
  return new Date().getFullYear();
}

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
      <div className="w-[90%] max-w-[2560px] grid grid-cols-1 lg:grid-cols-3 mx-auto rounded-[10px] ">
        <div className="flex flex-col gap-[10px] w-full p-[10px]">
          <h3 className="text-[20px] font-bold">Bádogos munkák</h3>
          <div className="w-full h-[3px] bg-white/50 rounded-full"></div>
          <p>
            Ereszcsatornák, lefolyók, szegélyek, párkány- és kéményfedések
            kivitelezése Kaposváron és vonzáskörzetében. Egyedi hajlítású
            elemek, szakszerű munkavégzés és pontos határidők Somogy megye
            területén.
          </p>
        </div>
        <div className="flex flex-col gap-[10px] w-full p-[10px]">
          <h3 className="text-[20px] font-bold">Navigáció</h3>
          <div className="w-full h-[3px] bg-white/50 rounded-full"></div>
          <ul className="flex flex-col gap-[10px]">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-[10px] w-full p-[10px] relative">
          <h3 className="text-[20px] font-bold">Kapcsolat</h3>
          <div className="w-full h-[3px] bg-white/50 rounded-full"></div>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
          <p>7400 Kaposvár, Somogy megye</p>
          <Image
            width={300}
            height={300}
            alt=""
            src="/images/somogy.svg"
            className="w-full object-contain "
          ></Image>
        </div>
      </div>
      <div className="mt-[25px] w-full flex flex-col border-t-2 border-t-white/50">
        <div className="w-[90%] max-w-[2560px] flex flex-col mx-auto items-center justify-center">
          <div>
            {" "}
            © <Year></Year> Minden jog fenntartva.
          </div>
        </div>
      </div>
    </section>
  );
}
