import React from 'react';
import { IHeroTableSerialised } from 'toolhero/src/main/valueObjects/HeroTable';
import { IHeroTableHeaderSerialised } from 'toolhero/src/main/valueObjects/HeroTableHeader';
import HeroButton from './HeroButton';
import { IHeroButtonProps, IHeroButtonSerialised } from 'toolhero/src/main/valueObjects/HeroButton';

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
                                return <th id={header.id}>{header.value}</th>
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