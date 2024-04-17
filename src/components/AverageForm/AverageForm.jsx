const AverageForm = (props) =>{
    
    return(
     
       
            <div className="avg-result-container">
                <p className="avg-title-content">Avg {props.name}</p>
                <p className="avg-result-content">$ {props.amount} </p>
            </div>
        
)
}

export default AverageForm;