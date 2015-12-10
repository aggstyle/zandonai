if(window.FSM === undefined) { var FSM = {}; }


FSM.application_form = (function() {

  "use strict";

  var inputs = {},
      $form,
      $error_message,
      is_waiting = false,
      fade_timeout_id,

      ERROR   = 'error',
      SUCCESS = 'success',

      VALIDATION_ERROR_MSG = 'Please check the marked fields',
      SERVER_ERROR_MSG     = 'Apologies, an error occurred',
      CONFIRMATION_MSG     = 'Thank you';



  function show_message(type, msg) {
    clear_message_class();
    clear_fade_timeout();
    window.clearTimeout(fade_timeout_id);
    $error_message.text(msg).addClass(type);
  }

  function hide_message() {
    clear_fade_timeout();
    fade_timeout_id = window.setTimeout(function() { clear_message_class(); }, 200);
  }

  function clear_form() {
    $.each(inputs, function(i,$e) {
      $e.val('');
    });
  }

  function highlight_errors(fields) {
    $.each(fields, function(i, key) {
      inputs[key].addClass(ERROR);
    });
  }

  function remove_error_highlights() {
    $.each(inputs, function(i,$e) {
      $e.removeClass(ERROR);
    });
  }

  function clear_fade_timeout() {
    window.clearTimeout(fade_timeout_id);
  }

  function clear_message_class() {
    $error_message.attr('class', null);
  }

  function error_handler() {
    show_message(ERROR, SERVER_ERROR_MSG);
    is_waiting = false;
  }

  function success_handler(data) {
    if(data.errors) {
      highlight_errors(data.errors);
      show_message(ERROR, VALIDATION_ERROR_MSG);
    } else {
      clear_form();
      show_message(SUCCESS, CONFIRMATION_MSG);
    }
    is_waiting = false;
  }

  function submit_form(event) {
    event.preventDefault();
    if(!is_waiting) {
      is_waiting = true;
      hide_message();
      remove_error_highlights();
      $.ajax('http://www.10yearsintype.com/api-register', {
        data     : $form.serialize(),
        jsonp    : 'callback',
        dataType : 'jsonp',
        error    : error_handler,
        success  : success_handler
      });
    }
  }



  return {

    initialise: function() {
      $form          = $('form');
      $error_message = $('.submitFeedback div');
      $form.find('input, select').each(function(i,e) {
        inputs[e.id] = $(e);
      });
      $('button.submitButton').click(submit_form);
    }
  };


}());


$(function() {
  "use strict";
  FSM.application_form.initialise();
});