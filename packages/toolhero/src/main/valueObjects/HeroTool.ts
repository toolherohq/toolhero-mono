import { ValueObject } from "../../shared/domain/ValueObject";
import { HeroInput, IHeroInputSerialized } from "./HeroInput";

export interface IHeroToolProps {
    name: string;
    input: HeroInput;
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
            input: HeroInput.New()
        })
    }

    get input(): HeroInput {
        return this.props.input;
    }
}