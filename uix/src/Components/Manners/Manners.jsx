import React, { useEffect } from "react";
import "./Manners.css";

import img from '../../Assets/bowing.webp';
import img2 from '../../Assets/tip.jpg';
import img4 from '../../Assets/cards_enhanced.jpeg';
import img5 from '../../Assets/elderyjpg.jpg';
import img6 from '../../Assets/train.jpg';

import Aos from 'aos';
import 'aos/dist/aos.css';

const Manners = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <section className="about">
            <div className="aboutContainer container">
                <div style={{ height: '50px' }}></div>
                <div className="finalPhrase">
                    <p>
                        To be a considerate tourist, it's always thoughtful to respect the local culture. While perfection isn’t expected, making a sincere effort is a kind gesture that will surely be appreciated! 😊
                    </p>
                </div>
                <div className="aboutContent notreverse">
                    <div data-aos="fade-up" className="imageRight">
                        <img src={img} alt="Another Travel Image" className="img" />
                    </div>

                    <div data-aos="fade-up" className="textRight">
                        <h2>Bowing</h2>
                        <p>
                            Bowing is an essential custom in Japan, symbolizing respect, gratitude, or apology.
                            The angle and duration of the bow can convey different levels of respect, with deeper and longer bows showing higher regard.
                        </p>
                    </div>
                </div>

                <div className="aboutContent notreverse">
                    <div data-aos="fade-up" className="imageRight">
                        <img src={img2} alt="Another Travel Image" className="img" />
                    </div>
                    <div data-aos="fade-up" className="textRight">
                        <h2>Not Giving Tips</h2>
                        <p>
                            Unlike many other countries, tipping in Japan is not customary and can sometimes be seen as disrespectful.
                            Outstanding service is considered part of the job,
                            and expressing verbal gratitude or leaving a kind review
                            is more appropriate.
                        </p>
                    </div>
                </div>

                <div className="aboutContent notreverse">
                    <div data-aos="fade-up" className="imageRight">
                        <img src={img4} alt="Another Travel Image" className="img" />
                    </div>
                    <div data-aos="fade-up" className="textRight">
                        <h2>Receiving Cards with Two Hands</h2>
                        <p>
                            Exchanging business cards is a formal ritual in Japan. When receiving a card,
                            always use both hands and take a brief moment to read and acknowledge the information before putting it away.
                        </p>
                    </div>
                </div>

                <div className="aboutContent notreverse">
                    <div data-aos="fade-up" className="imageRight">
                        <img src={img5} alt="Another Travel Image" className="img" />
                    </div>
                    <div data-aos="fade-up" className="textRight">
                        <h2>Showing Respect to Older People</h2>
                        <p>
                            In Japanese culture, respect for elders is deeply rooted.
                            This is demonstrated by offering them seats on public transport, letting them go first in lines, and addressing them with honorifics.
                        </p>
                    </div>
                </div>

                <div className="aboutContent notreverse">
                    <div data-aos="fade-up" className="imageRight">
                        <img src={img6} alt="Another Travel Image" className="img" />
                    </div>
                    <div data-aos="fade-up" className="textRight">
                        <h2>Using Public Transport Quietly</h2>
                        <p>
                            While using public transport, it’s important to maintain a quiet atmosphere.
                            Loud conversations, phone calls, or playing music without headphones are discouraged.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Manners;
