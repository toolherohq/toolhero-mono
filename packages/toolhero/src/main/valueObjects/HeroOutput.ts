import { ValueObject } from "../../shared/domain/ValueObject";
import { HeroTable, IHeroTableSerialised } from "./HeroTable";


type HeroOutputMember = HeroTable;
type HeroOutputMemberSerialised = IHeroTableSerialised
export interface IHeroOutputProps {
    members: {
        type: string;
        member: HeroOutputMember
    }[];
}

export interface IHeroOutputSerialized {
    members: {
        type: string;
        member: HeroOutputMemberSerialised
    }[];
}



export class HeroOutput extends ValueObject<IHeroOutputProps> {
    public serialise(): IHeroOutputSerialized {
        const members: {
            type: string;
            member: HeroOutputMemberSerialised
        }[] = [];
        for (const member of this.props.members) {
            members.push({
                type: member.type,
                member: member.member.serialise()
            });
        }
        return { members }
    }
    public static New(): HeroOutput {
        return new HeroOutput({
            members: [],
        })
    }

    public add(input: HeroOutputMember) {
        this.props.members.push({
            type: input.type(),
            member: input
        });
    }

}