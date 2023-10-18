import Image from "next/image";
import Link from "next/link";
import WebStories from "../WebStories/WebStories";
import { getSidebar } from "../../../lib/queries/SidebarQuery";
import SocialMenu from "../SocialMenu/SocialMenu";
export default async function Sidebar() {
  const sidebarProps = await getSidebar();
  let aboutMe =
    sidebarProps.themeGeneralSettings.themeOptions.aboutMeSection.aboutMe;
  const recipes =
    sidebarProps.themeGeneralSettings.themeOptions.sidebarRecipesCategory;
  const popularPosts =
    sidebarProps.themeGeneralSettings.themeOptions.sidebarPopularPosts;
  const webStories = sidebarProps.webStories.edges;

  //let aboutMe = props.aboutMe.aboutMe;
  const newH3 = `<h3 class="relative p-[30px] pb-[10px] after:content-['*] after:absolute after:bg-partyYellow after:left-[0] after:right-[0] after:top-[60%] after:h-3 after:z-[-1]">`;
  aboutMe = aboutMe.replace(/<h3(.*?)>/, newH3);
  return (
    <aside className=" max-w-960:w-full min-w-960:w-[392px] min-w-1200:w-[392px] border border-transparent">
      <h2 className="sr-only">Primary Sidebar</h2>

      <section
        className={`pb-[30px] px-[30px] `}
        dangerouslySetInnerHTML={{ __html: aboutMe }}
      />
      {recipes && (
        <>
          <div className="pb-[30px] px-[30px]">
            <h3 className="relative p-[10px] mb-[20px] after:content-['*] after:absolute after:bg-partyYellow after:left-[0] after:right-[0] after:top-[60%] after:h-3 after:z-[-1]">
              {recipes.name}
            </h3>
            {recipes.posts.edges.map((post, i) => {
              let image = post.node.featuredImage.node.mediaDetails.sizes.find(
                (obj) => obj.width === "190"
              );

              return (
                <div key={post.node.id} className="mb-3">
                  <Link href={post.node.slug}>
                    <Image
                      src={image.sourceUrl}
                      width={image.width}
                      height={image.height}
                      alt={post.node.title}
                    ></Image>
                    <div className="py-3">{post.node.title}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}

      {popularPosts && (
        <>
          <div className="pb-[30px] px-[30px] border border-transparent">
            <h3 className="relative p-[10px] mb-[20px] after:content-['*] after:absolute after:bg-partyYellow after:left-[0] after:right-[0] after:top-[60%] after:h-3 after:z-[-1]">
              Popular Posts
            </h3>
            {popularPosts.map((post, i) => {
              let image = post.featuredImage.node.mediaDetails.sizes.find(
                (obj) => obj.width === "190"
              );

              return (
                <div key={post.id} className="mb-6">
                  <Link href={post.slug} className="flex ">
                    <div className="w-[75px] h-[75px] relative">
                      <Image
                        src={image.sourceUrl}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 75px) 100%, 75px"
                        alt={i}
                      ></Image>
                    </div>
                    <div className="flex-1 pl-5">{post.title}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
      <SocialMenu />
      {webStories && (
        <>
          <div className="pb-[30px] px-[30px] border border-transparent">
            <h3 className="relative p-[10px] mb-[20px] after:content-['*] after:absolute after:bg-partyYellow after:left-[0] after:right-[0] after:top-[60%] after:h-3 after:z-[-1]">
              Web Stories
            </h3>
            <WebStories webStories={webStories}></WebStories>
          </div>
        </>
      )}
    </aside>
  );
}
