'use client'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
export default function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow className="next-arrow" style={{}} onClick={() => {}} />,
        // prevArrow: <SamplePrevArrow />,
        prevArrow: <SamplePrevArrow className="prev-arrow" style={{}} onClick={() => {}} />,
    }
    interface SampleArrowProps {
        className: string
        style: React.CSSProperties
        onClick: () => void
    }

    function SampleNextArrow(props: SampleArrowProps) {
        const { className, style, onClick } = props
        return (
            <div
                className={className}
                style={{
                    right: '10px',
                    transform: 'scale(1.5)',
                    borderRadius: '999px',
                }}
                onClick={onClick}
            />
        )
    }

    interface SamplePrevArrowProps {
        className: string
        style: React.CSSProperties
        onClick: () => void
    }

    function SamplePrevArrow(props: SamplePrevArrowProps) {
        const { className, style, onClick } = props
        return (
            <div
                className={className}
                style={{
                    // position: 'absolute',
                    left: '10px',
                    transform: 'scale(1.5)',
                    borderRadius: '999px',
                    zIndex: 10,
                }}
                onClick={onClick}
            />
        )
    }
    return (
        <div className="w-full 	md:gap-3 flex flex-row">
            <div className="w-full md:w-4/5">
                <Slider {...settings}>
                    <div>
                        <Image alt="Banner" src="/banner.png" width={1000} height={150} layout="responsive" />
                    </div>
                    <div>
                        <Image
                            alt="Banner"
                            src="/banner2.webp"
                            width={1000}
                            height={150}
                            layout="responsive"
                            className="rounded-lg md:rounded-xl"
                        />
                    </div>
                    <div>
                        <Image
                            alt="Banner"
                            src="/banner3.webp"
                            width={1000}
                            height={150}
                            layout="responsive"
                            className="rounded-lg md:rounded-xl"
                        />
                    </div>
                </Slider>
            </div>
            <div className="hidden w-1/5 md:flex flex-col justify-between items-end">
                <Image
                    alt="Banner"
                    src="/banner-1.png"
                    width={150}
                    height={150}
                    className="transition-transform duration-300 hover:scale-90"
                />
                <Image
                    alt="Banner"
                    src="/banner-2.png"
                    width={150}
                    height={150}
                    className="transition-transform duration-300 hover:scale-90"
                />
            </div>
            <div className="col-start-1 md:col-span-5 col-span-6 flex flex-row"></div>
        </div>
    )
}
