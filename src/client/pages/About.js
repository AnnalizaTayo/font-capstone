import React, { useState } from 'react';
import CircleVision from "../components/CircleVision"
import CircleMission from "../components/CircleMission"
import CircleLogo from "../components/CircleLogo"
import '../../assets/styles/client/about.scss';


export default function About() {
    const [active, setActive] = useState('logo');

    const handleClick = (props) => {
        setActive(props)
    }

    return (
        <section className="about-page fade-in">
            <div className="about-page-container">
                <div className={active === 'mission' ? 'order-2' : 'order-1'} onClick={() => handleClick('mission')}>
                    <CircleMission active={active === 'mission' ? 'active' : 'inactive'} />
                </div>
                <div className={'mb-54 ' + (active === 'logo' ? 'order-2' : (active === 'mission' ? 'order-1' : 'order-3'))} onClick={() => handleClick('logo')}>
                    <CircleLogo active={active === 'logo' ? 'active' : 'inactive'} />
                </div>
                <div className={active === 'vision' ? 'order-2' : 'order-3'} onClick={() => handleClick('vision')}>
                    <CircleVision active={active === 'vision' ? 'active' : 'inactive'} />
                </div>
            </div>
        </section>
    )
}