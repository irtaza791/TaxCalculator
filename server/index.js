const express = require('express');

const cors = require("cors");
const app = express()
const PORT = 3001


app.use(cors());
app.use(express.json());
let y = 0

app.post("/api/create",async  (req, res)=>{
    const relation = req.body.relation;
    const income = req.body.income;
    const year = req.body.year
    const taxCredit = req.body.taxCredit
    const expenses = req.body.expenses
    let data = (await getTaxToPay(income,relation,year,expenses,taxCredit))
    console.log(data)
        res.status(200).json({
            status:true,
            message:"calculation result",
            data:data,
        });

});
async function getTaxToPay(income, relation , year,expenses,taxCredit) {
    let firstPercentage18_19_20_21 =0.145
    let secondPercentage18_19_20_21 =0.23
    let thirdPercentage18_19_20_21 =0.285
    let fourthPercentage18_19_20_21 =0.35
    let fifthPercentage18_19_20_21 =0.37
    let SixthPercentage18_19_20_21 =0.45
    let SeventhPercentage18_19_20_21 =0.48
    let thirdPercentage22 = 0.265
    let SeventhPercentage22 = 0.43
    let taxableincome = (income - expenses)
    let taxToPay = 0;
    if(year <= 2019 ){
        if(relation=="Single"){
            if(taxableincome < 7091){
                taxToPay = (firstPercentage18_19_20_21) * taxableincome 
               
            }else if(taxableincome  < 10700){

                taxableincome = taxableincome - 7091
                taxToPay = (secondPercentage18_19_20_21) * taxableincome + 1028.20
                
        
            }else if(taxableincome  < 20261){
                taxableincome = taxableincome - 10700
                taxToPay = (thirdPercentage18_19_20_21) * taxableincome + 830.07 + 1028.20
                
        
            }else if(taxableincome < 25000){
                taxableincome = taxableincome - 20261
                taxToPay = (fourthPercentage18_19_20_21) * taxableincome + 2724.88 + 830.07 + 1028.20
                
        
            }else if(taxableincome  < 36856){
                taxableincome = taxableincome - 25000                
                let x = (fifthPercentage18_19_20_21 * taxableincome )
                taxToPay =  x + 2724.88 + 830.07 + 1028.20 +  1658.65 
            }else if(taxableincome  < 80640){
                taxableincome = taxableincome - 36856  
                let x = (SixthPercentage18_19_20_21 * taxableincome )
                taxToPay = x +1658.65 + 2724.88 + 830.07 + 1028.20
                
        
            }else if(taxableincome > 80640.01 ){
                let x = taxableincome * 0.48
                taxToPay = (SeventhPercentage18_19_20_21) * taxableincome + x
            }
            taxToPay = taxToPay - taxCredit
        }
        if(relation == "Married"){
            taxableincome = taxableincome / 2
            if(taxableincome < 7091){
                taxToPay = (firstPercentage18_19_20_21) * taxableincome 
               
            }else if(taxableincome  < 10700){

                taxableincome = taxableincome - 7091
                taxToPay = (secondPercentage18_19_20_21) * taxableincome + 1028.20
                
        
            }else if(taxableincome  < 20261){
                taxableincome = taxableincome - 10700
                taxToPay = (thirdPercentage18_19_20_21) * taxableincome + 830.07 + 1028.20
                
        
            }else if(taxableincome < 25000){
                taxableincome = taxableincome - 20261
                taxToPay = (fourthPercentage18_19_20_21) * taxableincome + 2724.88 + 830.07 + 1028.20
                
        
            }else if(taxableincome  < 36856){
                taxableincome = taxableincome - 25000
                taxToPay = (fifthPercentage18_19_20_21) * taxableincome +1658.65 + 2724.88 + 830.07 + 1028.20
                
        
            }else if(taxableincome  < 80640){
                taxableincome = taxableincome - 36856
                taxToPay = (SixthPercentage18_19_20_21) * taxableincome + 7728.15
                
        
            }else if(taxableincome > 80640.01 ){
                let x = taxableincome * 0.48

                taxToPay = (SeventhPercentage18_19_20_21) * taxableincome + x
                
        
            }
            taxToPay = 2 * taxToPay
            taxToPay = taxToPay - taxCredit
        }
    }
    else if( year <=2021) {
        if(relation=="Single"){
        if(taxableincome <  7112.00 ){
            taxToPay = (firstPercentage18_19_20_21) * taxableincome 
            
        }else if(taxableincome  < 10732){

            taxableincome = taxableincome - 7112.00
            taxToPay = (secondPercentage18_19_20_21) * taxableincome + 1031.24
            
    
        }else if(taxableincome  < 20322){
            taxableincome = taxableincome - 10732
            taxToPay = (thirdPercentage18_19_20_21) * taxableincome + 832.60 + 1031.24
            
    
        }else if(taxableincome < 25075){
            taxableincome = taxableincome - 20322
            taxToPay = (fourthPercentage18_19_20_21) * taxableincome + 2733.15 + 832.60 + 1031.24
            
    
        }else if(taxableincome  < 36967){
            
            taxableincome = taxableincome - 20075.01
            
            taxToPay = (fifthPercentage18_19_20_21) * taxableincome +1663.55 + 2733.15 + 832.60 + 1031.24
            
    
        }else if(taxableincome  < 80882){
            taxableincome = taxableincome - 36967
            taxToPay = (SixthPercentage18_19_20_21) * taxableincome + 4967.25 +1663.55  + 2733.15 + 832.60 + 1031.24 
            
    
        }else if(taxableincome > 80882.02 ){
            let x = taxableincome * 0.48

            taxToPay = (SeventhPercentage18_19_20_21) * taxableincome + x
        }
        taxToPay = taxToPay - taxCredit
    }else if(relation == "Married"){

        taxableincome = taxableincome / 2
   
        if(taxableincome <  7112.00 ){
            taxToPay = (firstPercentage18_19_20_21) * taxableincome 
            
        }else if(taxableincome  < 10732){

            taxableincome = taxableincome - 7112.00
            taxToPay = (secondPercentage18_19_20_21) * taxableincome + 1031.24
            
    
        }else if(taxableincome  < 20322){
            taxableincome = taxableincome - 10732
            taxToPay = (thirdPercentage18_19_20_21) * taxableincome + 832.60 + 1031.24
            
    
        }else if(taxableincome < 25075){
            taxableincome = taxableincome - 20322
            taxToPay = (fourthPercentage18_19_20_21) * taxableincome + 2733.15 + 832.60 + 1031.24
            
    
        }else if(taxableincome  < 36967){
            console.log(taxableincome)

            taxableincome = taxableincome - 20075.01
            console.log(taxableincome)
            taxToPay = (fifthPercentage18_19_20_21) * taxableincome  +1663.55 + 2733.15 + 832.60 + 1031.24
            
    
        }else if(taxableincome  < 80882){
            taxableincome = taxableincome - 36967
            taxToPay = (SixthPercentage18_19_20_21) * taxableincome + 6250 +1663.55  + 2733.15 + 832.60 + 1031.24 
            
    
        }else if(taxableincome > 80882.02 ){
            let x = taxableincome * 0.48

            taxToPay = (SeventhPercentage18_19_20_21) * taxableincome + x
        }

            taxToPay = 2 * taxToPay
            taxToPay = taxToPay - taxCredit
        

        }
    }
    else if(year <= 2022){
        if(taxableincome <  7116.00 ){
            taxToPay = (firstPercentage18_19_20_21) * taxableincome  // 14.5% 
            
        }else if(taxableincome  < 10736){

            taxableincome = taxableincome - 7117.00
            // 23%
            taxToPay = (secondPercentage18_19_20_21) * taxableincome + 1031.24
            
    
        }else if(taxableincome  < 15216){
            taxableincome = taxableincome - 10737
            // 26.5%
            taxToPay = (thirdPercentage22) * taxableincome + 832.60 + 1031.24
            
    
        }else if(taxableincome < 19696){
            taxableincome = taxableincome - 15217
            // 28.5%
            taxToPay = (thirdPercentage18_19_20_21) * taxableincome + 1186.94  + 832.60 + 1031.24
            
        }else if(taxableincome  < 25075){  
            taxableincome = taxableincome - 19697   
            // 35%    
            taxToPay = (fourthPercentage18_19_20_21) * taxableincome + 1276.52 + 1186.94  + 832.60 + 1031.24
            
    
        }else if(taxableincome  < 36757){
            console.log("Pointer is her")
            console.log(taxableincome)
            taxableincome = taxableincome - 20076
            console.log(taxableincome)
            //37%
            taxToPay = (fifthPercentage18_19_20_21) * taxableincome  + 1882.30 + 1276.52 + 1186.94  + 832.60 + 1031.24
            
    
        }else if(taxableincome < 48033){
            taxableincome = taxableincome - 36758
            //43%
            taxToPay = (SeventhPercentage22) * taxableincome + 4967.25 +1663.55  + 2733.15 + 832.60 + 1031.24 
            
        }
        else if(taxableincome < 75009){
            taxableincome = taxableincome - 48034
            let x = taxableincome * 0.48
            //45%

            taxToPay = (SixthPercentage18_19_20_21) * taxableincome + x
        }
        else if(taxableincome > 75010){
            let x = taxableincome * 0.48
            //48%
            taxToPay = (SeventhPercentage18_19_20_21) * taxableincome + x
        }
        taxToPay = taxToPay - taxCredit
    }
    return taxToPay;
}




app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
} );