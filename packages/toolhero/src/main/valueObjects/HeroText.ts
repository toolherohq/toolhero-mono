import { ValueObject } from "../../shared/domain/ValueObject";

export type IDefaultString = () => string | Promise<string>;


export interface IHeroTextProps {
    name: string;
    value: string | IDefaultString | null;
}

export interface IHeroTextSerialized {
    name: string;
    value: string | null;
}


export class HeroText extends ValueObject<IHeroTextProps> {
    public async serialize(): Promise<IHeroTextSerialized> {
        let value = null;
        if (this.props.value) {
            if (typeof this.props.value === "function") {
                value = await (this.props.value as unknown as IDefaultString)();
            } else {
                value = this.props.value
            }
        }
        return {
            name: this.props.name,
            value
        }
    }
    public static New(name: string): HeroText {
        return new HeroText({
            name,
            value: null
        })
    }
    public default(value: string | IDefaultString) {
        this.props.value = value
        return this
    }
}