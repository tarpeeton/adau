"use client"
import { FC, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import SeminarModal from '../Modal/seminar-modal'
// ICON
import { IoIosPlay } from "react-icons/io"
import useLocale from '@/hooks/useLocale'
// DEFAULT VIDEO
const video = 'https://youtu.be/TlMUknHQYLU?si=iJivAS3Vd9ygABzt'




const BannerSeminar: FC = () => {
    const [modal, setModal] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const locale = useLocale()
    // Ensure this code runs only on the client side
    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleModalSwitcher = () => setModal(!modal)


    return (
        <div className='mt-[20px] 2xl:mt-[40px] px-[16px] 2xl:px-[50px] 4xl:px-[240px]'>
            <div className='flex flex-col 2xl:flex-row 2xl:flex-wrap 2xl:justify-between'>
                <div className='2xl:w-[30%]'>
                    <p className='uppercase text-[26px] 2xl:text-[50px] text-titleDark'>
                        {
                            locale === 'ru'
                                ? <>Семинары и <br className='2xl:hidden' /> тренинги ADAU</>
                                : locale === 'uz'
                                    ? <>ADAU seminar va <br className='2xl:hidden' /> treninglari</>
                                    : <>ADAU seminars and <br className='2xl:hidden' /> trainings</>
                        }


                    </p>
                    {/* <div className='hidden 2xl:block'>
                        <button onClick={handleModalSwitcher} className=' buttonBlue w-[60%] mt-[25px] '>
                            Записаться на семинар
                        </button>
                    </div> */}

                </div>
                {/* MODAL */}
                <SeminarModal visible={modal} close={handleModalSwitcher} />

                <div className='mt-[15px] h-[230px] 2xl:order-2 2xl:mt-[30px] 2xl:w-full 2xl:h-[476px]'>
                    {isClient && (
                        <ReactPlayer
                            url={video}
                            playing={isPlaying}
                            controls={true}
                            width="100%"
                            height="100%"
                            light={true} // Show thumbnail before playing
                            playIcon={
                                <div className=" inset-0 flex items-center justify-center  bg-opacity-50 cursor-pointer 2xl:h-[500px] h-[230px] ">
                                    <div className=' playButtonPulse rounded-full w-[90px] h-[90px] flex items-center justify-center border border-white'>
                                        <button className=" playButtonPulse rounded-full bg-white  w-[65px] h-[65px] flex items-center justify-center text-center">
                                            <IoIosPlay className='text-[#222E51]' size={29} />
                                        </button>
                                    </div>

                                </div>
                            }
                            onClickPreview={() => setIsPlaying(true)} // Start playing after clicking on the thumbnail
                            pip={true}
                        />
                    )}
                </div>
                <div className='mt-[25px] 2xl:w-[60%]'>
                    <p className='text-[15px] leading-[18px] font-jost 2xl:text-[20px] 2xl:leading-[28.9px] '>
                        {
                            locale === 'ru'
                                ? "ADAU регулярно проводит обучающие мероприятия, семинары и воркшопы, чтобы поддержать профессиональный рост дизайнеров и архитекторов. Участники получают возможность изучать новейшие тенденции, улучшать навыки и обмениваться опытом с коллегами. Наши мероприятия — это ценный ресурс для тех, кто стремится оставаться на передовой архитектуры и дизайна."
                                : locale === 'uz'
                                    ? "ADAU muntazam ravishda dizaynerlar va me’morlarning kasbiy o‘sishini qo‘llab-quvvatlash uchun o‘quv tadbirlari, seminarlar va master-klasslar o‘tkazadi. Ishtirokchilar zamonaviy tendensiyalarni o‘rganish, ko‘nikmalarini oshirish va hamkasblari bilan tajriba almashish imkoniyatiga ega bo‘ladilar. Bizning tadbirlarimiz — arxitektura va dizayn sohasida yetakchi bo‘lishni istaganlar uchun qimmatli resurs."
                                    : "ADAU regularly organizes training events, seminars, and workshops to support the professional growth of designers and architects. Participants have the opportunity to learn the latest trends, improve skills, and share experiences with colleagues. Our events are a valuable resource for those striving to stay at the forefront of architecture and design."
                        }

                    </p>
                    {/* <button className='buttonBlue w-[60%] mt-[25px] 2xl:hidden'>
                        Записаться на семинар
                    </button> */}
                </div>

            </div>
        </div>
    )
}

export default BannerSeminar