import { NextApiRequest, NextApiResponse } from 'next';
import { ToolRenderService } from '../main/services/ToolRenderService';
import { HeroTool } from '../main/valueObjects/HeroTool';
import { HeroResponse } from './HeroResponse';
import { HeroInput } from '../main/valueObjects/HeroInput';



export type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export class HeroNextManager {
  private tools: HeroTool[];
  constructor() {
    this.tools = [];
  }
  public add(tool: HeroTool): void {
    this.tools.push(tool);
  }
  private async handleGet(request: NextApiRequest,
    nextResponse: NextApiResponse): Promise<void> {

    // build request and response objects for routing
    // const req = new HeroRequest(nextRequest);
    const res = new HeroResponse(nextResponse);
    if (!request.query.tool) {
      return res.error({
        code: 'TOOL_NOT_PROVIDED',
        message: 'Please provide a tool name',
        status: 404,
      });
    }

    const toolRenderService = new ToolRenderService(this.tools[0]);
    // if none of the routes match, return a 404 response
    //const html = 
    res.okHtml(await toolRenderService.render());
  }

  private async handlePost(request: NextApiRequest,
    nextResponse: NextApiResponse): Promise<void> {

    // build request and response objects for routing
    // const req = new HeroRequest(nextRequest);
    const res = new HeroResponse(nextResponse);
    const tool = this.tools[0];
    const heroInput = HeroInput.deserialise(request.body.tool.input);
    if (!request.query.tool) {
      return res.error({
        code: 'TOOL_NOT_PROVIDED',
        message: 'Please provide a tool name',
        status: 404,
      });
    }

    const response = await tool.onSubmit(heroInput, {});
    const json = {
      output: response.serialise()
    }
    console.log(json);
    res.json(json)
  }
  public nextApiHandler(_inputHandler?: NextApiHandler) {
    const HeroNextHandler = async (
      request: NextApiRequest,
      response: NextApiResponse
    ) => {
      const res = new HeroResponse(response);
      if (request.method === "GET") {
        return this.handleGet(request, response);
      }
      return this.handlePost(request, response)

      return res.error({
        code: 'METHOD_NOT_SUPPORTED',
        message: 'METHOD_NOT_SUPPORTED',
        status: 404,
      });

    };
    return HeroNextHandler
  }
}

