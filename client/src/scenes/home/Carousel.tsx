import "./carousel.styles.css";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useMediaQuery from "@/hook/useMediaQuery";

// import all the images in the assets folder
// remember there only should be images that uses in the carousel
// image naming pattern in the folder is - image-[number].jpeg
const images = import.meta.glob("@/assets/*.jpeg");
type ImageList = {
  [key: string]: string;
};
const imageList: ImageList = {};
for (const path in images) {
  // removes all the parts from the path to get the image name
  const imageName = path
    .replace("/src/assets/", "")
    .replace(".jpeg", "")
    .replace("-", "");

  imageList[imageName] = path;
}

// --------------------------------------------------------------------

type Props = {};

const Carousel = (props: Props) => {
  const imagePaths = Object.values(imageList);

  const isNotMobile = useMediaQuery("(min-width: 600px)");

  const FIRST_SLIDE = 0;
  const LAST_SLIDE = imagePaths.length - 1;
  const [currentSlide, setCurrentSlide] = useState(FIRST_SLIDE);

  const handleNext = () =>
    setCurrentSlide(
      currentSlide === LAST_SLIDE ? FIRST_SLIDE : currentSlide + 1
    );

  const handlePrev = () =>
    setCurrentSlide(
      currentSlide === FIRST_SLIDE ? LAST_SLIDE : currentSlide - 1
    );

  return (
    <div className="carousel">
      <div
        className="carousel__slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {imagePaths.map((imagePath, index) => (
          <div className="carousel__image--container" key={`carousel-${index}`}>
            <img
              src={imagePath}
              className="carousel__image"
              alt={`carousel-${index}`}
            />

            <div
              className="carousel__message"
              style={{
                left: isNotMobile ? "10%" : "0",
                right: isNotMobile ? undefined : "0",
                margin: isNotMobile ? undefined : "0 auto",
                maxWidth: isNotMobile ? undefined : "250px",
              }}
            >
              <p>--NEW ITEMS</p>
              <h1>Summer Sale</h1>
              <p>Discover More</p>
            </div>
          </div>
        ))}
      </div>
      {/*  NAVIGATION BUTTONS  */}
      <div className="carousel__buttons">
        {/* PREV BUTTON */}
        <button className="carousel__button" onClick={handlePrev}>
          <ChevronLeftIcon className="carousel__button--icon" />
        </button>
        {/* NEXT BUTTON */}
        <button className="carousel__button" onClick={handleNext}>
          <ChevronRightIcon className="carousel__button--icon" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
