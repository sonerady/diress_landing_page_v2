import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import './Pricing.css';

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const Pricing = ({ translations, lang, setLang }) => {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            name: 'Starter',
            description: 'Perfect for trying out our AI tools',
            monthlyPrice: 9,
            yearlyPrice: 7,
            features: [
                '50 AI generations per month',
                'Basic mannequin dressing',
                'Standard quality exports',
                'Email support',
                '5 saved projects'
            ],
            popular: false,
            buttonStyle: 'secondary'
        },
        {
            name: 'Professional',
            description: 'Best for growing businesses',
            monthlyPrice: 29,
            yearlyPrice: 24,
            features: [
                '500 AI generations per month',
                'Advanced mannequin dressing',
                'HD quality exports',
                'Priority support',
                'Unlimited saved projects',
                'Custom backgrounds',
                'API access'
            ],
            popular: true,
            buttonStyle: 'primary'
        },
        {
            name: 'Enterprise',
            description: 'For large scale operations',
            monthlyPrice: 99,
            yearlyPrice: 79,
            features: [
                'Unlimited AI generations',
                'All Pro features included',
                '4K quality exports',
                'Dedicated support manager',
                'Custom AI model training',
                'White-label solutions',
                'SLA guarantee'
            ],
            popular: false,
            buttonStyle: 'secondary'
        }
    ];

    const faqs = [
        {
            question: 'Can I change plans anytime?',
            answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
        },
        {
            question: 'Is there a free trial?',
            answer: 'Yes! All new users get 10 free AI generations to try our platform before committing.'
        },
        {
            question: 'What happens if I exceed my limit?',
            answer: 'You can purchase additional credits or upgrade your plan. We\'ll notify you before you reach your limit.'
        }
    ];

    return (
        <div className="pricing-page">
            <Header
                currentSlide={-1}
                setSlide={() => { }}
                lang={lang}
                setLang={setLang}
                translations={translations}
            />

            <div className="pricing-container">
                <div className="pricing-header">
                    <h1>Simple, <span>Transparent</span> Pricing</h1>
                    <p>Choose the perfect plan for your needs. No hidden fees, cancel anytime.</p>
                </div>

                <div className="billing-toggle">
                    <span className={!isYearly ? 'active' : ''}>Monthly</span>
                    <div
                        className={`toggle-switch ${isYearly ? 'yearly' : ''}`}
                        onClick={() => setIsYearly(!isYearly)}
                    />
                    <span className={isYearly ? 'active' : ''}>Yearly</span>
                    <span className="save-badge">Save 20%</span>
                </div>

                <div className="pricing-cards">
                    {plans.map((plan, index) => (
                        <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                            {plan.popular && <div className="popular-badge">Most Popular</div>}

                            <div className="card-header">
                                <h3>{plan.name}</h3>
                                <p>{plan.description}</p>
                            </div>

                            <div className="price">
                                <span className="currency">$</span>
                                <span className="amount">
                                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                </span>
                                <span className="period">/month</span>
                            </div>

                            <ul className="features-list">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <span className="check"><CheckIcon /></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`pricing-btn ${plan.buttonStyle}`}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>

                <div className="pricing-faq">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-grid">
                        {faqs.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <h4>{faq.question}</h4>
                                <p>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Link to="/" className="pricing-back">
                ← Back to Home
            </Link>
        </div>
    );
};

export default Pricing;
