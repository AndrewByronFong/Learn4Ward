import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/components/GraphemeBoard.css'
import GraphemeButton from './GraphemeButton';

const GraphemeBoard = () => {
    const { phonemName } = useParams();

    // Hard-coded grapheme data, later use API call for this
    const graphemeData = useMemo(() => ({
        B: { b: 'b.m4a', bb: 'bb.m4a' },
        D: { d: 'd.m4a', dd: 'dd.m4a', ed: 'ed.m4a' },
        F: { f: 'f.m4a', ff: 'ff.m4a', ph: 'ph.m4a', gh: 'gh.m4a', lf: 'lf.m4a', ft: 'ft.m4a' },
        G: { g: 'g.m4a' },
        K: { k: 'k.m4a', c: 'c.m4a', ch: 'ch.m4a', cc: 'cc.m4a', lk: 'lk.m4a', qu: 'qu.m4a', qu2: 'qu2.m4a', ck: 'ck.m4a', x: 'x.m4a' },
        L: { l: 'l.m4a', ll: 'll.m4a' },
        M: { m: 'm.m4a', mm: 'mm.m4a', mb: 'mb.m4a', mn: 'mn.m4a', lm: 'lm.m4a' },
        N: { n: 'n.m4a', nn: 'nn.m4a', kn: 'kn.m4a', gn: 'gn.m4a', pm: 'pm.m4a', mn: 'mn.m4a' },
        P: { p: 'p.m4a', pp: 'pp.m4a' },
        R: { r: 'r.m4a', rr: 'rr.m4a', wr: 'wr.m4a', rh: 'rh.m4a' },
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
