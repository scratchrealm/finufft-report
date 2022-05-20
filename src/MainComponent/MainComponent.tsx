import { Grid } from '@material-ui/core';
import { FunctionComponent } from 'react';
import { validateObject } from '../figurl';
import { isArrayOf, isEqualTo, isOneOf, isString } from '../figurl/viewInterface/validateObject';
import Markdown from './Markdown/Markdown';
import { VegaLiteComponent } from './VegaLiteComponent/VegaLiteComponent';

export type ReportItem = {
    type: 'markdown'
    data: {
        source: string
    }
} | {
    type: 'altair_chart'
    data: {
        spec: any
    }
} | {
    type: 'hboxlayout'
    data: {
        items: ReportItem[]
    }
}

const val = (spec: any) => ((y: any) => (
    validateObject(y, spec)
))

const isReportItem = (x: any): x is ReportItem => (
    isOneOf([
        val({
            type: isEqualTo('markdown'),
            data: val({
                source: isString
            })
        }),
        val({
            type: isEqualTo('altair_chart'),
            data: val({
                spec: () => (true)
            })
        }),
        val({
            type: isEqualTo('hboxlayout'),
            data: val({
                items: isArrayOf(isReportItem)
            })
        })
    ])(x)
)

export type ReportData = {
    items: ReportItem[]
}
export const isReportData = (x: any): x is ReportData => {
    return validateObject(x, {
        items: isArrayOf(isReportItem)
    })
}

type Props = {
    data: ReportData
    width: number
    height: number
}

const getItemElement = (item: ReportItem) => (
    item.type === 'altair_chart' ? (
        <VegaLiteComponent
            data={{spec: item.data.spec}}
            width={400}
            height={400}
        />
    ) :
    item.type === 'markdown' ? (
        <Markdown
            source={item.data.source}
        />
    ) :
    item.type === 'hboxlayout' ? (
        <Grid container spacing={2}>
            {
                item.data.items.map(item2 => (
                    <Grid item>
                        {
                            getItemElement(item2)
                        }
                    </Grid>
                ))
            }
        </Grid>
    ) :
    (
        <div>Unrecognized item type: {item["type"]}</div>
    )
)

const MainComponent: FunctionComponent<Props> = ({data}) => {
    const {items} = data
    return (
        <div style={{margin: 30}}>
            {
                items.map(item => (
                    getItemElement(item)
                ))
            }
        </div>
    )
}

export default MainComponent