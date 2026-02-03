import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GuidedProcess = () => {
    const timelineRef = useRef(null);
    const stepsRef = useRef([]);

    const steps = [
        {
            number: 1,
            title: "Miksi olet täällä",
            content: "Alkolukkoon liittyvä tilanne voi tuntua epäselvältä tai kuormittavalta. Tämän sivun tarkoitus on auttaa sinua ymmärtämään kokonaisuus rauhallisesti."
        },
        {
            number: 2,
            title: "Mitä alkolukko tarkoittaa",
            content: "Alkolukko on ajoneuvoon asennettava laite, joka estää käynnistyksen, jos kuljettajan hengityksessä havaitaan alkoholia. Sen tarkoitus on lisätä turvallisuutta – ei rangaista."
        },
        {
            number: 3,
            title: "Miten prosessi alkaa",
            content: "Prosessi käynnistyy yleensä viranomaisen päätöksellä tai ohjeistuksella. Saat selkeät tiedot seuraavista vaiheista ja tarvittavista toimista."
        },
        {
            number: 4,
            title: "Miten arki toimii alkolukon kanssa",
            content: "Alkolukko on osa normaalia arkea. Laite pyytää hengitysnäytteen ajoneuvon käynnistyksen yhteydessä ja tarvittaessa ajon aikana."
        },
        {
            number: 5,
            title: "Mitä tapahtuu seuraavaksi",
            content: "Kun määräaika ja ehdot täyttyvät, prosessi etenee päätökseen. Saat ohjeet jatkoa varten ja tiedät, milloin seuraava vaihe on edessä."
        }
    ];

    useEffect(() => {
        // Create timeline line growth animation
        gsap.to(timelineRef.current, {
            scrollTrigger: {
                trigger: '.guided-process',
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
            },
            scaleY: 1,
            transformOrigin: 'top',
            ease: 'none'
        });

        // Animate each step
        stepsRef.current.forEach((step, index) => {
            if (!step) return;

            gsap.fromTo(step,
                {
                    opacity: 0.3,
                    x: -20
                },
                {
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 70%',
                        end: 'top 30%',
                        scrub: 1,
                        onEnter: () => {
                            step.classList.add('active');
                        },
                        onLeaveBack: () => {
                            step.classList.remove('active');
                        }
                    },
                    opacity: 1,
                    x: 0,
                    ease: 'power2.out'
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section id="ohjattu-prosessi" className="guided-process">
            <div className="container">
                <h2 className="gp-heading">Ohjattu prosessi</h2>
                <p className="gp-intro">
                    Käymme alkolukkoprosessin läpi askel kerrallaan. Vieritä alaspäin omaan tahtiin.
                </p>

                <div className="timeline-container">
                    {/* Vertical timeline line */}
                    <div className="timeline-track">
                        <div
                            ref={timelineRef}
                            className="timeline-line"
                        />
                    </div>

                    {/* Steps */}
                    <div className="steps-container">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                ref={el => stepsRef.current[index] = el}
                                className="step"
                            >
                                <div className="step-marker">
                                    <span>{step.number}</span>
                                </div>
                                <div className="step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .guided-process {
                    background-color: #121212;
                    padding: 120px 20px;
                    position: relative;
                }

                .gp-heading {
                    font-size: 3rem;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 24px;
                    color: #ffffff;
                }

                .gp-intro {
                    text-align: center;
                    max-width: 700px;
                    margin: 0 auto 100px;
                    font-size: 1.2rem;
                    color: #cccccc;
                    line-height: 1.7;
                }

                .timeline-container {
                    position: relative;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .timeline-track {
                    position: absolute;
                    left: 30px;
                    top: 0;
                    bottom: 0;
                    width: 4px;
                    background-color: #2a2a2a;
                    border-radius: 2px;
                    overflow: hidden;
                }

                .timeline-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, #ff6b00, #ff8c3a);
                    transform: scaleY(0);
                    transform-origin: top;
                }

                .steps-container {
                    position: relative;
                    padding-left: 100px;
                }

                .step {
                    position: relative;
                    margin-bottom: 120px;
                    opacity: 0.3;
                    transition: opacity 0.3s ease;
                }

                .step:last-child {
                    margin-bottom: 0;
                }

                .step.active {
                    opacity: 1;
                }

                .step-marker {
                    position: absolute;
                    left: -85px;
                    top: 0;
                    width: 60px;
                    height: 60px;
                    background-color: #1a1a1a;
                    border: 4px solid #2a2a2a;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #666;
                    transition: all 0.3s ease;
                    z-index: 2;
                }

                .step.active .step-marker {
                    background-color: #ff6b00;
                    border-color: #ff6b00;
                    color: #ffffff;
                    transform: scale(1.1);
                    box-shadow: 0 0 20px rgba(255, 107, 0, 0.5);
                }

                .step-content h3 {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 16px;
                }

                .step-content p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #cccccc;
                    margin: 0;
                }

                @media (max-width: 768px) {
                    .guided-process {
                        padding: 80px 20px;
                    }

                    .gp-heading {
                        font-size: 2rem;
                    }

                    .gp-intro {
                        font-size: 1rem;
                        margin-bottom: 60px;
                    }

                    .timeline-track {
                        left: 20px;
                    }

                    .steps-container {
                        padding-left: 70px;
                    }

                    .step {
                        margin-bottom: 80px;
                    }

                    .step-marker {
                        left: -60px;
                        width: 50px;
                        height: 50px;
                        font-size: 1.2rem;
                    }

                    .step-content h3 {
                        font-size: 1.4rem;
                    }

                    .step-content p {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default GuidedProcess;
