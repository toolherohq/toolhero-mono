import { IHeroButtonSerialised } from 'toolhero/src/main/valueObjects/HeroButton';

const HeroButton = ({ button }: { button: IHeroButtonSerialised }) => {
    return (
        <div>
            <button className="btn btn-primary btn-sm">{button.name}</button>
        </div>
    );
};

export default HeroButton;