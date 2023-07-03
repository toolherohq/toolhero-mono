import { IRouter } from "../../../toolhero/routes/IRouter";
import { Router } from "../../../toolhero/routes/Router";



const rootRouter: IRouter = new Router();

rootRouter.GET("/", async (req, res) => {
  return res.internalRedirect("/app");
});



export { rootRouter };
