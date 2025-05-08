import AsideContent from "@/components/app-layout/aside-content"

export default function ArticleDetailSkeleton() {
  return (
    <AsideContent>
      <div className="flex flex-col px-2 md:px-4 my-2 gap-y-1 min-h-screen bg-white animate-pulse">
        <span className="self-start align-baseline h-4 w-32 bg-gray-200 rounded"></span>
        <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
        <span className="self-start align-baseline h-4 w-40 bg-gray-200 rounded"></span>
        <span className="self-start align-baseline h-3 w-24 bg-gray-200 rounded"></span>
        <div className="relative w-full group mb-6">
          <div className="h-52 w-full flex-1 rounded-2xl bg-gray-200"></div>
        </div>

        <div className="space-y-2 px-0 md:px-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
        </div>

        <div className="flex flex-row w-full my-3 px-8 gap-1 justify-items-start justify-end">
          <div className="flex flex-row">
            <p className="h-4 w-32 bg-gray-200 rounded"></p>
          </div>
        </div>
      </div>
    </AsideContent>
  )
}
