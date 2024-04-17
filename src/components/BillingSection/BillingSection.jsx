import { useState } from "react";
import './BillingSection.css';
import userIcon from '../../assets/icons/user.svg';
import BillingResult from "../BillingResult/BillingResult";
import AverageForm from "../AverageForm/AverageForm";
import HistoryElement from "../HistoryElement/HistoryElement";

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
            persons: numberOfPeople,
            date: getDate()
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

    const getAveragePerson = () => {
       
        let average = 0;

        for(let i =0; i < history.length; i++){
        average += history[i].persons;
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
                    <BillingResult name={"Tip"} amount={tipAmount.toFixed(2)}/>
                    <BillingResult name={"Total"} amount={totalAmount.toFixed(2)}/>
                </div>
            </div>

            <div className={history.length >= 1 ? 'display-history' : 'do-not-display-history' }>
                <div className="stats-title-container">
                    <h2 className="stats-title">Stats</h2>
                </div>
            
                <div className="avg-form">
                    <AverageForm name={"Bill"} amount={getAverageBillAmount().toFixed(2)}/>
                    <AverageForm name={"Tip"} amount={getAverageTipAmount().toFixed(2)}/>
                    <AverageForm name={"Person"} amount={Math.round(getAveragePerson())}/>
                </div>
            </div> 


             <div className={history.length >= 1 ? 'display-history' : 'do-not-display-history' }>
                <div className="stats-title-container">
                    <h2 className="stats-title">History</h2>
                </div>
                    <div className="history-section">
                        <div className="history-form">
                        {history.map((order, index) => (
                        <HistoryElement index={index} 
                        date={order.date}
                        bill={order.bill} 
                        tip={order.tip}
                        persons={order.persons}/>     
                        ))}
                        </div>
                    </div>
            </div>                       
        </section>
    )
}

export default BillingSection;