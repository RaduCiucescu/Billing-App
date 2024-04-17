const BillingResult = (props) =>{


    return(

        <div className="billing-result">
                        <div>
                            <p className="billing-result-heading"> {props.name} Amount </p>
                            <p className="billing-result-sub-heading"> /person </p>
                        </div>
                        <p className="billing-result-number"> ${props.amount}</p>
                    </div>
    )

}



export default BillingResult;