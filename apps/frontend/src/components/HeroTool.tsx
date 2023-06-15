
import { IHeroToolSerialised } from "toolhero/src/main/valueObjects/HeroTool";
import HeroText from "./HeroText";
import axios from "axios"

const HeroTool = (props: { tool: IHeroToolSerialised }) => {
    return (
        <>
            <div className="py-4 px-4 bg-gray-300 mb-4">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {props.tool.name}
                </h2>
            </div>
            <div className="px-4">
                {
                    props.tool.input.members.map((member) => {
                        if (member.type === "HeroText") {
                            return <HeroText text={member.member} />
                        }
                        return <div />
                    })
                }
            </div>
            <div className="px-4 py-4">
                <button className="btn btn-primary" onClick={async () => {
                    console.log(props.tool)
                    await axios.post(window.location.href, { tool: props.tool });
                }}>Run</button>
            </div>
        </>
    );
};

export default HeroTool;