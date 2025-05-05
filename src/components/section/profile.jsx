'use client'
import RichTextContent from '../RichTextContent';
import TabGroup from '../shared/TabGroup';
import useStaticPage from '@/hooks/contents/useStaticPage';

export default function Profile() {

  const { data: welcomeMessage, isLoading: isWellcomeMessageLoading, isFetching: isWellcomeMessageFetching, refetch: refetchWelcomeMessage, isError: isWellcomeMessageError } = useStaticPage({}, "kata-sambutan");
  const { data: villageProgram, isLoading: isvillageProgramLoading, isFetching: isvillageProgramFetching, refetch: refetchVillageProgram, isError: isvillageProgramError } = useStaticPage({}, "program-desa");

  const TabListName = [
    {
      name: 'Kata Sambutan',
      content: <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl min-h-[400px] max-h-screen overflow-y-scroll flex flex-col items-center space-y-6">
                  <div className="flex flex-col md:flex-row items-center gap-6 p-6 ">
                    <div className="flex-shrink-0">
                      <img
                        src={`${welcomeMessage.value.profile.imageUrl}`}
                        alt={`${welcomeMessage.value.profile.name}'s photo`}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-covers shadow-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-center text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {welcomeMessage.value.profile.name}
                      </h3>
                      <p className="text-lg font-medium text-blue-600 dark:text-blue-300 mt-1">
                        {welcomeMessage.value.profile.jabatan}
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400 mt-2 italic">
                        {welcomeMessage.value.profile.years}
                      </p>
                    </div>
                  </div>
                  <RichTextContent 
                      content={welcomeMessage.value.content} 
                      className="px-4 md:px-16" 
                  />
              </div>
    },
    {
      name: 'Program Desa',
      content: <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-xl p-8 min-h-[400px]  max-h-screen overflow-y-scroll">
                  <RichTextContent 
                      content={villageProgram.value.content} 
                      className="px-4 md:px-16" 
                  />
              </div>
    }
  ]

  return (
    <section className="relative w-full flex justify-center items-center">
      <div className="max-w-full w-full flex flex-col align-middle justify-center bg-white dark:bg-gray-700 dark:border-gray-600">
          <TabGroup tabList={TabListName}/>
      </div>
    </section>
  );
}
