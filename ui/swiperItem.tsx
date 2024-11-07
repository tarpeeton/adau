"use client"
import { FC, useState, useEffect, useRef } from 'react'
import { GrLinkNext } from "react-icons/gr"
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'



export interface ImageItem {
    url: StaticImageData
}
import { DataItem } from '@/components/Projects/Work'
import { Swiper, SwiperSlide } from 'swiper/react'

import { GrLinkPrevious } from "react-icons/gr"
import { Swiper as SwiperCore } from 'swiper/types' // импортируем тип SwiperCore


interface SwiperItemProps {
    item: DataItem,
    width: string
}



export const SwiperItem: FC<SwiperItemProps> = ({ item , width }) => {
    // Локальные состояния и ссылки для каждого Swiper
    const [activeIndex, setActiveIndex] = useState(0)
    const swiperRef = useRef<SwiperCore | null>(null)

    const handleSlideChange = (swiper: SwiperCore) => {
        setActiveIndex(swiper.realIndex)
    }

    const handlePrev = () => swiperRef.current?.slidePrev()
    const handleNext = () => swiperRef.current?.slideNext()

    return (
        <div className={`2xl:w-[${width}] 2xl:mt-[40px] `}>
            <div className='relative '>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={handleSlideChange}
                    speed={800}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    loop={false}
                >
                    {item?.images?.map((image: ImageItem, index: number) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={image.url}
                                alt='One'
                                width={710}
                                height={500}
                                quality={100}
                                className='h-[220px] 2xl:h-[450px] 4xl:h-[500px] object-cover w-full '
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='absolute bottom-[20px] left-1/2 transform -translate-x-1/2 z-[99] flex items-center gap-[15px] justify-center'>
                    {item.images.map((_: ImageItem, i: number) => (
                        <div
                            key={i}
                            className={`w-[25px] h-[3px] ${i === activeIndex ? 'bg-white' : 'bg-inherit backdrop-blur-[15px]'}`}
                        ></div>
                    ))}
                </div>
                <div className='absolute w-[90%] bottom-[80px] 2xl:w-[95%] 2xl:bottom-[200px] justify-between left-1/2 transform -translate-x-1/2 z-[99] flex items-center gap-[15px]'>
                    <button onClick={handlePrev} className='flex items-center justify-center rounded-full w-[40px] h-[40px] 2xl:w-[60px] 2xl:h-[60px] border border-[#FFFFFF] bg-titleWhite'>
                        <GrLinkPrevious className='w-[15px] h-[15px] 2xl:w-[20px] 2xl:h-[20px] text-[#222E51]' />
                    </button>
                    <button onClick={handleNext} className='flex items-center justify-center rounded-full w-[40px] h-[40px] 2xl:w-[60px] 2xl:h-[60px] border border-[#FFFFFF] bg-white'>
                        <GrLinkNext className='w-[15px] h-[15px] 2xl:w-[20px] 2xl:h-[20px] text-[#222E51]' />
                    </button>
                </div>
            </div>
            <div className='mt-[20px] 2xl:mt-[25px]'>
                <p className='text-[20px] leading-[28.9px] font-jost font-medium 2xl:text-[35px] 2xl:leading-[]'>{item.title}</p>
                <p className='text-[15px] text-[#414141] font-jost leading-[18px] 2xl:text-[20px] 2xl:leading-[24px] 2xl:w-[70%] 2xl:mt-[8px]'>{item.description}</p>
                <Link href='/cases/slug' className='mt-[10px] 2xl:mt-[20px] flex items-center gap-[5px] text-[16px] leading-6 font-medium font-jost text-[#222E51] 2xl:text-[20px] 2xl:leading-6'>
                    Подробнее
                    <GrLinkNext />
                </Link>
            </div>
        </div>
    )
}
