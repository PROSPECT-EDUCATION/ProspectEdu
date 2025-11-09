import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import itCourse1 from "../assets/video.png";
import itCourse2 from "../assets/video.png";
import lawCourse from "../assets/video.png";
import electricalCourse1 from "../assets/video.png";
import electricalCourse2 from "../assets/video.png";

export default function PopularCourses() {
  const courses = [
    {
      title: "PG Programme in Quantity Surveying & Contract Management",
      category: "Information Technology",
      img: itCourse1,
      mode: "Online | Working Professionals",
    },
    {
      title: "PG Programme in Project Management for Working Professionals",
      category: "Information Technology",
      img: itCourse2,
      mode: "Online | Professional Level",
    },
    {
      title: "PG Programme in Construction Management for Working Professionals",
      category: "Information Technology",
      img: itCourse1,
      mode: "Hybrid | Weekend Classes",
    },
    {
      title: "Law Internship Programme",
      category: "Law",
      img: lawCourse,
      mode: "Offline / Online | 6 Weeks",
    },
    {
      title: "Electrical System Design & Drafting",
      category: "Electrical",
      img: electricalCourse1,
      mode: "Online | Beginner to Advanced",
    },
    {
      title: "Power Distribution & Control Systems",
      category: "Electrical",
      img: electricalCourse2,
      mode: "Offline | Industrial Training",
    },
  ];

  return (
    <section className="w-full bg-[#F9FAFB] py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-heading font-semibold text-[#124734] mb-8">
          Popular Courses
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-[#A7E1B2] rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-[1.03] h-[370px] flex flex-col">
                {/* Image */}
                <img
                  src={course.img}
                  alt={course.title}
                  className="rounded-t-xl w-full h-48 object-cover"
                />

                {/* Text */}
                <div className="p-4 flex flex-col flex-grow text-left">
                  <h3 className="font-heading text-base font-semibold text-[#124734] mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#5B7065] font-body">
                    {course.category} • {course.mode}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Button */}
        <button className="mt-8 px-8 py-3 rounded-full border border-[#009846] text-[#009846] text-lg font-medium hover:bg-[#009846] hover:text-white transition-all duration-300">
          Explore Courses
        </button>
      </div>

      {/* Swiper Styling Fixes */}
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
