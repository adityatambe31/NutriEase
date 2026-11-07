import { Hero } from "@/components/home/Hero";
import { SectionTitle } from "@/components/home/SectionTitle";
import { Benefits } from "@/components/home/Benefits";
import { Video } from "@/components/home/Video";
import { ContactForm } from "@/components/home/Contact";
import { hero, section, benefit, video, contact } from "@/config/landing-page";

export default async function Home() {
  const { heading, subHeading, description, button } = hero[0];
  return (
    <>
      <Hero
        heading={heading}
        subHeading={subHeading}
        description={description}
        button={button}
      />
      <SectionTitle preTitle={section[0].preTitle} title={section[0].title}>
        {section[0].content}
      </SectionTitle>
      <Benefits data={benefit[0]} />
      <Benefits imgPos="right" data={benefit[1]} />
      <SectionTitle preTitle={section[1].pretitle} title={section[1].title}>
        {section[1].content}
      </SectionTitle>
      <Video data={video[0]} />
      <SectionTitle preTitle={section[2].pretitle} title={section[2].title}>
        {section[2].content}
      </SectionTitle>
      <ContactForm data={{ contact }} />
    </>
  );
}
