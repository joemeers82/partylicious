"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import WebStory from "./WebStory";
// import { useSingleWebStory } from "../../../lib/queries/WebStoryQuery";

export default function WebStories({ webStories }) {
  // console.log("webStories");
  console.log(webStories);
  const [startIndex, setStartIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [storyId, setStoryId] = useState("cG9zdDoxMTE4Nw==");
  const [showWebStory, setShowWebStory] = useState(false);
  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 3 < webStories.length ? prevIndex + 3 : 0
    );
    setShowLeftArrow(true);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - 3 >= 0 ? prevIndex - 3 : webStories.length - 3
    );
    setShowLeftArrow(false);
  };
  // const { data, loading, error } = useSingleWebStory(storyId);
  const previewStory = async (id) => {
    console.log(id);
    // setStoryId(id);
    // setShowWebStory(true);
    // console.log(data);
    // alert(id);
  };

  const visibleWebStories = webStories.slice(startIndex, startIndex + 3);

  return (
    <>
      <div className="pb-[30px] px-[30px] border border-transparent">
        <h3 className="relative p-[10px] mb-[20px] after:content-['*] after:absolute after:bg-partyYellow after:left-[0] after:right-[0] after:top-[60%] after:h-3 after:z-[-1]">
          Web Stories
        </h3>
        <ul
          className={`flex-col flex min-w-680:flex-row relative  my-8 w-[300px] `}
        >
          {showLeftArrow && (
            <li className="absolute left-0 top-7 z-10 max-w-680:hidden">
              <button
                onClick={handlePrev}
                className="w-[30px] h-[30px] rounded-full bg-white border border-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-left"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            </li>
          )}
          {visibleWebStories.map((story, i) => {
            // console.log(story.node.featuredImage.node.mediaDetails.sizes);
            let image = story.node.featuredImage.node.mediaDetails.sizes.find(
              (obj) => obj.width === "150"
            );
            return (
              <li
                key={story.node.id}
                className="cursor-pointer relative w-[100px] ml-1 h-[100px]"
                onClick={() => previewStory(story.node.id)}
              >
                <Image
                  className="rounded-full border border-3 p-1"
                  src={image.sourceUrl}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 100px) 100%, 100px"
                  // width={image.width}
                  // height={image.height}
                  alt={story.node.title}
                ></Image>
              </li>
            );
          })}
          {!showLeftArrow && (
            <li className="absolute right-0 top-7 max-w-680:hidden">
              <button
                onClick={handleNext}
                className="w-[30px] h-[30px] rounded-full  bg-white border border-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </li>
          )}
        </ul>
      </div>
      {showWebStory && <WebStory id={storyId} />}
    </>
  );
}
