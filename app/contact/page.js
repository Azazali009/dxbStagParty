import ContactHero from "../_components/ContactHero";
import ContactSection from "../_components/ContactSection";
import StagConfidenceSection from "../_components/StagConfidenceSection";

// meta data
export const metadata = {
  title: "DXB Stag Party - Contact",
  description:
    "Get in touch with DXB Stag Party for bookings, inquiries, or support. We’re here to help you plan the perfect Dubai experience.",
};

export default function Page() {
  return (
    <div>
      <ContactHero />
      <ContactSection />
      <StagConfidenceSection />
    </div>
  );
}
