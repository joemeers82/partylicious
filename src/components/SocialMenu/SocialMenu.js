import { AiOutlineMail, AiOutlineFacebook } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";

export default function SocialMenu() {
  return (
    <>
      <ul className="flex gap-3">
        <li className="cursor-pointer transition ease-in-out  hover:text-lightBlue">
          <AiOutlineMail />
        </li>
        <li className="cursor-pointer transition ease-in-out  hover:text-lightBlue">
          <FaFacebookF />
        </li>
        <li className="cursor-pointer transition ease-in-out  hover:text-lightBlue">
          <FaInstagram />
        </li>
        <li className="cursor-pointer transition ease-in-out  hover:text-lightBlue">
          <FaPinterestP />
        </li>
      </ul>
    </>
  );
}
