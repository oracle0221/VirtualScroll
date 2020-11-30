import {useState, useEffect, useRef} from 'react';

const itemHeight = 20,
      amount = 15, tolerance = 5, minIndex = 0, maxIndex = 20000, startIndex = 0;


export default props=>{

    const boxRef = useRef();
    const [nowData, setData] = useState([]);
    const [nowTopPadding, setNowTopPadding] = useState(0);
    const [nowBottomPadding, setNowBottomPadding] = useState(0);

    const runScroller = (target)=>{
        let scrollTop = target.scrollTop;

        const index = minIndex + Math.floor( (scrollTop - tolerance * itemHeight) / itemHeight );
        const data = props.get(index, amount + 2 * tolerance);
        const topPadding = Math.max((index - minIndex)*itemHeight, 0);
        const bottomPadding = Math.max( (maxIndex - minIndex + 1) * itemHeight - topPadding - data.length * itemHeight, 0 );

        setData(data)
        setNowTopPadding(topPadding)
        setNowBottomPadding(bottomPadding)
    };

    useEffect(()=>{
        runScroller(boxRef.current) 
    }, [])

    return (
        <div className="box" ref={boxRef} style={{height: itemHeight * amount + 'px'}} onScroll={(ev)=>{
            // console.log(ev);
            runScroller(ev.target);
        }} >
            <div style={{height:nowTopPadding+'px'}} ></div>
            {nowData.map(props.row)}
            <div style={{height:nowBottomPadding+'px'}} ></div>
        </div>
    );
};