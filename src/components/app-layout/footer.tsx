'use client'
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Logo from "../shared/logo";
import sosmedIcons from "../shared/sosmedIcons";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "../shared/refetch";

const Footer = () => {
    const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`footer-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

    const lat = setting?.value?.latitude || setting?.value?.contactUs?.latitude;
    const lng = setting?.value?.longitude || setting?.value?.contactUs?.longitude;
    const hasCoordinates = lat && lng;
    const gmapsApiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;

    return (
       <>
        <footer className="flex justify-center bg-gray-100 border-t-2 border-gray-200 shadow-lg dark:bg-gray-900 pb-24 md:pb-6 py-8 w-full">
            <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
                {
                    isSettingLoading || (isSettingFetching && !setting?.value) ? (
                        <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-x-2">
                                    <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
                                    <div className="flex flex-col gap-1">
                                        <div className="h-4 w-32 bg-gray-300 rounded"></div>
                                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-36 w-full max-w-[280px] bg-gray-200 rounded-lg"></div>
                            </div>
                            <div className="flex flex-col gap-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-x-2">
                                        <div className="h-4 w-4 bg-gray-300 rounded"></div>
                                        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-10 w-10 bg-gray-300 rounded-md"></div>
                                ))}
                            </div>
                        </div>
                    ) : isSettingError && !isSettingFetching ? (
                        <div className="flex min-h-40 justify-center items-center w-full">
                            <Refetch refetch={refetchSetting} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                            {/* Kolom 1: Logo + Map */}
                            <div className="flex flex-col gap-4">
                                <Logo />
                                {hasCoordinates && gmapsApiKey && (
                                    <div className="w-full max-w-[280px] aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            src={`https://www.google.com/maps/embed/v1/place?key=${gmapsApiKey}&q=${lat},${lng}&zoom=15`}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Lokasi Kantor Desa"
                                        ></iframe>
                                    </div>
                                )}
                            </div>

                            {/* Kolom 2: Kontak */}
                            <div className="flex flex-col gap-3">
                                <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Kontak</h4>
                                <div className="flex items-start gap-x-2">
                                    <FaLocationDot className="min-w-4 min-h-4 mt-1 text-[#393E46] dark:text-gray-400" />
                                    {hasCoordinates ? (
                                        <a
                                            href={`https://www.google.com/maps?q=${lat},${lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-gray-900 dark:text-white hover:text-blue-600 hover:underline transition-colors"
                                        >
                                            {setting?.value?.contactUs?.address || "[Alamat belum diatur]"}
                                        </a>
                                    ) : (
                                        <p className="text-sm text-gray-900 dark:text-white">
                                            {setting?.value?.contactUs?.address || "[Alamat belum diatur]"}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <FaPhone className="min-w-4 min-h-4 text-[#393E46] dark:text-gray-400" />
                                    <a
                                        href={`tel:${setting?.value?.contactUs?.phone}`}
                                        className="text-sm text-gray-900 dark:text-white hover:text-blue-600 hover:underline transition-colors"
                                    >
                                        {setting?.value?.contactUs?.phone || "[Nomor telepon belum diatur]"}
                                    </a>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <MdEmail className="min-w-4 min-h-4 text-[#393E46] dark:text-gray-400" />
                                    <a
                                        href={`mailto:${setting?.value?.contactUs?.email}`}
                                        className="text-sm text-gray-900 dark:text-white hover:text-blue-600 hover:underline transition-colors"
                                    >
                                        {setting?.value?.contactUs?.email || "[Email belum diatur]"}
                                    </a>
                                </div>
                            </div>

                            {/* Kolom 3: Sosial Media */}
                            <div className="flex flex-col gap-3">
                                <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Ikuti Kami</h4>
                                <div className="flex flex-wrap gap-3">
                                    {
                                        setting?.value?.socialMedia ? Object.entries(setting.value.socialMedia as Record<string, { profileUrl: string }>).map(([key, value]) => {
                                            const Icon = sosmedIcons[key] ?? sosmedIcons.FaQuestion;
                                            return (
                                                <a
                                                    key={key}
                                                    href={`${value.profileUrl}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex justify-center items-center w-10 h-10 rounded-md bg-white hover:bg-black border border-gray-200 hover:border-transparent group focus:ring-2 focus:ring-gray-300 transition-all duration-300 ease-in-out"
                                                >
                                                    <Icon className="w-5 h-5 text-black group-hover:text-white" />
                                                </a>
                                            );
                                        }) : <p className="text-sm text-gray-500 dark:text-gray-400">[Sosial Media belum di atur]</p>
                                    }
                                </div>
                            </div>

                        </div>
                    )
                }
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
                <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} <a href="https://muaraenimkab.go.id/" className="hover:underline">Muara Enim™</a>. All Rights Reserved.</span>
            </div>
        </footer>
       </>
  );
};

export default Footer;