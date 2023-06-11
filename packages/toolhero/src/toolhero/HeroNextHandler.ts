import { NextApiRequest, NextApiResponse } from 'next';
import { HeroResponse } from './HeroResponse';
import { HeroTool } from "toolhero"
import { HtmlAppService } from '../main/services/HtmlAppService';


export type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export class HeroNextManager {
  private tools: HeroTool[];
  private htmlAppService: HtmlAppService;
  constructor() {
    this.tools = [];
    this.htmlAppService = new HtmlAppService()
  }
  public add(tool: HeroTool): void {
    this.tools.push(tool);
    this.htmlAppService = new HtmlAppService();
  }
  public nextApiHandler(_inputHandler?: NextApiHandler) {
    const HeroNextHandler = async (
      request: NextApiRequest,
      nextResponse: NextApiResponse
    ) => {
      // build request and response objects for routing
      // const req = new HeroRequest(nextRequest);
      const res = new HeroResponse(nextResponse);
      if(!request.query.tool) {
        return res.error({
          code: 'TOOL_NOT_PROVIDED',
          message: 'Please provide a tool name',
          status: 404,
        });
      }
      
      const html = await this.htmlAppService.buildHtmlPage("/tmp/assets")
      // if none of the routes match, return a 404 response
      res.okHtml(html);
    };
    return HeroNextHandler
  }
}

