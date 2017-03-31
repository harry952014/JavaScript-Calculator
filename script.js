$(document).ready(function() {

  var inputs = [''];
  var subInput = [''];
  var currNum;
  var finalDisplay;
  var operators = ['+', '-', '*', '/'];
  var operator = {
    "add": '+',
    "subtract": '-',
    "multiply": '*',
    "divide": '/',
    "dot": '.'
  };
  var operator1 = {
    "add": '+',
    "subtract": '-',
    "multiply": '*',
    "divide": '/',
  };

  function update() {

    finalDisplay = inputs.join('');
    subInput = finalDisplay.split(/[^0-9.]/);
    currNum = subInput[subInput.length - 1];

    if(currNum.length>9 || inputs.length > 21){
      $("#display").html("0");
      $("#subDisp").html("Digits limit reached");
      inputs = [''];
      return;
    }
    
    if (Object.values(operator1).indexOf(inputs[inputs.length - 1]) !== -1){
      $("#display").html(inputs[inputs.length - 1]);
      $("#subDisp").html(finalDisplay);
    }else{
      $("#display").html(currNum);
      $("#subDisp").html(finalDisplay);
    }

  }

  function getOperator(input) {

    if (inputs.length === 1 && input !== operator.dot) {
      console.log("Not allowed");
      return;

    } else if (inputs[inputs.length - 1] !== operator.dot && input === operator.dot) {
      finalDisplay = inputs.join('');
      subInput = finalDisplay.split(/[^0-9.]/);
      currNum = subInput[subInput.length - 1];

      if (currNum.includes(".")) {
        console.log("Not allowed");
      } else {
        inputs.push(input);
      }

    } else {

      if (Object.values(operator).indexOf(inputs[inputs.length - 1]) !== -1) {
        console.log("Not Allowed");
        //return;
      } else {
        inputs.push(input);    
      }
    }

    update();

  }

  function getTotal() {

    finalDisplay = inputs.join('');
    $("#display").html(eval(finalDisplay));
    
  }

  //keypad event handler
  $("#0,#1,#2,#3,#4,#5,#6,#7,#8,#9").on("click", function() {  
    inputs.push(this.id);
    update();
  });

  //Eraser fucntion
  $("#clearAll,#clearOne").on('click', function() {

    if (this.id === 'clearOne') {
      inputs.pop();
      update();
    } else {
      inputs = [''];
      update();
    }
  });

  //Operators fucntion
  $("#add,#subtract,#multiply,#divide,#dot,#equals").on('click', function() {

    if (this.id === 'equals') {
      getTotal();
    } else {
      getOperator(operator[this.id]);
    }
  });

});