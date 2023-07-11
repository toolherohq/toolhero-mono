import { IHeroButtonSerialised } from 'toolhero/src/main/valueObjects/HeroButton';
import { IHeroTableSerialised } from 'toolhero/src/main/valueObjects/HeroTable';
import HeroButton from './HeroButton';

interface IHeroTableProps {
    table: IHeroTableSerialised
}

const HeroTable = ({ table }: IHeroTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        {
                            table.header.items.map((header) => {
                                return <th id={header}>{header}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        table.rows.map((row) => {
                            return <tr>
                                {
                                    row.items.map((cell) => {
                                        return <td>
                                            {cell.type === "HeroButton" && <HeroButton button={cell.value as IHeroButtonSerialised} />}
                                            {cell.type === "String" && <p>{cell.value as String}</p>}
                                            {cell.type === "Number" && <p>{cell.value?.toString()}</p>}
                                        </td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default HeroTable;