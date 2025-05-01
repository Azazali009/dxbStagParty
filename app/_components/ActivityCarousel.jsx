"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ActivityCard from "./ActivityCard";

export default function ActivityCarousel({ Activities }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true}
      infinite={true}
      //   autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="transform 700ms ease-in-out"
      transitionDuration={700}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="px-3" // ✅ horizontal gap between items
      className="[grid-column:1/-1]"
    >
      {Activities?.slice(0, 4)?.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </Carousel>
  );
}
