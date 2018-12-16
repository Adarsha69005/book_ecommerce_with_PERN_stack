import React from 'react';
import { Carousel } from 'react-bootstrap';

function Slide(){
    return(
        <div>
            <Carousel>
                <Carousel.Item>
                  <img width={900} height={300} alt="900x300" src="/clientimages/home1.jpg"/>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={900} height={300} alt="900x300" src="/clientimages/home3.jpg"/>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={900} height={300} alt="900x300" src="/clientimages/home3.jpg"/>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Slide;