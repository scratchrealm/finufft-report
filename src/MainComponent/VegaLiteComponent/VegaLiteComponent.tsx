import { FunctionComponent, useMemo } from 'react';
import { VegaLite } from 'react-vega'
import { validateObject } from '../../figurl';

// See https://github.com/vega/react-vega/issues/85#issuecomment-795138175
import './VegaLiteComponent.css'

export type VegaLiteData = {
    spec: any
}
export const isVegaLiteData = (x: any): x is VegaLiteData => {
    return validateObject(x, {
        spec: () => (true)
    })
}

type Props = {
    data: VegaLiteData
    width: number
    height: number
}

export const VegaLiteComponent: FunctionComponent<Props> = ({data, width, height}) => {
    const {spec} = data
    const spec2 = useMemo(() => {
        return {...spec, width: "container", height: "container"}
    }, [spec])
    return (
        <div style={{width, height}}>
            <VegaLite
                spec={spec2}
                // actions={{export: {svg: true, png: true}}}
                actions={false}
            />
        </div>
    )
}