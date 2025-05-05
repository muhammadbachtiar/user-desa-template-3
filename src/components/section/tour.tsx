import Link from "next/link";
import Image from "next/image";
import useInformation from "@/hooks/settings/useInformation";

const Tour = () => {

    // const { data, isLoading, isFetching, refetch, isError } = useInformation({}, "tour");
    const { data } = useInformation({}, "tour");
  
  return (
       <>
        <section className="relative flex justify-center items-center">
            <div className="col-span-4 grid grid-cols-6 gap-10 justify-items-center">
                <div className="col-span-6 lg:col-span-3 xl:col-span-2 flex justify-center items-center  dark:bg-gray-800">                  
                    <Image
                        className="h-full w-full md:min-h-96 shadow-2xl backdrop-blur-2xl rounded-4xl"
                        src={data.value.imageUrl || ''}
                        alt="Tour Banner"
                        width={500}
                        height={300}
                        style={{
                        width: "auto",
                        height: "auto",
                        }}
                    />
                </div>
                <div className="col-span-6 lg:col-span-3 xl:col-span-4 w-full rounded-lg dark:bg-gray-800 py-4 lg:py-12 pe-12">                  
                    <h5 className="text-4xl font-bold mb-5 tracking-tighter text-gray-900 dark:text-white">{data.value.title}</h5>
                    <div className="flex items-center mt-2">
                        <p className="my-0 text-lg font-semibold text-gray-900 dark:text-white">{data.value.subTitle}</p>
                    </div>
                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mt-2">{data.value.description}</p>
                    <Link href={'/tour'} className="inline-flex justify-center mt-8 border-2 lg:mt-12  hover:text-black hover:border-black items-center py-4 px-6 text-base font-medium text-center bg-[#393E46] text-white rounded-md hover:bg-white focus:ring-2 focus:ring-gray-400 transition transform duration-300 ease-in-out">
                        Lihat Selengkapnya
                    </Link>
                </div>
            </div>
        </section>
       </>
  );
};

export default Tour;