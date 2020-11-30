import VirtualScroll from './VirtualScroll'


const itemHeight = 20,
      amount = 15, tolerance = 5, minIndex = 0, maxIndex = 20000, startIndex = 0;

const getData = (offset, limit)=>{
  const data = [];
  const start = Math.max( minIndex, offset );
  const end = Math.min(offset + limit - 1, maxIndex);

  if( start < end ){

    for( let i = start; i <= end; i ++ ){
      data.push({
        index:i, text: `item ${i}`,
      });
    } // end for i

  }

  return data;
};

const rowTemplate = item=>{
  return (
    <div className="item" key={item.index} >
      {item.text}
    </div>
  );
};


function App() {
  return (
    <div className="App">
      <VirtualScroll 
        get={getData}
        row={rowTemplate}
      />
    </div>
  );
}

export default App;
