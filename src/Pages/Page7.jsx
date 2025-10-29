import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './Page7.css';

const Page7 = () => {
  const cards = [
    {
      title: 'Poland',
      description: '12 tours available',
      img: 'https://plus.unsplash.com/premium_photo-1675147909300-1c0d891b00ea?w=600&auto=format&fit=crop&q=60',
    },
    {
      title: 'Alaska',
      description: '8 tours available',
      img: 'https://cdn.pixabay.com/photo/2021/03/05/14/56/snow-6071475_1280.jpg',
    },
    {
      title: 'Switzerland',
      description: '18 tours available',
      img: 'https://images.unsplash.com/photo-1528493366314-e317cd98dd52?w=600&auto=format&fit=crop&q=60',
    },
    {
      title: 'Switzerland',
      description: '18 tours available',
      img: 'https://plus.unsplash.com/premium_photo-1673254850130-cc8e2a824899?w=600&auto=format&fit=crop&q=60',
    },
    {
      title: 'Poland',
      description: '12 tours available',
      img: 'https://plus.unsplash.com/premium_photo-1675147909300-1c0d891b00ea?w=600&auto=format&fit=crop&q=60',
    },
    {
      title: 'Alaska',
      description: '8 tours available',
      img: 'https://cdn.pixabay.com/photo/2021/03/05/14/56/snow-6071475_1280.jpg',
    },
    {
      title: 'Switzerland',
      description: '18 tours available',
      img: 'https://images.unsplash.com/photo-1528493366314-e317cd98dd52?w=600&auto=format&fit=crop&q=60',
    },
    {
      title: 'Switzerland',
      description: '18 tours available',
      img: 'https://plus.unsplash.com/premium_photo-1673254850130-cc8e2a824899?w=600&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <section className="discover section" id="discover">
      <h2 className="section__title">
        Meet  <br /> Team Ctrl Z
      </h2>

      <div className="discover__container swiper-container">
        <Swiper
          modules={[EffectCoverflow, Pagination]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          className="swiper-wrapper"
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i} className="discover__card swiper-slide">
              <img src={card.img} alt={card.title} className="discover__img" />
              <div className="discover__data">
                <h2 className="discover__title">{card.title}</h2>
                <span className="discover__description">{card.description}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Page7;
