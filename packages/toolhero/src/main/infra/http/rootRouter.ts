import { IRouter } from "../../../toolhero/routes/IRouter";
import { Router } from "../../../toolhero/routes/Router";
import { ToolRenderService } from "../../services/ToolRenderService";
import { HeroInput } from "../../valueObjects/HeroInput";



const rootRouter: IRouter = new Router();

rootRouter.GET("/", async (req, res) => {
  return res.internalRedirect("/app");
});

rootRouter.GET("/app", async (req, res, { manager }) => {
  const toolRenderService = new ToolRenderService(manager.getTools()[0]);
  res.okHtml(await toolRenderService.render());
});

rootRouter.POST("/api/v1/tool/:tool/run", async (req, res, { manager }) => {
  // build request and response objects for routing
  // const req = new HeroRequest(nextRequest);

  const tool = manager.getTools()[0];
  const heroInput = HeroInput.deserialise(req.body.tool.input);
  const response = await tool.onSubmit(heroInput, {});
  const json = {
    output: response.serialise()
  }
  console.log(json);
  res.json(json)
});



export { rootRouter };
