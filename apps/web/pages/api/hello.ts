// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HeroTool, HeroNextManager, HeroText } from "toolhero";
import { HeroButton } from "toolhero/src/main/valueObjects/HeroButton";
import { HeroOutput } from "toolhero/src/main/valueObjects/HeroOutput";
import { HeroTable } from "toolhero/src/main/valueObjects/HeroTable";
import { HeroTableRow } from "toolhero/src/main/valueObjects/HeroTableRow";
const manager = new HeroNextManager();
const tool = HeroTool.New("My First Tool");
manager.add(tool)

tool.input.add(HeroText.New("page").default(async () => { return "9" }))
tool.input.add(HeroText.New("limit"))
tool.run(async (payload) => {
    console.log(payload.valueOf("page"))
    const output = HeroOutput.New();
    const table = HeroTable.New();
    table.header.push({
        id: "title",
        value: "Title"
    })
    table.header.push({
        id: "action",
        value: "Action"
    })

    const row = HeroTableRow.New();
    row.add({
        headerId: "title",
        value: "This is a title"
    })
    row.add({
        headerId: "cta",
        value: HeroButton.New("cta_1").onClick(async () => {
            console.log("Inside button execution")
        }).cta("Hello world!")
    })

    table.rows.push(row)
    output.add(table);

    return output

})


const method = manager.nextApiHandler();

export default method
