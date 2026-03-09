import { forwardRef } from "react";

export const Hero = forwardRef(({}, ref) => {
  return (
    <section className="hero" id="hero" ref={ref}>
      <video
        className="hero__video"
        src="/videos/01_Intro.mp4"
        autoPlay
        loop
        muted
      />

      <div className="hero__body">
        {/* <h1 className="hero__body__title">A U A</h1> */}
        <img src="/logos/AUA_Logo.png" alt="AUA" className="hero__body__logo" />
        <p className="hero__body__subtitle">New way of living nature</p>
      </div>
    </section>
  );
});
