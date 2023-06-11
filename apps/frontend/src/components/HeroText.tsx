
import { IHeroTextSerialized } from 'toolhero/src/main/valueObjects/HeroText';

const HeroText = (props: { text: IHeroTextSerialized }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.text.name}>
                {props.text.name}
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
        </div>
    );
};

export default HeroText;