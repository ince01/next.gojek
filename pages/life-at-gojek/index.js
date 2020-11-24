import Head from 'next/head';

import Navbar from '~/../../comps/Navbar';
import Perks from '../../comps/Culture/Perks';
import Blog from '../../comps/Culture/Blog';
import Link from '../../comps/Common/link';
import CardAnimation from '../../comps/Culture/CardAnimation';
import { socialImpact } from '../../comps/Culture/data';
import Values from '../../comps/Culture/Values/index';

import { perks } from '../../comps/Culture/data.js';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';

function LifeAtGojek(props) {
  const [showPerks, setPerks] = useState(1);

  const handleViewMore = () => {
    if (showPerks !== 3) {
      setPerks(showPerks + 1);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to('.view-more-button__icon', {
      y: 10,
      duration: 0.5,
    });

    gsap.from('.single-perk-card', {
      x: 10,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
    });
  }, []);

  return (
    <div>
      <section className="banner life-at-gojek">
        <div className="container">
          <Navbar />
          <div className="row mx-0 align-items-center full-height-one text-white">
            <div className="col-md-6">
              <h1 className="heading pb-3">Culture </h1>
              <p className="pb-3">
                The biggest defining perk of Gojek is its culture. We have a cross-pollination of
                ideas from Singapore, Indonesia, Thailand, Vietnam, and India. Different cultures,
                different mindsets, unified in solving problems and learning.
              </p>
              <h5 className="heading-sm pb-3">
                We ardently believe failing is learning. If we’re not failing, we’re not doing it
                right.
              </h5>
            </div>
          </div>
        </div>
      </section>

      <section className="my-5 values">
        <div className="container py-5">
          <h1 className="heading-sm py-5">
            Here are the <span className="text-green">10 values</span> that keep us going:
          </h1>
        </div>
        <div className="container-fluid pb-5">
          <Values />
        </div>
      </section>

      <section className="bg-black text-white py-5 perks">
        <div className="container py-5">
          <h1 className="heading py-5 mb-5">Perks and Benefits</h1>
          <Perks perks={perks} showPerks={showPerks} />

          {showPerks < 3 && (
            <div className="view-more-button">
              <i class="fas fa-chevron-down view-more-button__icon" onClick={handleViewMore}></i>
            </div>
          )}
        </div>
      </section>

      <section className="social-impact my-5 py-5">
        <div className="container">
          <CardAnimation data={socialImpact} />
        </div>
      </section>

      <section className="py-5" id="openingsBlogs">
        <div className="container">
          <h1 className="heading">Our Stories</h1>
          <Blog />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black cta py-5">
        <div className="container pt-5">
          <div className="footer-cta text-white row">
            <div className="py-5 pl-5 pr-0 col-md-7">
              <p className="text-lead">
                We're dedicated to creating (and scaling) positive socio-economic impact for our
                ecosystem of users.{' '}
              </p>
              <Link href="/jobs" text="Join Us" color="text-yellow" />
            </div>
            <div className="col-md-5 footer-img"></div>
          </div>
        </div>
      </section>
      {/* End CTA */}
    </div>
  );
}

export default LifeAtGojek;