import React from 'react';
import { IHeroButtonSerialised } from 'toolhero/src/main/valueObjects/HeroButton';

const HeroButton = ({ button }: { button: IHeroButtonSerialised }) => {
    return (
        <div>
            <button className="btn btn-primary btn-sm">{button.cta}</button>
        </div>
    );
};

export default HeroButton;