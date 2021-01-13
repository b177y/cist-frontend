import Alert from 'react-bootstrap/Alert';

export default function InvalidNumberAlert(props){
    var show = (props.message !== "") ? "visible" : "hidden"
    return (
        <Alert className="mt-2 text-center mx-auto w-75"
            variant={"danger"}
            style={{visibility: show}}
        >
            {props.message}
        </Alert> 
    )
}

