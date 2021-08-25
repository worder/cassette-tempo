import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

const SmallInput = styled.input`
    width: 100px;
`

const TapePresetButton = styled.button`
    border: none;
`

const Desc = styled.div`
    display: block;
`

const Main = styled.div``

const parseTime = (value) => {
    const num = (value) => Number(value, 10)
    let res = /^(\d+):([0-59]+):?([0-59]+)?$/.exec(value)
    if (res) {
        let [hour, min, sec] = [0, 0, 0]
        if ('undefined' === typeof res[3]) {
            ;[, min, sec] = res
        } else {
            ;[, hour, min, sec] = res
        }

        return num(hour) * 60 * 60 + num(min) * 60 + num(sec)
    }

    res = /^(\d+)$/.exec(value)
    if (res) {
        return num(value) * 60
    }

    return false;
}

const round2dec = val => Math.round(val * 100) / 100
const lz = num => (num >= 0 && num < 10 ? `0${num}` : `${num}`)
const lp = num => num > 0 ? `+${num}` : num;

const Calc = () => {
    const [tapeLengthValue, setTapeLengthValue] = useState('')
    const [tapeLengthSec, setTapeLengthSec] = useState(0)

    const [contentLengthValue, setContentLengthValue] = useState('');
    const [contentLengthSec, setContentLengthSec] = useState(0);

    useEffect(() => {
        const parsed = parseTime(tapeLengthValue);
        if (parsed !== false) {
            setTapeLengthSec(parsed);
        }
    }, [tapeLengthValue])

    useEffect(() => {
        const parsed = parseTime(contentLengthValue);
        if (parsed !== false) {
            setContentLengthSec(parsed);
        }
    }, [contentLengthValue]);



    const lengthFormat = (lengthSec, trailingSign = false) => {
        const min = Math.floor(Math.abs(lengthSec) / 60)
        const sec = Math.abs(lengthSec) % 60
        let val = sec != 0 ? `${lz(min)}:${lz(sec)}` : `${lz(min)} min`
        if (trailingSign) {
            val = `${lengthSec > 0 ? '+' : '-'}${val}`
        }
        return val;
    }

    const preset = (val) => () => setTapeLengthValue(val)

    const deviationSec = tapeLengthSec - contentLengthSec;

    // <0 - content need to be speed up
    // >0 - content fits

    const ratio = contentLengthSec / tapeLengthSec;
    const percent = (ratio - 1) * 100;


    return (
        <Main>
            <div>
                <Desc>Preset:</Desc>
                <TapePresetButton onClick={preset(46 / 2)}>C46</TapePresetButton>
                <TapePresetButton onClick={preset(60 / 2)}>C60</TapePresetButton>
                <TapePresetButton onClick={preset(90 / 2)}>C90</TapePresetButton>
                <TapePresetButton onClick={preset(120 / 2)}>C120</TapePresetButton>
            </div>
            <Desc>Tape length one side (minutes or ":" separated)</Desc>
            <SmallInput
                type="text"
                onChange={(e) => setTapeLengthValue(e.target.value)}
                value={tapeLengthValue}
            />
            <div>
                Tape length calculated:{' '}
                <b>
                    {lengthFormat(tapeLengthSec)} ({tapeLengthSec} sec)
                </b>
            </div>

            <Desc>Content length:</Desc>
            <SmallInput
                type="text"
                onChange={(e) => setContentLengthValue(e.target.value)}
                value={contentLengthValue}
            />
            <div>
                Content length calculated:{' '}
                <b>
                    {lengthFormat(contentLengthSec)} ({contentLengthSec} sec)
                </b>
            </div>

            <div>deviation {lengthFormat(deviationSec, true)} ({deviationSec} sec)</div>
            {/* <div>ratio {round2dec(ratio)}</div> */}
            <div>speed adjust {lp(round2dec(percent))}%</div>

        </Main>
    )
}

export default Calc
