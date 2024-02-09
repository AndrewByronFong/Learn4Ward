import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import GraphemeButton from './GraphemeButton';

const GraphemeBoard = () => {
  // eslint-disable-next-line no-unused-vars
  const { label } = useParams();

  // Hard-coded grapheme data, later use API call for this
  const graphemeData = useMemo(() => ({
    B: { b: 'b.m4a', bb: 'bb.m4a' },
    D: { d: 'd.m4a', dd: 'dd.m4a', ed: 'ed.m4a' },
    F: { f: 'f.m4a', ff: 'ff.m4a', ph: 'ph.m4a', gh: 'gh.m4a', lf: 'lf.m4a', ft:'ft.m4a' },
    G: { g: 'g.m4a'},
    K: { k: 'k.m4a', c: 'c.m4a', ch: 'ch.m4a', cc: 'cc.m4a', lk: 'lk.m4a', qu: 'qu.m4a', qu2: 'qu2.m4a', ck: 'ck.m4a', x: 'x.m4a' },
    L: { l: 'l.m4a', ll: 'll.m4a' },
    M: { m: 'm.m4a', mm: 'mm.m4a', mb: 'mb.m4a', mn: 'mn.m4a', lm: 'lm.m4a' },
    N: { n: 'n.m4a', nn: 'nn.m4a', kn: 'kn.m4a', gn: 'gn.m4a', pm: 'pm.m4a', mn: 'mn.m4a' },
    P: { p: 'p.m4a', pp: 'pp.m4a' },
    R: { r: 'r.m4a', rr: 'rr.m4a', wr: 'wr.m4a', rh: 'rh.m4a' },
  }), []);

  const [graphemeButtons, setGraphemeButtons] = useState([]);

  useEffect(() => {
    const buttons = graphemeData.map((data, index) => {
      const angle = (index / graphemeData.length) * 2 * Math.PI;
      const x = 500 * Math.cos(angle);
      const y = 500 * Math.sin(angle);

      return (
        <GraphemeButton
          key={index}
          label={data.label}
          soundFile={data.soundFile}
          x={x}
          y={y}
        />
      );
    });

    setGraphemeButtons(buttons);
  }, [graphemeData]);

  return (
    <div className="grapheme-board">
      {graphemeButtons}
    </div>
  );
};

export default GraphemeBoard;
