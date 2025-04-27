import React from "react";
import ContactContentBox from "./ContactContentBox";
import ContactForm from "./ContactForm";
export default function ContactSection() {
  return (
    <section
      id="enquire"
      className="grid h-[800px] min-h-screen grid-cols-1 bg-[url('/images/contact-form-bg.webp')] bg-cover bg-no-repeat md:grid-cols-2"
    >
      <ContactContentBox />
      <ContactForm />
    </section>
  );
}
