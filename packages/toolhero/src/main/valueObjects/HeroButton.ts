import { ValueObject } from "../../shared/domain/ValueObject";

export type IOnHeroButtonClick = () => Promise<void>;
export enum EnumHeroButtonType {
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY",
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR"
}

export interface IHeroButtonProps {
    id: string;
    type: EnumHeroButtonType;
    cta: string;
    meta: Record<string, any>;
    onClick?: IOnHeroButtonClick;
}

export interface IHeroButtonSerialised {
    id: string;
    type: EnumHeroButtonType;
    cta: string;
    meta: Record<string, any>;
}


export class HeroButton extends ValueObject<IHeroButtonProps> {
    public serialize(): IHeroButtonSerialised {
        return {
            id: this.props.id,
            type: this.props.type,
            cta: this.props.cta,
            meta: this.props.meta
        }
    }
    public static deserialise(serialised: IHeroButtonSerialised): HeroButton {
        return new HeroButton({
            id: serialised.id,
            type: serialised.type,
            cta: serialised.cta,
            meta: serialised.meta
        })
    }
    public static New(id: string): HeroButton {
        return new HeroButton({
            id: id,
            type: EnumHeroButtonType.PRIMARY,
            cta: id,
            meta: {}
        })
    }

    public onClick(onHeroButtonClick: IOnHeroButtonClick): HeroButton {
        this.props.onClick = onHeroButtonClick;
        return this;
    }

    public cta(cta: string) {
        this.props.cta = cta;
        return this;
    }


}