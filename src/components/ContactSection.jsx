import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
    const formRef = useRef(null);
    const fieldsRef = useRef([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        gsap.fromTo(fieldsRef.current,
            {
                opacity: 0,
                x: -30
            },
            {
                scrollTrigger: {
                    trigger: formRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                },
                opacity: 1,
                x: 0,
                stagger: 0.15,
                ease: 'power2.out'
            }
        );
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, just show success message
        // In production, this would send to an API
        console.log('Form submitted:', formData);
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <section id="ota-yhteytta" className="contact-section">
            <div className="container">
                <h2 className="contact-heading">Tarvitsetko apua tai lisätietoa?</h2>
                <p className="contact-intro">
                    Vastaamme kysymyksiisi ja autamme sinua ymmärtämään tilanteesi.<br />
                    Yhteydenotto ei sido sinua mihinkään.
                </p>

                {submitted ? (
                    <div className="success-message">
                        <p>✓ Kiitos viestistäsi! Otamme sinuun yhteyttä pian.</p>
                    </div>
                ) : (
                    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                        <div ref={el => fieldsRef.current[0] = el} className="form-group">
                            <label htmlFor="name">Nimi</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div ref={el => fieldsRef.current[1] = el} className="form-group">
                            <label htmlFor="email">Sähköposti</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div ref={el => fieldsRef.current[2] = el} className="form-group">
                            <label htmlFor="message">Viesti</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Lähetä viesti
                        </button>
                    </form>
                )}
            </div>

            <style>{`
                .contact-section {
                    background-color: #0a0a0a;
                    padding: 100px 20px;
                }

                .contact-heading {
                    font-size: 2.5rem;
                    font-weight: 700;
                    text-align: center;
                    margin-bottom: 24px;
                    color: #ffffff;
                }

                .contact-intro {
                    text-align: center;
                    max-width: 600px;
                    margin: 0 auto 60px;
                    font-size: 1.1rem;
                    color: #cccccc;
                    line-height: 1.7;
                }

                .contact-form {
                    max-width: 600px;
                    margin: 0 auto;
                }

                .form-group {
                    margin-bottom: 30px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 10px;
                    font-size: 1rem;
                    font-weight: 500;
                    color: #ffffff;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 14px 18px;
                    font-size: 1rem;
                    background-color: #1a1a1a;
                    border: 2px solid #2a2a2a;
                    border-radius: 8px;
                    color: #ffffff;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    transition: all 0.3s ease;
                }

                .form-group input:hover,
                .form-group textarea:hover {
                    border-color: #3a3a3a;
                    background-color: #1f1f1f;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #ff6b00;
                    box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
                }

                .form-group textarea {
                    resize: vertical;
                    min-height: 120px;
                }

                .submit-button {
                    width: 100%;
                    padding: 16px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    background-color: #ff6b00;
                    color: #ffffff;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .submit-button:hover {
                    background-color: #ff8c3a;
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 6px 20px rgba(255, 107, 0, 0.4);
                }

                .success-message {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 30px;
                    background-color: #1a3a1a;
                    border: 2px solid #2a6a2a;
                    border-radius: 8px;
                    text-align: center;
                }

                .success-message p {
                    font-size: 1.2rem;
                    color: #4ade80;
                    margin: 0;
                }

                @media (max-width: 768px) {
                    .contact-section {
                        padding: 80px 20px;
                    }

                    .contact-heading {
                        font-size: 2rem;
                    }

                    .contact-intro {
                        font-size: 1rem;
                        margin-bottom: 40px;
                    }

                    .form-group {
                        margin-bottom: 24px;
                    }
                }
            `}</style>
        </section>
    );
};

export default ContactSection;
