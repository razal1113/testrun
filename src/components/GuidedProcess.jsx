import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

const GuidedProcess = () => {
    // State-based flow: 'step1', 'form', 'confirmation', 'final-message'
    const [currentState, setCurrentState] = useState('step1');

    const contentRef = useRef(null);

    const [formData, setFormData] = useState({
        nimi: '',
        osoite: '',
        postinumero: '',
        tunnus: '',
        puhelin: '',
        sahkoposti: '',
        rekisterinumero: ''
    });

    const scrollToTop = () => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleJatka = () => {
        scrollToTop();
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: () => {
                setCurrentState('form');
                gsap.fromTo(contentRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
            }
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        scrollToTop();
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: () => {
                setCurrentState('confirmation');
                gsap.fromTo(contentRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
            }
        });
    };

    const handleYes = () => {
        window.location.href = 'https://fixushuolto.fi/eox/huolto';
    };

    const handleNo = () => {
        scrollToTop();
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: () => {
                setCurrentState('final-message');
                gsap.fromTo(contentRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
            }
        });
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="ohjattu-prosessi" className="guided-process">
            <div className="container">
                <h2 className="gp-heading">Ajokortin saamiseen tarvittavat toimenpiteet</h2>
                <p className="gp-intro">
                    Alla olevat vaiheet ohjaavat sinua askel askeleelta alkolukkoajokortin hakemisessa ja alkolukon vuokraamisessa.
                </p>

                <div className="interactive-container" ref={contentRef}>
                    {currentState === 'step1' && (
                        <div className="step-box">
                            <h3 className="question-text">Oletko valmis vuokraamaan alkolukon?</h3>
                            <div className="explanation-text">
                                <p>Kun alkolukon vuokrasopimus avautuu näytölle, voit täyttää tarvittavat tiedot sähköisesti.</p>
                                <p>Sopimuksen täyttämisen jälkeen allekirjoitat sopimuksen sähköisesti.</p>
                                <p>Tämän jälkeen Breatech Finland Oy saa automaattisesti ilmoituksen vuokrasopimuksen allekirjoituksesta.</p>
                                <p>Vuokrauksen yhteydessä suoritetaan automaattinen luottotietojen tarkistus.</p>
                                <p>Mikäli luottotiedot ovat kunnossa, sopimus etenee normaalisti.</p>
                                <p>Mikäli luottotiedot eivät ole kunnossa, vuokrasopimus edellyttää takaajaa.</p>
                                <p>Vuokrasopimus astuu voimaan, kun takaaja on allekirjoittanut sopimuksen.</p>
                            </div>
                            <button className="next-btn" onClick={handleJatka}>Jatka</button>
                        </div>
                    )}

                    {currentState === 'form' && (
                        <div className="step-box">
                            <h3 className="form-section-heading">VUOKRANOTTAJA</h3>
                            <form className="guided-form" onSubmit={handleFormSubmit}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Nimi / Yritys</label>
                                        <input type="text" name="nimi" value={formData.nimi} onChange={handleFormChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Osoite</label>
                                        <input type="text" name="osoite" value={formData.osoite} onChange={handleFormChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Postinumero ja postitoimipaikka</label>
                                        <input type="text" name="postinumero" value={formData.postinumero} onChange={handleFormChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Henkilötunnus / Y-tunnus</label>
                                        <input type="text" name="tunnus" value={formData.tunnus} onChange={handleFormChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Puhelin</label>
                                        <input type="tel" name="puhelin" value={formData.puhelin} onChange={handleFormChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Sähköposti</label>
                                        <input type="email" name="sahkoposti" value={formData.sahkoposti} onChange={handleFormChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Ajoneuvon rekisteritunnus</label>
                                        <input type="text" name="rekisterinumero" value={formData.rekisterinumero} onChange={handleFormChange} required />
                                    </div>
                                </div>
                                <button type="submit" className="submit-btn">Lähetä</button>
                            </form>
                        </div>
                    )}

                    {currentState === 'confirmation' && (
                        <div className="step-box">
                            <h3 className="question-text">Haluatko varata asennusajan nyt?</h3>
                            <div className="button-group">
                                <button className="choice-btn" onClick={handleYes}>Kyllä</button>
                                <button className="choice-btn" onClick={handleNo}>Ei</button>
                            </div>
                        </div>
                    )}

                    {currentState === 'final-message' && (
                        <div className="success-box">
                            <h3 className="success-heading">Kiitos. Olemme sinuun yhteydessä mahdollisimman pian.</h3>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .guided-process {
                    background-color: #121212;
                    padding: 120px 20px;
                    color: #ffffff;
                }
                .gp-heading {
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 24px;
                }
                .gp-intro {
                    text-align: center;
                    max-width: 800px;
                    margin: 0 auto 60px;
                    font-size: 1.2rem;
                    color: #cccccc;
                    line-height: 1.6;
                }
                .interactive-container {
                    max-width: 800px;
                    margin: 0 auto;
                    min-height: 480px; /* Increased slightly for stability */
                    overflow-anchor: none; /* Prevent scroll anchoring jumps */
                }
                .step-box, .success-box {
                    background: #1a1a1a;
                    padding: 40px;
                    border-radius: 20px;
                    border: 1px solid #333;
                }
                .question-text {
                    font-size: 1.8rem;
                    font-weight: 600;
                    margin-bottom: 30px;
                    line-height: 1.4;
                }
                .explanation-text {
                    margin-bottom: 30px;
                }
                .explanation-text p {
                    color: #ccc;
                    line-height: 1.7;
                    font-size: 1.1rem;
                    margin-bottom: 16px;
                }
                .next-btn, .submit-btn, .choice-btn {
                    background: var(--color-accent-orange) !important;
                    color: #fff;
                    border: none;
                    padding: 16px 40px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: block;
                    margin: 0 auto;
                    box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
                }
                .next-btn:hover, .submit-btn:hover, .choice-btn:hover {
                    background: var(--color-accent-orange-hover) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 25px rgba(255, 107, 0, 0.5);
                }
                .choice-btn {
                    flex: 1;
                    margin: 0;
                }
                .form-section-heading {
                    font-size: 1.4rem;
                    font-weight: 600;
                    margin-bottom: 30px;
                    color: var(--color-accent-orange);
                    letter-spacing: 0.5px;
                }
                .form-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    margin-bottom: 40px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .form-group label {
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: #999;
                }
                .form-group input {
                    background: #121212;
                    border: 1px solid #333;
                    padding: 14px 18px;
                    border-radius: 12px;
                    color: #fff;
                    color: #fff;
                    font-size: 16px; /* Prevent iOS zoom */
                    transition: all 0.2s ease;
                }
                .form-group input:focus {
                    outline: none;
                    border-color: var(--color-accent-orange);
                    box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.2);
                }
                .submit-btn {
                    width: 100%;
                }
                .button-group {
                    display: flex;
                    gap: 20px;
                    margin-top: 20px;
                }
                .success-box {
                    text-align: center;
                    padding: 80px 40px;
                }
                .success-heading {
                    font-size: 1.8rem;
                    color: #4ade80;
                }

                @media (max-width: 768px) {
                    .step-box {
                        padding: 30px 20px;
                    }
                    .question-text {
                        font-size: 1.4rem;
                    }
                    .button-group {
                        flex-direction: column;
                    }
                }
            `}</style>
        </section>
    );
};

export default GuidedProcess;
