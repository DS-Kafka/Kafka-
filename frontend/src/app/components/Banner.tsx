import Image from 'next/image'

export default function Banner() {
    return (
        <div className="w-full grid grid-cols-6	md:gap-3">
            <Image
                alt="Banner"
                src="/banner.png"
                width={1000}
                height={150}
                className="col-start-1 md:col-span-5 col-span-6"
            />
            <div className="hidden col-end-7 col-span-1 md:flex flex-col justify-between items-end">
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
        </div>
    )
}
