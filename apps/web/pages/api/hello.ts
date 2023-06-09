// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HeroTool } from "toolhero";
import { HeroNextManager } from "toolhero-next";
const manager = new HeroNextManager();
const tool = HeroTool.New("myFirstTool");
manager.add(tool)

const method = manager.nextApiHandler();

export default method
