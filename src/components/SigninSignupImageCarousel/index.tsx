"use client";

import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { Carousel } from "antd";

const images = ["/svgs/image1.png", "/svgs/image2.png", "/svgs/image3.png"];

const ImageCarousel = () => {
  const router = useRouter();

  return (
    <div className="relative lg:block hidden">
      <Carousel autoplay>
        {images.map((src, index) => (
          <div key={index}>
            <div className="relative">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                height={1200}
                width={660}
                className="min-h-[90vh] md:block hidden max-h-auto object-cover"
              />
              <div className="absolute top-8 left-8">
                <div>
                  <Image
                    src="/svgs/logo-white.svg"
                    alt="Logo"
                    height={26}
                    width={113}
                  />
                </div>
              </div>
              <div className="absolute top-8 right-8">
                <Button
                  onClick={() => router.push("/")}
                  className="rounded-full h-[36px] bg-[#434a51] text-sm font-normal text-white px-4 py-2"
                >
                  <span className="flex gap-2 justify-center items-center">
                    Back to website{" "}
                    <Image
                      src="/svgs/Arrow-right.svg"
                      alt="Arrow"
                      height={14}
                      width={14}
                    />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
