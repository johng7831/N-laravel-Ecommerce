import React, { useEffect, useState } from 'react'

const Hero = () => {
  const slides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop', title: 'Discover Your Style', subtitle: 'Trendy fashion for every occasion', cta: 'Shop Now' },
    { id: 2, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop', title: 'Winter Collection', subtitle: 'Cozy layers for chilly days', cta: 'Explore Collection' }
  ]

  const [current, setCurrent] = useState(0)
  const total = slides.length

  useEffect(() => {
    const id = setInterval(() => setCurrent((p) => (p + 1) % total), 5000)
    return () => clearInterval(id)
  }, [total])

  const goTo = (i) => setCurrent(i)
  const next = () => setCurrent((p) => (p + 1) % total)
  const prev = () => setCurrent((p) => (p - 1 + total) % total)

  return (
    <section className="hero-section" role="region" aria-label="Hero section">
      <div className="hero-slider" role="listbox" aria-label="Hero slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide${index === current ? ' active' : ''}`}
            role="option"
            aria-selected={index === current}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay" />
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <a href="#" className="hero-button">{slide.cta}</a>
            </div>
          </div>
        ))}

        <button className="hero-arrow left" aria-label="Previous slide" onClick={prev}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="hero-arrow right" aria-label="Next slide" onClick={next}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="hero-dots" role="tablist" aria-label="Slide selector">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot${index === current ? ' active' : ''}`}
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero


