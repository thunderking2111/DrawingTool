import {useEffect, useState, useRef} from 'react'
import PopoverInput from './popover_input';

const cursor = {startX: 0, startY: 0, x: 0, y: 0};
const canvas = {el: null, ctx: null};
let isCommand = false;
let draw = false;
const currObject = {x: 0, y: 0};
let shape = 'circle';
// let drawnObjects = [];


const onKeyDown = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  console.log('Key Press', ev.key);
  const newEv = ev;
  if (isCommand) {
    switch (newEv.key) {
      case 'c':
        ev.preventDefault();
        console.log('Key: C');
        // changeShape('circle');
        // canvas.el.focus();
        // setDisplayPopupInput(true);
        break;
      case 's':
        console.log('Key: S');
        // changeShape('square');
        break;
      default :
        break;
    }
    // isCommand = false;
  }
}

const onKeyUp = (ev) => {
  if ((ev.ctrlKey && ev.key === 'Shift') || (ev.shiftKey && ev.key === 'Control')) {
    console.log('Enter Command');
    isCommand= true;
    return;
  }
  if (isCommand && ev.key === 'Escape') {
    console.log('Escape');
    isCommand = false;
  }
}

const onMouseMove = (ev) => {
  cursor.x = ev.clientX;
  cursor.y = ev.clientY;
  if (draw) drawShape();
}

const onMouseDown = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  console.log('Mouse Down', shape);
  if (shape) {
    cursor.startX = ev.clientX;
    cursor.startY = ev.clientY;
    draw = true;
  }
}

const onMouseUp = (ev) => {
  if (draw) {
    cursor.startX = 0;
    cursor.startY = 0;
    draw = false;
    // shape = '';
  }
}

const onResize = (ev) => {
  canvas.el.height = window.innerHeight;
  canvas.el.width = window.innerWidth;
}


const drawShape = () => {
  switch(shape) {
    case 'circle':
      canvas.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
      canvas.ctx.beginPath();
      canvas.ctx.moveTo(cursor.startX, cursor.startY);
      canvas.ctx.lineTo(cursor.x, cursor.y);
      currObject.x = cursor.x;
      currObject.y = cursor.y;
      canvas.ctx.stroke();
      canvas.ctx.closePath();
      break;
    default:
      break;
  }
}

const changeShape = (newShape) => {
  shape = newShape;
  console.log('Shape Changed', newShape);

  switch (shape) {
    case 'circle':
      canvas.ctx.linecap = 'round';
      canvas.ctx.strokeStyle = 'black';
      canvas.ctx.lineWidth = 2;
      break;

    default:
      break;
  }
};


// const [displayPopupInput, setDisplayPopupInput] = useState(false);
const DrawingCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const el = canvasRef.current;
    el.focus();
    el.height = window.innerHeight;
    el.width = window.innerWidth;
    el.style.cursor = 'crosshair';
    canvas.el = el;
    canvas.ctx = el.getContext('2d');
    window.addEventListener('keydown', onKeyDown);
    // window.addEventListener('keyup', onKeyUp);
    // window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      // window.removeEventListener('keyup', onKeyUp);
      // window.removeEventListener('resize', onResize);
    }
  }, []);

  return (
    <div className='root-canvas'>
      <canvas tabIndex={-1}
        className='drawing-canvas position-absolute'
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ref={canvasRef}
      />
      {/* <PopoverInput className={true ? 'd-block' : 'd-none'} /> */}
    </div>
  )
}

export default DrawingCanvas
