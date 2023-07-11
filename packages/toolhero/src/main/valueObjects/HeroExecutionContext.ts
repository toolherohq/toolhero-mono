import { HeroButton } from "./HeroButton";

export interface HeroUIEvent {
    source: {
        button?: HeroButton
    }
}
export interface HeroExecutionContext {
    event?: HeroUIEvent;
}
