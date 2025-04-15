import Image from "next/image";
import { cinzel } from "../layout";
import clock from "../svgIcons/clock.svg";
import includes from "../svgIcons/includes.svg";
import user from "../svgIcons/user.svg";
import ActivityBanner from "./ActivityBanner";
export default function ActivityDetails({ activity }) {
  const {
    id,
    name,
    price,
    image,
    duration,
    minAge,
    destinations,
    description,
  } = activity;
  return (
    <>
      {/* header image banner */}
      <ActivityBanner activity={activity} />
      {/* overview section */}
      <section className="border-navyBlue mx-auto grid w-[95%] max-w-7xl grid-cols-1 items-center justify-items-center gap-8 border-b py-14 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className={`${cinzel.className} text-4xl font-bold uppercase`}>
            Overview
          </h2>
          <p className={`leading-[1.9]`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ab
            eveniet et nam totam officia iusto. Quo ipsam minus placeat est
            obcaecati! Quas, earum sed placeat minima blanditiis sint fuga ullam
            ab ducimus velit, nam natus itaque voluptatum recusandae
            repellendus, ut dignissimos eum autem! Inventore autem molestiae
            consequatur explicabo facere.
          </p>
        </div>
        <Image
          src={"/images/food.jpg"}
          width={500}
          height={500}
          alt="food image"
          className="aspect-square h-[320px] object-cover"
        />
      </section>
      {/* details section */}
      <section className="mx-auto w-[95%] max-w-7xl space-y-8 py-14">
        <h2 className={`${cinzel.className} text-4xl font-bold uppercase`}>
          details
        </h2>
        <div className="grid grid-cols-3 justify-items-start gap-6">
          {/* duration box */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Image src={clock} height={25} width={25} alt="clock" />
              <span className="text-matalicGold text-xl font-semibold uppercase">
                Duration
              </span>
            </div>
            <p>3 hour</p>
          </div>
          {/* Group size box */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Image src={user} height={25} width={25} alt="clock" />
              <span className="text-matalicGold text-xl font-semibold uppercase">
                Group size
              </span>
            </div>
            <p>4-20 people</p>
          </div>
          {/* includes box */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Image src={includes} height={25} width={25} alt="clock" />
              <span className="text-matalicGold text-xl font-semibold uppercase">
                includes
              </span>
            </div>
            <p>Multi-course buffet</p>
          </div>
        </div>
      </section>
    </>
  );
}
