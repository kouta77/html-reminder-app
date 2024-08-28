

var list = document.querySelector('ul');
var topContainer = document.getElementById('top-container')
var remindersParent = document.getElementById('reminderParent')
var clearedRemindersParent = document.getElementById('clearedParent')

var clear = document.getElementsByName("clear");
function regenCloseBtn () {
    for (var i = 0; i < clear.length; i++) {
        clear[i].onclick = function() {
        let div = this.parentElement.parentElement;
        if(div.className !== 'cleared') {
            div.classList.toggle('cleared');

            var restoreBtn = document.createElement("button");
            var text = document.createTextNode('restore');
            restoreBtn.className = "restore-btn";
            restoreBtn.name = 'restore';
            restoreBtn.appendChild(text);
            restoreBtn.addEventListener('click', function() {
                div.classList.toggle('cleared');
                remindersParent.appendChild(div);
                restoreBtn.remove();
              });
            div.getElementsByTagName('div')[0].appendChild(restoreBtn);


            clearedRemindersParent.appendChild(div);
        } else div.style.display = "none";
        
      }
    }
}

regenCloseBtn();

// Filter selector
let filterSelect = document.createElement('select');
filterSelect.addEventListener('change', function() {
    filterBy(this.value);
    
    console.log('Filtered by: ', this.value);
  });
// options
let opt0 = document.createElement('option'); 
    opt0.value = 'all';
    opt0.text = 'all';
let opt1 = document.createElement('option'); 
    opt1.value = 'pending';
    opt1.text = 'pending';
let opt2 = document.createElement('option'); 
    opt2.value = 'doing';
    opt2.text = 'doing';
let opt3 = document.createElement('option'); 
    opt3.value = 'missed';
    opt3.text = 'missed';
let opt4 = document.createElement('option'); 
    opt4.value = 'done';
    opt4.text = 'done';

    filterSelect.appendChild(opt0);
    filterSelect.appendChild(opt1);
    filterSelect.appendChild(opt2);
    filterSelect.appendChild(opt3);
    filterSelect.appendChild(opt4);

    topContainer.appendChild(filterSelect)

function filterBy(filterText) {
  let liList = document.getElementsByTagName('li')

  for (let i = 0; i < liList.length; i++) {
    if (liList[i].id == filterText || filterText == 'all' || liList[i].classList.contains('cleared')) {
      liList[i].style.display = "";
    } else {
      liList[i].style.display = "none";
    }
  }
}

var reminderInput = document.getElementById('reminderInput')

function createReminder() {
    console.log('created reminder');

    var li = document.createElement("li");
    var label = document.createTextNode(reminderInput.value);
    li.appendChild(label);

    var closeBtn = document.createElement("button");
    var text = document.createTextNode('delete');
    closeBtn.className = "delete-btn";
    closeBtn.name = 'clear';
    closeBtn.appendChild(text);
    var div = document.createElement('div');

    var select = document.createElement('select');
    select.addEventListener('change', function() {
        if( this.value !== 'select...' ) {
            li.id = this.value;
            console.log('You selected: ', this.value);
        } else li.id = '';
      });

    // options
    let opt0 = document.createElement('option'); 
    opt0.value = 'select...';
    opt0.text = 'select...';
    let opt1 = document.createElement('option'); 
    opt1.value = 'pending';
    opt1.text = 'pending';
    let opt2 = document.createElement('option'); 
    opt2.value = 'doing';
    opt2.text = 'doing';
    let opt3 = document.createElement('option'); 
    opt3.value = 'missed';
    opt3.text = 'missed';
    let opt4 = document.createElement('option'); 
    opt4.value = 'done';
    opt4.text = 'done';

    select.appendChild(opt0);
    select.appendChild(opt1);
    select.appendChild(opt2);
    select.appendChild(opt3);
    select.appendChild(opt4);

    div.appendChild(select);

    div.appendChild(closeBtn);

    li.appendChild(div);

    remindersParent.appendChild(li);

    reminderInput.value = "";
    regenCloseBtn();
}