import WhatsAppButton from "@/app/component/WhatsAppButton";
import ContactForm from "../component/ContactForm";
import ContactInfo from "../component/ContactInfo";



export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulaire de contact */}
        <ContactForm />

        {/* Informations de contact */}
        <ContactInfo />
        <WhatsAppButton/>
      </div>
    </div>
  );
}
