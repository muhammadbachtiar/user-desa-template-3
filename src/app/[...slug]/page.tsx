// import { notFound } from "next/navigation"
// import type { MenuWithContent } from "@/types/menu"
// import useMenu from "@/hooks/settings/useMenu"
// import RichTextContent from "@/components/RichTextContent"
// import useStaticPage from "@/hooks/contents/useStaticPage"
// import AsideContent from "@/components/app-layout/aside-content"

// function findMenuItemByPath(items: MenuWithContent, path: string[], currentPath = ""): MenuWithContent[0] | null {
//   for (const item of items) {
//     const itemPath = item.route ? `${currentPath}${item.route}` : currentPath

//     if (itemPath === `/${path.join("/")}`) {
//       return item
//     }

//     if (item.child && item.child.length > 0) {
//       const found = findMenuItemByPath(item.child, path, itemPath)
//       if (found) return found
//     }
//   }

//   return null
// }

// export default function DynamicPage({ params }: { params: { slug: string[] } }) {
//   const { data : dataMenu } = useMenu();
//   // const { data : dataMenu, isLoading: isMenuLoading, isFetching: isMenuFetching, refetch: refetchMenu, isError: isMenuError } = useMenu();
//   const path = params.slug || []
//   const menuItem = findMenuItemByPath(dataMenu.value, path)
  
//   if (!menuItem) {
//     notFound()
//   }
  
//   const { data: staticPage} = useStaticPage({}, menuItem.staticPage || "");
//   // const { data: staticPage, isLoading, isFetching, refetch, isError } = useStaticPage({}, menuItem.staticPage || "");

//   return (
//      <AsideContent>
//         <RichTextContent 
//               content={staticPage.value.content} 
//               className="px-4" 
//           />
//       </AsideContent>
//   )
// }


import { notFound } from "next/navigation";
import type { MenuWithContent } from "@/types/menu";
import useMenu from "@/hooks/settings/useMenu";
import RichTextContent from "@/components/RichTextContent";
import useStaticPage from "@/hooks/contents/useStaticPage";
import AsideContent from "@/components/app-layout/aside-content";
import { PageProps } from "../../../.next/types/app/page";

function findMenuItemByPath(
  items: MenuWithContent,
  path: string[],
  currentPath = ""
): MenuWithContent[0] | null {
  for (const item of items) {
    const itemPath = item.route ? `${currentPath}${item.route}` : currentPath;

    if (itemPath === `/${path.join("/")}`) {
      return item;
    }

    if (item.child && item.child.length > 0) {
      const found = findMenuItemByPath(item.child, path, itemPath);
      if (found) return found;
    }
  }

  return null;
}

interface DynamicPageProps {
  params: { slug?: string[] };
}

// Assert that DynamicPageProps satisfies PageProps
export default function DynamicPage({ params }: DynamicPageProps & PageProps) {
  const { data: dataMenu } = useMenu();
  const path = params.slug || [];
  const menuItem = findMenuItemByPath(dataMenu.value, path);

  if (!menuItem) {
    notFound();
  }

  const { data: staticPage } = useStaticPage({}, menuItem.staticPage || "");

  return (
    <AsideContent>
      <RichTextContent content={staticPage.value.content} className="px-4" />
    </AsideContent>
  );
}