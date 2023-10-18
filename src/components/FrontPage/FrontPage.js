import Image from "next/image";
import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";
import { Playfair } from "next/font/google";
const playfair = Playfair({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export default function FrontPage({ props }) {
  let sticky = props.stickyPost.node;
  // console.log(sticky.featuredImage.node.mediaDetails.sizes);
  let excerpt = sticky.excerpt;
  excerpt = excerpt.substring(0, excerpt.indexOf("<a"));

  const sideBarData = {
    aboutMe: props.aboutMeSection,
    popularPosts: props.sidebarPopularPosts,
    recipes: props.sidebarRecipesCategory,
    webStories: props.webStories,
  };

  return (
    <>
      <div className=" p-[30px] bg-gray-50	 ">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 w-full max-w-7xl	mx-auto">
          {props.frontPageTopPosts.map(({ post }, i) => {
            let image = post.featuredImage.node.mediaDetails.sizes[5];

            const isLastItem = i === props.frontPageTopPosts.length - 1;
            const marginRightClass = isLastItem ? "" : "sm:mr-[2%]";

            return (
              <div
                key={post.id}
                className={`w-full ${marginRightClass} flex flex-col align-center`}
              >
                <Link
                  className="transition ease-in-out text-lightBlue hover:text-inherit text-center"
                  href={post.slug}
                >
                  <Image
                    src={image.sourceUrl}
                    alt={post.featuredImage.node.altText}
                    width="0"
                    height="0"
                    className="w-full h-auto"
                    sizes="(max-width: 400px) 100vw, 400px"
                    loading="eager"
                  ></Image>

                  <div className={`py-5 `}>{post.title}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-y my-3">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 w-full p-[20px] max-w-7xl	mx-auto ">
          <div className="p-2 text-xs flex items-center uppercase mr-5 font-normal">
            {"Don't Miss all the Latest"}
          </div>
          <form
            id="subscribeenews-ext-4"
            className="enews-form flex w-full flex-2 "
            action="https://partylicious.us20.list-manage.com/subscribe/post?u=ec9ba805849018f6c6459f4b5&amp;id=56b5b1ceff"
            method="post"
            name="enews-ext-4"
          >
            <input
              type="text"
              id="subbox1"
              className="enews-subbox enews-fname border p-2 flex-2 mr-2 focus:outline-none focus:ring-1 focus:ring-black active:border-1 transition ease-in-out"
              aria-label="First Name"
              placeholder="First Name"
              name="FNAME"
            ></input>
            <input
              type="email"
              id="subbox"
              className="enews-subbox enews-fname border p-2 flex-2 mr-2 focus:outline-none focus:ring-1 focus:ring-black active:border-1 transition ease-in-out"
              aria-label="E-Mail Address"
              placeholder="E-Mail Address "
              name="EMAIL"
              required="required"
            ></input>
            <input
              type="submit"
              value="I'M IN!"
              id="subbutton"
              className="enews-submit border p-2 flex-1 cursor-pointer hover:text-white hover:bg-partyBlue transition ease-in-out"
            ></input>
          </form>
        </div>
      </div>
      <div className="flex-col flex min-w-960:flex-row min-w-960:justify-between max-w-960:max-w-[800px] min-w-960:max-w-[960px] min-w-1200:max-w-[1280px]  mx-auto">
        <main className="flex min-h-screen flex-col items-center justify-between w-full   max-w-960:max-w-full min-w-960:max-w-[660px]  min-w-1200:max-w-[795px] min-w-1280:max-w-[860px]">
          <div className="max-w-1280:p-[20px] min-w-1280:p-[30px]  pt-0 ">
            <h4 className="w-full pl-[30px] py-[10px] mb-[20px] uppercase border-l-[15px] border-[lightYellow] font-normal">
              Recent Posts
            </h4>
            <article key={sticky.id} className="w-full mb-[30px]">
              <header>
                <Link href={sticky.slug}>
                  <Image
                    className="mb-[24px]"
                    width={
                      sticky.featuredImage.node.mediaDetails.sizes[7].width
                    }
                    height={
                      sticky.featuredImage.node.mediaDetails.sizes[7].height
                    }
                    alt={sticky.featuredImage.node.altText}
                    src={
                      sticky.featuredImage.node.mediaDetails.sizes[7].sourceUrl
                    }
                  ></Image>
                </Link>
                <h2 className={`text-3xl mb-[15px] ${playfair.className}`}>
                  {sticky.title}
                </h2>

                <ul className="flex flex-wrap  uppercase text-[12px] font-medium mb-[10px] ">
                  {sticky.categories.edges.map((category, i) => {
                    const isLastItem = i === sticky.categories.edges.length - 1;

                    return (
                      <li
                        className={`text-partyBlue hover:text-default transition ease-in-out cursor-pointer ${
                          isLastItem
                            ? ""
                            : "after:content-[\\00B7] after:mr-[3px]"
                        }`}
                        key={category.node.id}
                      >
                        {category.node.name}
                        {!isLastItem && (
                          <span className="ml-1 text-gray-400">&#183;</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </header>
              <div className="mb-[28px]">
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                />
                <Link
                  className="underline text-lightBlue underline-offset-8 my-[20px] uppercase text-[12px] inline-block"
                  href={sticky.slug}
                >
                  {"Read More > "}
                </Link>
              </div>
            </article>
            {/* Recent Posts */}
            <div className="flex flex-col md:grid grid-cols-2 gap-x-4 gap-y-[30px]">
              {props.postListing.map((post, i) => {
                let excerpt = post.node.excerpt;
                // console.log(post.node.featuredImage.node.mediaDetails.sizes);
                excerpt = excerpt.substring(0, excerpt.indexOf("<a href"));

                let image =
                  post.node.featuredImage.node.mediaDetails.sizes.find(
                    (obj) => obj.height === "600"
                  );

                return (
                  <article key={post.node.id}>
                    <header>
                      <div>
                        <Link href={post.node.slug}>
                          <Image
                            className="mb-[24px]"
                            src={image.sourceUrl}
                            width={image.width}
                            height={image.height}
                            alt={post.node.title}
                          ></Image>
                        </Link>
                        <Link href={post.node.slug}>
                          <h2
                            className={`text-3xl mb-[15px] ${playfair.className}`}
                          >
                            {post.node.title}
                          </h2>
                        </Link>
                        <ul className="flex flex-wrap  uppercase text-[12px] font-medium mb-[10px] ">
                          {post.node.categories.edges.map((category, i) => {
                            const isLastItem =
                              i === post.node.categories.edges.length - 1;

                            return (
                              <li
                                className={`text-partyBlue hover:text-default transition ease-in-out cursor-pointer ${
                                  isLastItem
                                    ? ""
                                    : "after:content-[\\00B7] after:mr-[3px]"
                                }`}
                                key={category.node.id}
                              >
                                {category.node.name}
                                {!isLastItem && (
                                  <span className="ml-1 text-gray-400">
                                    &#183;
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </header>
                    <div className="mb-[28px]">
                      <div
                        className=""
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                      />
                      <Link
                        className="underline text-lightBlue underline-offset-8 my-[20px] uppercase text-[12px] inline-block"
                        href={post.node.slug}
                      >
                        {"Read More > "}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {props.frontPageCategorySections.map((section, i) => {
              return (
                <div key={`${section.category.id}`} className="mb-[30px]">
                  <h4 className="w-full pl-[30px] py-[10px] mb-[20px] uppercase border-l-[15px] border-[lightYellow] font-normal">
                    {section.title}
                  </h4>
                  <div className="flex flex-col sm:grid grid-cols-3 grid-row-2 gap-4">
                    {section.category.posts.nodes.map((post, i) => {
                      let excerpt = post.excerpt;
                      excerpt = excerpt.substring(
                        0,
                        excerpt.indexOf("<a href")
                      );
                      excerpt = excerpt.substr(0, 100);
                      let lastSpace = excerpt.lastIndexOf(" ");
                      if (lastSpace > 0) {
                        // If there's at least one space, cut at the last one
                        excerpt = excerpt.substr(0, lastSpace);
                      }
                      excerpt += " ...";
                      return (
                        <article key={post.id} className="pb-[24px] mb-[20px]">
                          <Link href={post.slug}>
                            <Image
                              src={
                                post.featuredImage.node.mediaDetails.sizes[5]
                                  .sourceUrl
                              }
                              alt={post.featuredImage.node.altText}
                              width="0"
                              height="0"
                              className="w-full h-auto"
                              sizes="(max-width: 400px) 100vw, 400px"
                            ></Image>
                          </Link>
                          <h4
                            className={`text-2xl mb-[15px] ${playfair.className}`}
                          >
                            {post.title}
                          </h4>
                          <div className="mb-[28px]">
                            <div
                              className=""
                              dangerouslySetInnerHTML={{ __html: excerpt }}
                            />
                            <Link
                              className="underline text-lightBlue underline-offset-8 my-[20px] uppercase text-[12px] inline-block"
                              href={post.slug}
                            >
                              {"Read More > "}
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <Sidebar props={sideBarData}></Sidebar>
      </div>
    </>
  );
}
