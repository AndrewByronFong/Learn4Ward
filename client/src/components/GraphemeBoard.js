import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/components/GraphemeBoard.css'
import GraphemeButton from './GraphemeButton';

const GraphemeBoard = () => {
    const { phonemName } = useParams();

    // Hard-coded grapheme data, later use API call for this
    const graphemeData = useMemo(() => ({
        B: { b: 'B', bb: 'B' },
        D: { d: 'D', dd: 'D', ed: 'D' },
        F: { f: 'F', ff: 'F', ph: 'F', gh: 'F', lf: 'F', ft: 'F' },
        G: { g: 'G' },
        K: { k: 'K', c: 'K', ch: 'K', cc: 'K', lk: 'K', qu: 'K', qu2: 'K', ck: 'K', x: 'K' },
        L: { l: 'L', ll: 'L' },
        M: { m: 'M', mm: 'M', mb: 'M', mn: 'M', lm: 'M' },
        N: { n: 'N', nn: 'N', kn: 'N', gn: 'N', pm: 'N', mn: 'N' },
        P: { p: 'P', pp: 'P' },
        R: { r: 'R', rr: 'R', wr: 'R', rh: 'R' },
    }), []);

    const [graphemeButtons, setGraphemeButtons] = useState([]);

    useEffect(() => {
        if (graphemeData[phonemName]) {
            const buttons = Object.entries(graphemeData[phonemName]).map(([graphemeName, soundFile], index) => {
                const angle = (index / Object.keys(graphemeData[phonemName]).length)*2*Math.PI;
                const x = 400 * Math.cos(angle);
                const y = 400 * Math.sin(angle)+700;

                return (
                    <GraphemeButton
                        key={index}
                        graphemeName={graphemeName}
                        soundFile={soundFile}
                        x={x}
                        y={y}
                    />
                );
            });

            setGraphemeButtons(buttons);
        }
    }, [graphemeData, phonemName]);

    return (
        <div className="grapheme-board">
            {graphemeButtons}
        </div>
    );
};

export default GraphemeBoard;
