import React, { useEffect } from "react";
import "./Offers.css";
import Aos from 'aos';
import 'aos/dist/aos.css';

const reviews = [
    {
        id: 1,
        reviewer: 'Katy Smith',
        location: 'Kyoto, Japan',
        rating: 5, // Rating out of 5
        reviewText: 'Kyoto is an absolute gem! From its stunning temples to the tranquil gardens, it truly offers a nature that is unmatched. A must-visit for anyone seeking to experience Japan\'s cultural heart.',
    },
    {
        id: 2,
        reviewer: 'Jane Loey',
        location: 'Kyoto, Japan',
        rating: 4, // Rating out of 5
        reviewText: 'I had a fantastic time in Kyoto! The city is full of beautiful shrines and peaceful spots like the Arashiyama Bamboo Grove. It\'s the perfect place to experience traditional Japan.',
    },
    {
        id: 3,
        reviewer: 'Emily Brown',
        location: 'Kyoto, Japan',
        rating: 4, // Rating out of 5
        reviewText: 'Kyoto offers a unique charm that no other city in Japan has. The historical districts like Gion are like stepping back in time, and the food scene is exceptional. A beautiful blend of old and new!',
    },
    
    
    
    
    
    
];

const Offers = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <section className="offer container section">
            <div className="secContainer">
                <div data-aos="fade-up" data-aos-duration="2000" className="secIntro">
                    <h2 className="secTitle">
                        What People Are Saying About Kyoto
                    </h2>
                    <p>
                        Discover why Kyoto is one of the best destinations to visit in Japan.
                    </p>
                </div>
                <div className="mainContent grid">
                    {
                        reviews.map(({ id, reviewer, location, rating, reviewText }) => {
                            return (
                                <div data-aos="fade-up" data-aos-duration="3000" className="singleOffer" key={id}>
                                    <div className="offerBody">
                                        <div className="reviewHeader">
                                            <h4>{reviewer}</h4>
                                            <small>{location}</small>
                                        </div>
                                        <div className="rating">
                                            <span>{'⭐'.repeat(rating)}</span>
                                        </div>
                                        <p>{reviewText}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default Offers;
