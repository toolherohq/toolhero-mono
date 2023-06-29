import { ValueObject } from "../../shared/domain/ValueObject";
import { HeroInput, IHeroInputSerialized } from "./HeroInput";
import { HeroOutput } from "./HeroOutput";

export type IOnHeroToolRun = (payload: HeroInput) => Promise<HeroOutput>;
export interface IHeroToolProps {
    name: string;
    input: HeroInput;
    onSubmit: IOnHeroToolRun;
}
export interface IHeroToolSerialised {
    name: string;
    input: IHeroInputSerialized
}

export class HeroTool extends ValueObject<IHeroToolProps> {
    public async serialize(): Promise<IHeroToolSerialised> {
        return {
            name: this.props.name,
            input: await this.props.input.serialize()
        }
    }
    public static New(name: string): HeroTool {
        return new HeroTool({
            name,
            input: HeroInput.New(),
            onSubmit: async (payload: HeroInput) => {
                return HeroOutput.New()
            }
        })
    }

    get input(): HeroInput {
        return this.props.input;
    }

    run(onRun: IOnHeroToolRun) {
        this.props.onSubmit = onRun;
        return this
    }

    get onSubmit(): IOnHeroToolRun {
        return this.props.onSubmit
    }

}