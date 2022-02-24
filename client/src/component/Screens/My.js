import React from "react";
import "./Css/My.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import TelegramIcon from "@material-ui/icons/Telegram";
import FacebookIcon from "@material-ui/icons/Facebook";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/y_jaloliddin/?hl=en";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dvngnmkau/image/upload/v1643652441/ymxp0yeqva9zzjymozoq.jpg"
              alt="Founder"
            />
            <Typography>Yusupov Jaloliddin</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              Bu Yusupov Jaloliddin tomonidan yaratilgan. <br />
              WebSite MERN Stack Loyiha
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://t.me/uzmu4633" target="blank">
              <TelegramIcon className="youtubeSvgIcon" />
            </a>

            <a
              href="https://www.instagram.com/y_jaloliddin/?hl=en"
              target="blank"
            >
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a
              href="https://www.facebook.com/jaloliddin.yusupov.9085/"
              target="blank"
            >
              <FacebookIcon className="FaceBookSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
