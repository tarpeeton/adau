"use client"
import Link from 'next/link'
import { FC, useState, useEffect } from 'react'

const Map: FC = () => {
    const [mapLoaded, setMapLoaded] = useState(false) // State to ensure the map is loaded once
    const [mapInstance, setMapInstance] = useState<any>(null) // Store the map instance

    useEffect(() => {
        const loadYandexMap = () => {
            // Check if the script is already loaded
            if (window.ymaps && !mapLoaded) {
                setMapLoaded(true)
                if (!mapInstance) {
                    initializeMap()
                }
                return
            }

            // Load the Yandex Maps script
            const script = document.createElement('script')
            script.src = `https://api-maps.yandex.ru/2.1/?apikey=5771415d-001f-4699-b102-0fb2f6af965a&lang=ru_RU`
            script.async = true
            script.defer = true
            script.onload = () => {
                window.ymaps.ready(() => {
                    initializeMap()
                })
            }
            script.onerror = () => {
                console.error("Failed to load Yandex Maps API")
            }
            document.body.appendChild(script)
        }

        const initializeMap = () => {
            // Check if Yandex Maps API is loaded and ready
            if (window.ymaps) {
                const map = new window.ymaps.Map('map', {
                    center: [41.351469, 69.289004],
                    zoom: 17,
                    controls: [],
                })

                const placemark = new window.ymaps.Placemark(
                    [41.351469, 69.289004],
                    {
                        hintContent: 'Ташкент',
                        balloonContent: 'Чинобод 2, метро Шахристан',
                    },
                    {
                        iconColor: '#222E51',
                    }
                )

                map.geoObjects.add(placemark)
                setMapInstance(map) // Store the map instance
                setMapLoaded(true)
            } else {
                console.error("Yandex Maps API is not available.")
            }
        }

        // Load the map if it's not loaded
        if (!mapLoaded) {
            loadYandexMap()
        }
    }, [mapLoaded, mapInstance])
    return (
        <div className='px-[16px] 2xl:px-[50px] 4xl:px-[240px] mt-[80px] 2xl:mt-[200px]'>
            <div className='flex flex-col 2xl:flex-row justify-between items-center'>
                <p className='text-[24px] 2xl:text-[45px] text-titleDark font-jost uppercase'>
                    Найдите нас на карте
                </p>
                <Link href='https://www.google.com/maps?q=41.351469,69.289004' className='buttonBlue' target='_blank' rel='noopener noreferrer'>
                    Открыть в Google Maps
                </Link>

            </div>
            <div className='mt-[30px]'>
                <div className=" mt-[20px] overflow-hidden w-full mdl:mt-[40px]">
                    <div className='h-[300px] mdl:h-[400px] 2xl:h-[500px]'>
                        <div id="map" className="w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Map