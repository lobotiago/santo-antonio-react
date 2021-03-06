import React, {useState, useEffect} from 'react'
import {Animated} from "react-animated-css";

import VideoPlayer from '../../Sections/VideoPlayer'

import './styles.scss'

const PhotoPreview = (props) => {
    const [currIndex,
        setCurrIndex] = useState(0);
    const [sliderData,
        setSliderData] = useState([]);
    // eslint-disable-next-line
    const [showModal,
        setShowModal] = useState(false);

    useEffect(() => {
        if (props.items) {
            setSliderData(props.items)
            console.log('Length', sliderData.length)
        }
    }, [props.items, sliderData.length]);

    // eslint-disable-next-line
    const activeGaleria = () => {
        setShowModal(true);
    }

    const movePrev = () => {
        if (currIndex !== 0) {
            setCurrIndex(old => old > 1
                ? old - 1
                : sliderData.length - 1);
        }
    }

    const moveNext = () => {
        setCurrIndex(old => old < sliderData.length - 1
            ? old + 1
            : 0)
    }

    return (
        <React.Fragment>
            <header className="interna-subheader">
                <div className="caption">
                    <img
                        src={require('../../../assets/images/ico/play.png')}
                        alt=""
                        className="ico"/>
                    <h4 className="title">Vídeos</h4>
                </div>
                <div className="PhotoPreview__navs">
                    <button class="PhotoPreview__arrow left" onClick={movePrev}></button>
                    <div className="PhotoPreview__position">
                        {props.videos.length === 0 ? 
                         <span className="current">0</span> : 
                         <span className="current">{currIndex === 1 ? currIndex + 1 : 1}</span>}
                        /
                        {props.videos.length === 0 ?
                         <span className="total">0</span>
                        :  
                        <span className="total">{props.videos > 1
                            ? Math.ceil(props.videos / 4)
                            : 1}</span>}
                    </div>
                    <button class="PhotoPreview__arrow right" onClick={moveNext}></button>
                </div>
            </header>

            <section className="PhotoPreview">
                <div className="row">
                    {props.videos ? 

                        // eslint-disable-next-line
                        props.videos.map((video, i) => {
                            if(i < currIndex + 1 * 4){
                                return(
                                    <div className="col-lg-6 mb-4" key={i}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <VideoPlayer
                                                size="sm"
                                                image={video.thumb}
                                                url={video.link}
                                                cap1={video.data}
                                                cap2={video.descricao}/>
                                        </Animated>
                                    </div>
                                )
                            }
                        }) : null}
                </div>
            </section>
        </React.Fragment>
    )
}

export default PhotoPreview