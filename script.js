// GFV JS - REQUIRED FORM FIELD ON PAGE CONFIRMATION SCRIPT
// NGPFONTAINE  20160415
// NICFONTAINE.COM

// VARS FOR CUSTOMIZING TEXT CONTENT
var buttonSendingText = 'Sending...';
var validationErrorText = 'Please complete all required fields';

/* ---- */

var formAfterContent = '<div id="gfv-error-text"></div>';
var completeIcon = '<i class="fa fa-check"></i>';
var completeSpinner = '<i class="fa fa-spinner"></i>';
var sendEnabled = false;

// CLASS NAME FOR ALL REQUIRED FORM <li> ELEMENTS
var liReq = '.gfv-req';
// FIELD UNDER REQUIRED UNDER <li>
var fieldReqAll = '.gfv-req input, gfv-req textarea';
// CLASS NAMES FOR EACH REQUIRED FIELD
var fieldQuestionReq = '.gfv-question';
var fieldEmailReq = '.gfv-email';
var fieldNameReq = '.gfv-name';

(function($) {

// CACHE ANY GRAVITY FORM BUTTON NUMBER BY ID
var gFormButtonDom = $('[id*="gform_submit_button"]');
var buttonTextCache = $(gFormButtonDom).val();

// ADD ERROR DIV AFTER ANY GRAVITY FORMS WRAPPER
$(formAfterContent).insertAfter($('[id*="gform_wrapper"]'));

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
  if ( $(this).parents(fieldQuestionReq).length || $(this).parents(fieldNameReq).length ) {
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
      document.getElementById('gfv-error-text').innerHTML = '';
      buttonEnable();
    } else {
      $(this).addClass('required-field required-focus');
      // REMOVE COMPLETE CHECK
      $(this).parent().removeClass('completed-field');
      $(this).siblings('i').remove();
      // (NOTE) I THINK THIS SHOULD GO HERE?
      sendEnabled = false;
      $(gFormButtonDom).removeClass('gfv-button-valid');
    }
  }

});

// IF ANY FIELD VALUE GOES BACK TO 0 ON KEYUP OR BLUR (NOTE) KEYUP NOT WORKING ON FIREFOX MOBILE
$(fieldReqAll).on('keyup change', function() {
  if ( $(this).val().length === 0 && $(this).is(":focus")) {
    $(this).addClass('required-field required-focus');
    $(this).removeClass('required-focus');
    $(this).parent().removeClass('completed-field');
    // REMOVE COMPLETE CHECK
    $(this).siblings('i').remove();
    $(this).parent().removeClass('checked-field');
    sendEnabled = false;
    $(gFormButtonDom).removeClass('gfv-button-valid');
  }
});

// IF ANY FIELD VALUE GOES BACK TO 0 ON KEYUP OR BLUR (NOTE) KEYUP NOT WORKING ON FIREFOX MOBILE
$(fieldReqAll).on('blur', function() {
  if ( $(this).val().length === 0) {
    $(this).addClass('required-field required-border');
    $(this).parent().removeClass('completed-field');
    // REMOVE COMPLETE CHECK
    $(this).siblings('i').remove();
    $(this).parent().removeClass('checked-field');
    sendEnabled = false;
    $(gFormButtonDom).removeClass('gfv-button-valid');
  }
  // IF EMAIL FIELD IS EDITED/CHANGED, INVALIDATE
  else if ( $(this).parents(fieldEmailReq).length ) {
    if ( !isValidEmailAddress($(this).val()) ) {
      $(this).addClass('required-field required-focus required-border');
      $(this).parent().removeClass('completed-field');
      sendEnabled = false;
      $(gFormButtonDom).removeClass('gfv-button-valid');
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

// DISABLE/ENABLE BUTTON SUBMIT
$(gFormButtonDom).on('click', function(e) {

	if (!sendEnabled && $(fieldReqAll).hasClass('required-field')) {
  	e.preventDefault();
	  document.getElementById('gfv-error-text').innerHTML = validationErrorText;

    $('.required-field').addClass('required-border required-pulse');

    var timerPulse = setTimeout(function() {
      $('.required-field').removeClass('required-pulse');
    }, 300);
	}
	else {
	  // document.getElementById('gform_1').submit();
    $('[id*="gform_wrapper"] form').submit();
		// CHANGE BUTTON TEXT ON CLICK TO "SENDING..."
    $(gFormButtonDom).val(buttonSendingText);
	}

});

// (NOTE) BUTTON FOCUS NEEDS CLASS

// RUN FUNCTION TO CHANGE sendEnabled, & REMOVE INSTRUCTION TEXT
function buttonEnable() {
  // ONLY IF FIELDS ARE VALIDATED
  if ( !$(fieldReqAll).hasClass('required-field') ) {
    sendEnabled = true;
    document.getElementById('gfv-error-text').innerHTML = "";
    // ADD VALID CLASS TO BUTTON
    $(gFormButtonDom).addClass('gfv-button-valid');
  }
}

// CHANGE BACK ON BLUR
$(gFormButtonDom).blur(function() {
  document.getElementById('gform_submit_button_1').value = buttonTextCache;
});

}(jQuery));
