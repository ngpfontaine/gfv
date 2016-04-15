// REQUIRED FORM FIELD ON PAGE CONFIRMATION SCRIPT
// NGPFONTAINE  20160405
// NICFONTAINE.COM

// VARS FOR CUSTOMIZING TEXT CONTENT
var buttonSendingText = 'Sending...';
var validationErrorText = 'Please complete all required fields';

var coverButton = '#form-button-cover';
var formAfterContent = '<div id="form-confirmation"></div>';

var completeIcon = '<i class="fa fa-check"></i>';
var completeSpinner = '<i class="fa fa-spinner"></i>';

// CLASS NAME FOR ALL REQUIRED FORM <li> ELEMENTS
var liReq = '.form-req';
// FIELD UNDER REQUIRED <li>
var fieldReqAll = '.form-req input';
// CLASS NAMES FOR EACH REQUIRED FIELD
var fieldQuestionReq = '.question-req';
var fieldEmailReq = '.email-req';
var fieldNameReq = '.name-req';
var fieldFirstReq = '.first-req';
var fieldLastReq = '.last-req';

var gFormButtonDom = document.getElementById('gform_submit_button_1');
var buttonTextCache = gFormButtonDom.value;

(function($) {

// ADD COVER BUTTON AND CONFIRMATION DIV AFTER GRAVITY FORMS DIV
$(formAfterContent).insertAfter('#gform_wrapper_1');

// MAKE BUTTON COVER COPY SAME AS G FORM COPY
// document.getElementById('form-button-cover').innerHTML = gFormButtonDom.value;
var buttonTextCache = gFormButtonDom.value;

$(fieldReqAll).addClass('required-field');

// ALL REQ FIELDS, ADD BORDER ON FOCUS IF BLANK
$(fieldReqAll).focus(function() {
  if ( $(this).val().length === 0 ) {
  $(this).addClass('required-field required-focus');
  $(this).removeClass('required-border');
  }
});

// RUN ON FIELD WHEN TYPING - TAKES INTO ACCOUNT AUTOFILL DROPDOWN SELECTION CLICKS
$(fieldReqAll).on('keyup keydown input change', function() {
  // IF FIELD PARENT LI HAS CLASS OF (question-req || first-req || last-req)
  if ( $(this).parents(fieldQuestionReq).length || $(this).parents(fieldNameReq).length || $(this).parents(fieldLastReq).length || $(this).parents(fieldFirstReq).length ) {
    // CHECK IF LENGTH IS LONGER THAN 0 && NOT JUST SPACES
    if ( $(this).val().length > 0 && $.trim($(this).val()) !== '' ) {
      $(this).removeClass('required-field required-focus required-border');
      // ADD COMPLETE CHECK
      $(this).parent().addClass('completed-field');
      buttonEnable();
    }
  }
  // IF FIELD PARENT LI HAS CLASS OF email-req RUN REGEX FUNCTION
  else if ( $(this).parents(fieldEmailReq).length ) {
    if ( isValidEmailAddress($(this).val()) ) {
      $(this).removeClass('required-field required-border required-focus');
      // ADD COMPLETE CHECK
      if ( !$(this).parent().hasClass('completed-field') ) {
        var me = this;
        $(this).after(completeSpinner);

        var timerEmail = setTimeout(function() {
          $(me).siblings('i').remove();
          $(me).after(completeIcon);
          $(me).parent().addClass('checked-field');
        }, 800);
      }

      $(this).parent().addClass('completed-field');
      document.getElementById('form-confirmation').innerHTML = '';
      buttonEnable();
    } else {
      $(this).addClass('required-field required-focus');
      // $(coverButton).show();
      // REMOVE COMPLETE CHECK
      $(this).parent().removeClass('completed-field');
      $(this).siblings('i').remove();
    }
  }

});

// IF ANY FIELD VALUE GOES BACK TO 0 ON KEYUP OR BLUR (NOTE) KEYUP NOT WORKING ON FIREFOX MOBILE
$(fieldReqAll).on('keyup change', function() {
  if ( $(this).val().length === 0 && $(this).is(":focus")) {
    $(this).addClass('required-field required-focus');

    $(this).removeClass('required-focus');

    $(this).parent().removeClass('completed-field');
    // $(coverButton).show();
    // REMOVE COMPLETE CHECK
    $(this).siblings('i').remove();
    $(this).parent().removeClass('checked-field');
  }
});

// IF ANY FIELD VALUE GOES BACK TO 0 ON KEYUP OR BLUR (NOTE) KEYUP NOT WORKING ON FIREFOX MOBILE
$(fieldReqAll).on('blur', function() {
  if ( $(this).val().length === 0) {
    $(this).addClass('required-field required-border');
    $(this).parent().removeClass('completed-field');
    // $(coverButton).show();
    // REMOVE COMPLETE CHECK
    $(this).siblings('i').remove();
    $(this).parent().removeClass('checked-field');
  }
  // IF EMAIL FIELD IS EDITED/CHANGED, INVALIDATE
  else if ( $(this).parents(fieldEmailReq).length ) {
      if ( !isValidEmailAddress($(this).val()) ) {
      $(this).addClass('required-field required-focus required-border');
      $(this).parent().removeClass('completed-field');
      }
  }
});

// FIELD ON BLUR, IF COMPLETED AND NOT YET CHECKED - TO PREVENT MULTIPLE CHECKS
$(fieldReqAll).on('blur', function() {
  if ( $(this).parent().hasClass('completed-field') && !$(this).parent().hasClass('checked-field') ) {
    var me = this;
    $(this).after(completeSpinner);
    var timerRemove = setTimeout(function() {
      $(me).siblings('i').remove();
      $(me).after(completeIcon);
    }, 600);
    // TAG TO PREVENT MULTIPLE CHECKS
    $(this).parent().addClass('checked-field');
  }
});

// REGEX FUNCTION
function isValidEmailAddress(emailAddress) {
  var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return pattern.test(emailAddress);
};

// ON BUTTON COVER CLICK, DISPLAY ERROR
$(coverButton).click(function() {
  document.getElementById('form-confirmation').innerHTML = validationErrorText;
  // ADD RED BORDER TO BLANK FIELDS
  $('.required-field').addClass('required-border required-pulse');
  var timerPulse = setTimeout(function() {
    $('.required-field').removeClass('required-pulse');
  }, 300);
});

// DISABLE/ENABLE BUTTON SUBMIT
gFormButtonDom.addEventListener('click', function(e) {

	if (!sendEnabled) {
  	e.preventDefault();
	  document.getElementById('form-confirmation').innerHTML = validationErrorText;

    $('.required-field').addClass('required-border required-pulse');

    var timerPulse = setTimeout(function() {
      $('.required-field').removeClass('required-pulse');
    }, 300);
	}
	else {
	  document.getElementById('gform_1').submit();
		// CHANGE BUTTON TEXT ON CLICK TO "SENDING..."
    document.getElementById('gform_submit_button_1').value = 'Sending...';
	}

});

// (NOTE) BUTTON FOCUS NEEDS CLASS

// RUN FUNCTION TO HIDE coverButton
function buttonEnable() {
  // ONLY IF FIELDS ARE VALIDATED
  if ( !$(fieldReqAll).hasClass('required-field') ) {
    sendEnabled = true;
    // $(coverButton).hide();
    document.getElementById('form-confirmation').innerHTML = "";
  }
}

// CHANGE BUTTON TEXT ON CLICK TO "SENDING..."
$('#gform_submit_button_1').click(function() {
  document.getElementById('gform_submit_button_1').value = buttonSendingText;
});

// CHANGE BACK ON BLUR
$('#gform_submit_button_1').blur(function() {
  document.getElementById('gform_submit_button_1').value = buttonTextCache;
});

}(jQuery));
