import React from "react";

const PartnersCarousel = () => {
  const partners = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "1.png",
    "2.png",
  ];

  return (
    <section className="container pt120 wow fadeIn">
      <div className="row">
        <div className="col-xl-10 mx-auto partners owl-carousel">
          {partners.map((img, index) => (
            <div className="client-item" key={index}>
              <a href="#">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/img/partners/${img}`}
                  alt="client"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
