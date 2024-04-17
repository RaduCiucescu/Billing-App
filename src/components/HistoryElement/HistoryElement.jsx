const HistoryElement = (props) =>{
    
    return(
        <div className="avg-result-container">
            <p className="avg-title-content">Order {props.index + 1}</p>
            <p className="avg-title-content">Date: {props.date}</p>
            <ul>
                <li className="history-of-payments-list"> Bill:{props.bill}$ </li> 
                <li className="history-of-payments-list">Tip: {props.tip} $</li> 
                <li className="history-of-payments-list">Number of persons: {props.persons} person</li>
            </ul>
        </div>    
    )
}


export default HistoryElement;