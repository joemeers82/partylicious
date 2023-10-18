// "use client";
// import { useSearchParams } from "next/navigation";
import { getSinglePost } from "../../../lib/queries/PostsQuery";
import Sidebar from "@/components/Sidebar/Sidebar";
import Link from "next/link";
import parse from "html-react-parser";
import Image from "next/image";
export default async function Post({ params }) {
  const post = await getSinglePost(params.slug);
  let isFirstImage = true;

  const replaceImage = {
    replace: ({ name, attribs, children }) => {
      if (name === "figure" && /wp-block-image/.test(attribs.class)) {
        return <div>{domToReact(children, replaceImage)}</div>;
      }
      if (name === "img") {
        const imageProps = isFirstImage
          ? { loading: "eager" }
          : { loading: "lazy" };

        if (isFirstImage) isFirstImage = false;

        return (
          <Image
            src={attribs.src}
            width={attribs.width}
            height={attribs.height}
            alt={attribs.alt ? attribs.alt : "Blog post image"}
            {...imageProps}
          />
        );
      }
    },
  };

  // Parsing the content
  const parsedContent = parse(post.post.content, replaceImage);

  return (
    <>
      <div className="flex-col flex min-w-960:flex-row min-w-960:justify-between max-w-960:max-w-[800px] min-w-960:max-w-[960px] min-w-1200:max-w-[1280px] mx-auto">
        <main className="flex min-h-screen flex-col items-center justify-between w-full max-w-960:max-w-full min-w-960:max-w-[660px] min-w-1200:max-w-[795px] min-w-1280:max-w-[860px]">
          <div className="border border-red-300">
            {parsedContent} {/* Render the parsed content directly */}
          </div>
        </main>
        <Sidebar />
      </div>
    </>
  );
}
