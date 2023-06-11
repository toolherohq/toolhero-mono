// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HeroTool, HeroNextManager, HeroText } from "toolhero";
const manager = new HeroNextManager();
const tool = HeroTool.New("My First Tool");
manager.add(tool)

tool.input.add(HeroText.New("page").default(async () => { return "9" }))
tool.input.add(HeroText.New("limit"))

const method = manager.nextApiHandler();

export default method
