// 從 localStorage 取值，沒有值就取空陣列
let bmiData = JSON.parse(localStorage.getItem('BMIData')) || [];
const inputHeight = document.querySelector('#inputHeight');
const inputWeight = document.querySelector('#inputWeight');
const resultBtn = document.querySelector('.resultBtn');
const bmiList = document.querySelector('.bmiList');
const bmiResult = document.querySelector('.result');
const clearRecordBtn = document.querySelector('.clearRecordBtn');

// 監聽
resultBtn.addEventListener('click', calculateBMI, false);
bmiResult.addEventListener('click', recoverBtn, false);
clearRecordBtn.addEventListener('click', clearRecord, false);

// 更新資料，渲染畫面
updateBMI(bmiData);

// 計算 BMI 並做判斷
function calculateBMI() {
    let height = parseInt(inputHeight.value);
    let weight = parseInt(inputWeight.value);
    let heightM = height / 100;

    let total = (weight / (heightM * heightM)).toFixed(2);

    // 取得時間
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
    let day = (date.getDate() < 10 ? '0' : '') + date.getDate();

    let bmiTestDate = month + '-' + day + '-' + year;

    let data = [];

    if (total < 18.5) {
        // 過輕 #31BAF9
        // 以物件的方式塞進 array
        data = {
            status: '過輕',
            color: '#31BAF9',
            bmi: total,
            height: height,
            weight: weight,
            date: bmiTestDate
        };
    }
    else if (total >= 18.5 && total < 24) {
        // 理想 #86D73F
        data = {
            status: '理想',
            color: '#86D73F',
            bmi: total,
            height: height,
            weight: weight,
            date: bmiTestDate
        };
    }
    else if (total >= 24 && total < 27) {
        // 過重 #FF982D
        data = {
            status: '過重',
            color: '#FF982D',
            bmi: total,
            height: height,
            weight: weight,
            date: bmiTestDate
        };
    }
    else if (total >= 27 && total < 30) {
        // 輕度肥胖 #FF6C03
        data = {
            status: '輕度肥胖',
            color: '#FF6C03',
            bmi: total,
            height: height,
            weight: weight,
            date: bmiTestDate
        };
    }
    else if (total >= 30 && total < 35) {
        // 中度肥胖 #FF6C03
        data = {
            status: '中度肥胖',
            color: '#FF6C03',
            bmi: total,
            height: height,
            weight: weight,
            date: bmiTestDate
        };
    }
    else {
        // 重度肥胖 #FF1200
        data = {
            status: '重度肥胖',
            color: '#FF1200',
            bmi: total,
            height: height,
            weight: weight,
            date: bmiTestDate
        };
    }

    if (inputHeight.value == "") {
        alert("請輸入身高");
    }
    else if (inputWeight.value == "") {
        alert("請輸入體重");
    }
    else {
        bmiData.push(data);
        updateBMI();
        watchResult();

         // 關閉輸入欄位
        inputHeight.disabled = true;
        inputWeight.disabled = true;
    }
}

// 更新畫面
function updateBMI() {
    // 轉成 string，存到 localStorage 裡
    let bmiDataToString = JSON.stringify(bmiData);
    localStorage.setItem('BMIData', bmiDataToString);

    // 渲染 BMI 紀錄畫面
    let str = '';
    let cycleStr = '';
    for (let i = 0; i < bmiData.length; i++) {
        str += 
        `<li class="bmiItem">
            <p class="bmiColor" style="background-color: ${bmiData[i].color};"></p>

            <div class="bmiStatus font-size-20 font-primary-color text-weight-bold">
                <span>${bmiData[i].status}</span>
            </div>
            
            <div class="bmiSpace font-size-20 font-primary-color text-weight-bold">
                <small class="font-size-12 font-secondary-color">BMI</small>
                <span>${bmiData[i].bmi}</span>
            </div>
            
            <div class="bmiSpace font-size-20 font-primary-color text-weight-bold">
                <small class="font-size-12 font-secondary-color">weight</small>
                <span>${bmiData[i].weight} kg</span>
            </div>
            
            <div class="bmiSpace font-size-20 font-primary-color text-weight-bold">
                <small class="font-size-12 font-secondary-color">height</small>
                <span>${bmiData[i].height} cm</span>
            </div>
            
            <div class="bmiDate">
                <span class="font-size-12 font-secondary-color">${bmiData[i].date}</span>
            </div>
        </li>
        `;
    }
    bmiList.innerHTML = str;
}

// 點下按鈕後，顯示 BMI 結果
function watchResult() {
    resultBtn.style.display = 'none';
    bmiResult.style.display = 'block';
    let cycleStr = '';
    for (let i = 0; i < bmiData.length; i++) {
        cycleStr = 
        `
        <div class="bmiResult">
            <div class="bmiCycle" style="border: 6px solid ${bmiData[i].color};color: ${bmiData[i].color};">
                <span class="font-size-32 text-weight-bold">${bmiData[i].bmi}</span>
                <small>BMI</small>
                <a href="#" class="bmiReset" style="background-color: ${bmiData[i].color};">
                    <img src="images/icons_loop.png" alt="icons_loop">
                </a>
            </div>

            <span class="bmiNumber font-size-32 text-weight-bold" style="color: ${bmiData[i].color};">${bmiData[i].status}</span>
        </div>
        `;
    }
    bmiResult.innerHTML = cycleStr;
}

// 恢復按鈕
function recoverBtn(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'A') { return }
    resultBtn.style.display = 'block';
    bmiResult.style.display = 'none';
    
    // 開啟輸入欄位
    inputHeight.disabled = false;
    inputWeight.disabled = false;

    inputHeight.value = '';
    inputWeight.value = '';
}

// 清除所有紀錄
function clearRecord(e) {
    e.preventDefault();
    for (let i = 0; i < bmiData.length; i++) {
        bmiData.splice(i, bmiData.length);
    }
    updateBMI();
}
