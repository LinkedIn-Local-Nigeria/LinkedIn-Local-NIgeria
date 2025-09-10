import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@radix-ui/react-icons'
import { formatDate, formatTime } from './lib/dateFormatter'
import { useEffect, useRef, useState } from 'react'

import Button from './ui/Button'
import Container from './ui/Container'
import EmptyState from './ui/EmptyState'
import EventImage1 from '../assets/EventImage1.png'
import { EventSkeleton } from './ui/Skeleton'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import sanityClient from '../sanity/sanityClient'

const Events = () => {
  const sliderRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)

  useEffect(() => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth
      setCardWidth(containerWidth)
    }
  }, [])

  const scroll = direction => {
    const maxIndex = Math.max(0, events.length - 2)
    const newIndex =
      direction === 'left'
        ? Math.max(currentIndex - 2, 0)
        : Math.min(currentIndex + 2, maxIndex)

    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      })
    }

    setCurrentIndex(newIndex)
  }

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getEvents = async () => {
      const query = `*[_type == "event"] |order(dateAndTime desc){
        title,
        description,
        dateAndTime,
        cta {
          url,
          label
        },
        image{
          asset->{
            _id,
            url
          },
        },
      }`
      try {
        const data = await sanityClient.fetch(query)
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    getEvents()
  }, [])

  const isExternal = url => /^https?:\/\//.test(url)

  const renderEvents = () => {
    if (loading)
      return (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <EventSkeleton key={index} />
          ))}
        </>
      )

    if (!events?.length) {
      return (
        <div className="flex justify-center w-full">
          <EmptyState
            message="No events available at the moment"
            icon={<CalendarIcon className="w-6 h-6 text-[#0076B2]" />}
          />
        </div>
      )
    }

    return events.map(event => {
      const ctaUrl = event?.cta?.url || '#'
      const ctaLabel = event?.cta?.label || 'Get Your Ticket'

      return (
        <motion.div
          key={event.title}
          className="min-w-[300px] w-full lg:max-w-[518px] shrink-0 relative border border-gray-200"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ height: '420px' }}
        >
          <img
            src={event.image?.asset?.url || EventImage1}
            alt={event.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-medium text-left"
            >
              {formatDate(event.dateAndTime)} / {formatTime(event.dateAndTime)}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-1 text-sm font-semibold text-left md:text-lg"
            >
              {event.description}
            </motion.p>

            {isExternal(ctaUrl) ? (
              <a href={ctaUrl} target="_blank" rel="noopener noreferrer">
                <Button className="mt-4 w-full bg-[#0076B2] hover:bg-[#005c8f] transform transition-transform duration-300 ease-out hover:scale-105">
                  {ctaLabel}
                </Button>
              </a>
            ) : (
              <Link to={ctaUrl}>
                <Button className="w-full mt-4 transition-transform duration-300 ease-out transform hover:scale-105">
                  {ctaLabel}
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      )
    })
  }

  return (
    <section className="flex flex-col lg:flex-row justify-between items-start gap-8 px-4 xl:px-0 py-10 bg-[#FDFDFD] font-manrope">
      <Container>
        <div className="flex flex-col justify-end w-full gap-3 ml-auto xl:w-3/4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[#0076B2] text-left md:text-[35px] text-3xl font-semibold font-poppins"
          >
            Upcoming Event
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm md:text-[18px] md:leading-[28px] text-gray-700 text-left"
          >
            Mark your calendar for our exciting mini-events, including Twitter
            Spaces, Campus Tours, and IG Lives, designed to inspire and connect!
          </motion.p>
          <div className="items-center justify-start hidden gap-4 mt-6 xl:flex">
            <button
              onClick={() => scroll('left')}
              className="flex items-center justify-center w-10 h-10 border border-[#0076B2] rounded-full disabled:opacity-50 transform transition-all duration-500 ease-in-out hover:scale-110 hover:rotate-12"
              disabled={currentIndex === 0}
              aria-label="Previous events"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            <div className="px-4 py-1 bg-[#fff] text-black rounded-full text-[18px]">
              {events.length > 0 ? `${currentIndex + 1} / ${events.length}` : '0 / 0'}
            </div>
            <button
              onClick={() => scroll('right')}
              className="flex items-center justify-center w-10 h-10 border rounded-full border-[#0076B2] disabled:opacity-50 transform transition-all duration-500 ease-in-out hover:scale-110 hover:rotate-12"
              disabled={currentIndex >= events.length - 2}
              aria-label="Next events"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={sliderRef}
        className="flex w-full gap-6 pb-4 overflow-x-auto xl:w-2/3 scroll-smooth no-scrollbar"
      >
        {renderEvents()}
      </div>
    </section>
  )
}

export default Events
