import { ValueObject } from "../../shared/domain/ValueObject";
import { EnumHeroDataType } from "./EnumHeroDataType";
import { HeroButton, IHeroButtonSerialised } from "./HeroButton";

interface IHeroTableRowItem {
    headerId: string;
    type: string;
    value: string | number | HeroButton | null;
}

interface IHeroTableRowItemSerialised {
    headerId: string;
    type: string;
    value: string | number | IHeroButtonSerialised | null;
}

export interface IHeroTableRowProps {
    items: IHeroTableRowItem[];
}

export interface IHeroTableRowSerialised {
    items: IHeroTableRowItemSerialised[];
}


export class HeroTableRow extends ValueObject<IHeroTableRowProps> {
    public serialize(): IHeroTableRowSerialised {
        const serialised: IHeroTableRowSerialised = {
            items: []
        }
        for (const item of this.props.items) {
            let value: string | number | IHeroButtonSerialised | null = null;
            if (item.type === "HeroButton") {
                value = (item.value as HeroButton).serialize()
            } else {
                value = item.value?.toString() as string
            }
            serialised.items.push({
                headerId: item.headerId,
                type: item.type,
                value
            })
        }
        return serialised;
    }
    public static deserialise(serialised: IHeroTableRowSerialised): HeroTableRow {
        return new HeroTableRow({
            items: [],
        })
    }
    public static New(): HeroTableRow {
        return new HeroTableRow({
            items: []
        })
    }

    public add(item: { headerId: string; value: string | number | HeroButton | null }) {
        this.props.items.push({
            headerId: item.headerId,
            value: item.value,
            type: item.value?.constructor.name as string
        })
    }

}