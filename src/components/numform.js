import React, { useRef, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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

export default function NumForm(props){
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
        <div className="card container-fluid w-75 mb-3">
            <Form>
                <div className="row form-group justify-content-center">
                    <div className="col-md-4 col-sm-12 my-auto text-left w-75">
                        <Form.Label className="my-auto" >Number (between 0 and 9999)</Form.Label>
                    </div>
                    <div className="col-md-4 col-sm-12 my-auto w-75">
                        <Form.Control className="my-auto"
                            type="text" placeholder="420"
                            value={formNumber}
                            onChange={(e) => updateNumber(e.target.value)}
                            >
                        </Form.Control>
                    </div>
                    <div className="col-md-2 col-sm-12 my-auto w-75">
                        <Button className="my-auto w-100" type="submit" onClick={handleSubmit}>Go</Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}
