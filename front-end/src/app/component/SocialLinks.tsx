"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex space-x-4 mt-4">
      <a href="#" className="text-gray-600 hover:text-purple-600 transition">
        <FaFacebookF />
      </a>
      <a href="#" className="text-gray-600 hover:text-purple-600 transition">
        <FaTwitter />
      </a>
      <a href="#" className="text-gray-600 hover:text-purple-600 transition">
        <FaInstagram />
      </a>
      <a href="#" className="text-gray-600 hover:text-purple-600 transition">
        <FaLinkedinIn />
      </a>
    </div>
  );
}
