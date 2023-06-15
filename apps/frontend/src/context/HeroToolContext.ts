import React from 'react';
import { IHeroTextSerialised } from 'toolhero/src/main/valueObjects/HeroText';
import { IHeroToolSerialised } from 'toolhero/src/main/valueObjects/HeroTool';
export enum EnumHeroToolAction {
    UPDATE_HERO_TEXT = "UPDATE_HERO_TEXT"
}

export interface IHeroToolStateActionPayload {
    heroText?: IHeroTextSerialised
}
export interface IHeroToolStateAction {
    type: EnumHeroToolAction;
    payload: IHeroToolStateActionPayload
}
export interface IHeroToolState {
    tool: IHeroToolSerialised | null;
}
export interface IHeroToolContext {
    state: IHeroToolState,
    dispatch: React.Dispatch<IHeroToolStateAction>;
}

const reducers: Record<
    EnumHeroToolAction,
    (state: IHeroToolState, payload: IHeroToolStateActionPayload) => IHeroToolState
> = {
    [EnumHeroToolAction.UPDATE_HERO_TEXT]: (state: IHeroToolState, _payload: IHeroToolStateActionPayload): IHeroToolState => {
        const heroTextMember = state.tool?.input.members.find((member) => {
            return member.type === "HeroText" && member.member.name === _payload.heroText?.name
        })
        if (heroTextMember) {
            heroTextMember.member.value = _payload.heroText?.value as string
        }

        return state
    }
}

export const HeroToolStateReducer = (
    state: IHeroToolState,
    action: IHeroToolStateAction
): IHeroToolState => {
    const { type, payload } = action;
    const updatedState = reducers[type](state, payload);
    return { ...updatedState };
};
export const HeroToolContext = React.createContext<IHeroToolContext>({
    state: {
        tool: null
    },
    dispatch: () => undefined
})