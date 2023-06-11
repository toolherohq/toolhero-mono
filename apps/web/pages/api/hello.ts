// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HeroTool, HeroNextManager } from "toolhero";
const manager = new HeroNextManager();
const tool = HeroTool.New("myFirstTool");
manager.add(tool)

const method = manager.nextApiHandler();

export default method
