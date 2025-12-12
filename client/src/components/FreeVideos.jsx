import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 🎥 Import your video thumbnails
import itVideo from "../assets/video.png";
import lawVideo from "../assets/video.png";
import electricalVideo from "../assets/video.png";
import aiVideo from "../assets/video.png";
import renewableVideo from "../assets/video.png";

export default function FreeVideos() {
  const videos = [
    {
      title: "Introduction to Java Programming",
      subtitle: "Learn Java fundamentals for backend development.",
      img: itVideo,
      category: "Information Technology",
    },
    {
      title: "Basics of Contract Law",
      subtitle: "Understand legal contracts, clauses, and structure.",
      img: lawVideo,
      category: "Law",
    },
    {
      title: "Fundamentals of Electrical Circuits",
      subtitle: "Learn the basics of voltage, current, and resistance.",
      img: electricalVideo,
      category: "Electrical",
    },
    {
      title: "AI & Machine Learning Simplified",
      subtitle: "Get started with AI using simple real-world examples.",
      img: aiVideo,
      category: "Information Technology",
    },
    {
      title: "Renewable Energy Systems Overview",
      subtitle: "Explore the basics of solar, wind, and hydro systems.",
      img: renewableVideo,
      category: "Electrical",
    },
  ];

  return (
    <section className="w-full bg-[#F9FAFB] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-heading font-semibold text-[#124734] mb-8">
          Free Videos
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-[#A7E1B2] rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-[1.03] overflow-hidden">
                <div className="relative">
                  <img
                    src={video.img}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition">
                    <div className="w-12 h-12 bg-white text-[#009846] rounded-full flex items-center justify-center text-xl font-bold">
                      ▶
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="p-4">
                  <h3 className="font-heading text-base font-semibold text-[#124734] mb-1 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-[#5B7065] font-body line-clamp-2">
                    {video.subtitle}
                  </p>
                  <p className="text-xs text-[#009846] font-semibold mt-2">
                    {video.category}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper Custom Styling */}
      <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #009846 !important;
          background: #A7E1B2;
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: #009846;
          color: white !important;
        }
        .swiper-pagination-bullet {
          background: #A7E1B2;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #009846;
        }
      `}</style>
    </section>
  );
}
