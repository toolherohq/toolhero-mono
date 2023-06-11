import { NextApiRequest, NextApiResponse } from 'next';
import { HeroResponse } from './HeroResponse';
import { HeroTool } from '../main/valueObjects/HeroTool';
import { assets } from '../assets/assets';


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
      if(!request.query.tool) {
        return res.error({
          code: 'TOOL_NOT_PROVIDED',
          message: 'Please provide a tool name',
          status: 404,
        });
      }
      
      // if none of the routes match, return a 404 response
      const html = Buffer.from(assets.html, "base64").toString()
      res.okHtml(html);
    };
    return HeroNextHandler
  }
}

