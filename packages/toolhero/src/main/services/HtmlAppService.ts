
import { readdir, readFile } from "fs"
import { promisify } from "util" 
const readDirectory = promisify(readdir)
const readFileAsync = promisify(readFile)
export interface IHtmlAppService {
    buildHtmlPage(assetsRoot: string): Promise<string>;
}

export class HtmlAppService implements IHtmlAppService {
    async buildHtmlPage(assetsRoot: string): Promise<string> {
    
        const files = await readDirectory(assetsRoot);
        const javascriptFile = files.find(file => file.endsWith(".js"))
        const cssFile = files.find(file => file.endsWith(".css"));

        const javascript = await readFileAsync(`${assetsRoot}/${javascriptFile}`);
        const css = await readFileAsync(`${assetsRoot}/${cssFile}`);

        const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite + React + TS</title>
            <style>${css}</style>
          </head>
          <body>
            <div id="root"></div>
            <script>${javascript}</script>
          </body>
        </html>
        `
        return html as string;
    }
}