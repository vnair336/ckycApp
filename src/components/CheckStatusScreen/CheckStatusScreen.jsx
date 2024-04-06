import React, { useState } from "react";
import "./CheckStatusScreen.css";
import respDataSamp from "../../assets/respData.json"

const CheckStatusScreen = () => {
    const [policyNo, setPolicyNo] = useState("");
    const [ebaoQuoteNo, setEbaoQuoteNo] = useState("");
    const [insuremoQuoteNo, setInsuremoQuoteNo] = useState("");
    const [altPolicyNo, setAltPolicyNo] = useState("");
    const [uniqueRefNo, setUniqueRefNo] = useState("");
    const [respData, setRespData] = useState({});
    const [respAvailable, setRespAvailable] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)

    const handlePolNoChange = (e) => {
        setPolicyNo(e.target.value);
    }

    const handleQuoteNoChange = (e) => {
        const quoteNo = e.target.value;

        if (quoteNo.startsWith('QP')) {
            setInsuremoQuoteNo(quoteNo);
            setEbaoQuoteNo("");
        } else {
            setEbaoQuoteNo(quoteNo);
            setInsuremoQuoteNo("");
        }
    }

    const handleAltPolNoChange = (e) => {
        setAltPolicyNo(e.target.value);
    }

    const handleUniRefNoChange = (e) => {
        setUniqueRefNo(e.target.value);
    }

    const handleCheckStatus = async () => {
        if (policyNo === "" && ebaoQuoteNo === "" && insuremoQuoteNo === "" && altPolicyNo === "" && uniqueRefNo === "") {
            alert("No values provided");
            setButtonClicked(false);
            setRespAvailable(false);
            return;
        }
        try {
            console.log(JSON.stringify({ policyNo, ebaoQuoteNo, insuremoQuoteNo, altPolicyNo, uniqueRefNo }));
            const response = await fetch('https://example.com/api/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ policyNo, ebaoQuoteNo, insuremoQuoteNo, altPolicyNo, uniqueRefNo })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle successful response here, if needed
            const responseData = await response.json();
            console.log(responseData);
            if (responseData.kycStatus === 1) {
                setRespData(responseData);
                setRespAvailable(true);
            }
            setRespAvailable(false);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setRespData(respDataSamp);
            setRespAvailable(true);
        }
        setButtonClicked(true);
    }

    return (
        <div className="checkStatusScreen">
            <div className="searchBox">
                <div className="inputBox">
                    <input className="textbox" type="text" value={policyNo} onChange={handlePolNoChange} placeholder="Policy No" />
                    <input className="textbox" type="text" onChange={handleQuoteNoChange} placeholder="Quote No" />
                    <input className="textbox" type="text" value={altPolicyNo} onChange={handleAltPolNoChange} placeholder="Alternate Policy No" />
                    <input className="textbox" type="text" value={uniqueRefNo} onChange={handleUniRefNoChange} placeholder="Unique Ref No" />
                </div>
                <button className="buttonCheck" onClick={handleCheckStatus}>Check Status</button>
                <div className="tableContainer">
                    {console.log("Resp Data:", respData)}
                    {respAvailable && respData !== null ? (
                        <table className="respTable">
                            <tbody>
                                <tr>
                                    <td>CKYC Reference No:</td>
                                    <td>{respData.ckycRefNo}</td>
                                </tr>
                                <tr>
                                    <td>CKYC Number:</td>
                                    <td>{respData.ckycNumber}</td>
                                </tr>
                                <tr>
                                    <td>KYC Status:</td>
                                    <td>{respData.kycRemark}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : buttonClicked ? <h1>No Data Available</h1> : null}
                </div>
            </div>
        </div>
    )
}

export default CheckStatusScreen;