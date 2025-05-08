'use client'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import useApp from '@/hooks/contents/useApp';
import Icons from '../shared/icons';
import Link from 'next/link';
import useSetting from '@/hooks/settings/useSettings';
import Refetch from '../shared/refetch';

export default function App() {

  const { data, isLoading, isFetching, refetch, isError } = useApp();
  const { data: appSetting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError:isSettingError } = useSetting('app', {});
  return (
        <section className="flex mx-auto w-full justify-center my-3 fixed bottom-0 z-10 max-w-full dark:bg-gray-700 dark:border-gray-600 md:static md:grid md:grid-cols-8 md:gap-2 md:bg-transparent md:border-0">
            <div className='hidden md:flex flex-col col-span-8 gap-2 min-h-16 mb-4 justify-items-center items-center '>
                {
                    isSettingLoading ? (
                        <div className="flex animate-pulse space-x-3">
                            <div className="flex flex-col justify-center items-center align-middle gap-y-6">
                                <div className=" h-8 w-30 rounded bg-gray-200"></div>
                                <div className="h-4 w-36 rounded bg-gray-200"></div>
                            </div>
                        </div>
                    ) : isSettingError && !isSettingFetching && !appSetting || !appSetting.value ? (
                        <><p className="text-black text-center text-md dark:text-gray-400">Data tidak tersedia</p></>
                    ) : isSettingError && !isSettingFetching  ? (
                        <Refetch refetch={refetch} />
                    ) : (
                      <>
                        <span className="self-center align-baseline text-4xl font-bold leading-8 text-black">{appSetting.value.title}</span>
                        <span className="self-center align-baseline text-xl font-normal underline underline-offset-4 text-black">{appSetting.value.subTitle}</span>
                    </>
                    )
                }
            </div>
            <div className="col-span-8 grid grid-cols-4 h-full bg-gray-50 rounded-4xl font-medium md:gap-x-4 ">
                {
                    data.value.map((item, index) => {
                        const IconComponent = Icons[item.icon]
                        return (
                            <Popover key={index}>
                                <PopoverButton className="group h-full w-full inline-flex flex-col items-center justify-center p-2 focus:ring-0 focus:bg-none md:p-0 md:h-56 md:col-span-2 md:rounded-lg md:justify-items-center md:bg-[#F7F7F7] dark:hover:bg-gray-800 md:focus:ring-2 md:focus:ring-gray-200 md:focus:bg-gray-100">
                                    <div className="relative overflow-hidden rounded-sm w-full flex justify-center group">
                                        <IconComponent className='w-6 h-6 mb-1 object-cover transform group-hover:scale-110 group-focus:scale-125 md:group-focus:scale-110 transition duration-300 ease-in-out text-[#393E46] md:w-32 md:h-32 md:mb-2 md:selft-center  group-hover:text-gray-700 group-focus:text-gray-700 dark:text-gray-400 dark:group-hover:text-blue-500'/> 
                                    </div>
                                    <span className="text-sm text-black md:mb-2 md:text-md md:text-center md:font-bold md:tracking-tight group-focus:text-black dark:text-gray-400 dark:group-hover:text-blue-500">{item.title}</span>
                                </PopoverButton>
                                <PopoverPanel transition={true} anchor="top" className="flex flex-col p-6 w-screen h-1/2 bg-white border border-gray-200 shadow-xs z-10 rounded-lg [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 transition duration-200 ease-in-out">
                                    <div className="p-4 pb-0 text-lg text-gray-900 md:pb-4 dark:text-white">
                                        <div className="flex items-center px-2 py-1 space-x-3 rtl:space-x-reverse rounded-md">
                                            <IconComponent className='w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-white'/>
                                            <span className="text-gray-700 dark:text-gray-400 group-hover:text-white ">Perizinan</span>
                                        </div>
                                        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                    <ul className="space-y-4 mt-2">
                                        {item.subMenu.map((subItem, subIndex) => {
                                            const IconComponent = Icons[item.icon]
                                                return(
                                                    <li key={subIndex}>
                                                        <Link href="#" className="flex items-center text-black dark:text-gray-400 hover:text-gray-500 dark:hover:text-blue-500 group">
                                                            <IconComponent className='w-3 h-3 me-2 text-black dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-blue-500'/>
                                                            {subItem.title}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                    </ul>
                                    </div>
                                </PopoverPanel>
                            </Popover>
                        )
                    }
                    )
                }
            </div>
        </section>
  );
}
