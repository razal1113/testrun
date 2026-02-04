import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import vwBg from '../assets/vw-alkolukko.jpg';

gsap.registerPlugin(ScrollTrigger);

const WhatIsInterlock = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(contentRef.current,
            {
                opacity: 0,
                y: 40
            },
            {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                },
                opacity: 1,
                y: 0,
                ease: 'power2.out'
            }
        );
    }, []);

    return (
        <section ref={sectionRef} id="mika-on-alkolukko" className="what-is-interlock">
            <div className="wii-overlay"></div>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <h2 className="wii-heading">Mikä on alkolukko</h2>
                <div ref={contentRef} className="wii-content">
                    <p>
                        Alkolukko on turvallisuuslaite, joka mittaa alkoholin pitoisuuden
                        hengitysnäytteestä. Ajoneuvo voidaan käynnistää vain, jos mitattu
                        arvo alittaa asetetun raja-arvon.
                    </p>
                    <p>
                        Alkolukkoja käytetään liikenneturvallisuuden parantamiseen ja riskien
                        vähentämiseen. Ne ovat viranomaisten hyväksymiä ja perustuvat luotettavaan
                        mittausteknologiaan.
                    </p>
                </div>
            </div>

            <style>{`
                .what-is-interlock {
                    position: relative;
                    background-image: url(${vwBg});
                    background-size: cover;
                    background-position: center;
                    padding: 100px 20px;
                }

                .wii-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(10, 10, 10, 0.7); /* Dark overlay for readability */
                    z-index: 1;
                }

                .wii-heading {
                    font-size: 2.5rem;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 50px;
                    color: #ffffff;
                }

                .wii-content {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .wii-content p {
                    font-size: 1.2rem;
                    line-height: 1.9;
                    color: #e0e0e0; /* Slightly lighter for better contrast on image */
                    margin-bottom: 30px;
                }

                .wii-content p:last-child {
                    margin-bottom: 0;
                }

                @media (max-width: 768px) {
                    .what-is-interlock {
                        padding: 80px 20px;
                    }

                    .wii-heading {
                        font-size: 2rem;
                    }

                    .wii-content p {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default WhatIsInterlock;
