import React from "react";

const AboutSection = () => {
  return (
  <section className="about">
  <div className="container">
    <div className="row">
      {/* Image column */}
      <div className="col image-col">
        <img
          src="/images/hr.jpg"
          alt="About"
          className="about-image"
        />
      </div>

      {/* Text column */}
      <div className="col text-col">
        <div className="section-title about-title">
          <span>About Us Education</span>
          <h2>Go Your Skill in Next Level</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed turpis in arcu gravida faucibus euismod eget magna. Donec non justo ac libero pharetra congue. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ipsum facere, commodi est iste rerum, ipsam sapiente quas eveniet provident nemo. Assumenda eligendi minus ipsa totam veritatis doloribus aliquam odit.
        </p>

        <div className="single_about">
          <div className="sbcontent">
            <h4>Our Success Mission</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum consequatur ipsum, labore ex eos error velit reprehenderit sapiente quae, quis blanditiis distinctio mollitia est nesciunt corrupti nostrum provident a eveniet! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque blanditiis repellendus reprehenderit beatae itaque alias dolorum odio, libero, fugit vel mollitia ea dicta doloribus qui in ducimus, ipsa explicabo amet?</p>
          </div>
        </div>

        <div className="single_about">
          <div className="sbcontent">
            <h4>Our Success Vision</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sit sed quam cumque aperiam! Provident quod quo, in obcaecati veniam veritatis? Delectus sequi officiis, consequatur eaque eos deleniti ipsam omnis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis libero a sint quos, nisi totam dignissimos optio officiis. Cupiditate reprehenderit voluptas minima, quae omnis repudiandae vel doloremque at deserunt velit? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda expedita asperiores dignissimos hic voluptates cupiditate, delectus corporis iste magni.</p>
          </div>
        </div>

        <a href="/about" className="bg_btn bt">Discover More</a>
      </div>
    </div>
  </div>
</section>

  );
};

export default AboutSection;
