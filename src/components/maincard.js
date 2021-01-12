import React, { useRef, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { line_defs } from '../data/lines';
import { units, tens,
    hundreds, thousands } from '../data/definitions';

function getLines(number){
    var num = "0".repeat((4 - number.length)) + number;
    var th = thousands[num[0]];
    var hu = hundreds[num[1]];
    var te = tens[num[2]];
    var un = units[num[3]];
    var union = [...new Set([...th, ...hu, ...te, ...un])];
    var line_cords = []
    console.log("Lines to draw: " + union);
    for (var i = 0; i < union.length; i++){
        line_cords.push(line_defs[union[i]]);
    }
    return line_cords;
}


function InvalidNumberAlert(props){
    var show = (props.message !== "") ? "visible" : "hidden"
    return (
        <Alert className="mt-2 text-center mx-auto"
            variant={"danger"}
            style={{visibility: show, width: "800px"}}
        >
            {props.message}
        </Alert> 
    )
}

function CardHeader(props){
    const [formNumber, updateNumber] = useState("420");
    function handleSubmit(event){
        props.setErr("");
        event.preventDefault();
        if (isNaN(formNumber)){
            console.log("Input is not number.");
            props.setErr("Please give a number as input.");
        } else if (formNumber < 0 || formNumber > 9999){
            console.log("Num out of range");
            props.setErr("Number is out of range.");
        } else if (formNumber.length > 4){
            console.log("form number is longer than 4 but under 10000");
            props.setErr("What are you doing? prepending 0s??");
        } else {
            var lines = getLines(formNumber);
            console.log(lines);
            props.updateLines(lines);
        }
    }
    return(
        <Card.Header style={{backgroundColor: "#FFFFFF"}}>
            <Form className="form-horizontal card">
                <Form.Group className="form-inline">
                    <Form.Label className="col-sm my-auto">Number (between 0 and 9999)</Form.Label>
                    <Form.Control className="col-sm my-auto"
                        type="text" placeholder="420"
                        value={formNumber}
                        onChange={(e) => updateNumber(e.target.value)}
                        style={{width: "20px"}} >
                    </Form.Control>
                    <Button className="form-inline col-sm my-auto m-2 ml-4" type="submit" onClick={handleSubmit}>Go</Button>
                </Form.Group>
            </Form>
        </Card.Header>
    )
}


const Canvas = props => {
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
        draw(context);
    }, [props.lines])
    return <canvas id="canv" ref={canvasRef} style={{"height": "100%"}}/>
}

function MainCard(){
    const [lines, updateLines] = useState([]);
    const [err, setErr] = useState("");
    return(
        <div className="container mt-3 col-sm" >
                <InvalidNumberAlert message={err}/>
            <Card className="card my-auto" style={{"height": "800px", "width": "800px"}}>
                <CardHeader updateLines={updateLines} setErr={setErr} />
                <Canvas lines={lines} />
            </Card>
        </div>
    )
}

export default MainCard;
