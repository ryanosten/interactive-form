$(document).ready(function() {
	
	$('.activities label').last().after('<h2 class="total-price"></h2>');
	$('.total-price').hide();

	function displayPrice(totalPrice){
		$('.total-price').show();
		$('.total-price').html('Price: ' + totalPrice);
	}	

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

	function validateEmail(mail){  
 		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  
    		return true 
  		}  
    		return false 
	}

	function numbersOnly(e){
		//Only allow numbers
		if(e.which != 8 && e.which != 0 && (e.which <48 || e.which > 57)){
			return false;
		}
	}  

	//validate credit card

	/*
	function validCC(){
		$('#cc-num').validateCreditCard(function(result){
			result.valid;
		});
	}
	*/

	//focus on #name input on page load
	$('#name').focus();

	//bind a change event to the #title select list
	$('#title').on("change", function(){
		
		//in the title list, if the option element has text of 'other' then show text input
		if ($('option[value=other]').is(':selected')){
			
			//if option of 'other not selected', hide the input
			$('#other-title').show();
			
		} else {

			$('#other-title').hide();
		}
	
	});

	//T-SHIRT DESIGN

	$('#design').on("change", function(){
		
		$('label[for=color], #color, #color option').show();
		
		if($('#design').children().first().is(':selected')){
			$('label[for=color], #color').hide();
		
		} else if ($('#design option[value="js puns"]').is(':selected')){
			$('#color').val('cornflowerblue');
			$('#color').children().slice(3).hide();

		} else {
			$('option[value=select-shirt]').hide()
			$('#color').val('tomato');
			$('#color').children().slice(0, 3).hide();
		} 

	});
	
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
	$('.credit-card').siblings('div').hide();
	$('#payment').val('credit card');

	$('#payment').on('change', function(){
		
		if($('#payment option[value="paypal"]').is(':selected')){
			$('.credit-card').next().show();
			$('.credit-card').next().siblings('div').hide();
		
		} else if ($('#payment option[value="bitcoin"]').is(':selected')){
			$('.credit-card').siblings().last().show();
			$('.credit-card').hide();
			$('.credit-card').next().hide();
		
		} else if ($('#payment option[value="credit card"]').is(':selected')){
			$('.credit-card').show();
			$('.credit-card').siblings('div').hide();
		} else {
			$('#payment').nextAll().hide();
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

		//create variable to store e-mail input for validation
		var mailAdd = $('#mail').val();

		//check if any of the input validators throw error. If yes, check which validation fails and then return false so that form does not submit. Reason we need to wrap all conditions in this larger if statement is because if we were to do otherwise and return false in each condition, then the following condition expressions wouldn't run after return false. 
		if(!$('#name').val() || validateEmail(mailAdd) == false || (!$('#design option[value="js puns"]').is(':selected') && !$('#design option[value="heart js"]').is(':selected')) 
			|| ($('#payment option[value="credit card"]').is(':selected') || $('#payment option[value="select_method"]').is(':selected') && (/*validCC() == false ||*/ !$('#cc-num').val() || ($('#zip').val() < 5) || $('#cvv').val().length < 3))){

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

			//check if card # empty
			if(($('#payment option[value="credit card"]').is(':selected') || $('#payment option[value=select_method]').is(':selected')) && !$('#cc-num').val()){
				$('label[for="cc-num"').css('color', 'red');
			} else {
				$('label[for="cc-num"').css('color', 'black')
			}

			//check if zip empty
			if(($('#payment option[value="credit card"]').is(':selected') || $('#payment option[value=select_method]').is(':selected')) && ($('#zip').val() < 5)){
				$('label[for=zip').css('color', 'red');
			} else {
				$('label[for=zip').css('color', 'black');
			}

			var cvv = $('#cvv').val();
			if(($('#payment option[value="credit card"]').is(':selected') || $('#payment option[value=select_method]').is(':selected')) && ($('#cvv').val().length < 3) /*|| isNaN(cvv)*/){
				$('label[for=cvv]').css('color', 'red');
			} else {
				$('label[for=cvv]').css('color', 'black');
			}


			//check 
			


			/*
			if (($('#payment option[value="credit card"]').is(':selected') || $('#payment option[value=select_method]').is(':selected')) && (validCC() == false)){
				console.log('this shit run');
				/*		
				var validCC = ('<p> please enter a valid credit card number<p>');
				$('#payment').after(validCC);
				$(validCC).css('color', 'red');
				
			}

			*/


			return false
		};
	});
});
			

