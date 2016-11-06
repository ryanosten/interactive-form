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
	
	//focus on #name input on page load
	$('#name').addClass('focus');

	//bind a change event to the #title select list
	$('#title').on("change", function(){
		
		//in the title list, if the option element has text of 'other' then show text input
		if ($('option[value=other]').is(':selected')){
			
			//create new text input for job role if job is 'other'
			var textInput = $('<input type="text" id="other-title" name="other-title" placeholder="Your Title">');
			
			//append new textInput
			$('#title').after(textInput);
		
		} else {
			
			//if option of 'other not selected', hide the input
			$('#other-title').hide();
		}
	
	});

	$('#design').on("change", function(){
		
		$('#color').children().show();
		
		if ($('option[value="js puns"]').is(':selected')){

			$('#color').children().slice(3).hide();
			$('option[value=tomato]').removeAttr("selected");
			$('#color').children().first().attr("selected", "selected");
		
		} else if ($('option[value="heart js"]').is(':selected')) {

			$('#color').children().slice(0, 3).hide();
			$('#color').children().first().removeAttr("selected");
			$('option[value=tomato]').attr("selected", "selected");


		} else {
			$('#color').children().removeAttr("selected");
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
	$('#payment option[value="credit card"]').attr('selected', 'selected');
	$('.credit-card').siblings('div').hide();

	$('#payment').on('change', function(){
		if($('#payment option[value="credit card"]').is(':selected')){
			$('.credit-card').show();
			$('.credit-card').siblings('div').hide();
		
		} else if($('#payment option[value="paypal"]').is(':selected')){
			$('.credit-card').next().show();
			$('.credit-card').next().siblings('div').hide();
		} else {
			$('.credit-card').siblings().last().show();
			$('.credit-card').siblings().last().siblings('div').hide();
		}

		//check 'select payment method', make sure all is hidden. 
	
	});

	//VALIDATION AND ERROR MESSAGES

	var nameEmpty = $('<p>Name field cannot be empty. Please enter your name</p>');
	nameEmpty.css('color', 'red');
	$('label[for=name]').before(nameEmpty);
	nameEmpty.hide();

	var emailEmpty = $('<p>Email field cannot be empty. Please enter your email</p>');
	emailEmpty.css('color', 'red');
	$('label[for=mail]').before(emailEmpty);
	emailEmpty.hide();

	var shirtEmpty = $('<p>You forget to pick a t-shirt.</p>');
	shirtEmpty.css('color', 'red');
	$('label[for=design]').before(shirtEmpty);
	shirtEmpty.hide();

	var activityEmpty = $('<p>You forget to pick an activity.</p>')
	activityEmpty.css('color', 'red');
	$('.activities').after(activityEmpty);
	activityEmpty.hide();

	var paymentEmpty = $('<p>You must select a payment method.</p>')
	paymentEmpty.css('color', 'red');
	$('label[for=payment]').before(paymentEmpty);
	paymentEmpty.hide();

	$('button[type=submit]').on('click', function(){

		nameEmpty.hide();
		emailEmpty.hide();
		shirtEmpty.hide();
		activityEmpty.hide();
		paymentEmpty.hide();

		if(!$('#name').val() || !$('#mail').val() || !$('#design[value="js-puns"]').is(':selected') && !$('#design[value="heart js"]').is(':selected')){

			if(!$('#name').val()){
				nameEmpty.show();
			}

			if(!$('#mail').val()){
				emailEmpty.show();
			}

			if(!$('#design[value="js-puns"]').is(':selected') && !$('#design[value="heart js"]').is(':selected')){
				shirtEmpty.show();
			}

			var activityCounter = 0;
			
			$('.activities input[type=checkbox]').each(function(){
				if($(this).prop('checked')){
					activityCounter ++;
				}
			});
			
			if(activityCounter === 0){
				activityEmpty.show();
			}

			//check payment method

			if($('#payment option[value=select_method').is(':selected')){
				paymentEmpty.show();
				console.log('payment emp')
			};

			return false
		};
	});
});
			

