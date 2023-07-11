import { IHeroButtonSerialised } from 'toolhero/src/main/valueObjects/HeroButton';
import { ApiClient } from '../client/ApiClient';
import { useContext } from 'react';
import { HeroToolContext, IHeroToolContext } from '../context/HeroToolContext';

const HeroButton = ({ button }: { button: IHeroButtonSerialised }) => {
    const { dispatch, state } = useContext<IHeroToolContext>(HeroToolContext);
    return (
        <div onClick={async (ev) => {
            if (!state.tool) {
                return;
            }
            console.log(button);
            const apiClient = new ApiClient();
            const responseOrError = await apiClient.onButtonClick(state?.tool, button);
        }}>
            <button className="btn btn-primary btn-sm">{button.name}</button>
        </div>
    );
};

export default HeroButton;