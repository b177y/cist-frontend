import React, { useRef, useEffect } from 'react';

export const Canvas = props => {
    const canvasRef = useRef(null)
    const draw = ctx => {
        console.log("[DRAW]: CANVAS " + ctx.canvas.width + ctx.canvas.height, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
        ctx.canvas.width = ctx.canvas.offsetWidth;
        ctx.canvas.height = ctx.canvas.offsetHeight;
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        ctx.clearRect(0, 0, width, height);
        console.log(props.lines)
        for (var i = 0; i < props.lines.length; i++){
            ctx.lineWidth = 2;
            ctx.beginPath();
            var startx = props.lines[i].start[0] * width;
            var starty = height - (props.lines[i].start[1] * height);
            var endx = props.lines[i].end[0] * width;
            var endy = height - (props.lines[i].end[1] * height);
            console.log("DRAWING LINE FROM " + startx + starty + " to " + endx + endy);
            ctx.moveTo(startx, starty);
            ctx.lineTo(endx, endy);
            ctx.closePath();
            ctx.stroke();
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.fillStyle = '#FFFFFF'
        console.log("CANV" + context.canvas.width + " " + context.canvas.height);
        canvas.height = context.canvas.height;
        canvas.width = context.canvas.width;
        window.addEventListener('resize', draw(context), false);
        window.addEventListener('orientationchange', draw(context), false);
        draw(context);
    }, [props.lines])
    return <canvas id="canv" ref={canvasRef} style={{"height": "100%"}}/>
}
