import { Component } from '@angular/core';

@Component({
    selector: "app-about-us",
    templateUrl: "./about-us.component.html",
    styleUrls: ["./about-us.component.scss"]
})

export class AboutUsComponent {

    slides = [
        { img: "/assets/img/about-us/slide1.jpg", text: "Weddings" },
        { img: "/assets/img/about-us/slide2.jpg", text: "Excursions" },
        { img: "/assets/img/about-us/slide3.jpg", text: "Accommodation" },
        { img: "/assets/img/about-us/slide4.jpg", text: "Group & Incentives" },
        { img: "/assets/img/about-us/slide1.jpg", text: "Weddings" },
        { img: "/assets/img/about-us/slide2.jpg", text: "Excursions" },
        { img: "/assets/img/about-us/slide3.jpg", text: "Accommodation" },
        { img: "/assets/img/about-us/slide4.jpg", text: "Group & Incentives" },
    ];

    rates = [4, 4, 4, 4, 4]

    public slideConfig = {
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      swipeToSlide: true,
      nextArrow:
        '<button class="right-arrow name="right-arrow"" aria-label="Next apartment"></button>',
      prevArrow:
        '<button class="left-arrow" name="left-arrow" aria-label="Previous apartment"></button>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '16px',
          }
        }
      ]
    };
}