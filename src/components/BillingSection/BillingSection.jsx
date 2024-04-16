import { useState } from "react";
import './BillingSection.css';
import userIcon from '../../assets/icons/user.svg';

const tipOptions = [5, 10, 15, 25, 50];


const BillingSection = () => {
    const [selectedOption, setSelectedOption] = useState(-1);
    const [tipAmount, setTipAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [history, setHistory] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const bill = parseInt(data.get('bill-input'));
        const numberOfPeople = parseInt(data.get('number-of-people-input'));

        console.log(bill, numberOfPeople, selectedOption);

        const tipTotal = bill * (tipOptions[selectedOption] / 100);
        const tipTotalPerPerson = tipTotal / numberOfPeople;

        const orderTotal = bill + tipTotal;
        const orderTotalPerPerson = orderTotal / numberOfPeople;
        
        setTipAmount(tipTotalPerPerson);
        setTotalAmount(orderTotalPerPerson);

        let  billingHistory = setHistory([
            ...history,{
            bill: bill,
            tip: tipTotal,
            persons: numberOfPeople
    }])

    };

    const handleClick = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    const getAverageBillAmount = () => {
       
        let average = 0;

        for(let i =0; i < history.length; i++){
        average += history[i].bill;
    }
        return average / history.length;
    }
    const getAverageTipAmount = () => {
       
        let average = 0;

        for(let i =0; i < history.length; i++){
        average += history[i].tip;
    }
        return average / history.length;
    }
    const getAverageBillAmountPerPerson = () => {
       
        let average = 0;

        for(let i =0; i < history.length; i++){
        average += (history[i].bill / history[i].persons);
    }
        return average / history.length;
    }

    const getAverageTipAmountPerPerson = () => {
       
        let average = 0;

        for(let i =0; i < history.length; i++){
        average += (history[i].tip / history[i].persons);
    }
        return average / history.length;
    }
    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${date}/${month}/${year}`;
      }

    return (
       <section>
            <h1 className="billing-section-title"> SPLI TTER </h1>
            <div className="billing-container">
                <form onSubmit={handleSubmit} className="billing-form">
                    <div className="input-container">
                        <label className="standard-label" htmlFor="bill-input"> Bill </label>
                        <input className="standard-input" id="bill-input" name="bill-input" type="number" defaultValue={0} />
                        <p className="standard-input-indicator"> $ </p>
                    </div>
                    <div className="tip-options-container">
                        <p className="standard-label"> Select Tip % </p>
                        <div className="tip-options">
                            {tipOptions.map((option, index) => (
                                <button type="button" className={index === selectedOption ? 'selected' : ''} onClick={() => handleClick(index)} key={option}> {option}% </button>
                            ))}
                        </div>
                    </div>
                    <div className="input-container">
                        <label className="standard-label" htmlFor="number-of-people-input"> Number of People </label>
                        <input className="standard-input" id="number-of-people-input" name="number-of-people-input" type="number" defaultValue={0} />
                        <img className="standard-input-indicator" src={userIcon} />
                    </div>
                    <button type="submit" className="calculate-billing"> Calculate </button>
                </form>
                <div className="billing-result-container">
                    <div className="billing-result">
                        <div>
                            <p className="billing-result-heading"> Tip Amount </p>
                            <p className="billing-result-sub-heading"> /person </p>
                        </div>
                        <p className="billing-result-number"> ${tipAmount} </p>
                    </div>
                    <div className="billing-result">
                        <div>
                            <p className="billing-result-heading"> Total </p>
                            <p className="billing-result-sub-heading"> /person </p>
                        </div>
                        <p className="billing-result-number"> ${totalAmount} </p>
                    </div>
                </div>
            </div>

            <div className="history-of-payments-and-stats-section">             
            <div >         
                <ul> 
                    {history.map((order) => (
                       <div key={order}>
                        <h2 className="history-of-payments-title">History of payments</h2>
                            <li className="history-of-payments-list"> Bill:{order.bill}$ </li> 
                            <li className="history-of-payments-list">Tip: {order.tip} $</li> 
                            <li className="history-of-payments-list">Number of persons: {order.persons} person</li>
                         </div>       
                    ))}
                </ul>
            </div> 
            <div className={history.length >= 1 ? 'display-history' : 'do-not-display-history' }>
                <h2 className="stats-title"> Stats: </h2>
                 <h3 className="stats-title"> Average bill: {getAverageBillAmount()} </h3> 
                 <h3 className="stats-title"> Average tip: {getAverageTipAmount()} </h3>
                 <h3 className="stats-title"> Average bill per person: {getAverageBillAmountPerPerson()} </h3>
                 <h3 className="stats-title"> Average tip per person: {getAverageTipAmountPerPerson()} </h3>
                 <h3 className="date-for-stats"> Date for the stats: {getDate()}</h3>
            </div>
            </div>
        </section>
    

    )
}

export default BillingSection;