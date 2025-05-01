import { cinzel } from "../layout";
import ExperienceHorizantalCard from "./ExperienceHorizantalCard";

export default function HomeEpicExperiences() {
  return (
    <section className="mx-auto w-[95%] space-y-12 py-20">
      <h2
        className={`${cinzel.className} text-center text-2xl font-bold capitalize text-matalicGold sm:text-4xl`}
      >
        Epic stag experiences
      </h2>
      <ExperienceHorizantalCard />
    </section>
  );
}
