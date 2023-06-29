import axios from "axios";
import { IHeroOutputSerialized } from "toolhero/src/main/valueObjects/HeroOutput";
import { IHeroToolSerialised } from "toolhero/src/main/valueObjects/HeroTool";
import { Result } from "toolhero/src/shared/core/Result";

export interface IApiClient {
    runTool(tool: IHeroToolSerialised): Promise<Result<IHeroOutputSerialized>>
}

export class ApiClient implements IApiClient {
    private baseUrl: string;
    constructor() {
        this.baseUrl = window.location.href
    }
    async runTool(tool: IHeroToolSerialised): Promise<Result<IHeroOutputSerialized>> {
        try {
            const response = await axios.post<{ output: IHeroOutputSerialized }>(this.baseUrl, { tool });
            const { output } = response.data;
            return Result.ok(output)
        } catch (err) {
            return Result.fail({
                code: "TOOL_EXECUTION_ERROR",
                message: (err as Error)?.message
            })
        }
    }

}