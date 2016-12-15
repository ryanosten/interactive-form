$(document).ready(function() {
	
    deptArray = [];

    //check if department input empty
    function checkEmpty(){
        
        var lastDeptInput = $(".dept-container").last();

        if(!lastDeptInput.find('input').val()){
            
            lastDeptInput.append('<p class="dept-empty-error">Please enter a department name before adding a new department</p>');
            
            return true;

        }
    }

	//click handler to append newDept input and label to DOM. 
    $('.new-dept-btn').on('click', function(){
        
        $('.dept-empty-error').remove();
        $('.dept-dupe-error').remove();

        if(checkEmpty()) {
            
            return false;
        
        // check if department already exists in deptArray
        } else if ($.inArray($("input:focus").val(), deptArray) != -1) {
            $(this).prev().append('<p class="dept-dupe-error">You already have a department with this name.<p>');
            return false;

        } else {
        
        var newDept = $('<div class="dept-container"></div>').html($('#new-dept').html());
        
        $('.dept-section').append(newDept);

        newDept.find('input').focus();

    	return false;
        
        }
    	
    	});

    //check for empty dept one enter keyup
    $('input').on('keyup', function(e){
        if (e.keyCode == 13){
            
            $('.dept-empty-error').remove();
            $('.dept-dupe-error').remove();
            checkEmpty();

            return false;
        }
    });

    //click handler to remove dept if 'x' clicked
    $(document).on('click', '.close-dept-button', function(){
    	$(this).closest('.dept-container').remove();

        var deptValue = $(this).prev().val();

        var indexDeptValue = deptArray.indexOf(deptValue);
 
        if (indexDeptValue != -1){
            deptArray.splice(indexDeptValue, 1);
        }

        $('input[type="checkbox"]').each(function(){
            
            if(deptValue == $(this).attr('id')){
                $(this).parent().remove();
            }
        });

        console.log(deptArray);

    	return false;
    });

    
    //store value on focus and value on focusout of dept inputs
    var originalValue;
    var newValue;

    $(document).on('focus', '.dept-name', function(){
        originalValue = $(this).val();

    });
    

    //push new departments to deptArray
    $(document).on('focusout', '.dept-name', function(){
        
        newValue = $(this).val();
        
        if(originalValue !== newValue && deptArray.indexOf(originalValue) !== -1){

            console.log(deptArray.indexOf(newValue));
            console.log($('#' + originalValue));
            
            $('[id=' + originalValue + ']').each(function(){
               $(this).parent().remove(); 
            }); 
                
        }

        $('.dept-empty-error').remove();
        $('.dept-dupe-error').remove();

        //if new value is same as original value, don't update
        if (originalValue == newValue){
            return false;
        
        } else if ($.inArray(newValue, deptArray) != -1) {
            //refactor this after
            $(this).val('');
            $(this).parent().append('<p class="dept-dupe-error">You already have a department with this name.<p>');
            return;
        
        //if original value was empty, means its a new value and we should push to array
        } else if (originalValue === '' && newValue !== '') {
                deptArray.push(newValue);
        
        //if original value was not empty, then it means we are editing and we must remove the original value and add the new value to array    
        } else if (originalValue !== '' && newValue !== '') {
            deptArray.push(newValue);
            deptArray.splice( $.inArray(originalValue, deptArray), 1);
        
        } else if (originalValue !== '' && newValue === ''){
            deptArray.splice( $.inArray(originalValue, deptArray), 1);

        }

        console.log(deptArray);

        var dept = $(this).val();
        
        if (deptArray.indexOf(dept) != -1) {
            var deptCheckbox = $('<div class="dept-checkbox">' + '<input type="checkbox" id="' + dept + '"name="[0][]">');
                deptCheckbox.find('input').attr('value', dept).after('<label class="checkbox-label">' + dept + '</label></div>');
            $('.depts-checkbox-container').append(deptCheckbox).show();

            var checkboxArray = $('.dept-checkbox');

            $.each(checkboxArray, function(i, val){
                var parent = $(this).parents('.user-container');
                var parentId = parent[0].id;
                var thisCheckbox = $(this).find('input');

                if(thisCheckbox.attr('name') === '[0][]'){
                    thisCheckbox.attr('name', '[' + parentId + '][]');
                }

            });
        }

    });

    //counter to attach id to .user-container
    user_id = 0;
    
    //click handler to append newUser to DOM.
    $('.new-user-btn').on('click', function(){

    	var newUser = $('<div class="user-container clearfix"></div>').html($('#new-user').html());
        
        user_id++;
        
        newUser.attr('id', user_id);
        newUser.find('#user_name').attr('name', 'name[' + user_id + ']');
        newUser.find('#email').attr('name', 'email[' + user_id + ']');
        newUser.find('#job_title').attr('name', 'job_title[' + user_id + ']');
        newUser.find('#phone').attr('name', 'phone[' + user_id + ']');
        newUser.find('#role').attr('name', 'role[' + user_id + ']');
    	
    	$('#user-section').append(newUser);
        
        newUser.find('input[type=checkbox]').attr('name', '[' + newUser.attr('id') + '][]');

    	return false;
    });

    //remove user if close user button clicked
    $(document).on('click', '.close-user-button', function(){
            var user = $(this).closest('.user-container');
            user.remove();
    	   
    		return false;
    });

});


    
