import { ValueObject } from "../../shared/domain/ValueObject";
import { HeroButton, IHeroButtonSerialised } from "./HeroButton";

interface IHeroTableRowItem {
    type: string;
    value: string | number | HeroButton;
}

interface IHeroTableRowItemSerialised {
    path: string;
    type: string;
    value: string | number | IHeroButtonSerialised;
}

export interface IHeroTableRowProps {
    items: IHeroTableRowItem[];
}

export interface IHeroTableRowSerialised {
    path: string;
    items: IHeroTableRowItemSerialised[];
}


export class HeroTableRow extends ValueObject<IHeroTableRowProps> {
    public serialise(parentPath: string): IHeroTableRowSerialised {
        const path = `${parentPath}-HeroTableRow`;
        const serialised: IHeroTableRowSerialised = {
            path,
            items: []
        }
        let index = 0;
        for (const item of this.props.items) {
            const indexPath = `${path}-index-${index}`;
            let value: string | number | IHeroButtonSerialised | null = null;
            if (item.type === "HeroButton") {
                value = (item.value as HeroButton).serialise(indexPath)
            } else {
                value = item.value?.toString() as string
            }
            serialised.items.push({
                path: indexPath,
                type: item.type,
                value
            });
            index += 1;
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

    public add(value: string | number | HeroButton) {
        this.props.items.push({
            value,
            type: value?.constructor.name as string
        })
    }

}