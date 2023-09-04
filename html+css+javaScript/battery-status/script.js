const batteryLevel = document.querySelector(".batterylevel");
const batteryImg = document.querySelector("img");
const batteryCharging = document.querySelector(".charging");
const batteryTimeOut = document.querySelector(".timeout");
const batteryWarning = document.querySelector(".warning");
const batteryContainer = document.querySelector(".container");


document.getElementById("btn").addEventListener("click", function(){
    batteryContainer.style.display = "block";
})

batteryDisplay()

function batteryDisplay(){
    navigator.getBattery().then((battery)=>{
    function updateBatteryInfo(){
        updateChargeInfo();
        updateLevelInfo();
        updateDischargingInfo();        
    }
    updateBatteryInfo()

    battery.addEventListener("levelChange",()=>{
        updateLevelInfo()
    });
    function updateLevelInfo (){
        let percentage = Math.round(((battery.level) * 100));
        batteryLevel.innerHTML = `${percentage}%`;
        
        if(battery.charging){
            batteryImg.src = "img/charging.gif"
        } else {
            if(percentage<=10){
            batteryWarning.innerHTML = "Bettery is low, Please connect charger."
            batteryImg.src = "img/10.png"
            } else if(percentage<=20) {
                batteryWarning.innerHTML ="Bettery is low, Please connect charger."
                batteryImg.src = "img/20.png"    
            } else if(percentage<=40){
                batteryWarning.innerHTML="Bettery is low, Please connect charger."
                batteryImg.src= "img/30.png"
            } else if(percentage<=60){
                batteryImg.src = "img/60png"
            }else if(percentage<=80){
                batteryImg.src = "img/80.png"
            }
            else{
                batteryImg.src = "img/100(2).png"
            }        
        }
        
    }

    battery.addEventListener("chargingChange",()=>{
        updateChargeInfo()
    });
    function updateChargeInfo() {
        let chargingTime = Math.round(((battery.chargingTime)/3600));
        if(battery.charging){
            batteryCharging.innerHTML = "Charging⚡⚡"
            batteryTimeOut.innerHTML = `The Battery will be fully charged in ${chargingTime} Hrs.`
        }
    }

    battery.addEventListener("dischargingTimeChange",()=>{
        updateDischargingInfo()
    });

    function updateDischargingInfo(){
        let dischargeTimeHr = Math.round(((battery.dischargingTime)/3600))
        let dischargeTimeMin = Math.round(((battery.dischargingTime)%3600)/60)
        if(battery.charging === false){
            batteryCharging.innerHTML = ""
            batteryTimeOut.innerHTML = `The Battery will die in ${dischargeTimeHr}hour and ${dischargeTimeMin}minutes.`
        } 
    }

})};
