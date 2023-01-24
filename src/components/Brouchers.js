import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import React, { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,

};

class Brouchers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    async componentDidMount() {
        const db = getFirestore();
        await getDocs(collection(db, "announcements")).then(
            (querySnapshot) => {
                const newData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                this.setState({ data: newData })
                console.log(newData);
            }
        );
    }
    render() {
        return (
            <>
                <div className="tag">
                    <h1>Brouchers</h1>
                </div>
                <div className="imgslider imgscroll">
                    <Slider {...settings}>
                        {
                            this.state.data &&
                            this.state.data.length > 0 && this.state.data.map((item) => (
                                <div key={item.id}>
                                    <img src={item.json.broucher} alt={item.json.description} />
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </>
        )
    }

}

export default Brouchers;
