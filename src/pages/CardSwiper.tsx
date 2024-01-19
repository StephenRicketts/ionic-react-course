import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {};

const cardData = [
  {
    color: "red",
    title: "first card",
    subText: "This is the first card lmao",
  },
  {
    color: "blue",
    title: "second card",
    subText: "This is the first card lmao",
  },
  {
    color: "green",
    title: "third card",
    subText: "This is the first card lmao",
  },
  {
    color: "yellow",
    title: "fourth card",
    subText: "This is the first card lmao",
  },
];

export const CardSwiper = (props: Props) => {
  return (
    <Swiper slidesPerView={3} spaceBetween={50} autoHeight={false} height={10}>
      {cardData.map((card) => {
        return (
          <SwiperSlide>
            <IonCard className="h-40 w-40">
              <IonCardHeader>{card.title}</IonCardHeader>
              <IonCardContent style={{ background: card.color }}>
                {card.subText}
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
