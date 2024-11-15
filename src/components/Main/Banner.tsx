"use client"
import { FC, useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiperNavigation from '@/hooks/useSwiperNavigation'

// import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

import { client } from "@/sanity/lib/client"
import { urlFor } from '@/sanity/lib/image'


import { GrLinkNext } from "react-icons/gr"
import { GrLinkPrevious } from "react-icons/gr"
import useLocale from '@/hooks/useLocale'


interface IMainBanner {
    title: {
        ru: string;
        uz: string;
        en: string;
    };
    description: {
        ru: string;
        uz: string;
        en: string;
    };
    _id: string;
    image: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    };
}


const Banner: FC = () => {
    const { swiperRef, handlePrev, handleNext } = useSwiperNavigation()
    const [banner, setBanner] = useState<IMainBanner[] | []>([])
    const locale = useLocale()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const banner = await client.fetch(
                    `*[_type == "banner"]{
              description , image , title , _id}`
                )
                setBanner(banner)
            } catch (error) {
                console.debug(error)
            }
        }
        fetchData()
    }, [])


    return (
        <div className="banner-container px-[20px] 4xl:px-[240px] 2xl:px-[50px] mt-[15px] 2xl:mt-[60px] relative">
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={10}
                slidesPerView={1}
                speed={1000}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={false}
            >

                {banner?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex flex-col '>
                            <div className='flex flex-col 2xl:flex-row'>
                                <div className='mb-[12px] 2xl:w-[60%]'>
                                    <p className='text-titleDark 2xl:text-[50px] 2xl:leading-[62px] font-jost text-[26px] leading-[32px]'>{item.title[locale]}</p>
                                </div>
                                <div className='flex flex-col mb-[25px] 2xl:mb-[40px] 2xl:w-[30%]'>
                                    <p className='mb-[20px] 2xl:mb-[30px] text-[15px] 2xl:text-[20px] leading-[18px] 2xl:leading-[28.9px] font-jost'>{item.description[locale]}</p>
                                    <div className='flex flex-row gap-[10px]'>
                                        <button className='buttonBlue'>
                                            Вступить в ассоциацию
                                        </button>
                                        <button className='borderedButton'>
                                            Стать партнером
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-[25px] 2xl:mt-[40px] 4xl:mt-[60px]'>
                                {item?.image?.asset?._ref && (
                                    <Image
                                    src={urlFor(item.image.asset._ref).url() || ''}
                                    alt=''
                                    width={1440}
                                    height={444}
                                    quality={100}
                                    className='2xl:h-[444px] h-[370px] rounded-[10px]'
                                />
                                
                                )}
                                
                            </div>
                        </div>
                    </SwiperSlide>
                ))}


            </Swiper>

            <div className='absolute bottom-[20px] 4xl:right-[260px] right-[30px] 2xl:right-[70px] z-[99] flex items-center gap-[15px]'>
                <button onClick={handlePrev} className='flex items-center justify-center rounded-full w-[70px] h-[70px] border border-[#FFFFFF] backdrop-blur-[15px] bg-inherit'>
                    <GrLinkPrevious className='w-[30px] h-[30px] text-titleWhite' />
                </button>
                <button onClick={handleNext} className='flex items-center justify-center rounded-full w-[70px] h-[70px] border border-[#FFFFFF] backdrop-blur-[15px] bg-inherit'>
                    <GrLinkNext className='w-[30px] h-[30px] text-titleWhite' />
                </button>
            </div>
        </div>
    )
}

export default Banner