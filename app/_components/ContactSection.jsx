import React from "react";
import ContactContentBox from "./ContactContentBox";
import ContactForm from "./ContactForm";
export default function ContactSection() {
  return (
    <section
      id="enquire"
      className="relative z-20 grid h-full min-h-[800px] grid-cols-1 gap-0 bg-[url('/images/contact-form-bg.webp')] bg-cover bg-no-repeat md:grid-cols-2"
    >
      <ContactContentBox />
      <ContactForm />
    </section>
  );
}
