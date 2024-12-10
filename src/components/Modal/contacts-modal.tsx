"use client"
import { Modal } from 'antd'
import { IoClose } from "react-icons/io5"
import { FC, useState, useRef } from 'react'
import axios from 'axios'



// icons
import { IoIosArrowDown } from "react-icons/io"

import { Triangle } from 'react-loader-spinner'
import useLocale from '@/hooks/useLocale'



interface IReviewFull {
    visible: boolean
    close: () => void

}

interface SelectedItem {
    ru: string;
    uz: string;
    en: string;
}

const ContactUs: FC<IReviewFull> = ({ visible, close }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [openSelect, setOpenSelect] = useState(false)
    const [selectedMessageType, setSelectMessageType] = useState<SelectedItem>({
        ru: 'Тема сообщения',
        uz: 'Xabar mavzusi',
        en: 'Message Topic',
      });
    const [loadingDataPost, setLoadingDataPost] = useState(false)
    const locale = useLocale()


    const [formData, setFormData] = useState({
        name: '',
        modalPhone: '',
        email: '',
        textModal: '',
        textModalCompany: '',

    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData({ ...formData, [id]: value })
    }

    const handleOpenSelect = () => setOpenSelect(!openSelect)

    const handleMessageType = (msg: SelectedItem) => {
        setSelectMessageType(msg)
        setOpenSelect(false)
    }




    const sendDataForm = async () => {
        setLoadingDataPost(true)
        try {
            // Create FormData and append fields
            const formPayload = new FormData()
            formPayload.append('name', formData.name)
            formPayload.append('email', formData.email)
            formPayload.append('phone', formData.modalPhone)
            formPayload.append('theme', selectedMessageType.ru)
            formPayload.append('text', formData.textModal)
            formPayload.append('companyName', formData.textModalCompany)

            // Append file if exists
            if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
                formPayload.append('file', fileInputRef.current.files[0])
            }

            // Send data using axios
            const response = await axios.post('https://adau.result-me.uz/api/form/message', formPayload, {
                headers: {
                    'API-Key': 'VJs4krbxFMj78Q5IsUIkdZdi8A1MSItugxlHJiwRALyE7c8lCiGcLY6OsugGPzRmjSJ3nzdFh6iUZD9lmYeSzPpm7FTwcGttS0js',
                    'Content-Type': 'multipart/form-data' // Important for file upload
                }
            })

            console.log('Form submitted successfully:', response.data)

            // Clear form after successful submission
            setFormData({
                name: '',
                email: '',
                textModal: '',
                textModalCompany: "",
                modalPhone: ""
            })
            setSelectMessageType({
                ru: 'Тема сообщения',
                uz: 'Xabar mavzusi',
                en: 'Message Topic',
              })
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setLoadingDataPost(false)
        }
    }


   

    return (
        <Modal
            open={visible}
            footer={null}
            onCancel={close} // Using the close function
            centered
            closeIcon={<IoClose size={25} />}
            width={400}
        >
            <div className='flex flex-col'>
                <p className='text-[22px] 2xl:text-[28px] text-titleDark font-medium'>
                    {locale === 'ru'
                        ? "Связаться с нами"
                        : locale === 'uz'
                            ? "Biz bilan bog'lanish"
                            : "Contact Us"
                    }

                </p>
                <div className='inputs flex flex-col mt-[30px] '>
                    <div className='relative  '>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border border-[#E4E4E4] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 appearance-none dark:focus:border-titleDark focus:outline-none focus:ring-0 focus:border-titleDark peer 2xl:text-[20px]"
                            placeholder=" "
                        />
                        <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-[#A0A0A0] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#A0A0A0] peer-focus:dark:text-[#A0A0A0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 text-[14px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 2xl:text-[17px]">

                            {locale === 'ru'
                                ? "Имя и фамилия *"
                                : locale === 'uz'
                                    ? "Ism va familiya *"
                                    : "First and Last Name *"
                            }
                        </label>
                    </div>
                    <div className='relative mt-[20px]  2xl:mt-[30px]'>
                        <input
                            type="text"
                            id="modalPhone"
                            value={formData.modalPhone}
                            onChange={handleInputChange}
                            className="border border-[#E4E4E4] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 appearance-none dark:focus:border-titleDark focus:outline-none focus:ring-0 focus:border-titleDark peer 2xl:text-[20px]"
                            placeholder=" "
                        />
                        <label htmlFor="modalPhone" className="absolute text-sm text-gray-500 dark:text-[#A0A0A0] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#A0A0A0] peer-focus:dark:text-[#A0A0A0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 text-[14px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 2xl:text-[17px]">{locale === 'ru'
                            ? "Номер телефона *"
                            : locale === 'uz'
                                ? "Telefon raqam *"
                                : "Phone Number *"
                        }</label>
                    </div>
                    <div className='relative mt-[20px]  2xl:mt-[30px]'>
                        <input
                            type="text"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border border-[#E4E4E4] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 appearance-none dark:focus:border-titleDark focus:outline-none focus:ring-0 focus:border-titleDark peer 2xl:text-[20px]"
                            placeholder=" "
                        />
                        <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-[#A0A0A0] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#A0A0A0] peer-focus:dark:text-[#A0A0A0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 text-[14px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 2xl:text-[17px]">E-mail *</label>
                    </div>
                    <div className='relative mt-[20px] cursor-pointer 2xl:mt-[30px]'>
                        <div onClick={handleOpenSelect} id="floating_outlined_select" className="border border-[#E4E4E4]  px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 appearance-none dark:focus:border-titleDark focus:outline-none focus:ring-0 focus:border-titleDark peer flex items-center justify-between">
                            <p className='2xl:text-[20px]'>
                                {selectedMessageType[locale]}
                            </p>
                            <IoIosArrowDown
                                className={`transform transition-transform ease-in-out duration-500 ${openSelect ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </div>
                        <p className="absolute text-sm text-gray-500 dark:text-[#A0A0A0] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#A0A0A0] peer-focus:dark:text-[#A0A0A0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 text-[14px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 2xl:text-[20px]"> {locale === 'ru'
                            ? "Тема сообщения"
                            : locale === 'uz'
                                ? "Xabar mavzusi"
                                : "Message Subject"
                        } </p>
                    </div>
                    {openSelect && (
                        <div className='mt-[5px] flex flex-col gap-[5px] '>
                            <button onClick={() => handleMessageType({ru:'Вступить в ассоциацию' , uz: "Assotsiatsiyaga qo'shilish" , en: "Join the Association"})} className='p-[5px] border border-gray-600 flex items-center justify-center text-titleDark font-jost text-[14px] '>
                                {locale === 'ru'
                                    ? "Вступить в ассоциацию"
                                    : locale === 'uz'
                                        ? "Assotsiatsiyaga qo'shilish"
                                        : "Join the Association"
                                }
                            </button>
                            <button onClick={() => handleMessageType({ru:'Стать партнером' , uz: "Hamkor bo'lish" , en: "Become a Partner"})}  className='p-[5px] border border-gray-600 flex items-center justify-center text-titleDark font-jost text-[14px] '>
                                {locale === 'ru'
                                    ? "Стать партнером"
                                    : locale === 'uz'
                                        ? "Hamkor bo'lish"
                                        : "Become a Partner"
                                }
                            </button>
                            <button onClick={() => handleMessageType({ru:'Получить информацию' , uz: "Ma'lumot olish" , en: "Get Information"})} className='p-[5px] border border-gray-600 flex items-center justify-center text-titleDark font-jost text-[14px] '>
                                {locale === 'ru'
                                    ? "Получить информацию"
                                    : locale === 'uz'
                                        ? "Ma'lumot olish"
                                        : "Get Information"
                                }

                            </button>
                        </div>

                    )}


                    {selectedMessageType.ru === 'Получить информацию' && (
                        <div className='relative  mt-[20px] '>
                            <input
                                type="textModal"
                                id="textModal"
                                value={formData.textModal}
                                onChange={handleInputChange}
                                className="border border-[#E4E4E4] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 appearance-none dark:focus:border-titleDark focus:outline-none focus:ring-0 focus:border-titleDark peer 2xl:text-[20px]"
                                placeholder=" "
                            />
                            <label htmlFor="textModal" className="absolute text-sm text-gray-500 dark:text-[#A0A0A0] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#A0A0A0] peer-focus:dark:text-[#A0A0A0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 text-[14px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 2xl:text-[17px]">
                                {locale === 'ru'
                                    ? "Текст сообщения *"
                                    : locale === 'uz'
                                        ? "Xabar matni *"
                                        : "Message Text *"
                                }

                            </label>
                        </div>
                    )}
                    {selectedMessageType.ru === 'Стать партнером' && (
                        <div className='relative  mt-[20px] '>
                            <input
                                type="text"
                                id="textModalCompany"
                                value={formData.textModalCompany}
                                onChange={handleInputChange}
                                className="border border-[#E4E4E4] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 appearance-none dark:focus:border-titleDark focus:outline-none focus:ring-0 focus:border-titleDark peer 2xl:text-[20px]"
                                placeholder=" "
                            />
                            <label htmlFor="textModalCompany" className="absolute text-sm text-gray-500 dark:text-[#A0A0A0] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#A0A0A0] peer-focus:dark:text-[#A0A0A0] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 text-[14px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 2xl:text-[17px]">
                                {locale === 'ru'
                                    ? "Наименование компании / организации *"
                                    : locale === 'uz'
                                        ? "Kompaniya / tashkilot nomi *"
                                        : "Company / Organization Name *"
                                }
                            </label>
                        </div>
                    )}



                    <button
                        onClick={sendDataForm}
                        className='py-[15px] px-[20px] text-[15px] font-medium font-jost mt-[30px]  flex justify-center items-center buttonBlue '
                        disabled={loadingDataPost} // Disable button while loading
                    >
                        {loadingDataPost ? (
                            <Triangle
                                visible={true}
                                height="20"
                                width="20"
                                color="#fff"
                                ariaLabel="triangle-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        ) : (
                            <>{locale === 'ru'
                                ? "Отправить"
                                : locale === 'uz'
                                    ? "Yuborish"
                                    : "Send"
                            }</>
                        )}
                    </button>

                </div>
            </div>
        </Modal>

    )
}

export default ContactUs