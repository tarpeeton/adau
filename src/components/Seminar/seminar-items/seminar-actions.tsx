"use client"
import React, { FC, useState } from 'react'
import Image from 'next/image'



// images
import A from '@/public/form/a.png'
import D from '@/public/form/d.png'
import U from '@/public/form/u.png'

import ScheduleModal from '@/components/Modal/schedule-modal'
import SeminarModal from '@/components/Modal/seminar-modal'

const SeminarActions: FC = () => {
    const [open, setOpen] = useState(false)
    const [openSeminarModal, setSeminarModal] = useState(false)
    const handleSwitchStatus = () => setOpen(!open)
    const handleSwitchModalStatus = () => setSeminarModal(!openSeminarModal)

    return (
        <div className='mt-[80px] 2xl:mt-[200px]'>
            <div className=' bg-[#222E51] py-[40px] px-[16px] 2xl:py-[100px] 2xl:px-[50px]  4xl:px-[240px] flex flex-col 2xl:flex-row'>
                <div className='2xl:w-[60%]'>
                    <p className='text-[26px] 2xl:w-[90%] 2xl:text-[50px] 2xl:leading-[62px]  uppercase text-titleWhite font-jost leading-[32px]'>
                        Не упустите возможность присоединиться!
                    </p>
                    <p className='mt-[10px] 2xl:mt-[20px] 2xl:w-[50%] text-[15px] leading-[18px] text-white opacity-[80%]'>
                        Запишитесь на семинар, чтобы узнать новейшие тренды и получить практические знания от ведущих экспертов
                    </p>
                    <div className='flex flex-col gap-[12px] 2xl:gap-0 2xl:flex-row flex-nowrap justify-between mt-[25px] 2xl:w-[60%] 2xl:mt-[50px]'>
                        <button onClick={handleSwitchModalStatus} className='buttonWhite 2xl:w-[49%]'>Записаться на семинар
                        </button>
                        <SeminarModal visible={openSeminarModal} close={handleSwitchModalStatus} />
                        <button onClick={handleSwitchStatus} className='borderedButtonWhite 2xl:w-[49%] flex items-center justify-center'>Посмотреть расписание</button>
                        <ScheduleModal visible={open} close={handleSwitchStatus} />
                    </div>
                </div>
                <div className='mt-[30px] flex items-center gap-[8px] justify-center 2xl:w-[40%] 2xl:items-end 2xl:mt-[220px] 2xl:ml-[-80px]'>
                    <Image src={A} width={73} height={73} alt='A' quality={100} className='opacity-[20%] w-[73px] h-[73px] 2xl:w-[163px] 2xl:h-[163px]' />
                    <Image src={D} width={73} height={73} alt='A' quality={100} className='opacity-[20%] w-[73px] h-[73px] 2xl:w-[163px] 2xl:h-[163px]' />
                    <Image src={A} width={73} height={73} alt='A' quality={100} className='opacity-[20%] w-[73px] h-[73px] 2xl:w-[163px] 2xl:h-[163px] ml-[-8px]' />
                    <Image src={U} width={73} height={73} alt='A' quality={100} className='opacity-[20%] w-[73px] h-[73px] 2xl:w-[163px] 2xl:h-[163px] ml-[-8px]' />
                </div>
            </div>
        </div>
    )
}

export default SeminarActions