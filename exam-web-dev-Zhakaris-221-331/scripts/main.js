
let name;
let routeForm = document.querySelector(".routeForm");
let totalCost = document.querySelector(".totalCost");
let oneRoute;
let routName = document.querySelector(".routName");
let searchRoute = document.querySelector(".searchRoute");
let element = document.querySelector(".languageSelect");
let masOneRoute = [];
let masOneGuide = [];
let flag, flagChange = false;
let events = ['1.1', '2.1', '3.1', '4.1', '5.1', '6.1', '7.1', '8.1', '23.2', '8.3', '29.4', '30.4', '1.5', '9.5', '10.5', '12.6', '4.11', '30.12', '31.12'];
let workExperience2 = document.querySelector(".workExperience2");
let nameForm = document.querySelector(".nameForm");
let responseGuides, responseRoutes;
let durationForm = document.querySelector(".timeChoice");
let workExperience1 = document.querySelector(".workExperience1");
let mainObjectFilter = document.querySelector(".mainObjectFilter");
let priceForm = document.querySelector(".totalCost");
let option1 = document.querySelector(".option1");
let option2 = document.querySelector(".option2");
let tableOfRoutes = document.querySelector(".routsTable tbody");
let timeForm = document.querySelector(".startTime");
let numberOfPeople = document.querySelector(".numberOfPeople");
let alertZone = document.querySelector(".alert");
let pricePerHour, optionOne = 1, optionTwo = 1, isItMorning = 0, isItEvening = 0, numberOfVisitors = 0, isThisDayOff = 1;
let numberHour = 1;
let response;
let oneGuide;
let inputDate = document.getElementById('excursionDate');
const recordsPerPage = 3;
let totalRecords;
let totalPages;



function choseOneCheckerRoute(newRow) {
    masOneRoute.forEach(function(item) {
        if (newRow == item) {
            newRow.className = 'table-primary';    
        } else {
            item.className = '';
        }
    });
}

function sendRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            response = JSON.parse(xhr.responseText);
            callback(response);
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            alertZone.removeAttribute('hidden');
            setTimeout(function() {
                alertZone.setAttribute('hidden', 'true');
            }, 2000);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function choseOneCheckerGuide(newRow) {
    masOneGuide.forEach(function(item) {
        if (newRow == item) {
            newRow.className = 'table-primary';    
        } else {
            item.className = '';
        }
    });
}

function extraRouteTableCreater(item) {
    let newRow = tableOfRoutes.insertRow();
    
    if (oneRoute == item) {
        masOneRoute = [];
        masOneRoute.push(newRow);
        console.log(".");
        choseOneCheckerRoute(newRow);
    }

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);

    cell1.innerHTML = item.name;
    cell2.innerHTML = item.description;
    cell3.innerHTML = item.mainObject;

    let selectButton = document.createElement('button');
    selectButton.innerHTML = 'Выбрать';
    selectButton.className = 'btn btn-primary align';

    cell4.appendChild(selectButton);

    selectButton.addEventListener('click', function() {
        oneRoute = item;
        masOneRoute.push(newRow);
        choseOneCheckerRoute(newRow);
        routName.innerHTML = '';
        routName.innerHTML = item.name;
        routeForm.innerHTML = item.name;
        let id_route = item.id;
        sendRequest(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${id_route}/guides?api_key=5a8a5353-16a0-4434-b948-f013ca00433e`, GuidesResponse); 
    });
}

function extraGuideTableCreater(item) {
    let newRow = tableOfGuides.insertRow();

    if (oneGuide == item) {
        masOneGuide = [];
        masOneGuide.push(newRow);
        choseOneCheckerGuide(newRow);
    }

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);
    
    cell1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-person" viewBox="0 0 16 16"><path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>';
    cell2.innerHTML = item.name;
    cell3.innerHTML = item.language;
    cell4.innerHTML = item.workExperience;
    cell5.innerHTML = item.pricePerHour;

    let selectButton = document.createElement('button');
    selectButton.innerHTML = 'Выбрать';
    selectButton.className = 'btn btn-primary align';
    cell6.appendChild(selectButton);
    selectButton.addEventListener('click', function() {
        oneGuide = item;
        masOneGuide.push(newRow);
        choseOneCheckerGuide(newRow);
        nameForm.innerHTML = item.name;
    });
}

function costCalculate(costPerHour, calculateFlag) {
    if (calculateFlag == 1) {
        pricePerHour = costPerHour;
        console.log(pricePerHour);
    } else if (calculateFlag == 2) {
        numberHour = costPerHour;
        console.log(numberHour);
    } else if (calculateFlag == 3) {
        optionOne = costPerHour;
        console.log(optionOne);
    } else if (calculateFlag == 4) {
        optionTwo = costPerHour;
        console.log(optionTwo);
    } else if (calculateFlag == 5) {
        isItEvening = 0;
        isItMorning = costPerHour;
        console.log(isItMorning);
    } else if (calculateFlag == 6) {
        isItMorning = 0;
        isItEvening = costPerHour;
        console.log(isItMorning);
    } else if (calculateFlag == 7) {
        isItMorning = 0;
        isItEvening = 0;
        console.log(isItMorning, isItEvening);
    } else if (calculateFlag == 8) {
        numberOfVisitors = costPerHour;
        console.log(numberOfVisitors);
    } else if (calculateFlag == 9) {
        isThisDayOff = costPerHour;
        console.log(isThisDayOff);
    }

    priceForm.innerHTML = '';
    priceForm.innerHTML = Math.floor((pricePerHour * numberHour * isThisDayOff + isItMorning + isItEvening + numberOfVisitors) * optionOne * optionTwo);
}

option1.addEventListener('change', function() {
    if (option1.checked) {
        costCalculate(1.3, 3);
    } else {
        priceForm.innerHTML = Math.floor((pricePerHour * numberHour * isThisDayOff + isItMorning + isItEvening + numberOfVisitors) * optionTwo);
        costCalculate(1, 3);
    }
});

option2.addEventListener('change', function() {
    const fullDate = new Date(inputDate.value);
    const dayOfWeek = fullDate.getDay();
    
    if (option2.checked && (dayOfWeek === 0 || dayOfWeek === 6)) {
        costCalculate(1.25, 4);
    } else if (option2.checked && dayOfWeek > 0 && dayOfWeek < 6) {
        costCalculate(1.3, 4);
    } else {
        priceForm.innerHTML = Math.floor((pricePerHour * numberHour * isThisDayOff + isItMorning + isItEvening + numberOfVisitors) * optionOne);
        costCalculate(1, 4);
    }
});

inputDate.addEventListener('change', function() {
    const fullDate = new Date(inputDate.value);
    const dayOfWeek = fullDate.getDay();
    const dateDay = fullDate.getDate().toString();
    const dateMonth = (fullDate.getMonth() + 1).toString();
    const day = dateDay + "." + dateMonth;
    console.log(typeof day, day);
    console.log(inputDate.checked);
    console.log(inputDate.checked && (dayOfWeek === 0 || dayOfWeek === 6 || events.includes(day)));
    
    if (dayOfWeek === 0 || dayOfWeek === 6 || events.includes(day)) {
        costCalculate(1.5, 9);
    } else if (dayOfWeek > 0 && dayOfWeek < 6 && !events.includes(day)) {
        priceForm.innerHTML = Math.floor((pricePerHour * numberHour + isItMorning + isItEvening + numberOfVisitors) * optionOne * optionTwo);
        costCalculate(1, 9);
    }
});

durationForm.addEventListener('change', function() {
    costCalculate(parseInt(durationForm.value, 10), 2);
});

let timeout;

timeForm.addEventListener('change', function() {
    clearTimeout(timeout);

    timeout = setTimeout(function() {
        const selectedTime = timeForm.value; 
        const hours = parseInt(selectedTime.split(":")[0], 10);
        const mins = parseInt(selectedTime.split(":")[1], 10);

        if (mins.length != 0 && hours.length != 0) {
            if (hours < 9 || (hours == 23 && mins > 0) || mins % 30 != 0) {
                alert("Часы работы с 9:00 до 23:00 c инетрвалом в 30 минут");
                timeForm.value = '';
            } else if (hours >= 9 && hours <= 12 && selectedTime != '12:30') {
                costCalculate(400, 5);
            } else if (hours >= 20 && hours <= 23) {
                costCalculate(1000, 6);
            } else {
                priceForm.innerHTML = Math.floor((pricePerHour * numberHour * isThisDayOff + numberOfVisitors) * optionOne * optionTwo);
                costCalculate(0, 7);
            }
        }


    }, 1000);
});

numberOfPeople.addEventListener('change', function() {
    numberPeaple = parseInt(numberOfPeople.value, 10);
    console.log(typeof numberPeaple);
    if (numberOfPeople.value.length > 0 & Number.isInteger(numberPeaple) & (numberPeaple >= 1 && numberPeaple <= 20)) {
        if (numberPeaple >= 0 && numberPeaple <= 5) {
            priceForm.innerHTML = Math.floor((pricePerHour * numberHour * isThisDayOff + isItMorning + isItEvening) * optionOne * optionTwo);
            costCalculate(0, 8);
        } else if (numberPeaple > 5 && numberPeaple <= 10) {
            costCalculate(1000, 8);
        } else if (numberPeaple > 10 && numberPeaple <= 20) {
            costCalculate(1500, 8);
        }
    } else {
        costCalculate(0, 8);
        timeout = setTimeout(5000);
        alert("В группе может быть от 1 до 20 человек");
        numberOfPeople.value = '';
    }
});

function showPage(flag, currentPage) {
    let start = (currentPage - 1) * recordsPerPage;
    let end = start + recordsPerPage;
    let paginatedItems;

    let mainObjectOption = document.createElement('option');
    mainObjectOption.innerHTML = 'Не выбрано';
    mainObjectFilter.innerHTML = '';
    mainObjectFilter.add(mainObjectOption);
    responseRoutes.forEach(function(item) {
        mainObjectOption = document.createElement('option');
        mainObjectOption.innerHTML = item.mainObject;
        mainObjectFilter.appendChild(mainObjectOption);
    });

    if (flag == 1) {
        paginatedItems = responseRoutes.slice(start, end);        
        tableOfRoutes.innerHTML = '';
        paginatedItems.forEach(function(item) {
            extraRouteTableCreater(item);
        });
    }

    if (flag == 2) {
        let optionElement = document.createElement('option');
        element.innerHTML = '';
        optionElement.value = "Не выбрано";
        optionElement.text = "Не выбрано";
        element.appendChild(optionElement);
        tableOfGuides = document.querySelector(".tableOfGuides tbody");
        tableOfGuides.innerHTML = '';
        let routName = document.querySelector(".routName");
        let languageSet = new Set();

        responseGuides.forEach(function(item) {
            let newRow = tableOfGuides.insertRow();

            if (oneGuide == item) {
                masOneGuide = [];
                masOneGuide.push(newRow);
                choseOneCheckerGuide(newRow);
            }
    
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);
            let cell6 = newRow.insertCell(5);
    
            cell1.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-person" viewBox="0 0 16 16"><path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>';
            cell2.innerHTML = item.name;
            cell3.innerHTML = item.language;
            languageSet.add(item.language);
            cell4.innerHTML = item.workExperience;
            cell5.innerHTML = item.pricePerHour;
    
            let selectButton = document.createElement('button');
            selectButton.className = 'btn btn-primary align';
            selectButton.textContent = 'Выбрать';
            cell6.appendChild(selectButton);
            
            selectButton.addEventListener('click', function() {
                oneGuide = item;
                masOneGuide.push(newRow);
                choseOneCheckerGuide(newRow);
                nameForm.innerHTML = item.name;
                costCalculate(parseInt(item.pricePerHour, 10), 1);
            });
        });
        
        languageSet.forEach(function (language) {
            optionElement = document.createElement('option');
            optionElement.value = language;
            optionElement.text = language;
            element.appendChild(optionElement);
        });

    }
}

function paganationCreater(flag, startPage, endPage, currentPage, paginationCheckerCopy) {
    let paginationContainer;

    if (flag == 1) {
        paginationContainer = document.querySelector('.pagination');
        paginationContainer.innerHTML = '';
    }

    if (flag == 2) {
        paginationContainer = document.querySelector('.pagination-guides');
        paginationContainer.innerHTML = '';
    }

    const paginationWrapper = document.createElement('ul');
    paginationWrapper.classList.add('pagination');

    for (let buttonNum = startPage; buttonNum <= endPage; buttonNum++) {
        const listItem = document.createElement('li');
        listItem.classList.add('page-item');

        const btn = document.createElement('button');
        btn.innerText = buttonNum;
        btn.classList.add('page-link');

        if (buttonNum === currentPage) {
            listItem.classList.add('active'); 
        }

        btn.addEventListener('click', function() {
            showPage(flag, buttonNum);
            paginationCheckerCopy(flag, buttonNum);
        });

        listItem.appendChild(btn);
        paginationWrapper.appendChild(listItem);
    }

    paginationContainer.appendChild(paginationWrapper);
}

function paginationChecker(flag, currentPage) {

    const maxPageButtons = 5;
    let startPage, endPage;
        
    if (currentPage <= 2) {
        startPage = 1;
        endPage = maxPageButtons;
    } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - maxPageButtons + 1;
        endPage = totalPages;
    } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
    }
 
    paganationCreater(flag, startPage, endPage, currentPage, paginationChecker);
}

mainObjectFilter.addEventListener('change', function() {
    let tableOfRoutes = document.querySelector(".routsTable tbody");
    tableOfRoutes. innerHTML = '';
    mainObjectChoice = mainObjectFilter.value;
    responseRoutes.forEach(function(item) {
        if (mainObjectChoice == item.mainObject) {
            extraRouteTableCreater(item);
        } else if (mainObjectChoice == 'Не выбрано') {
            showPage(1, 1);
        }
    });
});

function RoutesResponse(response) {
    flag = 1;
    totalPages = Math.ceil(response.length / recordsPerPage);
    responseRoutes = response;
    paginationChecker(flag, 1);
    showPage(flag, 1); 
}

function GuidesResponse(response) {
    responseGuides = response;
    flag = 2;
    showPage(flag, 1); 
}

searchRoute.addEventListener('change', function() {
    let searchQuery = searchRoute.value;
    console.log(searchQuery.trim() > 0);
    if (searchQuery.trim().length > 0) {
        tableOfRoutes.innerHTML = '';
        responseRoutes.forEach(function(item) {
            if (item.name.includes(searchQuery)) {
                extraRouteTableCreater(item);
            }
        });
    } else {
        showPage(1, 1);
    }
});

function filterAndDisplayGuides() {
    const selectedLanguage = element.value;
    const minExperience = workExperience1.value ? parseInt(workExperience1.value, 10) : 0;
    const maxExperience = workExperience2.value ? parseInt(workExperience2.value, 10) : Number.MAX_SAFE_INTEGER;

    tableOfGuides.innerHTML = '';

    responseGuides.forEach(function(guide) {
        const guideLanguage = guide.language === selectedLanguage || selectedLanguage === 'Не выбрано';
        const guideExperience = guide.workExperience >= minExperience && guide.workExperience <= maxExperience;

        if (guideLanguage && guideExperience) {
            extraGuideTableCreater(guide);
        }
    });
}

element.addEventListener('change', filterAndDisplayGuides);
workExperience1.addEventListener('change', filterAndDisplayGuides);
workExperience2.addEventListener('change', filterAndDisplayGuides);

window.onload = function () {
    sendRequest('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=5a8a5353-16a0-4434-b948-f013ca00433e', RoutesResponse);
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitBtn').addEventListener('click', function() {
        const excursionDate = document.getElementById('excursionDate').value;
        const startTime = document.getElementById('startTime').value;
        const duration = document.getElementById('duration').value;
        const peopleCount = document.getElementById('peopleCount').value;
        const metroTransfer = document.getElementById('metroTransfer').checked;
        const interactiveGuide = document.getElementById('interactiveGuide').checked;

        console.log("excursionDate:", excursionDate); 
        console.log("startTime:", startTime); 
        console.log("duration:", duration); 
        console.log("peopleCount:", peopleCount); 
        console.log("metroTransfer:", metroTransfer); 
        console.log("interactiveGuide:", interactiveGuide); 

        let savedOrders = sessionStorage.getItem('orders');
        if (savedOrders) {
            savedOrders = JSON.parse(savedOrders);
        } else {
            savedOrders = [];
        }

        const orderData = {
            routeName: document.querySelector('.routeForm').innerText,
            guideName: document.querySelector('.nameForm').innerText,
            cost: document.querySelector('.totalCost').innerText,
            date: excursionDate,
            startTime: startTime,
            duration: duration,
            peopleCount: peopleCount,
        };

        console.log("Order data:", orderData);

        savedOrders.push(orderData);
        sessionStorage.setItem('orders', JSON.stringify(savedOrders));
    });
});