const express = require('express');

const cors = require("cors");
const app = express()
const PORT = 3001


app.use(cors());
app.use(express.json());
let y = 0

app.post("/api/portugal", async (req, res) => {
    const relation = req.body.relation;
    const income = req.body.income;
    const year = req.body.year
    const taxCredit = req.body.taxCredit
    const expenses = req.body.expenses
    let data = (await getTaxToPay(income, relation, year, expenses, taxCredit))
    
    res.status(200).json({
        status: true,
        message: "calculation result",
        data: data,
    });

});


app.post("/api/nz", async (req, res) => {
    const payPeriod = req.body.payPeriod;
    const income = req.body.income;
    const year = req.body.year
    const nztaxCredit = req.body.taxCredit
    const dExpenses = req.body.expenses
    let data = (await newZealandTax(income, payPeriod, dExpenses, nztaxCredit,year))
   
    res.status(200).json({
        status: true,
        message: "calculation result",
        data: data,
    });

});

async function getTaxToPay(income, relation, year, expenses, taxCredit) {
    let firstPercentage18_19_20_21 = 0.145
    let secondPercentage18_19_20_21 = 0.23
    let thirdPercentage18_19_20_21 = 0.285
    let fourthPercentage18_19_20_21 = 0.35
    let fifthPercentage18_19_20_21 = 0.37
    let SixthPercentage18_19_20_21 = 0.45
    let SeventhPercentage18_19_20_21 = 0.48
    let thirdPercentage22 = 0.265
    let SeventhPercentage22 = 0.43
    let taxableincome = (income - expenses)
    let taxToPay = 0;
    if (year <= 2019) {
        if (relation == "Single") {
            if (taxableincome < 7091) {
                taxToPay = (firstPercentage18_19_20_21) * taxableincome

            } else if (taxableincome < 10700) {

                taxableincome = taxableincome - 7091
                taxToPay = (secondPercentage18_19_20_21) * taxableincome + 1028.20


            } else if (taxableincome < 20261) {
                taxableincome = taxableincome - 10700
                taxToPay = (thirdPercentage18_19_20_21) * taxableincome + 830.07 + 1028.20


            } else if (taxableincome < 25000) {
                taxableincome = taxableincome - 20261
                taxToPay = (fourthPercentage18_19_20_21) * taxableincome + 2724.88 + 830.07 + 1028.20


            } else if (taxableincome < 36856) {
                taxableincome = taxableincome - 25000
                let x = (fifthPercentage18_19_20_21 * taxableincome)
                taxToPay = x + 2724.88 + 830.07 + 1028.20 + 1658.65
            } else if (taxableincome < 80640) {
                taxableincome = taxableincome - 36856
                let x = (SixthPercentage18_19_20_21 * taxableincome)
                taxToPay = x + 1658.65 + 2724.88 + 830.07 + 1028.20


            } else if (taxableincome > 80640.01) {
                let x = taxableincome * 0.48
                taxToPay = (SeventhPercentage18_19_20_21) * taxableincome + x
            }
            taxToPay = taxToPay - taxCredit
        }
        if (relation == "Married") {
            taxableincome = taxableincome / 2
            if (taxableincome < 7091) {
                taxToPay = (firstPercentage18_19_20_21) * taxableincome

            } else if (taxableincome < 10700) {

                taxableincome = taxableincome - 7091
                taxToPay = (secondPercentage18_19_20_21) * taxableincome + 1028.20


            } else if (taxableincome < 20261) {
                taxableincome = taxableincome - 10700
                taxToPay = (thirdPercentage18_19_20_21) * taxableincome + 830.07 + 1028.20


            } else if (taxableincome < 25000) {
                taxableincome = taxableincome - 20261
                taxToPay = (fourthPercentage18_19_20_21) * taxableincome + 2724.88 + 830.07 + 1028.20


            } else if (taxableincome < 36856) {
                taxableincome = taxableincome - 25000
                taxToPay = (fifthPercentage18_19_20_21) * taxableincome + 1658.65 + 2724.88 + 830.07 + 1028.20


            } else if (taxableincome < 80640) {
                taxableincome = taxableincome - 36856
                taxToPay = (SixthPercentage18_19_20_21) * taxableincome + 7728.15


            } else if (taxableincome > 80640.01) {
                let x = taxableincome * 0.48

                taxToPay = (SeventhPercentage18_19_20_21) * taxableincome + x


            }
            taxToPay = 2 * taxToPay
            taxToPay = taxToPay - taxCredit
        }
    }
    else if (year <= 2021) {
        if (relation == "Single") {
            if (taxableincome < 7112.00) {
                taxToPay = (firstPercentage18_19_20_21) * taxableincome

            } else if (taxableincome < 10732) {

                taxableincome = taxableincome - 7112.00
                taxToPay = (secondPercentage18_19_20_21) * taxableincome + 1031.24


            } else if (taxableincome < 20322) {
                taxableincome = taxableincome - 10732
                taxToPay = (thirdPercentage18_19_20_21) * taxableincome + 832.60 + 1031.24


            } else if (taxableincome < 25075) {
                taxableincome = taxableincome - 20322
                taxToPay = (fourthPercentage18_19_20_21) * taxableincome + 2733.15 + 832.60 + 1031.24


            } else if (taxableincome < 36967) {

                taxableincome = taxableincome - 20075.01

                taxToPay = (fifthPercentage18_19_20_21) * taxableincome + 1663.55 + 2733.15 + 832.60 + 1031.24


            } else if (taxableincome < 80882) {
                taxableincome = taxableincome - 36967
                taxToPay = (SixthPercentage18_19_20_21) * taxableincome + 4967.25 + 1663.55 + 2733.15 + 832.60 + 1031.24


            } else if (taxableincome > 80882.02) {
                let x = taxableincome * 0.48

                taxToPay = (SeventhPercentage18_19_20_21) * taxableincome + x
            }
            taxToPay = taxToPay - taxCredit
        } else if (relation == "Married") {

            taxableincome = taxableincome / 2

            if (taxableincome < 7112.00) {
                taxToPay = (firstPercentage18_19_20_21) * taxableincome

            } else if (taxableincome < 10732) {

                taxableincome = taxableincome - 7112.00
                taxToPay = (secondPercentage18_19_20_21) * taxableincome + 1031.24


            } else if (taxableincome < 20322) {
                taxableincome = taxableincome - 10732
                taxToPay = (thirdPercentage18_19_20_21) * taxableincome + 832.60 + 1031.24


            } else if (taxableincome < 25075) {
                taxableincome = taxableincome - 20322
                taxToPay = (fourthPercentage18_19_20_21) * taxableincome + 2733.15 + 832.60 + 1031.24


            } else if (taxableincome < 36967) {
                console.log(taxableincome)

                taxableincome = taxableincome - 20075.01
                console.log(taxableincome)
                taxToPay = (fifthPercentage18_19_20_21) * taxableincome + 1663.55 + 2733.15 + 832.60 + 1031.24


            } else if (taxableincome < 80882) {
                taxableincome = taxableincome - 36967
                taxToPay = (SixthPercentage18_19_20_21) * taxableincome + 6250 + 1663.55 + 2733.15 + 832.60 + 1031.24


            } else if (taxableincome > 80882.02) {
                let x = taxableincome * 0.48

                taxToPay = (SeventhPercentage18_19_20_21) * taxableincome + x
            }

            taxToPay = 2 * taxToPay
            taxToPay = taxToPay - taxCredit


        }
    }
    else if (year <= 2022) {
        if (taxableincome < 7116.00) {
            taxToPay = (firstPercentage18_19_20_21) * taxableincome  // 14.5% 

        } else if (taxableincome < 10736) {

            taxableincome = taxableincome - 7117.00
            // 23%
            taxToPay = (secondPercentage18_19_20_21) * taxableincome + 1031.24


        } else if (taxableincome < 15216) {
            taxableincome = taxableincome - 10737
            // 26.5%
            taxToPay = (thirdPercentage22) * taxableincome + 832.60 + 1031.24


        } else if (taxableincome < 19696) {
            taxableincome = taxableincome - 15217
            // 28.5%
            taxToPay = (thirdPercentage18_19_20_21) * taxableincome + 1186.94 + 832.60 + 1031.24

        } else if (taxableincome < 25075) {
            taxableincome = taxableincome - 19697
            // 35%    
            taxToPay = (fourthPercentage18_19_20_21) * taxableincome + 1276.52 + 1186.94 + 832.60 + 1031.24


        } else if (taxableincome < 36757) {
            console.log("Pointer is her")
            console.log(taxableincome)
            taxableincome = taxableincome - 20076
            console.log(taxableincome)
            //37%
            taxToPay = (fifthPercentage18_19_20_21) * taxableincome + 1882.30 + 1276.52 + 1186.94 + 832.60 + 1031.24


        } else if (taxableincome < 48033) {
            taxableincome = taxableincome - 36758
            //43%
            taxToPay = (SeventhPercentage22) * taxableincome + 4967.25 + 1663.55 + 2733.15 + 832.60 + 1031.24

        }
        else if (taxableincome < 75009) {
            taxableincome = taxableincome - 48034
            let x = taxableincome * 0.48
            //45%

            taxToPay = (SixthPercentage18_19_20_21) * taxableincome + x
        }
        else if (taxableincome > 75010) {
            let x = taxableincome * 0.48
            //48%
            taxToPay = (SeventhPercentage18_19_20_21) * taxableincome + x
        }
        taxToPay = taxToPay - taxCredit
    }
    return taxToPay;
}
async function newZealandTax(income, payPeriod, dExpenses, nzTaxCredit, year) {
    let percentage1 = 10.5 / 100
    let percentage2 = 17.5 / 100
    let percentage3 = 30.5 / 100
    let percentage4 = 33 / 100
    let percentage5 = 39 / 100
    let nzTaxToPay = 0
    income = income - dExpenses
    let accLevy = 0

if(year < 2022){
    if (payPeriod == "Yearly") {
        accLevy = income * (1.39 / 100)
        if (income < 14000) {
            nzTaxToPay = income * percentage1
        } else if (income < 48000) {
            nzTaxToPay = income - 14000
            nzTaxToPay = (nzTaxToPay * percentage2) + 1470
        } else if (income < 70000) {
            nzTaxToPay = income - 48000
            nzTaxToPay = (nzTaxToPay * percentage3) + 1470 + 5949
        } else if (income > 70001) {
            nzTaxToPay = income - 70000
            nzTaxToPay = (nzTaxToPay * percentage4) + 1470 + 5949 + 7259.67
        }
        nzTaxToPay = nzTaxToPay + accLevy
        nzTaxToPay = nzTaxToPay - nzTaxCredit
        }
    else if (payPeriod == "Monthly") {
        income = income * 12
        accLevy = income * (1.39 / 100)
        if (income < 14000) {
            nzTaxToPay = income * percentage1
        } else if (income < 48000) {
            nzTaxToPay = income - 14000
            nzTaxToPay = (nzTaxToPay * percentage2) + 1470
        } else if (income < 70000) {
            nzTaxToPay = income - 48000
            nzTaxToPay = (nzTaxToPay * percentage3) + 1470 + 5949
        } else if (income > 70001) {
            nzTaxToPay = income - 70000
            nzTaxToPay = (nzTaxToPay * percentage4) + 1470 + 5949 + 7259.67
        }
        nzTaxToPay = nzTaxToPay + accLevy
        nzTaxToPay = nzTaxToPay / 12
        nzTaxToPay = nzTaxToPay - (nzTaxCredit / 12)

    }
}else if(year == 2023){
    if (payPeriod == "Yearly") {
        accLevy = income * (1.46 / 100)
        if (income < 14000) {
            nzTaxToPay = income * percentage1
        } else if (income < 48000) {
            nzTaxToPay = income - 14000
            nzTaxToPay = (nzTaxToPay * percentage2) + 1470
        } else if (income < 70000) {
            nzTaxToPay = income - 48000
            nzTaxToPay = (nzTaxToPay * percentage3) + 1470 + 5949
        } else if (income < 180000) {
            nzTaxToPay = income - 70000
            nzTaxToPay = (nzTaxToPay * percentage4) + 1470 + 5949 + 7259.67
        } else if(income > 180000){
            nzTaxToPay = income - 180000
            nzTaxToPay = (nzTaxToPay * percentage4) + 1470 + 5949 + 7259.67+ 36300


        }
        nzTaxToPay = nzTaxToPay + accLevy
        nzTaxToPay = nzTaxToPay - 520
        }
    else if (payPeriod == "Monthly") {
        income = income * 12
        accLevy = income * (1.46 / 100)
        if (income < 14000) {
            nzTaxToPay = income * percentage1
        } else if (income < 48000) {
            nzTaxToPay = income - 14000
            nzTaxToPay = (nzTaxToPay * percentage2) + 1470
        } else if (income < 70000) {
            nzTaxToPay = income - 48000
            nzTaxToPay = (nzTaxToPay * percentage3) + 1470 + 5949
        } else if (income < 180000) {
            nzTaxToPay = income - 70000
            nzTaxToPay = (nzTaxToPay * percentage4) + 1470 + 5949 + 7259.67
        } else if(income > 180000){
            nzTaxToPay = income - 180000
            nzTaxToPay = (nzTaxToPay * percentage4) + 1470 + 5949 + 7259.67+ 36300


        }
        nzTaxToPay = nzTaxToPay + accLevy
        nzTaxToPay = nzTaxToPay / 12
        console.log(nzTaxToPay)
        console.log(nzTaxCredit)
        nzTaxToPay = nzTaxToPay - (nzTaxCredit)

    }


}


    return nzTaxToPay
}
async function germanyTax(income,relation,year ){
    taxToPay = 0;
    
    if(relation == "Single"){
        if(income < 9744){
            taxToPay = 0
        }else if( income < 14753){
            y = (income - 9744)/10000
            taxToPay = (995.21 * y + 1400) * y
        } else if ( income < 57918){
            z = (income - 14753)/10000
            taxToPay = (208.85 * z + 2397) * z + 950.96
        } else if( income < 274612){
            taxToPay = (0.42 * income ) - 9136.63
        }else if(income > 274613){
            taxToPay = (0.45 * income ) - 17374
        }

    }else if(relation == "Married"){
        if(income < 19488){
            taxToPay = 0
        }else if( income < 28510){
            y = (income - 19488)/10000
            taxToPay = (995.21 * y + 1400) * y
        } else if ( income < 115836){
            z = (income - 28510)/10000
            taxToPay = (208.85 * z + 2397) * z + 950.96
        } else if( income < 549224){
            taxToPay = (0.42 * income ) - 9136.63
        }else if(income > 549224.01){
            taxToPay = (0.45 * income ) - 17374
        }

    }

}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});