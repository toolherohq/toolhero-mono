import { ValueObject } from "../../shared/domain/ValueObject";
import { HeroTableHeader, IHeroTableHeaderSerialised } from "./HeroTableHeader";
import { HeroTableRow, IHeroTableRowSerialised } from "./HeroTableRow";

export interface IHeroTableProps {
    header: HeroTableHeader;
    rows: HeroTableRow[];
}

export interface IHeroTableSerialised {
    path: string;
    header: IHeroTableHeaderSerialised;
    rows: IHeroTableRowSerialised[];
}


export class HeroTable extends ValueObject<IHeroTableProps> {
    public serialise(parentPath: string): IHeroTableSerialised {
        const path = `${parentPath}-HeroTable`;
        return {
            path,
            header: this.props.header.serialise(),
            rows: this.props.rows.map((r, index) => r.serialise(`${path}-index-${index}`))
        }
    }
    public static deserialise(serialised: IHeroTableSerialised): HeroTable {
        return new HeroTable({
            header: HeroTableHeader.deserialise(serialised.header),
            rows: serialised.rows.map((r) => HeroTableRow.deserialise(r))
        })
    }
    public static New(): HeroTable {
        return new HeroTable({
            header: HeroTableHeader.New(),
            rows: []
        })
    }

    get header(): HeroTableHeader {
        return this.props.header
    }

    get rows(): HeroTableRow[] {
        return this.props.rows
    }

}