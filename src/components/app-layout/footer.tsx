import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Logo from "../shared/logo";
import useFooter from "@/hooks/settings/useFooter";
import sosmedIcons from "../shared/sosmedIcons";

const Footer = () => {
  
    // const { data, isLoading, isFetching, refetch, isError } = useFooter();
    const { data } = useFooter();
    return (
       <>
        <footer className="bg-gray-100 border-t-2 border-gray-200 shadow-lg dark:bg-gray-900 px-6 pb-24 md:pb-6 lg:px-0 py-6 w-full">
            <div className="w-full">
                <div className="grid grid-cols-4 gap-y-5 items-center justify-start mx-0 lg:mx-16">
                    <div className="col-span-4 lg:col-span-2 text-start flex flex-col gap-1">                       
                        <div className="flex justify-start items-center gap-x-2">
                            <FaLocationDot className="min-w-4 min-h-4 rounded-sm text-[#393E46]"></FaLocationDot>
                            <p className="flex flex-wrap text-md font-normal mb-0 text-gray-900 dark:text-white">{data.value.contactUs.address}</p>
                        </div>
                        <div className="flex justify-start items-center gap-x-2">
                            <FaPhone className="min-w-4 min-h-4 rounded-sm text-[#393E46]"></FaPhone>
                            <p className="flex flex-wrap text-md font-normal mb-0 text-gray-900 dark:text-white">{data.value.contactUs.phone}</p>
                        </div>
                        <div className="flex justify-start items-center gap-x-2">
                            <MdEmail className="min-w-4 min-h-4 rounded-sm text-[#393E46]"></MdEmail>
                            <p className="flex flex-wrap text-md font-normal mb-0 text-gray-900 dark:text-white">{data.value.contactUs.email}</p>
                        </div>
                    </div>
                    <div className="col-span-4 lg:col-span-1 text-start">
                        <div className="w-full flex flex-wrap gap-6 justify-start">
                         {
                            data.value.socialMedia ? Object.entries(data.value.socialMedia).map(([key, value]) => {
                            const Icon = sosmedIcons[key]; 
                                return (
                                    <a 
                                        key={key} 
                                        href={`https://${value.profileUrl}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex justify-items-center w-fit items-center rounded-md bg-white p-3 hover:bg-black border-0 hover:border-2 hover:border-white group focus:ring-2 focus:ring-white transition-all transform duration-300 ease-in-out"
                                    >
                                        {Icon ? (
                                            <Icon className="w-6 h-6 lg:w-4 lg:h-4 rounded-sm text-black group-hover:text-white" />
                                        ) : (
                                            <span className="text-white">{key}</span>
                                        )}
                                    </a>
                                );
                            }) : <></>
                        }
                        </div>
                    </div>
                    <div className="col-span-4 lg:col-span-1 flex justify-start lg:justify-end">
                        <Logo/>
                    </div>
                </div>  
                <hr className="my-3 block border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
                <span className="block text-sm text-center text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Muara Enim™</a>. All Rights Reserved.</span>
            </div>
        </footer>
       </>
  );
};

export default Footer;