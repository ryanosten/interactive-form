$(document).ready(function() {
	
	//add total price element for activities
	$('.activities label').last().after('<h2 class="total-price"></h2>');
	$('.total-price').hide();

	//focus on #name input on page load
	$('#name').focus();

	//function to sum the price of selected activities
	function displayPrice(totalPrice){
		$('.total-price').show();
		$('.total-price').html('Price: ' + totalPrice);
	}	

	//function to check the conflict times of activities
	function checkConflicts(activity){
			
			if(activity.attr('name') == "js-frameworks"){
			$('input[name=express]').parent().css('color', 'grey');
			$('input[name=express]').attr('disabled', 'disabled');
			
		} else if(activity.attr('name') == "express"){
			$('input[name=js-frameworks]').parent().css('color', 'grey');
			$('input[name=js-frameworks]').attr('disabled', 'disabled');
		
		} else if(activity.attr('name') == "js-libs"){
			$('input[name=node]').parent().css('color', 'grey');
			$('input[name=node]').attr('disabled', 'disabled');

		} else if(activity.attr('name') == "node"){
			$('input[name=js-libs]').parent().css('color', 'grey');
			$('input[name=js-libs]').attr('disabled', 'disabled');
		}
	}

	//reg expression function to validate email
	function validateEmail(mail){  
 		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  
    		return true 
  		}  
    		return false 
	}

	//function that allows only numbers in inputs on which it is called. 
	function numbersOnly(e){
		//Only allow numbers
		if(e.which != 8 && e.which != 0 && (e.which <48 || e.which > 57)){
			return false;
		}
	}  

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

	//------------T-SHIRT DESIGN-----------------

	//change event handler on design select menu
	$('#design').on("change", function(){
		
		//on change show all select options
		$('label[for=color], #color, #color option, #color-styled').show();
		
		//if 'select theme' is selected, hide color select menu
		if($('#design').children().first().is(':selected')){
			$('label[for=color], #color, #color-styled').hide();
		
		//if js puns is selected, change the value of color menue to cornflower blue and dlice and hide all non-js-puns colors
		} else if ($('#design option[value="js puns"]').is(':selected')){
			$('#color').val('cornflowerblue');
			$('#color').children().slice(3).hide();

		//if I <3 js selected, then hide all non-I<3js color and show the I <3 js colors
		} else {
			$('option[value=select-shirt]').hide()
			$('#color').val('tomato');
			$('#color').children().slice(0, 3).hide();
		} 

	});
	
	//Click handler to calculate the price sum of activities activities selected
	$('.activities input[type=checkbox]').on('click', function(){
		
		var totalPrice = 0;
		
		$('.activities label').css('color', 'black');
		$('.activities input[type=checkbox]').removeAttr('disabled');

		$('.activities input[type=checkbox]').each(function(){
	
			if($(this).prop('checked')){

				checkConflicts($(this));
			}

			if($(this).prop('checked') && $(this).attr('name') == 'all'){
				totalPrice += 200;
			
			} else if ($(this).prop('checked') && $(this).attr('name') !== 'all'){
				totalPrice += 100;
			}
		});

		if(totalPrice !== 0){
			displayPrice(totalPrice);
		} else {
			$('.total-price').hide();
		}
	});

	//PAYMENT OPTIONS
	//default payment method to credit card
	//$('#payment option[value="credit card"]').attr('selected', 'selected');
	$('.credit-card').nextAll('div').hide();
	$('#payment').val('credit card');

	$('#payment').on('change', function(){
		
		if($('#payment option[value="paypal"]').is(':selected')){
			$('.credit-card').next().show();
			$('.credit-card').hide();
			$('.credit-card').siblings().last().hide();
		
		} else if ($('#payment option[value="bitcoin"]').is(':selected')){
			$('.credit-card').siblings().last().show();
			$('.credit-card').hide();
			$('.credit-card').next().hide();
		
		} else if ($('#payment option[value="credit card"]').is(':selected')){
			$('.credit-card').show();
			$('.credit-card').nextAll('div').hide();
		} else {
			$('#credit-card').hide();
			$('#credit-card').nextAll().hide();
		}
	});

//VALIDATION AND ERROR MESSAGES

	var nameEmpty = $('<p>Name field cannot be empty. Please enter your name.</p>');
	nameEmpty.css('color', 'red');
	$('label[for=name]').before(nameEmpty);
	nameEmpty.hide();

	var emailEmpty = $('<p>Please enter a valid email</p>');
	emailEmpty.css('color', 'red');
	$('label[for=mail]').before(emailEmpty);
	emailEmpty.hide();

	var shirtEmpty = $('<p>You forget to pick a t-shirt.</p>');
	shirtEmpty.css('color', 'red');
	$('.shirt legend').after(shirtEmpty);
	shirtEmpty.hide();

	var activityEmpty = $('<p>You forget to pick an activity.</p>')
	activityEmpty.css('color', 'red');
	shirtEmpty.css('margin-top', '-20px');
	$('.activities').after(activityEmpty);
	activityEmpty.hide();

	var paymentEmpty = $('<p>You must select a payment method.</p>')
	paymentEmpty.css('color', 'red');
	$('label[for=payment]').before(paymentEmpty);
	paymentEmpty.hide();

	$('#cvv, #zip, #cc-num').keyup(numbersOnly).keypress(numbersOnly).focus(numbersOnly);
	$('#cvv').attr('maxlength', '4');
	$('#zip').attr('maxlength', '5');
	$('#cc-num').attr('maxlength', '16');

	$('button[type=submit]').on('click', function(){

		//store object returned by validateCreditCard(), which is function from cardValidator.js
		var ccResult = $('#cc-num').validateCreditCard()
		
		//create variable to store e-mail input for validation
		var mailAdd = $('#mail').val();

		//check if any of the input validators throw error. If yes, check which validation fails and then return false so that form does not submit. Reason we need to wrap all conditions in this larger if statement is because if we were to do otherwise and return false in each condition, then the following condition expressions wouldn't run after return false. 
		if(!$('#name').val() || validateEmail(mailAdd) == false || (!$('#design option[value="js puns"]').is(':selected') && !$('#design option[value="heart js"]').is(':selected')) 
			|| ($('#payment option[value="credit card"]').is(':selected') && (!ccResult.valid || ($('#zip').val() < 5) || $('#cvv').val().length < 3))){

			if(!$('#name').val()){
				nameEmpty.show();
			} else {
				nameEmpty.hide();
			}

			if(validateEmail(mailAdd) == false){
				emailEmpty.show();
			} else {
				emailEmpty.hide();
			}

			if(!$('#design option[value="js puns"]').is(':selected') && !$('#design option[value="heart js"]').is(':selected')){
				shirtEmpty.show();
			} else {
				shirtEmpty.hide();
			}

			var activityCounter = 0;
			
			$('.activities input[type=checkbox]').each(function(){
				if($(this).prop('checked')){
					activityCounter ++;
				}
			});
			
			if(activityCounter === 0){
				activityEmpty.show();
			} else {
				activityEmpty.hide();
			}

			//check if card valid
			if($('#payment option[value="credit card"]').is(':selected') && !ccResult.valid){
				$('label[for=cc-num]').css('color', 'red');
			} else {
				$('label[for=cc-num]').css('color', 'black');
			}

			//check if zip empty
			if($('#payment option[value="credit card"]').is(':selected') && ($('#zip').val() < 5)){
				$('label[for=zip]').css('color', 'red');
			} else {
				$('label[for=zip]').css('color', 'black');
			}

			var cvv = $('#cvv').val();
			if($('#payment option[value="credit card"]').is(':selected') && ($('#cvv').val().length < 3)){
				$('label[for=cvv]').css('color', 'red');
			} else {
				$('label[for=cvv]').css('color', 'black');
			}	
		
			return false
		};
	});
});
			

