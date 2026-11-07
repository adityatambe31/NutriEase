import ContactForm from "@/components/layout/contact-form";

export default function Contact() {
  return (
    <div className="w-full">
      {/* Hero Section with improved styling */}
      <div className="relative w-full h-[45vh] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url(/LandingBG.jpg)",
            filter: "brightness(0.8)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            Contact Us
          </h1>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-xl mx-auto">
            Have questions or feedback? We&apos;d love to hear from you.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <ContactForm />
      </div>
    </div>
  );
}
