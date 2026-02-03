import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
            <div className="container">
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
                    background-color: #0a0a0a;
                    padding: 100px 20px;
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
                    color: #cccccc;
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
