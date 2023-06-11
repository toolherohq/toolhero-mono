import { ValueObject } from "../../shared/domain/ValueObject";
import { HeroInput, IHeroInputSerialized } from "./HeroInput";

export type IOnHeroToolSubmit = () => void;
export interface IHeroToolProps {
    name: string;
    input: HeroInput;
    onSubmit: IOnHeroToolSubmit;
}
export interface IHeroToolSeralised {
    name: string;
    input: IHeroInputSerialized
}

export class HeroTool extends ValueObject<IHeroToolProps> {
    public async serialize(): Promise<IHeroToolSeralised> {
        return {
            name: this.props.name,
            input: await this.props.input.serialize()
        }
    }
    public static New(name: string): HeroTool {
        return new HeroTool({
            name,
            input: HeroInput.New(),
            onSubmit: () => { }
        })
    }

    get input(): HeroInput {
        return this.props.input;
    }

    onSubmit(onHeroToolSubmit: IOnHeroToolSubmit) {
        this.props.onSubmit = onHeroToolSubmit;
        return this
    }

}