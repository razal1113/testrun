import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

const GuidedProcess = () => {
    // Correct Behavior Structure: Initial state MUST be currentStep = 1
    const [currentStep, setCurrentStep] = useState(1);
    const [showExplanation, setShowExplanation] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const contentRef = useRef(null);

    const steps = [
        {
            question: "Oletko pyytänyt tai saanut poliisilta luvan valvottuun ajo-oikeuteen?",
            explanation: `Valvottua ajo-oikeutta kannattaa pyytää poliisilta heti tai viimeistään rattijuopumusasian käsittelyn yhteydessä tuomioistuimelta.

            Suosittelemme varmistamaan poliisilta, että sinulla on mahdollisuus saada alkolukkoajokortti.

            Poliisi antaa tarvittaessa lisätietoja alkolukkoajokortin hakemisesta ja siihen liittyvistä vaatimuksista.`
        },
        {
            question: "Oletko käynyt lääkärin tai muun terveydenhuollon ammattihenkilön kanssa keskustelun päihteiden käytöstä ja saanut siitä todistuksen?",
            explanation: `Hanki todistus lääkärin tai muun terveydenhuollon ammattihenkilön kanssa käydystä keskustelusta (päihteiden käyttö).
            Todistus liitetään ajokorttihakemukseen ja toimitetaan poliisille.

            Kun toimitat kaikki tarvittavat dokumentit poliisille, poliisi voi myöntää sinulle väliaikaisen ajokortin.`
        },
        {
            question: "Oletko valmis vuokraamaan alkolukon?",
            explanation: `Kun alkolukon vuokrasopimus avautuu näytölle, voit täyttää tarvittavat tiedot sähköisesti.

            Sopimuksen täyttämisen jälkeen allekirjoitat sopimuksen sähköisesti.
            Tämän jälkeen Breatech Finland Oy saa automaattisesti ilmoituksen vuokrasopimuksen allekirjoituksesta.

            Vuokrauksen yhteydessä suoritetaan automaattinen luottotietojen tarkistus.

            Mikäli luottotiedot ovat kunnossa, sopimus etenee normaalisti.

            Mikäli luottotiedot eivät ole kunnossa, vuokrasopimus edellyttää takaajaa.

            Vuokrasopimus astuu voimaan, kun takaaja on allekirjoittanut sopimuksen.`
        },
        {
            question: "Oletko valmis varaamaan asennusajan?",
            explanation: `Kun painat ”Varaa asennus”, sinut ohjataan ajanvarausjärjestelmään.

            Ajanvarauksessa:
            - Valitset alkolukon asennuksen
            - Syötät postinumerosi
            - Näet lähimmät asennuspisteet
            - Valitset sinulle sopivan ajan kalenterista

            Kun asennusaika on varattu, toimitamme alkolukon valittuun asennuspisteeseen.`
        }
    ];

    const [formData, setFormData] = useState({
        nimi: '',
        osoite: '',
        postinumero: '',
        tunnus: '',
        puhelin: '',
        sahkoposti: '',
        rekisterinumero: ''
    });

    const handleAnswer = () => {
        setShowExplanation(true);
        gsap.fromTo(".explanation-container",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    };

    const handleNext = () => {
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: () => {
                setCurrentStep(prev => prev + 1);
                setShowExplanation(false);
                gsap.fromTo(contentRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
            }
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: () => {
                setFormSubmitted(true);
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
                    {formSubmitted ? (
                        <div className="success-box">
                            <h3 className="success-heading">Kiitos. Olemme sinuun yhteydessä mahdollisimman pian.</h3>
                        </div>
                    ) : currentStep <= steps.length ? (
                        <div className="step-box">
                            <h3 className="question-text">{steps[currentStep - 1].question}</h3>

                            {!showExplanation && (
                                <div className="button-group">
                                    <button className="choice-btn" onClick={handleAnswer}>Kyllä</button>
                                    <button className="choice-btn" onClick={handleAnswer}>Ei</button>
                                </div>
                            )}

                            {showExplanation && (
                                <div className="explanation-container">
                                    <div className="explanation-text">
                                        {steps[currentStep - 1].explanation.split('\n').map((line, i) => (
                                            <p key={i}>{line.trim()}</p>
                                        ))}
                                    </div>
                                    <button className="next-btn" onClick={handleNext}>Jatka</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="form-box">
                            <h3 className="form-heading">Tarvitsetko apua? Täytä tiedot ja olemme sinuun yhteydessä.</h3>
                            <p className="form-subtext">Voit myös varata asennuksen tai kysyä lisätietoja alkolukon vuokrauksesta.</p>

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
                                <button type="submit" className="submit-btn" id="submit-btn-logic-fix">Lähetä tiedot</button>
                            </form>
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
                    min-height: 450px;
                }
                .step-box, .form-box, .success-box {
                    background: #1a1a1a;
                    padding: 40px;
                    border-radius: 20px;
                    border: 1px solid #333;
                }
                .question-text {
                    font-size: 1.8rem;
                    font-weight: 600;
                    margin-bottom: 40px;
                    line-height: 1.4;
                }
                .button-group {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 40px;
                }
                .choice-btn {
                    flex: 1;
                    padding: 16px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 12px;
                    border: 1px solid #444;
                    background: transparent;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .choice-btn:hover {
                    border-color: #ff6b00;
                    background: rgba(255, 107, 0, 0.1);
                }
                .explanation-container {
                    border-top: 1px solid #333;
                    padding-top: 40px;
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
                .next-btn, .submit-btn {
                    background: #ff6b00;
                    color: #fff;
                    border: none;
                    padding: 16px 40px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .next-btn:hover, .submit-btn:hover {
                    background: #ff8c3a;
                    transform: translateY(-2px);
                }
                .form-heading {
                    font-size: 1.8rem;
                    margin-bottom: 12px;
                }
                .form-subtext {
                    color: #ccc;
                    margin-bottom: 40px;
                    font-size: 1.1rem;
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
                    font-size: 1rem;
                    transition: all 0.2s ease;
                }
                .form-group input:focus {
                    outline: none;
                    border-color: #ff6b00;
                    box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.2);
                }
                .submit-btn {
                    width: 100%;
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
                    .step-box, .form-box {
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
