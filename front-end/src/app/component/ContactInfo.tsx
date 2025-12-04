import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import SocialLinks from "./SocialLinks";

export default function ContactInfo() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Où nous trouver</h2>

      <div className="space-y-4 text-gray-700">
        <div className="flex items-start space-x-3">
          <FaMapMarkerAlt className="text-purple-500 mt-1" />
          <p>
            <strong>Notre Bureau</strong><br />
             Route de Didier, 97200 Fort-de-France
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <FaPhoneAlt className="text-purple-500" />
          <p> +33 7 52 94 45 69 </p>
        </div>

        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-purple-500" />
          <p>contact@wegovy-mounjaro.fr</p>
        </div>
      </div>

      <h3 className="text-lg font-medium mt-6">Suivez-nous</h3>
      <SocialLinks />
    </div>
  );
}
