import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import intro1 from "../assets/1.svg";
import intro2 from "../assets/2.svg";
import intro3 from "../assets/3.svg";
import "./Intro.css";

interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const Intro: React.FC<ContainerProps> = () => {
  return (
    <Swiper>
      <SwiperSlide>
        <img src={intro1} alt="intro 1" />
        <IonText>Build awesome apps with Ionic UI components</IonText>
      </SwiperSlide>
      <SwiperSlide>Two</SwiperSlide>
    </Swiper>
  );
};

export default Intro;
