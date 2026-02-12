import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        id: 1,
        question: "Oletko pyytänyt tai saanut poliisilta luvan valvottuun ajo-oikeuteen?",
        answer: (
            <>
                <p>Valvottua ajo-oikeutta kannattaa pyytää poliisilta heti tai viimeistään rattijuopumusasian käsittelyn yhteydessä tuomioistuimelta.</p>
                <p>Suosittelemme varmistamaan poliisilta, että sinulla on mahdollisuus saada alkolukkoajokortti.</p>
                <p>Poliisi antaa tarvittaessa lisätietoja alkolukkoajokortin hakemisesta ja siihen liittyvistä vaatimuksista.</p>
            </>
        ),
        buttonText: "Kyllä",
        noButtonText: "Ei"
    },
    {
        id: 2,
        question: "Oletko käynyt lääkärin tai muun terveydenhuollon ammattihenkilön kanssa keskustelun päihteiden käytöstä ja saanut siitä todistuksen?",
        answer: (
            <>
                <p>Hanki todistus lääkärin tai muun terveydenhuollon ammattihenkilön kanssa käydystä keskustelusta (päihteiden käyttö).</p>
                <p>Todistus liitetään ajokorttihakemukseen ja toimitetaan poliisille.</p>
                <p>Kun toimitat kaikki tarvittavat dokumentit poliisille, poliisi voi myöntää sinulle väliaikaisen ajokortin.</p>
            </>
        ),
        buttonText: "Kyllä",
        noButtonText: "Ei"
    },
    {
        id: 3,
        question: "Oletko valmis varaamaan asennusajan ja auton muutoskatsastuksen?",
        answer: (
            <>
                <p>Kun painat ”Varaa asennus”, sinut ohjataan ajanvarausjärjestelmään.</p>
                <p>Ajanvarauksessa:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '16px', color: '#ccc' }}>
                    <li>Valitset alkolukon asennuksen</li>
                    <li>Syötät postinumerosi</li>
                    <li>Näet lähimmät asennuspisteet</li>
                    <li>Valitset sinulle sopivan ajan kalenterista</li>
                </ul>
                <p>Kun asennusaika on varattu, saamme siitä automaattisesti tiedon ja toimitamme alkolukon valittuun asennuspisteeseen.</p>
            </>
        ),
        buttonText: "Kyllä",
        noButtonText: "Ei"
    },
    {
        id: 4,
        question: "Oletko valmis vuokraamaan alkolukon?",
        answer: (
            <>
                <p>Kun alkolukon vuokrasopimus avautuu näytölle, voit täyttää tarvittavat tiedot sähköisesti.</p>
                <p>Sopimuksen täyttämisen jälkeen allekirjoitat sopimuksen ”Allekirjoita”-painikkeen kautta sähköisesti.</p>
                <p>Tämän jälkeen Breatech Finland Oy saa automaattisesti ilmoituksen vuokrasopimuksen allekirjoituksesta.</p>
                <p>Vuokrauksen yhteydessä suoritetaan automaattinen luottotietojen tarkistus.</p>
                <p>Mikäli luottotiedot ovat kunnossa, sopimus etenee normaalisti.</p>
                <p>Mikäli luottotiedot eivät ole kunnossa, saat ilmoituksen, että vuokrasopimus edellyttää takaajaa.</p>
                <p>Tällöin voit syöttää takaajan tiedot suoraan vuokrasopimukseen ja lähettää takaajalle linkin sähköistä allekirjoitusta varten.</p>
                <p>Vuokrasopimus astuu voimaan, kun takaaja on allekirjoittanut sopimuksen.</p>
            </>
        ),
        buttonText: "Kyllä",
        noButtonText: "Ei"
    }
];

const GuidedProcess = () => {
    // Current step index user is interacting with (0-3)
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    // Tracks which steps have been "revealed" (answer shown)
    const [revealedSteps, setRevealedSteps] = useState(new Set());
    // Tracks which steps have been completed (Jatka clicked)
    const [completedSteps, setCompletedSteps] = useState(new Set());

    const [showForm, setShowForm] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const stepRefs = useRef([]);
    const formRef = useRef(null);
    const containerRef = useRef(null);

    const [formData, setFormData] = useState({
        nimi: '',
        osoite: '',
        postinumero: '',
        tunnus: '',
        puhelin: '',
        sahkoposti: '',
        rekisterinumero: ''
    });

    const handleReveal = (index) => {
        setRevealedSteps(prev => new Set(prev).add(index));
        // Animate revealing
        const answerEl = stepRefs.current[index].querySelector('.step-answer');
        gsap.fromTo(answerEl,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
    };

    const handleReset = () => {
        // Clear all state to start over
        setActiveStepIndex(0);
        setRevealedSteps(new Set());
        setCompletedSteps(new Set());
        setShowForm(false);
        setFormSubmitted(false);
        setFormData({
            nimi: '',
            osoite: '',
            postinumero: '',
            tunnus: '',
            puhelin: '',
            sahkoposti: '',
            rekisterinumero: ''
        });

        // Scroll to top of container
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleNextStep = (index) => {
        setCompletedSteps(prev => new Set(prev).add(index));

        if (index < STEPS.length - 1) {
            setActiveStepIndex(index + 1);
            // Smooth scroll to next step after a short delay
            setTimeout(() => {
                const nextStepEl = stepRefs.current[index + 1];
                if (nextStepEl) {
                    nextStepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Animate next step appearance
                    gsap.fromTo(nextStepEl,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5 }
                    );
                }
            }, 100);
        } else {
            // Finished last step
            setShowForm(true);
            setTimeout(() => {
                if (formRef.current) {
                    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    gsap.fromTo(formRef.current,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5 }
                    );
                }
            }, 100);
        }
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        // Scroll to confirmation area
        setTimeout(() => {
            const successEl = document.getElementById('confirmation-area');
            if (successEl) {
                successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    const handleFinalYes = () => {
        window.location.href = 'https://fixushuolto.fi/eox/huolto';
    };

    const handleFinalNo = () => {
        handleReset();
    };

    return (
        <section id="ohjattu-prosessi" className="guided-process" ref={containerRef}>
            <div className="container">
                <h2 className="gp-heading">Ajokortin saamiseen tarvittavat toimenpiteet</h2>
                <p className="gp-intro">
                    Alla olevat vaiheet ohjaavat sinua askel askeleelta alkolukkoajokortin hakemisessa ja alkolukon vuokraamisessa.
                </p>

                <div className="steps-container">
                    {STEPS.map((step, index) => {
                        // Only show steps that are active or completed/revealed history
                        if (index > activeStepIndex) return null;

                        const isRevealed = revealedSteps.has(index);
                        const isCompleted = completedSteps.has(index);

                        return (
                            <div
                                key={step.id}
                                ref={el => stepRefs.current[index] = el}
                                className={`step-item ${isCompleted ? 'completed' : ''}`}
                            >
                                <h3 className="question-text">{step.question}</h3>

                                {!isRevealed && !isCompleted && (
                                    <div className="button-group-step">
                                        <button className="action-btn" onClick={() => handleReveal(index)}>
                                            {step.buttonText}
                                        </button>
                                        <button className="action-btn secondary-btn" onClick={handleReset}>
                                            {step.noButtonText}
                                        </button>
                                    </div>
                                )}

                                <div className="step-answer" style={{ display: isRevealed ? 'block' : 'none', opacity: isRevealed ? 1 : 0 }}>
                                    <div className="answer-content">
                                        {step.answer}
                                    </div>
                                    {!isCompleted && (
                                        <button className="action-btn continue-btn" onClick={() => handleNextStep(index)}>
                                            Jatka
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {showForm && !formSubmitted && (
                    <div className="form-container" ref={formRef}>
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
                            <button type="submit" className="action-btn submit-btn">Lähetä</button>
                        </form>
                    </div>
                )}

                {formSubmitted && (
                    <div id="confirmation-area" className="confirmation-box">
                        <h3 className="question-text">Haluatko siirtyä varaamaan asennusajan nyt?</h3>
                        <div className="button-group">
                            <button className="action-btn choice-btn" onClick={handleFinalYes}>Kyllä</button>
                            <button className="action-btn choice-btn" onClick={handleFinalNo}>Ei</button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .guided-process {
                    background-color: #121212;
                    padding: 120px 20px;
                    color: #ffffff;
                }
                .container {
                     max-width: 800px; /* Keep consistent with design */
                     margin: 0 auto;
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

                .step-item {
                    background: #1a1a1a;
                    padding: 30px;
                    border-radius: 16px;
                    border: 1px solid #333;
                    margin-bottom: 24px;
                    transition: all 0.3s ease;
                }
                .step-item.completed {
                    opacity: 0.6; /* Dim completed steps slightly to focus on new one */
                    border-color: #222;
                }
                .step-item.completed:hover {
                    opacity: 1;
                }

                .question-text {
                    font-size: 1.4rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                    line-height: 1.4;
                    color: #fff;
                }
                
                .answer-content {
                    margin-bottom: 24px;
                    color: #ccc;
                    line-height: 1.7;
                    font-size: 1.1rem;
                    padding-top: 10px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .answer-content p {
                    margin-bottom: 12px;
                }

                .button-group-step {
                    display: flex;
                    gap: 16px;
                }

                .action-btn {
                    background: var(--color-accent-orange);
                    color: #fff;
                    border: none;
                    padding: 14px 32px;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: inline-block;
                    box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
                }
                .action-btn:hover {
                    background: var(--color-accent-orange-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(255, 107, 0, 0.4);
                }
                .secondary-btn {
                    background: transparent;
                    border: 1px solid #444;
                    box-shadow: none;
                }
                .secondary-btn:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: #666;
                    box-shadow: none;
                }

                .continue-btn {
                    margin-top: 10px;
                }

                .form-container {
                    background: #1a1a1a;
                    padding: 40px;
                    border-radius: 20px;
                    border: 1px solid #333;
                    margin-top: 40px;
                    overflow-anchor: none; /* Layout stability */
                    min-height: 600px;
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
                    gap: 20px;
                    margin-bottom: 30px;
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
                    font-size: 16px; /* No zoom */
                    transition: all 0.2s ease;
                }
                .form-group input:focus {
                    outline: none;
                    border-color: var(--color-accent-orange);
                    box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.2);
                }
                .submit-btn {
                    width: 100%;
                    text-align: center;
                }

                .confirmation-box {
                    background: #1a1a1a;
                    padding: 40px;
                    border-radius: 20px;
                    border: 1px solid #333;
                    margin-top: 40px;
                    text-align: center;
                    min-height: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .button-group {
                    display: flex;
                    gap: 20px;
                    margin-top: 20px;
                }
                .choice-btn {
                    min-width: 120px;
                }
                .success-heading {
                    font-size: 1.6rem;
                    color: #4ade80;
                }
                
                @media (max-width: 768px) {
                    .step-item {
                        padding: 20px;
                    }
                    .question-text {
                        font-size: 1.2rem;
                    }
                    .form-container, .confirmation-box {
                        padding: 24px;
                    }
                    .button-group {
                        flex-direction: column;
                        width: 100%;
                    }
                    .choice-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </section>
    );
};

export default GuidedProcess;
