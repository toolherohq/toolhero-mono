import { ValueObject } from "../../shared/domain/ValueObject";

export enum EnumHeroButtonType {
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY",
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR"
}

export interface IHeroButtonProps {
    type: EnumHeroButtonType;
    name: string;
    meta: Record<string, any>;
    onClick: string | null;
}

export interface IHeroButtonSerialised {
    path: string;
    type: EnumHeroButtonType;
    name: string;
    meta: Record<string, any>;
    onClick: string | null
}


export class HeroButton extends ValueObject<IHeroButtonProps> {
    public serialise(path: string): IHeroButtonSerialised {
        return {
            path: `${path}-button`,
            type: this.props.type,
            name: this.props.name,
            meta: this.props.meta,
            onClick: this.props.onClick
        }
    }
    public static deserialise(serialised: IHeroButtonSerialised): HeroButton {
        return new HeroButton({
            type: serialised.type,
            name: serialised.name,
            meta: serialised.meta,
            onClick: serialised.onClick,
        })
    }
    public static New(name: string): HeroButton {
        return new HeroButton({
            type: EnumHeroButtonType.PRIMARY,
            name: name,
            meta: {},
            onClick: null
        })
    }

    public onClick(onHeroButtonClick: string): HeroButton {
        this.props.onClick = onHeroButtonClick;
        return this;
    }
}