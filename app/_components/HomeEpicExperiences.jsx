import { getActivity } from "../_lib/data-services";
import { cinzel } from "../layout";
import ExperienceHorizantalCard from "./ExperienceHorizantalCard";

export default async function HomeEpicExperiences() {
  // const desertBuggy = await getActivity(26)
  // const skyDiving = await getActivity(80)
  // const privateChef = await getActivity(34)
  const [desertBuggy, skyDiving, privateChef] = await Promise.all([
    getActivity("desert-dune-buggy-adventure"),
    getActivity("sky-diving-over-the-palm"),
    getActivity("private-chef-dinner"),
  ]);

  return (
    <section className="mx-auto w-[95%] space-y-12 py-10 sm:py-20">
      <h2
        className={`${cinzel.className} text-center text-2xl font-bold capitalize text-matalicGold sm:text-4xl`}
      >
        Epic stag experiences
      </h2>
      <ExperienceHorizantalCard
        desertBuggy={desertBuggy}
        skyDiving={skyDiving}
        privateChef={privateChef}
      />
    </section>
  );
}
