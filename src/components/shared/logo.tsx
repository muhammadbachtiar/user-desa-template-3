import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href={"/"} className={`flex items-center px-2 py-1 space-x-3 rtl:space-x-reverse rounded-md hover:bg-gray-300 hover:scale-105 transition transform duration-300 ease-in-out`}>
        <Image
            className="h-1"
            src="/images/Lambang-Kabupaten-Muara-Enim-Sumatera-Selatan.png"
            alt="Logo"
            width={500}
            height={300}
            style={{
              width: "38px",
              height: "auto",
            }}
          />
        <div className='flex flex-col justify-center items-center gap-1'>
            <span className={`self-start align-baseline text-xl leading-3 tracking-tighter font-semibold uppercase text-black`}>Muara Enim </span>
            <span className={`self-start align-baseline text-xs leading-3 font-normal italic text-black`}>Serasan sekundang </span>
        </div>
    </Link>
  );
}
