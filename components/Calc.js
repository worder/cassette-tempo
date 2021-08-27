import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    timeToSec,
    leadingPlus as lp,
    leadingZero as lz,
    roundTwoDigitsPrecision as round2,
} from '../util/calc';

const SmallInput = styled.input`
    background-color: ${p => p.theme.inputBg};
    color: ${p => p.theme.inputColor};
    border: 0px;
    border-radius: 5px;
    padding: 3px;
    font-size: 40pt;
    width: 100%;
`;
const TapePresetButton = styled.button`
    border: none;
`;
const Desc = styled.div`
    font-size: 20pt;
`;
const DescBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;
const Units = styled.div``;
const Main = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CalcContainer = styled.div`
    width: 800px;
    display: block;
`;
const InputBlock = styled.div`
    margin-bottom: 20px;
    margin: 0px 10px 20px;
`;
const ResultBlock = styled.div`
    margin-top: 10px;
`;
const PresetsBlock = styled.div`
    margin-bottom: 20px;
`;
const LengthsBlock = styled.div`
    margin: 0px -10px;
    display: flex;
`;

const Calc = () => {
    const [tapeLengthValue, setTapeLengthValue] = useState('00:00');
    const [tapeLengthSec, setTapeLengthSec] = useState(0);

    const [contentLengthValue, setContentLengthValue] = useState('00:00');
    const [contentLengthSec, setContentLengthSec] = useState(0);

    useEffect(() => {
        const parsed = timeToSec(tapeLengthValue);
        if (parsed !== false) {
            setTapeLengthSec(parsed);
        }
    }, [tapeLengthValue]);

    useEffect(() => {
        const parsed = timeToSec(contentLengthValue);
        if (parsed !== false) {
            setContentLengthSec(parsed);
        }
    }, [contentLengthValue]);

    const lengthFormat = (lengthSec, trailingSign = false) => {
        const min = Math.floor(Math.abs(lengthSec) / 60);
        const sec = Math.abs(lengthSec) % 60;
        let val = sec !== 0 ? `${lz(min)}:${lz(sec)}` : `${lz(min)} min`;
        if (trailingSign) {
            val = `${lengthSec > 0 ? '+' : '-'}${val}`;
        }
        return val;
    };

    const preset = val => () => setTapeLengthValue(val);
    const deviationSec = tapeLengthSec - contentLengthSec;

    // <0 - content need to be speed up
    // >0 - content fits

    const ratio = contentLengthSec / tapeLengthSec;
    const percent = (ratio - 1) * 100;

    return (
        <Main>
            <CalcContainer>
                <PresetsBlock>
                    <Desc>Preset:</Desc>
                    <TapePresetButton onClick={preset(46 / 2)}>C46</TapePresetButton>
                    <TapePresetButton onClick={preset(60 / 2)}>C60</TapePresetButton>
                    <TapePresetButton onClick={preset(90 / 2)}>C90</TapePresetButton>
                    <TapePresetButton onClick={preset(120 / 2)}>C120</TapePresetButton>
                </PresetsBlock>

                <LengthsBlock>
                    <InputBlock>
                        <DescBlock>
                            <Desc>Tape</Desc>
                            <Units>minutes</Units>
                        </DescBlock>
                        <SmallInput
                            type="text"
                            onChange={e => setTapeLengthValue(e.target.value)}
                            value={tapeLengthValue}
                        />
                        <ResultBlock>
                            <div>
                                Tape length calculated:{' '}
                                <b>
                                    {lengthFormat(tapeLengthSec)} ({tapeLengthSec} sec)
                                </b>
                            </div>
                        </ResultBlock>
                    </InputBlock>

                    <InputBlock>
                        <DescBlock>
                            <Desc>Content</Desc>
                            <Units>minutes</Units>
                        </DescBlock>
                        <SmallInput
                            type="text"
                            onChange={e => setContentLengthValue(e.target.value)}
                            value={contentLengthValue}
                        />
                        <ResultBlock>
                            <div>
                                Content length calculated:{' '}
                                <b>
                                    {lengthFormat(contentLengthSec)} ({contentLengthSec} sec)
                                </b>
                            </div>
                        </ResultBlock>
                    </InputBlock>
                </LengthsBlock>

                <ResultBlock>
                    <div>
                        deviation {lengthFormat(deviationSec, true)} ({deviationSec} sec)
                    </div>
                    {/* <div>ratio {round2dec(ratio)}</div> */}
                    <div>speed adjust {lp(round2(percent))}%</div>
                </ResultBlock>
            </CalcContainer>
        </Main>
    );
};

export default Calc;
