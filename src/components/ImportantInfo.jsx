import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImportantInfo = () => {
    const cardsRef = useRef([]);

    const infoItems = [
        {
            title: "Lainsäädäntö",
            content: "Alkolukon käyttö perustuu Suomessa voimassa olevaan lainsäädäntöön ja viranomaispäätöksiin."
        },
        {
            title: "Väliaikainen ajokortti",
            content: "Joissakin tilanteissa alkolukon käyttö voi liittyä väliaikaiseen ajo-oikeuteen."
        },
        {
            title: "Aikataulu",
            content: "Prosessin kesto ja vaiheet määräytyvät yksilöllisen tilanteen ja päätöksen mukaan. Saat aina ajantasaiset ohjeet etenemisestä."
        }
    ];

    useEffect(() => {
        gsap.fromTo(cardsRef.current,
            {
                opacity: 0,
                y: 30,
                scale: 0.95
            },
            {
                scrollTrigger: {
                    trigger: '.info-grid',
                    start: 'top 80%',
                    end: 'top 40%',
                    scrub: 1
                },
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.2,
                ease: 'power2.out'
            }
        );
    }, []);

    return (
        <section id="tarkeaa-tietaa" className="important-info">
            <div className="container">
                <h2 className="ii-heading">Tärkeää tietää</h2>
                <div className="info-grid">
                    {infoItems.map((item, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="info-card"
                        >
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .important-info {
                    background-color: #121212;
                    padding: 100px 20px;
                }

                .ii-heading {
                    font-size: 2.5rem;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 70px;
                    color: #ffffff;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 40px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .info-card {
                    background-color: #1a1a1a;
                    padding: 40px;
                    border-radius: 12px;
                    border-left: 4px solid #ff6b00;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .info-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 8px 24px rgba(255, 107, 0, 0.2);
                    border-left-width: 6px;
                }

                .info-card h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #ff6b00;
                    margin-bottom: 16px;
                }

                .info-card p {
                    font-size: 1rem;
                    line-height: 1.7;
                    color: #cccccc;
                    margin: 0;
                }

                @media (max-width: 1024px) {
                    .info-grid {
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }
                }

                @media (max-width: 768px) {
                    .important-info {
                        padding: 80px 20px;
                    }

                    .ii-heading {
                        font-size: 2rem;
                        margin-bottom: 50px;
                    }

                    .info-card {
                        padding: 30px 20px;
                    }

                    .info-card h3 {
                        font-size: 1.3rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default ImportantInfo;
