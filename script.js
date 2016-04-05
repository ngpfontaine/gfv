// REQUIRED FORM FIELD ON PAGE CONFIRMATION SCRIPT
// NIC FONTAINE 20160405
// (HOW-TO) MAKE SURE TO LINK FA-ICONS STYLESHEET IN <HEAD>
// (HOW-TO) SCRIPT REQUIRES JQUERY AS WELL
/*
* (HOW-TO) TAG ALL REQUIRED FIELDS W/ 'form-req' CLASS UNDER THE GFORM APPEARANCE TAB
* (HOW-TO) TAG EACH REQUIRED FIELD W/ 'email-req or first-req' SAME AS ABOVE
* (HOW-TO) ADD A 'COVER' BUTTON WITH #form-button-cover, STYLE, POS. ABSOLUTE, ETC
* (HOW-TO) .required-field, .required-focus, and .required-border NEED VISUAL STYLES
*/

var coverButton = '#form-button-cover';
var completeIcon = '<i class="fa fa-check"></i>';
var completeSpinner = '<i class="fa fa-spinner"></i>';

var buttonSendingText = 'Sending...';

// CLASS NAME FOR ALL REQUIRED FORM <li> ELEMENTS
var liReq = '.form-req';
// FIELD UNDER REQUIRED <li>
var fieldReqAll = '.form-req div >';
// CLASS NAMES FOR EACH REQUIRED FIELD
var fieldQuestionReq = '.question-req';
var fieldEmailReq = '.email-req';
var fieldFirstReq = '.first-req';
var fieldLastReq = '.last-req';

// MAKE BUTTON COVER COPY SAME AS G FORM COPY
document.getElementById('form-button-cover').innerHTML = document.getElementById('gform_submit_button_1').value;
var buttonTextCache = document.getElementById('gform_submit_button_1').value;

(function($) {

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
  if ( $(this).parents(fieldQuestionReq).length || $(this).parents(fieldFirstReq).length || $(this).parents(fieldLastReq).length ) {
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
      $(coverButton).show();
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
    $(coverButton).show();
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
    $(coverButton).show();
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
  document.getElementById('form-confirmation').innerHTML = "Please complete all required fields";
  // ADD RED BORDER TO BLANK FIELDS
  $('.required-field').addClass('required-border required-pulse');
  var timerPulse = setTimeout(function() {
    $('.required-field').removeClass('required-pulse');
  }, 300);
});

// (NOTE) BUTTON FOCUS NEEDS CLASS

// RUN FUNCTION TO HIDE coverButton
function buttonEnable() {
  // ONLY IF FIELDS ARE VALIDATED
  if ( !$(fieldReqAll).hasClass('required-field') ) {
    $(coverButton).hide();
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
