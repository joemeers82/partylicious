import Image from "next/image";
import homePageContent from "../../lib/queries/FrontPageQuery";
import FrontPage from "@/components/FrontPage/FrontPage";

export default async function Home() {
  const data = await homePageContent();

  return (
    <>
      <FrontPage className="" props={data}></FrontPage>
    </>
  );
}
