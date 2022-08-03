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
    let data = (await newZealandTax(income, payPeriod, dExpenses, nztaxCredit, year))

    res.status(200).json({
        status: true,
        message: "calculation result",
        data: data,
    });

});
app.post("/api/germany", async (req, res) => {
    const relation = req.body.relation;
    const income = req.body.income;
    const year = req.body.year

    let data = (await germanyTax(income, relation, year))

    res.status(200).json({
        status: true,
        message: "calculation result",
        data: data,
    });

});
app.post("/api/france", async (req, res) => {
    const relation = req.body.relation;
    const income = req.body.income;
    const year = req.body.year
    const workStatus = req.body.workStatus;
    const payPeriod = req.body.payPeriod;
    const dependent = req.body.dependent

    let data = (await franceTax(income, relation, year, workStatus, payPeriod, dependent))

    res.status(200).json({
        status: true,
        message: "calculation result",
        data: data,
    });

});
app.post("/api/canada", async (req, res) => {
    const payPeriod = req.body.payPeriod;
    const income = req.body.income;
    const year = req.body.year
    const province = req.body.province
    const dExpenses = req.body.expenses
    let data = (await canadaTax(income, payPeriod, province, year, dExpenses,))

    res.status(200).json({
        status: true,
        message: "calculation result",
        data: data,
    });

});
app.post("/api/kenya", async (req, res) => {
    const payPeriod = req.body.payPeriod;
    const income = req.body.income;
    const year = req.body.year
    const cB = req.body.cb
    const royalties= req.body.royalties
    const workStatus= req.body.workStatus
    const disability= req.body.disability
    const insurance = req.body.insurance
    const hOwner= req.body.houseOwner
    let data = (await kenyaTax(payPeriod, income, year, cB, royalties, workStatus, disability, insurance, hOwner,))

    res.status(200).json({
        status: true,
        message: "calculation result",
        data: data,
    });

});
app.post("/api/america", async (req, res) => {
    const payPeriod = req.body.payPeriod;
    const income = req.body.income;
    const year = req.body.year
    const st = req.body.st
    const relation = req.body.relation
    let data = (await americaTax(payPeriod, income, year, relation,st))

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

    if (year < 2022) {
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
    } else if (year == 2023) {
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
            } else if (income > 180000) {
                nzTaxToPay = income - 180000
                nzTaxToPay = (nzTaxToPay * percentage4) + 1470 + 5949 + 7259.67 + 36300


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
            } else if (income > 180000) {
                nzTaxToPay = income - 180000
                nzTaxToPay = (nzTaxToPay * percentage4) + 1470 + 5949 + 7259.67 + 36300


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
async function germanyTax(income, relation, year) {
    taxToPay = 0;
    if (year < 2022) {
        if (relation == "Single") {
            if (income < 9744) {
                taxToPay = 0
            } else if (income < 14753) {
                y = (income - 9744) / 10000
                taxToPay = (995.21 * y + 1400) * y
            } else if (income < 57918) {
                z = (income - 14753) / 10000
                taxToPay = (208.85 * z + 2397) * z + 950.96
            } else if (income < 274612) {
                taxToPay = (0.42 * income) - 9136.63
            } else if (income > 274613) {
                taxToPay = (0.45 * income) - 17374
            }

        } else if (relation == "Married") {
            if (income < 19488) {
                taxToPay = 0
            } else if (income < 28510) {
                y = (income - 19488) / 10000
                taxToPay = (995.21 * y + 1400) * y
            } else if (income < 115836) {
                z = (income - 28510) / 10000
                taxToPay = (208.85 * z + 2397) * z + 950.96
            } else if (income < 549224) {
                taxToPay = (0.42 * income) - 9136.63
            } else if (income > 549224.01) {
                taxToPay = (0.45 * income) - 17374
            }

        }

    }
    return taxToPay


}

async function franceTax(income, relation, year, workStatus, payPeriod, dependent) {
    let taxToPay = 0
    if (year < 2022) {
        if (workStatus == "NonManager") {


            if (relation == "Single") {
                if (income < 10064) {
                    taxToPay = 0
                } else if (income < 25659) {
                    y = income - 10064
                    taxToPay = y * 0.14 + 0
                } else if (income < 73369) {
                    y = income - 25659
                    taxToPay = y * 0.30 + 2183.3
                } else if (income < 157806) {
                    y = income - 73369
                    taxToPay = (y * 0.41) + 2183.3 + 14313
                } else if (income > 157806) {
                    y = income - 157806
                    taxToPay = (0.45 * income) + 2183.3 + 14313 + 34619.17
                }

                if (dependent > 0) {
                    taxToPay = taxToPay * 1.5
                }

            } else if (relation == "Married") {
                if (income < 10064) {
                    taxToPay = 0
                } else if (income < 25659) {
                    y = income - 10064
                    taxToPay = y * 0.14 + 0
                } else if (income < 73369) {
                    y = income - 25659
                    taxToPay = y * 0.30 + 2183.3
                } else if (income < 157806) {
                    y = income - 73369
                    taxToPay = (y * 0.41) + 2183.3 + 14313
                } else if (income > 157806) {
                    y = income - 157806
                    taxToPay = (0.45 * income) + 2183.3 + 14313 + 34619.17
                }

                if (dependent == 0) {
                    taxToPay = taxToPay * 2
                } else if (dependent < 3) {
                    taxToPay = taxToPay * ((dependent * 0.5) + 2)
                } else {
                    taxToPay = taxToPay * ((dependent - 2) + 2.5)

                }

            } else if (relation == "together") {
                if (income < 10064) {
                    taxToPay = 0
                } else if (income < 25659) {
                    y = income - 10064
                    taxToPay = y * 0.14 + 0
                } else if (income < 73369) {
                    y = income - 25659
                    taxToPay = y * 0.30 + 2183.3
                } else if (income < 157806) {
                    y = income - 73369
                    taxToPay = (y * 0.41) + 2183.3 + 14313
                } else if (income > 157806) {
                    y = income - 157806
                    taxToPay = (0.45 * income) + 2183.3 + 14313 + 34619.17
                }

                if (dependent == 0) {
                    taxToPay = taxToPay * 1.5
                } else if (dependent < 3) {
                    taxToPay = taxToPay * (dependent * 0.5 + 1.5)
                } else {
                    taxToPay = taxToPay * ((dependent - 2) + 2)

                }



            } else if (relation == "disable") {
                if (income < 10064) {
                    taxToPay = 0
                } else if (income < 25659) {
                    y = income - 10064
                    taxToPay = y * 0.14 + 0
                } else if (income < 73369) {
                    y = income - 25659
                    taxToPay = y * 0.30 + 2183.3
                } else if (income < 157806) {
                    y = income - 73369
                    taxToPay = (y * 0.41) + 2183.3 + 14313
                } else if (income > 157806) {
                    y = income - 157806
                    taxToPay = (0.45 * income) + 2183.3 + 14313 + 34619.17
                }

                if (dependent > 0) {
                    taxToPay = taxToPay * 0.5
                }

            }


        } else if (workStatus == "Manager") {

        }

    }


    return taxToPay
}

async function canadaTax(income, payPeriod, province, year, dExpenses) {

    let CPP = 0
    let EI = 0
    let taxToPay = 0
    let federalTax = 0
    income = income - dExpenses
    if (year == "2018") {
        /* Provisional */
            if (province == "btc") {
                if (income < 10412) {
                    taxToPay = 0
                } else if (income < 39676) {
                    y = income - 10412
                    taxToPay = y * 0.0506 + 0
                } else if (income < 79353) {
                    y = income - 39676
                    taxToPay = y * .077 + 1480.76
                } else if (income < 91107) {
                    y = income - 79353
                    taxToPay = y * .105 + 1480.75 + 3055.12
                } else if (income < 110630) {
                    y = income - 91107
                    taxToPay = y * .1229 + 1480.75 + 3055.12 + 1234.16
                } else if (income < 150000) {
                    y = income - 110630
                    taxToPay = y * .147 + 1480.75 + 3055.12 + 1234.16 + 2399.375471
                } else if (income > 150000.01) {
                    y = income - 150000
                    taxToPay = y * .168 + 1480.75 + 3055.12 + 1234.16 + 2399.375471 + 5787.38
                }

            } else if (province == "que") {
                if (income < 15012) {
                    taxToPay = 0

                } else if (income < 43055) {
                    y = income - 15012
                    taxToPay = y * .15 + 0

                } else if (income < 86105) {
                    y = income - 43055
                    taxToPay = y * .20 + 4206.4485

                } else if (income < 104765) {
                    y = income - 86105
                    taxToPay = y * .24 + 0 + 4206.4485 + 8609.998

                } else if (income > 104765.01) {
                    y = income - 104765
                    taxToPay = y * .2575 + 4478.3976 + 4206.4485 + 8609.998

                }


            }
            else if (province == "nwt") {
                if (income < 14492) {
                    taxToPay = 0

                } else if (income < 42209) {
                    y = income - 14492
                    taxToPay = y * .059 + 0

                } else if (income < 84420) {
                    y = income - 42209
                    taxToPay = y * .086 + 1635.30241

                } else if (income < 137248) {
                    y = income - 84420
                    taxToPay = y * .122 + 1635.30241 + 3630.14514

                } else if (income > 137248.01) {
                    y = income - 137248
                    taxToPay = y * .1405 + 1635.30241 + 3630.14514 + 6445.01478

                }


            }
            else if (province == "ont") {



                if (income < 10354) {
                    taxToPay = 0
                } else if (income < 42960) {
                    y = income - 10354
                    taxToPay = y * 0.0505 + 0
                } else if (income < 85923) {
                    y = income - 42960
                    taxToPay = y * .0915 + 1646.6
                    console.log(taxToPay)
                } else if (income < 150000) {
                    y = income - 85923
                    taxToPay = y * .1116 + 1646.6 + 3931.1
                } else if (income < 220000) {
                    y = income - 150000
                    taxToPay = y * .1216 + 1646.6 + 3931.1 + 7150.99
                } else if (income > 220000.01) {
                    y = income - 220000
                    taxToPay = y * .1316 + 1646.6 + 3931.1 + 7150.99 + 8511.99
                }

            }
            else if (province == "alb") {
                if (income < 18915.00) {
                    taxToPay = 0

                } else if (income < 128145) {
                    y = income - 18915
                    taxToPay = y * .10 + 0

                } else if (income < 153773) {
                    y = income - 128145
                    taxToPay = y * .12 + 10923

                } else if (income < 205031) {
                    y = income - 153773
                    taxToPay = y * .13 + 10923 + 3075.36

                } else if (income < 307457) {
                    y = income - 205031
                    taxToPay = y * .14 + 10923 + 3075.36 + 6663.54

                } else if (income > 307547) {
                    y = income - 307547
                    taxToPay = y * .15 + 10923 + 3075.36 + 6663.54 + 14352.24
                }

            }
            else if (province == "sas") {
                if (income < 15065) {
                    taxToPay = 0

                } else if (income < 45225) {
                    y = income - 15065
                    taxToPay = y * .105 + 0

                } else if (income < 129214) {
                    y = income - 45225
                    taxToPay = y * .125 + 3061.79895

                } else if (income > 129214.01) {
                    y = income - 129214
                    taxToPay = y * .145 + 3061.79895 + 10498.62375

                }



            }
            else if (province == "man") {
                if (income < 9382.00) {
                    taxToPay = 0

                } else if (income < 31843) {
                    y = income - 9382
                    taxToPay = y * .108 + 0

                } else if (income < 68821) {
                    y = income - 31843
                    taxToPay = y * .1275 + 2425.78692

                } else if (income > 68821.01) {
                    y = income - 68821
                    taxToPay = y * .1740 + 4714.693725 + 2425.78692

                }


            }
            else if (province == "yuk") {
                if (income < 11809) {
                    taxToPay = 0

                } else if (income < 46605) {
                    y = income - 11809
                    taxToPay = y * .064 + 0

                } else if (income < 93208) {
                    y = income - 46605
                    taxToPay = y * .09 + 2226.94336

                } else if (income < 144489) {
                    y = income - 93208
                    taxToPay = y * .109 + 2226.94336 + 4194.2691

                } else if (income < 500000) {
                    y = income - 144489
                    taxToPay = y * .128 + 2226.94336 + 4194.2691 + 5589.62791

                } else if (income > 500000) {
                    y = income - 500000
                    taxToPay = y * 0.15 + 2226.94336 + 4194.2691 + 5589.62791 + 45505.40672
                }



            }
            else if (province == "nab") {
                if (income < 9247) {
                    taxToPay = 0

                } else if (income < 36926) {
                    y = income - 9247
                    taxToPay = y * .870 + 0

                } else if (income < 73852) {
                    y = income - 36926
                    taxToPay = y * .1450 + 2408.07213

                } else if (income < 131850) {
                    y = income - 73852
                    taxToPay = y * .1580 + 2408.07213 + 5354.26855

                } else if (income < 184590) {
                    y = income - 131850
                    taxToPay = y * .1730 + 2408.07213 + 5354.26855 + 9163.68242

                } else if (income > 184590.01) {
                    y = income - 184590
                    taxToPay = y * .1830 + 2408.07213 + 5354.26855 + 9163.68242 + 9124.01827

                }


            }
            else if (province == "nb") {
                if (income < 10043) {
                    taxToPay = 0

                } else if (income < 41675) {
                    y = income - 10043
                    taxToPay = y * .0968 + 0

                } else if (income < 83351) {
                    y = income - 41675
                    taxToPay = y * .1482 + 3061.976632

                } else if (income < 135510) {
                    y = income - 83351
                    taxToPay = y * .1652 + 3061.976632 + 6176.381718

                } else if (income < 154382) {
                    y = income - 135510
                    taxToPay = y * .1784 + 3061.976632 + 6176.381718 + 8616.665148

                } else if (income > 154382) {
                    y = income - 154382
                    taxToPay = y * .203 + 3061.976632 + 6176.381718 + 8616.665148 + 3366.763016
                }



            }
            else if (province == "ns") {
                if (income < 8481) {
                    taxToPay = 0
                } else if (income < 29590) {
                    y = income - 8481
                    taxToPay = y * 0.0879 + 0
                } else if (income < 59180) {
                    y = income - 29590
                    taxToPay = y * .1495 + 1855.5
                } else if (income < 93000) {
                    y = income - 59180
                    taxToPay = y * .1667 + 1855.5 + 4423.4
                } else if (income < 150000) {
                    y = income - 93000
                    taxToPay = y * .1750 + 1855.5 + 4423.4 + 5637.7
                } else if (income > 150000.01) {
                    y = income - 150000
                    taxToPay = y * .21 + 1855.4 + 4423.4 + 5637.8 + 9974.9
                }

            }
            else if (province == "pai") {
                if (income < 9160) {
                    taxToPay = 0

                } else if (income < 31984) {
                    y = income - 9160
                    taxToPay = y * 0.098

                } else if (income < 63969) {
                    y = income - 31984
                    taxToPay = y * 0.1380 + 2236.75102

                } else if (income > 63969.01) {
                    y = income - 63969
                    taxToPay = y * 0.1670 + 2236.75 + 4413.92

                }

            }

            if (income < 11809) {
                federalTax = 0

            } else if (income < 46605) {
                z = income - 11809
                federalTax = z * 0.15

            } else if (income < 93208) {

                z = income - 46605
                federalTax = z * 0.205 + 5219.40
                console.log(federalTax)

            } else if (income < 144489) {
                z = income - 93208
                federalTax = z * 0.26 + 5219.40 + 9553.61

            } else if (income < 205842) {
                z = income - 144489
                federalTax = z * 0.29 + 5219.40 + 9553.61 + 13333.06

            } else if (income > 205842.01) {
                z = income - 205842
                federalTax = z * 0.33 + 5219.40 + 9553.61 + 13333.06 + 17792.37

            } else {
                console.log("2018 Federal Calculation Error")
            }
/* Federal */
            if (income > 55900) {

                let x = 55900
                CPP = (x - 3500) * 0.0495
            } else {
                CPP = (income - 3500) * 0.0495
            }
/* CPP & EI */
            if (income > 51700) {
                let x = 51700
                EI = (x * 0.0166)
            } else {
                EI = (income * 0.0166)
            }

            taxToPay = taxToPay + federalTax + EI + CPP

        

    } else if (year > 2018 && year < 2022) {
        /* Provisional */
/*done*/if (province == "btc") {
            if (income < 10682.00) {
                taxToPay = 0
            } else if (income < 40707.00) {
                y = income - 10682.00
                taxToPay = y * 0.0506 + 0
            } else if (income < 81416.00) {
                y = income - 40707.00
                taxToPay = y * .077 + 1519.26 
            } else if (income < 93476.00) {
                y = income - 81416.00
                taxToPay = y * .105 + 1519.26 + 3134.59 
            } else if (income < 113506.00) {
                y = income - 93476
                taxToPay = y * .1229 + 1519.26 + 3134.59 + 1266.30
            } else if (income < 153900.00) {
                y = income - 113506
                taxToPay = y * .147 + 1519.26 + 3134.59 + 1266.30 + 2461.69
            } else if (income > 153900.01) {
                y = income - 153900.00
                taxToPay = y * .168 + 1519.26 + 3134.59 + 1266.30 + 2461.69 + 5937.92
            }

        } 
/*done*/else if (province == "que") {
            if (income < 15269.00) {
                taxToPay = 0

            } else if (income < 43790.00) {
                y = income - 15269.00
                taxToPay = y * .15 + 0

            } else if (income < 87575.00) {
                y = income - 43790.00
                taxToPay = y * .20 + 4278.15

            } else if (income < 106555.00) {
                y = income - 87575.00
                taxToPay = y * .24 + 0 + 4278.15 + 8757.00

            } else if (income > 106,555.01) {
                y = income - 106555.00
                taxToPay = y * .2575 + 4278.15 + 8757.00 + 4555.20

            }


        }
/*done*/else if (province == "nwt") {
            if (income < 14811.00) {
                taxToPay = 0

            } else if (income < 43137.00) {
                y = income - 14811.00
                taxToPay = y * .059 + 0

            } else if (income < 86277.00) {
                y = income - 42209
                taxToPay = y * .086 + 1671.23

            } else if (income < 140267.00) {
                y = income - 84420
                taxToPay = y * .122 + 1671.23 + 3710.04

            } else if (income > 140267.01) {
                y = income - 137248
                taxToPay = y * .1405 + 1671.23  + 3710.04 + 6586.78

            }


        }
/*done*/else if (province == "ont") {



            if (income < 10582.00) {
                taxToPay = 0
            } else if (income < 43906.00) {
                y = income - 10582
                taxToPay = y * 0.0505 + 0
            } else if (income < 87813.00) {
                y = income - 43906
                taxToPay = y * .0915 + 1682.86
                console.log(taxToPay)
            } else if (income < 150000.00) {
                y = income - 87813
                taxToPay = y * .1116 + 1682.86 + 4017.49
            } else if (income < 220000) {
                y = income - 150000
                taxToPay = y * .1216 + 1682.86 + 4017.49 + 6940.07
            } else if (income > 220000.01) {
                y = income - 220000
                taxToPay = y * .1316 + 1682.86 + 4017.49 + 6940.07 + 8512.00
            }

        }
/*done*/ else if (province == "alb") {
            if (income < 19369.00) {
                taxToPay = 0

            } else if (income < 131220.00) {
                y = income - 19369
                taxToPay = y * .10 + 0

            } else if (income < 157464.00) {
                y = income - 131220
                taxToPay = y * .12 + 11185.10

            } else if (income < 209952.00) {
                y = income - 157464
                taxToPay = y * .13 + 11185.10 + 3149.28

            } else if (income < 314928.00) {
                y = income - 209952
                taxToPay = y * .14 + 11185.10 + 3149.28 + 6823.44

            } else if (income > 314,928.01) {
                y = income - 314928
                taxToPay = y * .15 + 11185.10 + 3149.28 + 6823.44 + 14696.64
            }

        }
/*done*/else if (province == "sas") {
            if (income < 16065.00) {
                taxToPay = 0

            } else if (income < 45225.00) {
                y = income - 16065.00
                taxToPay = y * .105 + 0

            } else if (income < 129214.00) {
                y = income - 45225
                taxToPay = y * .125 + 3061.80

            } else if (income > 129,214.01) {
                y = income - 129214
                taxToPay = y * .145 + 3061.79895 + 10498.62375

            }



        }
/*done*/else if (province == "man") {
            if (income < 9626.00) {
                taxToPay = 0

            } else if (income < 32670.00) {
                y = income - 9626.00
                taxToPay = y * .108 + 0

            } else if (income < 70610.00) {
                y = income - 32670.00
                taxToPay = y * .1275 + 2488.75

            } else if (income > 70610.01) {
                y = income - 70610.00
                taxToPay = y * .1740 +  2488.75 + 4825.87

            }


        }
/*done*/else if (province == "yuk") {
            if (income < 12069.00) {
                taxToPay = 0

            } else if (income < 47630.00) {
                y = income - 12069
                taxToPay = y * .064 + 0

            } else if (income < 95259.00) {
                y = income - 47630
                taxToPay = y * .09 + 2275.90

            } else if (income < 147667.00) {
                y = income - 95259
                taxToPay = y * .109 + 2275.90 + 4286.61

            } else if (income < 500000) {
                y = income - 147667
                taxToPay = y * .128 + 2275.90 + 4286.61 + 5712.47

            } else if (income > 500000.01) {
                y = income - 500000
                taxToPay = y * 0.15 + 2275.90 + 4286.61 + 5712.47 + 45098.62
            }



        }
/*done*/else if (province == "nab") {
            if (income < 9414.00) {
                taxToPay = 0

            } else if (income < 37591.00) {
                y = income - 9414.00
                taxToPay = y * .870 + 0

            } else if (income < 75181.00) {
                y = income - 37591.00
                taxToPay = y * .1450 + 2451.40

            } else if (income < 134224.00) {
                y = income - 75181.00
                taxToPay = y * .1580 + 2451.40 + 5450.55

            } else if (income < 187913.00) {
                y = income - 134224.00
                taxToPay = y * .1730 + 2451.40 + 5450.55 + 9328.79
 
            } else if (income > 187913.01) {
                y = income - 187913.00
                taxToPay = y * .1830 + 2451.40 + 5450.55 + 9328.79 + 9288.20

            }


        }
/*done*/else if (province == "nb") {
            if (income < 10624.00) {
                taxToPay = 0

            } else if (income < 42592.00) {
                y = income - 10624.00
                taxToPay = y * .0968 + 0

            } else if (income < 85184.00) {
                y = income - 42592.00
                taxToPay = y * .1482 + 3094.50

            } else if (income < 138491.00) {
                y = income - 85184.00
                taxToPay = y * .1652 + 3094.50 + 6312.13

            } else if (income < 157778.00) {
                y = income - 138491.00
                taxToPay = y * .1784 + 3094.50 + 6312.13 + 8806.31

            } else if (income > 157778.00) {
                y = income - 157778.00
                taxToPay = y * .203 + 3094.50 + 6312.13 + 8806.31 + 3440.80
            }



        }
/*done*/else if (province == "ns") {
            if (income < 8481) {
                taxToPay = 0
            } else if (income < 29590) {
                y = income - 8481
                taxToPay = y * 0.0879 + 0
            } else if (income < 59180) {
                y = income - 29590
                taxToPay = y * .1495 + 1855.5
            } else if (income < 93000) {
                y = income - 59180
                taxToPay = y * .1667 + 1855.5 + 4423.4
            } else if (income < 150000) {
                y = income - 93000
                taxToPay = y * .1750 + 1855.5 + 4423.4 + 5637.7
            } else if (income > 150000.01) {
                y = income - 150000
                taxToPay = y * .21 + 1855.4 + 4423.4 + 5637.8 + 9974.9
            }

        }
/*done*/else if (province == "pai") {
            if (income < 9160) {
                taxToPay = 0

            } else if (income < 31984) {
                y = income - 9160
                taxToPay = y * 0.098

            } else if (income < 63969) {
                y = income - 31984
                taxToPay = y * 0.1380 + 2236.75102

            } else if (income > 63969.01) {
                y = income - 63969
                taxToPay = y * 0.1670 + 2236.75 + 4413.92

            }

        }

        /* Federal */
        
        if (income <   12069.00 ) {
            federalTax = 0

        } else if (income <   47630.00 ) {
            z = income - 12069
            federalTax = z * 0.15

        } else if (income <   92259.00 ) {

            z = income - 47630
            federalTax = z * 0.205 + 5334.1485
            console.log(federalTax)

        } else if (income <   147667.00 ) {
            z = income - 92259
            federalTax = z * 0.26 + 5334.1485 + 9148.94295

        } else if (income <   210371.00 ) {
            z = income - 147667
            federalTax = z * 0.29 + 5334.1485 + 9148.94295 + 14406.0774

        } else if (income >  210371.01) {
            z = income - 210371
            federalTax = z * 0.33 + 5334.1485 + 9148.94295 + 14406.0774 + 18184.1571

        } else {
            console.log("2018 Federal Calculation Error")
        }
/* CPP & EI */
        if (income > 57400) {

            let x = 57400
            CPP = (x - 3500) * 0.051
        } else {
            CPP = (income - 3500) * 0.051
        }

        if (income > 53100) {
            let x = 53100
            EI = (x * 0.0162)
        } else {
            EI = (income * 0.0162)
        }

        taxToPay = taxToPay + federalTax + EI + CPP




    }

    return taxToPay
}
async function kenyaTax(payPeriod, income, year, cB, royalties, workStatus, disability, insurance, hOwner){

    taxToPay  = 0
    taxableincome = 0
    
    
    if (year > 2018){
       
        if(payPeriod == "Yearly"){
            console.log("pointer pass year")
            
            

            if (insurance == "yes" && disability == "yes"){
                console.log("pointer pass dis1")
                insurancePremium = 5000
                dis =  1800000.00 
        
            }else if(insurance == "yes" && disability == "no"){
                console.log("pointer pass dis2")
                insurancePremium = 1000
                dis = 0
            }else if(insurance == "no" && disability == "yes"){
                console.log("pointer pass dis3")
                insurancePremium = 0
                dis =  1800000.00 
            }else if(insurance == "no" && disability == "no"){
                console.log("pointer pass dis4")
                insurancePremium = 0
                dis =  0
            }
            
            if(hOwner == "yes"){
                console.log("pointer pass owner")
                hOT = 8000 
        
            }else if(hOwner == "no"){
                console.log("pointer pass no owner")
                hOT = 0
        
            }
            console.log(cB)
            let x = Number(cB)
            let totaldeduction = 0
            totaldeduction = x + hOT
            console.log(income , totaldeduction , dis)
            income = income - totaldeduction - dis
            console.log(income)

            if(income < 147580){
                taxableincome = income * .10
                taxToPay = taxableincome

            }else if(income < 286623){
                taxableincome = income - 147580
                taxToPay = (taxableincome * .15 )+ 14758

            }else if(income < 425666){
                console.log("pointer pass tax")
                taxableincome = income - 286623
                taxToPay = (taxableincome * .20  )+ 14758 + 20856.3

            }else if (income <564709){
                taxableincome = income - 425666
                taxToPay = (taxableincome * .25 )+ 14758 + 20856.3 + 27808.4

            }else if(income > 564710){
                taxableincome = income - 564709
                taxToPay = (taxableincome * .30 )+ 14758 + 20856.3  + 27808.4 + 34760.5

            }
            console.log(taxToPay)
            personalrelief = 16896
            insuranceRelief = insurancePremium * .15
            taxToPay = taxToPay - personalrelief - insuranceRelief


        }else if(payPeriod == "Monthly"){
            console.log("pointer pass month")

            if (insurance == "yes" && disability == "yes"){
                console.log("pointer pass dis1")
                insurancePremium = 500
                dis =  150000.00 
        
            }else if(insurance == "yes" && disability == "no"){
                console.log("pointer pass dis2")
                insurancePremium = 500
                dis = 0
            }else if(insurance == "no" && disability == "yes"){
                console.log("pointer pass dis3")
                insurancePremium = 0
                dis =  150000.00 
            }else if(insurance == "no" && disability == "no"){
                console.log("pointer pass dis4")
                insurancePremium = 0
                dis =  0
            }
            

            if(hOwner == "yes"){
                console.log("pointer pass howner")
                hOT = 800
        
            }else if(hOwner == "no"){
                console.log("pointer pass howner")
                hOT = 0
        
            }
            let x = Number(cB)
            totaldeduction = x + hOT
            income = income - totaldeduction - dis
            console.log(totaldeduction)
            console.log(dis)
            console.log(income)
            
            if(income < 12298){
                taxableincome = income * .10
                taxToPay = taxableincome

            }else if(income < 23885){
                taxableincome = income - 12298
                taxToPay = (taxableincome * .15 ) +  1229.80 

            }else if(income < 35472){
                taxableincome = income - 23885
                taxToPay = (taxableincome * .20  ) +  1229.80 + 1738.05 

            }else if (income <47509){
                taxableincome = income - 35472
                taxToPay = (taxableincome * .25 ) +  1229.80 + 1738.05 +  2317.40 

            }else if(income > 564710){
                taxableincome = income - 47509
                taxToPay = (taxableincome * .30 ) +  1229.80 + 1738.05 +  2317.40 + 3009.25 

            }
            console.log(taxToPay)
            personalrelief = 1408
            insuranceRelief = insurancePremium * .15
            taxToPay = taxToPay - personalrelief - insuranceRelief
               
        }
    }

    return taxToPay

}

async function americaTax(payPeriod, income, year, relation,st){
    console.log(payPeriod, income, year, relation)
    
    let stateTaxToPay = 0
    let federalTax = 0
    let taxToPay = 0
    if (year > 2018){
        if(relation == "single" || relation == "married"){
            if(payPeriod == "Yearly" || payPeriod == "Monthly" ){
                             
            if(st == "alb"){
                if(income < 500){
                    stateTaxToPay = income * 0.02

                }else if(income<3000){
                    stateTaxToPay = income * 0.04

                }else if(income>3000){
                    stateTaxToPay = income * 0.05

                }

            }//>Alabama</option>
            else if(st =="alk"){
                stateTaxToPay = 0
            }//>Alaska</option>
            else if(st =="arz"){
                if(income < 27808){
                    stateTaxToPay = income * 0.0259

                }else if(income<55615){
                    stateTaxToPay = income * 0.0334

                }else if(income<166843){
                    stateTaxToPay = income * 0.0417

                }else if(income>166843.01){
                    stateTaxToPay = income * 0.450
                }
            }//>Arizona</option>
            else if(st =="ark"){
                if(income < 4300){
                    stateTaxToPay = income * 0.02

                }else if(income<8500){
                    stateTaxToPay = income * 0.04

                }else if(income>8500.01){
                    stateTaxToPay = income * 0.0550

                }

            }//>Arkansas</option>
            else if(st =="clf"){
                if(income < 9325.00){
                    stateTaxToPay = income * 0.01

                }else if(income<22107.00){
                    stateTaxToPay = income * 0.02

                }else if(income<34892.00){
                    stateTaxToPay = income * 0.04

                }else if(income<48435.00){
                    stateTaxToPay = income * 0.06
                }
                else if(income<61214.00){
                    stateTaxToPay = income * 0.08
                }
                else if(income<312686.00){
                    stateTaxToPay = income * 0.0930
                }
                else if(income<375221.00){
                    stateTaxToPay = income * 0.103
                }
                else if(income<625369.00){
                    stateTaxToPay = income * 0.113
                }
                else if(income<1000000.00){
                    stateTaxToPay = income * 0.123
                }
                else if(income>1000000.01){
                    stateTaxToPay = income * 0.133
                }

            }//>California</option>
            else if(st =="cod"){
                if(income>0){
                    stateTaxToPay = income * 0.0463
                }
            }//>Colorado</option>
            else if(st =="cont"){
                if(income < 10000.00){
                    stateTaxToPay = income * 0.03

                }else if(income<50000.00){
                    stateTaxToPay = income * 0.05

                }else if(income<100000.00){
                    stateTaxToPay = income * 0.055

                }else if(income<200000.00){
                    stateTaxToPay = income * 0.06
                }
                else if(income<250000.00){
                    stateTaxToPay = income * 0.065
                }else if(income<500000.00){
                    stateTaxToPay = income * 0.69
                }
                else if(income>500000.00){
                    stateTaxToPay = income * 0.0699
                }

            }//>Connecticut</option>
            else if(st == "dlw"){
                if(income<5000.00){
                    stateTaxToPay = income * 0.022

                }else if(income<10000.00){
                    stateTaxToPay = income * 0.039

                }else if(income<20000.00){
                    stateTaxToPay = income * 0.048
                }
                else if(income<25000.00){
                    stateTaxToPay = income * 0.052
                }else if(income<60000.00){
                    stateTaxToPay = income * 0.555
                }
                else if(income>500000.00){
                    stateTaxToPay = income * 0.066
                }
            }//Delaware</option>
            else if(st =="doc"){
                if(income<10000){
                    stateTaxToPay = income * 0.04

                }else if(income<40000.00){
                    stateTaxToPay = income * 0.06

                }else if(income<60000.00){
                    stateTaxToPay = income * 0.065
                }
                else if(income<250000.00){
                    stateTaxToPay = income * 0.085
                }else if(income<500000.00){
                    stateTaxToPay = income * 0.0925
                }
                else if(income<1000000.00){
                    stateTaxToPay = income * 0.975
                }
                else if(income>1000000.01){
                    stateTaxToPay = income * 0.1075
                }
            
                
                
            }//District Of Columbia</option>
            else if(st == "fld"){
                stateTaxToPay = 0
            }//>Florida</option>
            else if(st =="grg"){
                if(income<750.00){
                    stateTaxToPay = income * 0.01

                }else if(income<2250.00){
                    stateTaxToPay = income * 0.02

                }else if(income<3750.00){
                    stateTaxToPay = income * 0.03
                }
                else if(income<5250.00){
                    stateTaxToPay = income * 0.04
                }else if(income<7000.00){
                    stateTaxToPay = income * 0.05
                }
                else if(income>7000.00){
                    stateTaxToPay = income * 0.0575
                }

            }//>Georgia</option>
            else if(st =="haw"){
                if(income<2400.00){
                    stateTaxToPay = income * 0.014

                }else if(income<4800.00){
                    stateTaxToPay = income * 0.032

                }else if(income<9600.00){
                    stateTaxToPay = income * 0.055
                }
                else if(income<14400.00){
                    stateTaxToPay = income * 0.064
                }
                else if(income<19200.00){
                    stateTaxToPay = income * 0.068
                }
                else if(income<2400000){
                    stateTaxToPay = income * 0.072
                }
                else if(income<36000.00){
                    stateTaxToPay = income * 0.076
                }
                else if(income<48000.00){
                    stateTaxToPay = income * 0.079
                }
                else if(income<150000.00){
                    stateTaxToPay = income * 0.0825
                }
                else if(income<175000.00){
                    stateTaxToPay = income * 0.09
                }
                else if(income<200000){
                    stateTaxToPay = income * 0.1
                }
                else if(income>200000){
                    stateTaxToPay = income * 0.11
                }

            }//>Hawaii</option>
            else if(st =="ida"){
                if(income<1,588.00){
                    stateTaxToPay = income * 0.01

                }else if(income<4,763.00){
                    stateTaxToPay = income * 0.03

                }else if(income<7,939.00){
                    stateTaxToPay = income * 0.045
                }
                else if(income>7,939.00){
                    stateTaxToPay = income * 0.06
                }

            }//>Idaho</option>
            else if(st =="ils"){
                if(income>0){
                    stateTaxToPay = income * 0.0495
                }

            }//>Illinois</option>
            else if(st =="ind"){
                if(income>0){
                    stateTaxToPay = income * 0.0323
                }
            }//>Indiana</option>
            else if(st =="iow"){
                if(income<1,743.00){
                    stateTaxToPay = income * 0.0033

                }else if(income<3,486.00){
                    stateTaxToPay = income * 0.0067

                }else if(income<6,972.00){
                    stateTaxToPay = income * 0.0225
                }
                else if(income<15,687.00){
                    stateTaxToPay = income * 0.0414
                }
                else if(income<26,145.00){
                    stateTaxToPay = income * 0.0563
                }
                else if(income<34,860.00){
                    stateTaxToPay = income * 0.0596
                }
                else if(income<52,290.00){
                    stateTaxToPay = income * 0.0625
                }
                else if(income<78,435.00){
                    stateTaxToPay = income * 0.0744
                }
                else if(income>78,435.00){
                    stateTaxToPay = income * 0.0853
                }

            }//>Iowa</option>
            else if(st =="kan"){
                if(income<15000){
                    stateTaxToPay = income * 0.0310
                }else if(income<30000){
                    stateTaxToPay = income * 0.0525
                }
                else if(income>30000.01){
                    stateTaxToPay = income * 0.0570
                }
            }//>Kansas</option>
            else if(st =="ken"){
                if(income > 0 ){
                    stateTaxToPay = income* 0.05
                }
            }//>Kentucky</option>
            else if(st =="lsn"){
                if(income<12500.00){
                    stateTaxToPay = income * 0.0185
                }else if(income<50000.00){
                    stateTaxToPay = income * 0.0350
                }
                else if(income>50000.01){
                    stateTaxToPay = income * 0.0425
                }

            }//>Louisiana</option>
            else if(st =="mai"){
                if(income<23000.00){
                    stateTaxToPay = income * 0.0580
                }else if(income<54450.00){
                    stateTaxToPay = income * 0.0675
                }
                else if(income>54450.01){
                    stateTaxToPay = income * 0.0715
                }


            }//>Maine</option>
            else if(st =="mrl"){
                if(income<1000.00){
                    stateTaxToPay = income * 0.02
                }else if(income<2000.00){
                    stateTaxToPay = income * 0.03
                }
                else if(income<3000.00){
                    stateTaxToPay = income * 0.04
                }else if(income<100000.00){
                    stateTaxToPay = income * 0.0475
                }
                else if(income<125000.01){
                    stateTaxToPay = income * 0.05
                }else if(income<150000.00){
                    stateTaxToPay = income * 0.0525
                }
                else if(income<250000.00){
                    stateTaxToPay = income * 0.055
                }
                else if(income>250000.01){
                    stateTaxToPay = income * 0.0575
                }
            }//>Maryland</option>
            else if(st =="mst"){
                if(income>0){
                    stateTaxToPay = income * 0.05
                }
            }//>Massachusetts</option>
            else if(st =="mic"){
                if(income>0){
                    stateTaxToPay = income * 0.0425
                }
            }//>Michigan</option>
            else if(st =="mins"){
                if(income<28080.00){
                    stateTaxToPay = income * 0.0535
                }
                else if(income<92,230.00){
                    stateTaxToPay = income * 0.0680
                }
                else if(income < 171220.00){
                    stateTaxToPay = income * 0.0785
                }
                else if(income > 171220.00){
                    stateTaxToPay = income * 0.0985
                }
                

            }//>Minnesota</option>
            else if(st =="misi"){
                if(income > 5000 ){
                    stateTaxToPay = income * 0.4

                }else if(income>10000){
                    stateTaxToPay = income * 0.5
                }
            }//>Mississippi</option>
            else if(st =="mso"){
                if(income<1088){
                    stateTaxToPay = income * 0.015
                }
                else if(income < 2176){
                    stateTaxToPay = income * 0.02
                }
                else if(income < 3264){
                    stateTaxToPay = income * 0.025
                }
                else if(income<4352){
                    stateTaxToPay = income * 0.03
                }
                else if(income < 5440){
                    stateTaxToPay = income * 0.035
                }
                else if(income < 6528){
                    stateTaxToPay = income * 0.04
                }
                else if(income<7616){
                    stateTaxToPay = income * 0.045
                }
                else if(income < 8704.00){
                    stateTaxToPay = income * 0.05
                }
                else if(income > 8704.00){
                    stateTaxToPay = income * 0.054
                }

            }//>Missouri</option>
            else if(st =="mont"){
                if(income<3,100.00){
                    stateTaxToPay = income * 0.01
                }
                else if(income < 5,500.00){
                    stateTaxToPay = income * 0.02
                }
                else if(income < 8,400.00){
                    stateTaxToPay = income * 0.03
                }
                else if(income < 11,400.00){
                    stateTaxToPay = income * 0.04
                }
                else if(income < 14,600.00){
                    stateTaxToPay = income * 0.05
                }
                else if(income < 18,800.00){
                    stateTaxToPay = income * 0.06
                }
                else if(income > 18,800.00){
                    stateTaxToPay = income * 0.0675
                }
                
            }//>Montana</option>
            else if(st =="neb"){
                if(income<3440){
                    stateTaxToPay = income * 0.0246
                }
                else if(income < 20590){
                    stateTaxToPay = income * 0.0351
                }
                else if(income < 33180){
                    stateTaxToPay = income * 0.0501
                }
                else if(income > 33180.01){
                    stateTaxToPay = income * 0.0684
                }
            }//>Nebraska</option>
            else if(st =="nevd"){
                stateTaxToPay = 0
            }//>Nevada</option>
            else if(st =="nh"){
                if(income>0){
                    stateTaxToPay = income*0.05
                }
            }//>New Hampshire</option>
            else if(st =="nj"){
                if(income<20000){
                    stateTaxToPay = income * 0.014
                }
                else if(income < 35000){
                    stateTaxToPay = income * 0.0175
                }
                else if(income < 40000){
                    stateTaxToPay = income * 0.0350
                }
                else if(income < 75000){
                    stateTaxToPay = income * 0.0553
                }
                else if(income < 500000){
                    stateTaxToPay = income * 0.0637
                }
                else if(income <1000000){
                    stateTaxToPay = income * 0.0897
                }
                else if(income >1000000){
                    stateTaxToPay = income * 0.1075
                }

            }//>New Jersey</option>
            else if(st =="nm"){

                if(income<5500){
                    stateTaxToPay = income * 0.017
                }
                else if(income < 11000){
                    stateTaxToPay = income * 0.032
                }
                else if(income < 16000){
                    stateTaxToPay = income * 0.0470
                }
                else if(income < 210000){
                    stateTaxToPay = income * 0.049
                }
                else if(income > 210000){
                    stateTaxToPay = income * 0.059
                }

            }//>New Mexico</option>
            else if(st =="ny"){

                if(income<8,500.00){
                    stateTaxToPay = income * 0.04
                }
                else if(income < 11700){
                    stateTaxToPay = income * 0.045
                }
                else if(income < 13900){
                    stateTaxToPay = income * 0.0525
                }
                else if(income < 80650){
                    stateTaxToPay = income * 0.0585
                }
                else if(income < 215400){
                    stateTaxToPay = income * 0.0625
                }
                else if(income <1077550){
                    stateTaxToPay = income * 0.0685
                }
                else if(income < 5000000){
                    stateTaxToPay = income * 0.0965
                }
                else if(income < 25000000){
                    stateTaxToPay = income * 0.1030
                }
                else if(income > 25000000){
                    stateTaxToPay = income * 0.1090
                }

            }//>New York</option>
            else if(st =="ncl"){
                if(income>0){
                    stateTaxToPay = income*0.0499
                }
            }//>North Carolina</option>
            else if(st =="ndk"){
                if(income < 40525){
                    stateTaxToPay = income * 0.011
                }
                else if(income < 98100){
                    stateTaxToPay = income * 0.0204
                }
                else if(income < 204675){
                    stateTaxToPay = income * 0.0227
                }
                else if(income < 445000){
                    stateTaxToPay = income * 0.0264
                }
                else if(income > 445000){
                    stateTaxToPay = income * 0.0290
                }

            }//>North Dakota</option>
            else if(st =="oh"){

                if(income > 25000){
                    stateTaxToPay = income * 0.0277
                }
                else if(income > 44250){
                    stateTaxToPay = income * 0.0323
                }
                else if(income > 88450){
                    stateTaxToPay = income * 0.0369
                }
                else if(income > 110650){
                    stateTaxToPay = income * 0.0399
                }
                

            }//>Ohio</option>
            else if(st =="okh"){
                if(income < 1000){
                    stateTaxToPay = income * 0.0025
                }
                else if(income < 2500){
                    stateTaxToPay = income * 0.0075
                }
                else if(income < 3750){
                    stateTaxToPay = income * 0.0175
                }
                else if(income < 4900){
                    stateTaxToPay = income * 0.0275
                }
                else if(income < 7200){
                    stateTaxToPay = income * 0.0375
                }
                else if(income > 7200){
                    stateTaxToPay = income * 0.0475
                }
            }//>Oklahoma</option>
            else if(st =="org"){
                if(income < 3650){
                    stateTaxToPay = income * 0.0475
                }
                else if(income < 9200){
                    stateTaxToPay = income * 0.0675
                }
                else if(income < 125000){
                    stateTaxToPay = income * 0.0875
                }
                else if(income > 125000){
                    stateTaxToPay = income * 0.0990
                }
            }//>Oregon</option>
            else if(st =="pslv"){
                if(income > 0){
                    stateTaxToPay = income*0.0307
                }
            }//>Pennsylvania</option>
            else if(st =="ri"){
                if(income < 68200){
                    stateTaxToPay = income * 0.0375
                }
                else if(income < 155050){
                    stateTaxToPay = income * 0.0475
                }
                else if(income > 155050){
                    stateTaxToPay = income * 0.0599
                }
                
            }//>Rhode Island</option>
            else if(st =="stc"){
                if(income < 3200){
                    stateTaxToPay = 0
                }
                else if(income < 6410){
                    stateTaxToPay = income * 0.03
                }
                else if(income < 9620){
                    stateTaxToPay = income * 0.04
                }
                else if(income < 12820){
                    stateTaxToPay = income * 0.05
                }
                else if(income < 16040){
                    stateTaxToPay = income * 0.06
                }
                else if(income > 16040){
                    stateTaxToPay = income * 0.07
                }
            }//>South Carolina</option>
            else if(st =="std"){
                
                    stateTaxToPay =0
                
            }//>South Dakota</option>
            else if(st =="tnc"){
                stateTaxToPay =0
            }//>Tennessee</option>
            else if(st =="tex"){
                stateTaxToPay =0
            }//Texas</option>
            else if(st =="ut"){
                if(income>0){
                    stateTaxToPay = income*0.0495
                }
            }//>Utah</option>
            else if(st =="vt"){
                if(income < 40950){
                    stateTaxToPay = income * 0.0335
                }
                else if(income < 99200){
                    stateTaxToPay = income * 0.0660
                }
                else if(income < 206950){
                    stateTaxToPay = income * 0.0760
                }
                else if(income > 206950){
                    stateTaxToPay = income * 0.0875
                }
                

            }//Vermont</option>
            else if(st =="vrgn"){
                if(income < 3000){
                    stateTaxToPay = income * 0.02
                }
                else if(income < 5000){
                    stateTaxToPay = income * 0.03
                }
                else if(income < 17000){
                    stateTaxToPay = income * 0.05
                }
                else if(income > 17000){
                    stateTaxToPay = income * 0.0575
                }
            }//>Virginia</option>
            else if(st =="wt"){
                stateTaxToPay =0
            }//Washington</option>
            else if(st =="wv"){ 
                if(income < 10000){
                    stateTaxToPay = income * 0.03
                }
                else if(income < 25000){
                    stateTaxToPay = income * 0.04
                }
                else if(income < 40000){
                    stateTaxToPay = income * 0.045
                }
                else if(income < 60000){
                    stateTaxToPay = income * 0.06
                }
                else if(income > 60000){
                    stateTaxToPay = income * 0.065
                }
            }//West Virginia</option>
            else if(st =="wsn"){
                if(income < 12760){
                    stateTaxToPay = income * 0.0354
                }
                else if(income < 25520){
                    stateTaxToPay = income * 0.0465
                }
                else if(income < 280950){
                    stateTaxToPay = income * 0.053
                }
                else if(income > 280950){
                    stateTaxToPay = income * 0.0765
                }
                
            }//Wisconsin</option>
            else if(st =="yom"){
                stateTaxToPay = 0
            }//Wyoming

            if(income<9950){
                federalTax = income * .10 
        

            }else if(income<40525){
                federalTax = income * .12 + 1194

            }else if(income<86375){
                federalTax = income * .22 + 1194 + 6726.50

            }else if(income< 164925){
                federalTax = income * .24 + 1194 + 6726.50 + 11004.00

            }else if(income<209425){
                federalTax = income * .32 + 1194 + 6726.50 + 11004.00 + 25136.00

            }else if(income < 523600){
                federalTax = income * .35 + 1194 + 6726.50 + 11004.00 + 25136.00 + 15575.00

            }else if(income > 523600.01){
                federalTax = income * .37 + 1194 + 6726.50 + 11004.00 + 25136.00 + 15575.00 + 116244.75

            }


            taxToPay = federalTax + stateTaxToPay

            }
        }
        
    }
   

    return taxToPay
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});