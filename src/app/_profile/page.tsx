'use client'
import TabGroupCard from "@/components/shared/TabGroup";
import BasicInformation from "@/components/profile/basic-information";
import Structure from "@/components/profile/structure";
import VisiMisi from "@/components/profile/visi-misi";
import History from "@/components/profile/history";
import useInformation from "@/hooks/settings/useInformation";


export default function Home() {

// const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useInformation({}, "profile");
const { data: setting } = useInformation({}, "profile");

const backgroundStyle = setting?.value?.imageUrl 
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundColor: '#f3f4f6' };

const tabList = [
    {
        name: 'Informasi Umum',
        content: <BasicInformation/>
    },
    {
        name: 'Struktur Pemerintahan',
        content: <Structure/>
    },
    {
        name: 'Visi & Misi',
        content: <VisiMisi/>
    },
    {
        name: 'Sejarah',
        content: <History/>
    }
]

  return (
      <>
        <section style={backgroundStyle} className={`relative rounded-md p-4 lg:p-8 bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 flex justify-start items-end`}>
            <div className="absolute inset-0 bg-black/50 rounded-md"></div>
            <div className="relative z-10 px-0 sm:px-8  text-start">
                <h2 className="mb-2 text-3xl md:text-5xl font-bold text-white lg:text-6xl">{setting.value.title}</h2>
                <p className="sm:mb-2 text-sm sm:text-md font-light tracking-tight text-white">{setting.value.description}</p>
            </div>
        </section>
        <div className="w-full">
            <div className="flex flex-col w-full">
              <TabGroupCard tabList={tabList}/>
            </div>
        </div>
      </>
  );
}
