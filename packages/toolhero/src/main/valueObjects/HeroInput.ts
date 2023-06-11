import { ValueObject } from "../../shared/domain/ValueObject";
import { HeroText, IHeroTextSerialized } from "./HeroText";


type HeroInputMember = HeroText;
type HeroInputMemberSerilized = IHeroTextSerialized
export interface IHeroInputProps {
    members: {
        type: string;
        member: HeroInputMember
    }[];
}

export interface IHeroInputSerialized {
    members: {
        type: string;
        member: HeroInputMemberSerilized
    }[];
}



export class HeroInput extends ValueObject<IHeroInputProps> {
    public async serialize(): Promise<IHeroInputSerialized> {
        const members: {
            type: string;
            member: HeroInputMemberSerilized
        }[] = [];
        for (const member of this.props.members) {
            members.push({
                type: member.type,
                member: await member.member.serialize()
            });
        }
        return { members }
    }
    public static New(): HeroInput {
        return new HeroInput({
            members: [],
        })
    }

    public add(input: HeroInputMember) {
        this.props.members.push({
            type: input.type(),
            member: input
        });
    }

}