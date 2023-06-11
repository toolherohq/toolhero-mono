import { NextApiRequest, NextApiResponse } from 'next';
import { ToolRenderService } from '../main/services/ToolRenderService';
import { HeroTool } from '../main/valueObjects/HeroTool';
import { HeroResponse } from './HeroResponse';



export type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export class HeroNextManager {
  private tools: HeroTool[];
  constructor() {
    this.tools = [];
  }
  public add(tool: HeroTool): void {
    this.tools.push(tool);
  }
  public nextApiHandler(_inputHandler?: NextApiHandler) {
    const HeroNextHandler = async (
      request: NextApiRequest,
      nextResponse: NextApiResponse
    ) => {
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
    };
    return HeroNextHandler
  }
}

