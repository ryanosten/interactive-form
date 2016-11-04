$(document).ready(function() {

	//focus on #name input on page load
	$('#name').addClass('focus');

	//bind a change event to the #title select list
	$('#title').on("change", function(){
		
		//in the title list, if the option element has text of 'other' then show text input
		if ($('option[value=other]').is(':selected')){
			
			//create new text input for job role if job is 'other'
			var textInput = $('<input type="text" id="job_role" name="job_role" placeholder="Your job role">')
			
			//append new textInput
			$('#title').after(textInput);
		
		} else {
			
			//if option of 'other not selected', hide the input
			$('input[name="job_role"]').hide();
		}
	
	});

});