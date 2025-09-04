import React from "react";
import "./WorkingProcess.css";
const WorkingProcess = () => {
  return (
    <section
      className="working-process"
    >
      <div className="container">
        <div className="section-title">
          <span>Working Process</span>
          <h2>How Does It Work</h2>
        </div>

        <div className="working-cards">
          <div className="single-work">
            <div className="wicon">
              {/* Paste your first SVG here */}
            </div>
            <h4>Choose A Course</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit
            </p>
          </div>

          <div className="single-work">
            <div className="wicon">
              {/* Paste your second SVG here */}
            </div>
            <h4>Purchase A Course</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit
            </p>
          </div>

          <div className="single-work">
            <div className="wicon">
              {/* Paste your third SVG here */}
            </div>
            <h4>Start Now</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
