import { ValueObject } from "../../shared/domain/ValueObject";
type IHeroTableHeaderItem = string

export interface IHeroTableHeaderProps {
    items: IHeroTableHeaderItem[];
}

export interface IHeroTableHeaderSerialised {
    items: IHeroTableHeaderItem[];
}


export class HeroTableHeader extends ValueObject<IHeroTableHeaderProps> {
    public serialise(): IHeroTableHeaderSerialised {
        return this.props
    }
    public static deserialise(serialised: IHeroTableHeaderSerialised): HeroTableHeader {
        return new HeroTableHeader({
            items: serialised.items,
        })
    }
    public static New(): HeroTableHeader {
        return new HeroTableHeader({
            items: []
        })
    }

    public push(item: IHeroTableHeaderItem) {
        this.props.items.push(item)
    }

}