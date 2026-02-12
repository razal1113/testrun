import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import breatechDevice from '../assets/breatech-device.png';
import breatechDevice from '../assets/logo.png'; // TESTING

gsap.registerPlugin(ScrollTrigger);

const ProductSection = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        console.log("Image path:", breatechDevice);
        const section = sectionRef.current;
        const image = imageRef.current;
        const content = contentRef.current;

        // Animate image
        // gsap.fromTo(image,
        //     { opacity: 0, x: -50 },
        //     {
        //         opacity: 1,
        //         x: 0,
        //         duration: 1.2,
        //         ease: 'power3.out',
        //         scrollTrigger: {
        //             trigger: section,
        //             start: 'top 70%',
        //             end: 'bottom bottom',
        //             toggleActions: 'play none none reverse'
        //         }
        //     }
        // );

        // Animate content
        gsap.fromTo(content,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.2, // Slight delay after image
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Adding a subtle floating animation to the image
        gsap.to(image, {
            y: 15,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

    }, []);

    const scrollToContact = () => {
        const contactSection = document.getElementById('yhteystiedot');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="osta-alkolukko" ref={sectionRef} className="product-section">
            <div className="container">
                <div className="product-grid">
                    {/* LEFT COLUMN: Product Highlight */}
                    <div className="product-image-col">
                        <div className="glow-effect"></div>
                        <img
                            ref={imageRef}
                            src={breatechDevice}
                            alt="Breatech B1000 Alkolukko"
                            className="product-image"
                        />
                        <div className="shadow-effect"></div>
                    </div>

                    {/* RIGHT COLUMN: Content */}
                    <div className="product-content-col" ref={contentRef}>
                        <span className="product-label">TUOTE</span>
                        <h2 className="product-heading">Breatech B1000 -alkolukko</h2>

                        <p className="product-intro">
                            Breatech B1000 on Suomessa hyväksytty alkolukko, joka täyttää viranomaisvaatimukset valvotussa ajo-oikeudessa. Laite tarjoaa tarkan mittausteknologian, helppokäyttöisen rakenteen ja luotettavan toiminnan kaikissa olosuhteissa.
                        </p>

                        <div className="info-block">
                            <h3 className="info-title">Miksi valita B1000?</h3>
                            <ul className="info-list">
                                <li>Hyväksytty valvottuun ajo-oikeuteen Suomessa</li>
                                <li>Tarkka polttokennoteknologia (fuel cell)</li>
                                <li>Nopea reagointiaika ja käynnistys</li>
                                <li>Selkeä näyttö ja helppo käyttö</li>
                                <li>Luotettava ja turvallinen ratkaisu</li>
                            </ul>
                        </div>

                        <div className="info-block">
                            <h3 className="info-title">Miten laite toimii?</h3>
                            <p className="info-text">
                                Laite mittaa hengitysilman alkoholipitoisuuden ennen ajoneuvon käynnistystä.
                                Moottori käynnistyy vain, jos tulos alittaa asetetun raja-arvon.
                            </p>
                            <p className="info-text">
                                Kaikki mittaukset tallentuvat järjestelmään viranomaisvaatimusten mukaisesti.
                            </p>
                        </div>

                        <div className="info-block">
                            <h3 className="info-title">Kenelle alkolukko sopii?</h3>
                            <ul className="info-list">
                                <li>Valvotun ajo-oikeuden hakijoille</li>
                                <li>Yrityksille ja työnantajille</li>
                                <li>Ammattikuljettajille</li>
                            </ul>
                        </div>

                        <div className="button-row">
                            <button onClick={scrollToContact} className="action-btn primary-btn">
                                Ota yhteyttä
                            </button>
                            <a href="/assets/B1000_All_Documents_Combined_fi.pdf" download className="action-btn outline-btn">
                                Lataa tuote-esite
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .product-section {
                    background-color: #121212;
                    padding: 100px 20px;
                    color: #ffffff;
                    overflow: hidden; /* Prevent glow from overflowing */
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    align-items: center;
                }

                /* Image Column */
                .product-image-col {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 500px;
                }

                .product-image {
                    max-width: 100%;
                    height: auto;
                    max-height: 600px;
                    z-index: 2;
                    position: relative;
                }

                .glow-effect {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 70%;
                    height: 70%;
                    background: radial-gradient(circle, rgba(255,107,0,0.2) 0%, rgba(0,0,0,0) 70%);
                    z-index: 1;
                    filter: blur(40px);
                    border-radius: 50%;
                }

                .shadow-effect {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60%;
                    height: 20px;
                    background: radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%);
                    z-index: 1;
                    filter: blur(10px);
                }

                /* Content Column */
                .product-content-col {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .product-label {
                    color: var(--color-accent-orange);
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }

                .product-heading {
                    font-size: clamp(2rem, 4vw, 3rem);
                    font-weight: 700;
                    line-height: 1.1;
                }

                .product-intro {
                    font-size: 1.1rem;
                    color: #e0e0e0;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }

                .info-block {
                    margin-bottom: 10px;
                }

                .info-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #fff;
                    margin-bottom: 12px;
                }

                .info-list {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                }

                .info-list li {
                    position: relative;
                    padding-left: 24px;
                    margin-bottom: 8px;
                    color: #cccccc;
                    font-size: 1rem;
                    line-height: 1.5;
                }

                .info-list li::before {
                    content: "•";
                    color: var(--color-accent-orange);
                    position: absolute;
                    left: 0;
                    font-weight: bold;
                }

                .info-text {
                    color: #cccccc;
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 10px;
                }

                /* Buttons */
                .button-row {
                    display: flex;
                    gap: 20px;
                    margin-top: 30px;
                    flex-wrap: wrap;
                }

                .action-btn {
                    padding: 14px 32px;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .primary-btn {
                    background: var(--color-accent-orange);
                    color: #fff;
                    border: none;
                    box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
                }

                .primary-btn:hover {
                    background: var(--color-accent-orange-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(255, 107, 0, 0.4);
                }

                .outline-btn {
                    background: transparent;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    color: #fff;
                }

                .outline-btn:hover {
                    border-color: #fff;
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateY(-2px);
                }

                /* Mobile Responsiveness */
                @media (max-width: 900px) {
                    .product-grid {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }

                    .product-image-col {
                        min-height: auto;
                        order: -1; /* Image on top */
                    }

                    .product-image {
                        max-height: 400px;
                    }
                    
                    .button-row {
                        flex-direction: column;
                        width: 100%;
                    }

                    .action-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </section>
    );
};

export default ProductSection;
