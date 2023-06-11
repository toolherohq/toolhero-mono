import chokidar from "chokidar"
import path from "path"

import { readdir, readFile, writeFile } from "fs"
import { promisify } from "util"
const readDirectory = promisify(readdir)
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile);
const assetsRoot = path.resolve(__dirname, "../../apps/frontend/dist/assets/");
const outputFile = path.resolve(__dirname, "../toolhero/src/assets/assets.ts");
const buildHtmlPage = async () => {
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
    const tsFile = `
        export const assets = {
            html: "${Buffer.from(html).toString("base64")}"
        }
    `
    await writeFileAsync(outputFile, tsFile)
    console.log("Written")

}
(async () => {
    console.log("Will copy build");
    const watcher = chokidar.watch(assetsRoot, { persistent: true, awaitWriteFinish: true })
    watcher
        .on('add', function (path) { buildHtmlPage() })
        .on('change', function (path) { buildHtmlPage() })
        .on('unlink', function (path) { console.log('File', path, 'has been removed'); })
        .on('error', function (error) { console.error('Error happened', error); })
})()