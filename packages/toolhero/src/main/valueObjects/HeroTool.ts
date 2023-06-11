import { ValueObject } from "../../shared/domain/ValueObject";


export interface IHeroToolProps {
    name: string;
}

export class HeroTool extends ValueObject<IHeroToolProps> {
    public serialize() {
        return this.props;
    }
    public static New(name: string): HeroTool {
        return new HeroTool({
            name
        })
    }
}