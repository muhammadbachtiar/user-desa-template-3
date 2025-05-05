import Lightbox from "react-spring-lightbox";
import { FaX } from "react-icons/fa6";

interface Infografis {
    id: number;
    user_id: number;
    title: string;
    slug: string;
    link: string
    published_at: string; 
    description: string;
  }


interface LightboxProps {
    data: Infografis[], 
    isOpen: boolean, 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    currentIndex: number
} 

const LightboxImage = ({ data = [], isOpen, setIsOpen, currentIndex }: LightboxProps) => {

    const transformedInfografisData = Array.isArray(data)
    ? data.map((item : {link: string, title: string}) => ({
        ...item,
        src: item.link,
        alt: "infografis"
      }))
    : [];

  return (
    <>
         <Lightbox
            isOpen={isOpen}
            onNext={()=> {}}
            onPrev={()=> {}}
            images={transformedInfografisData}
            currentIndex={currentIndex}
            renderHeader={() => (
                <div className="flex w-full justify-end px-3 py-1 items-center">
                    <button 
                    className="transparent text-white text-md p-3 rounded-md transition duration-200 ease-in-out 
                                hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" 
                    onClick={() => { setIsOpen(false); }}
                    >
                        <FaX />
                    </button>

                </div>
            )}
            renderFooter={() => (
                <div className="flex w-full bg-black/85 text-white justify-center px-3 py-1 items-center">
                    <h1 className="text-base p-3 font-normal leading-none tracking-tight md:text-lg lg:text-xl dark:text-white">{transformedInfografisData[currentIndex]?.title || "Title Not Available"}</h1>
                </div>
            )}
            className="bg-black/80 text-white z-50"
        />
    </>
  );
};


export default LightboxImage;