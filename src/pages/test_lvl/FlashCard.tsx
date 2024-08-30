import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Quizz } from "../../interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper"

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FlashCard = () => {
  const { quiz } = useOutletContext<{ quiz: Quizz }>();
  const [showDefinition, setShowDefinition] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef(null);

  const handleNext = () => {
    // if (swiperRef.current) {
      swiperRef.current?.slideNext();
    // }
    setShowDefinition(false)
  };

  const handlePrev = () => {
    // if (swiperRef.current) {
      swiperRef.current?.slidePrev();
    // }
    setShowDefinition(false)
  };

  const toggleShowDefinition = () => {
    setShowDefinition(!showDefinition);
  };
  return (
    <div className='flashcard-container'>
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={{
          el: ".custom_pagination",
          type: "fraction",
          clickable: true,
          renderFraction: (currentClass, totalClass) => {
            return `
              <span class="${currentClass} custom-fraction-current"></span>
              <span class="custom-fraction-current">/</span>
              <span class="${totalClass} custom-fraction-current"></span>`;
          },
        }}
        navigation={false}
        modules={[Navigation, EffectFlip, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Set the swiper instance to the ref
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        // ref={swiperRef}
        className='mySwiper container'
      >
        {quiz.questions.map((question, index) => (
          <SwiperSlide key={index}>
            <div
              className={`flashcard ${showDefinition ? "flipped" : ""}`}
              onClick={toggleShowDefinition}
            >
              <div className='flashcard-front'>
                <p className='flashcardTitle'>{question.term}</p>
              </div>
              <div className='flashcard-back'>
                <p className='flashcardTitle'>{question.defination}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='flashcard_botttom'>
        <div
          onClick={handlePrev}
          className={activeIndex === 0 ? "custom_prev" : "custom_prev active"}
        >
          <FaArrowLeft />
        </div>
        <div className='custom_pagination'></div>
        <div
          onClick={handleNext}
          className={activeIndex === quiz.questions.length - 1 ? `custom_next` : "custom_next active"}
        >
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
