import React, { useRef, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import NumForm from './numform';
import { Canvas } from './canvas';
import InvalidNumberAlert from './alert';

function MainCard(){
    const [lines, updateLines] = useState([]);
    const [err, setErr] = useState("");
    return(
        <div className="container-fluid mt-3 col-sm row justify-content-center" style={{"height": "100%", "width": "100%"}} >
            <div className="row justify-content-center h-100 w-100 col-md-12 container-fluid">
                <div className="col-md-8 col-sm-12 h-100 w-100 container-fluid">
                    <InvalidNumberAlert message={err}/>
                    <NumForm updateLines={updateLines} setErr={setErr} />
                    <Card className="card my-auto h-75 w-75 p-0">
                        <Canvas lines={lines} />
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default MainCard;
