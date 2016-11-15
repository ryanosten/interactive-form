$(document).ready(function() {
	
	//---------------FUNCTIONS-------------//

	//function to sum the price of selected activities
	function displayPrice(totalPrice){
		$('.total-price').show();
		$('.total-price').html('Price: ' + totalPrice);
	}	

	//function to check the conflict times of activities
	function checkConflicts(activity){
			
			//if activity is js-frameworks, then change color of express to grey and add attribute 'disabled' to express checkbox
			if(activity.attr('name') == "js-frameworks"){
			$('input[name=express]').parent().css('color', 'grey');
			$('input[name=express]').attr('disabled', 'disabled');
			
			//if activity is express, then change color of js-frameworks to grey and add attribute 'disabled' to js-frameworks checkbox
		} else if(activity.attr('name') == "express"){
			$('input[name=js-frameworks]').parent().css('color', 'grey');
			$('input[name=js-frameworks]').attr('disabled', 'disabled');
		
			//if activity is js-libs, then change color of node to grey and add attribute of disabled to node checkbox
		} else if(activity.attr('name') == "js-libs"){
			$('input[name=node]').parent().css('color', 'grey');
			$('input[name=node]').attr('disabled', 'disabled');

			//if activity is node, then change color of js-libs to grey and add attribute of disabled to js-libs checkbox
		} else if(activity.attr('name') == "node"){
			$('input[name=js-libs]').parent().css('color', 'grey');
			$('input[name=js-libs]').attr('disabled', 'disabled');
		}
	}

	//reg expression function to validate email
	function validateEmail(mail){  
 		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  
    		return true; 
  		}  
    		return false;
	}

	//function that allows only numbers in inputs on which it is called. 
	function numbersOnly(e){
		//Only allow numbers
		if(e.which !== 8 && e.which !== 0 && (e.which <48 || e.which > 57)){
			return false;
		}
	}  

	//-------------BASIC INFO---------------//

	//focus on #name input on page load
	$('#name').focus();

	//hide other title input 
	$('#other-title').hide();
	
	//bind a change event to the #title select list
	$('#title').on("change", function(){
		
		//in the title list, if the option element has text of 'other' then show text input, else hide the input
		if ($('option[value=other]').is(':selected')){
			
			//if option of 'other' selected, show the input 
			$('#other-title').show();
			
		} else {
			//else hide the 'other' input
			$('#other-title').hide();
		}
	
	});

	//------------T-SHIRT DESIGN-----------------//

	//hide color label and select menu
	$('label[for=color], #color, #color-styled, [value=select-theme]').hide();

	//change event handler on design select menu
	$('#design').on("change", function(){
		
		//on change show all select options
		$('label[for=color], #color, #color option, #color-styled').show();
		
		//if 'select theme' is selected, hide color select menu
		if($('#design').children().first().is(':selected')){
			$('label[for=color], #color, #color-styled').hide();
		
		//if js puns is selected, change the value of color menue to cornflower blue and slice and hide all non-js-puns colors. Also hide the 'select-theme' value.
		} else if ($('#design option[value="js puns"]').is(':selected')){
			$('#color').val('cornflowerblue');
			$('#color').children().slice(4).hide();
			$('[value=select-theme]').hide();

		//if I <3 js selected, then hide all non-I<3js color and show the I <3 js colors
		} else {
			$('option[value=select-shirt]').hide();
			$('#color').val('tomato');
			$('#color').children().slice(0, 4).hide();
		} 

	});
	
	//---------------ACTIVITY SELECTORS-----------------//

	//add total price element for activities
	$('.activities label').last().after('<h2 class="total-price"></h2>');
	$('.total-price').hide();
	
	//Click handler to calculate the price sum of activities activities selected
	$('.activities input[type=checkbox]').on('click', function(){
		
		//initialize price
		var totalPrice = 0;
		
		//set color of each activity label to black to reset diabled labels back to default state
		$('.activities label').css('color', 'black');

		//reset disabled attribute
		$('.activities input[type=checkbox]').removeAttr('disabled');

		//loop through all activity checkboxes, then check for conflicts and disable conflicting activities with the checkConflicts function
		$('.activities input[type=checkbox]').each(function(){
			
			//check if activity checkbox is checked
			if($(this).prop('checked')){

				checkConflicts($(this));
			}

			//if activity checkbox is checked, and the activity is the "Main Conference", then add $200 to the totalPrice variable
			if($(this).prop('checked') && $(this).attr('name') == 'all'){
				totalPrice += 200;
			
			////if activity checkbox is checked, and the activity is not the "Main Conference", then add $100 to the totalPrice variable
			} else if ($(this).prop('checked') && $(this).attr('name') !== 'all'){
				totalPrice += 100;
			}
		});

		//if total price is greater than 0, then display totalPrice, else hide it. 
		if(totalPrice > 0){
			displayPrice(totalPrice);
		} else {
			$('.total-price').hide();
		}
	});

	//----------------PAYMENT OPTIONS--------------------//

	//hide all payment information blocks except for credit card
	$('.credit-card').nextAll('div').hide();
	
	//set the value of the #payment select menu to 'credit card'
	$('#payment').val('credit card');

	//event handle bound to #payment select menu
	$('#payment').on('change', function(){
		
		//if paypal selected
		if($('#payment option[value="paypal"]').is(':selected')){
			//show paypal
			$('.credit-card').next().show();
			//hide credit card
			$('.credit-card').hide();
			//hide bitcoin
			$('.credit-card').siblings().last().hide();
		
		//if bitcoin is selected
		} else if ($('#payment option[value="bitcoin"]').is(':selected')){
			//show bitcoin
			$('.credit-card').siblings().last().show();
			//hide credit card
			$('.credit-card').hide();
			//hide paypal
			$('.credit-card').next().hide();
		
		//if credit card is selected
		} else if ($('#payment option[value="credit card"]').is(':selected')){
			//show credit card
			$('.credit-card').show();
			//hide bitcoin and paypal
			$('.credit-card').nextAll('div').hide();
		
		//else hide credit card, bitcoin and paypal
		} else {
			$('#credit-card').hide();
			$('#credit-card').nextAll().hide();
		}
	});

//VALIDATION AND ERROR MESSAGES

	//create element, structure and styles to apply if name input is empty
	var nameEmpty = $('<p>Name field cannot be empty. Please enter your name.</p>');
	nameEmpty.css('color', 'red');
	$('label[for=name]').before(nameEmpty);
	nameEmpty.hide();

	//create element, structure and styles to apply if email input is empty
	var emailEmpty = $('<p>Please enter a valid email</p>');
	emailEmpty.css('color', 'red');
	$('label[for=mail]').before(emailEmpty);
	emailEmpty.hide();

	//create element, structure and styles to apply if t-shirt design is not selected
	var shirtEmpty = $('<p>You forget to pick a t-shirt.</p>');
	shirtEmpty.css('color', 'red');
	$('.shirt legend').after(shirtEmpty);
	shirtEmpty.hide();

	//create element, structure and styles to apply if activity is not selected
	var activityEmpty = $('<p>You forget to pick an activity.</p>');
	activityEmpty.css('color', 'red');
	shirtEmpty.css('margin-top', '-20px');
	$('.activities').after(activityEmpty);
	activityEmpty.hide();

	//create element, structure and logic to apply if activity is not selected
	var paymentEmpty = $('<p>You must select a payment method.</p>');
	paymentEmpty.css('color', 'red');
	$('label[for=payment]').before(paymentEmpty);
	paymentEmpty.hide();

	//add keyup, keypress, and focus event handlers to the credit card inputs, and pass numbersOnly callback function to the event handlers. This checks the input and only allows numbers to be typed into the inputs. 
	$('#cvv, #zip, #cc-num').keyup(numbersOnly).keypress(numbersOnly).focus(numbersOnly);
	//max length of #cvv set to 4
	$('#cvv').attr('maxlength', '4');
	//max length of #zip set to 5
	$('#zip').attr('maxlength', '5');
	//max length of #cc-numb set to 16
	$('#cc-num').attr('maxlength', '16');

	//click handler on the submit button
	$('button[type=submit]').on('click', function(){

		//store object returned by validateCreditCard(), which is function from cardValidator.js jQuery plug-in. Validates that credit card number is valid
		var ccResult = $('#cc-num').validateCreditCard();
		
		//create variable to store e-mail input for validation
		var mailAdd = $('#mail').val();

		//check if any of the input validators are invalid. If yes, then check which validation fails and show the invalid indicator, and return false so that form does not submit.  
		if(!$('#name').val() || validateEmail(mailAdd) === false || (!$('#design option[value="js puns"]').is(':selected') && !$('#design option[value="heart js"]').is(':selected')) || ($('#payment option[value="credit card"]').is(':selected') && (!ccResult.valid || ($('#zip').val() < 5) || $('#cvv').val().length < 3))){

			//check if name imput value is empty, if empty show the invalid indicator nameEmpty
			if(!$('#name').val()){
				nameEmpty.show();
			} else {
				nameEmpty.hide();
			}

			//check if email is invalid format, if invalid show the invalid indicator emailEmpty
			if(validateEmail(mailAdd) === false){
				emailEmpty.show();
			} else {
				emailEmpty.hide();
			}

			//check t-shirt design not selected, if not selected show the shirtEmpty error indicator
			if(!$('#design option[value="js puns"]').is(':selected') && !$('#design option[value="heart js"]').is(':selected')){
				shirtEmpty.show();
			} else {
				shirtEmpty.hide();
			}

			//initialize an activity counter to check number of activities selected
			var activityCounter = 0;
			
			//loop through all activities checkboxes, and if an item is checked, then increment the counter
			$('.activities input[type=checkbox]').each(function(){
				if($(this).prop('checked')){
					activityCounter ++;
				}
			});
			
			//check value of activity counter, if activity counter is equal to 0, then show activityEmpty error message
			if(activityCounter === 0){
				activityEmpty.show();
			} else {
				activityEmpty.hide();
			}

			//check if card valid. If credit card is selected and ccResult is not valid (ccResult.valid == false), then change color of cc-num label to red, 
			if($('#payment option[value="credit card"]').is(':selected') && !ccResult.valid){
				$('label[for=cc-num]').css('color', 'red');
			} else {
				$('label[for=cc-num]').css('color', 'black');
			}

			//check if zip number less than 5. If credit card selected and zip is less than 5, change color of zip label to red.
			if($('#payment option[value="credit card"]').is(':selected') && ($('#zip').val() < 5)){
				$('label[for=zip]').css('color', 'red');
			} else {
				$('label[for=zip]').css('color', 'black');
			}
			
			//check if cvv value length is less than 3. If cvv lenght less than 3, change cvv color to red. 
			if($('#payment option[value="credit card"]').is(':selected') && ($('#cvv').val().length < 3)){
				$('label[for=cvv]').css('color', 'red');
			} else {
				$('label[for=cvv]').css('color', 'black');
			}	
		
			return false;
		}
	});
});
			

