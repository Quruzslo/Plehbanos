import Image from "next/image";
import Link from "next/link";

const fiokomNav = [
  {
    title: "Termékek kezelése",
    img: "/images/products.jpg",
    path: "admin/termekek",
  },
  {
    title: "Rendelések kezelése",
    img: "/images/orders.jpg",
    path: "admin/rendelesek",
  },
  {
    title: "Üzenetek kezelése",
    img: "/images/mails.jpg",
    path: "admin/levelezes",
  },
];

export default function Fiokom() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto  gap-[20px] my-auto">
      {fiokomNav.map((i) => (
        <div
          key={i.title}
          className="flex flex-col gap-[20px] items-center justify-center rounded-md shadow-[5px_5px_10px_0px_rgba(0,0,0,0.2)] py-[20px]"
        >
          <h2 className="bg-accent text-[20px] text-white font-bold p-[5px] rounded-md">
            {i.title}
          </h2>
          <Image alt={i.title} src={i.img} height={250} width={250} />
          <Link
            href={i.path}
            className="mt-auto bg-text text-white p-[10px] rounded-md"
          >
            Tovább
          </Link>
        </div>
      ))}
    </div>
  );
}
