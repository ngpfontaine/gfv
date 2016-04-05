
# On-Page Required Validation for Gravity Forms  
  
> The page reload is ugly, slow by nature, and confusing on mobile. This is my solution to make submissions simpler for the user while offering assitive UI.

### What?
  
| Original with refresh | On-Page Validation |
| --- | --- |
|   ![Original Form](https://nicfontaine.com/images/web_form_validation_gif_02.gif)   |     ![GFV](https://nicfontaine.com/images/web_form_validation_gif_01.gif)   |
  
### Prerequisites
1. JQuery (I assume you're using wordpress so you should be good).
2. [Font Awesome Icons](http://fontawesome.io/) linked within `<head>`.

### Installation
1. Copy `script.js` contents into your `footer.php` after `</body>`.
2. Copy `style.css` contents into your css file or plugin.

### Usage
1. Create form fields as either **Single-Line Text** or **Paragraph Text**.
  
2. Each field you want GFV to validate needs `form-req` in the **Custom CSS Class** field under the **Appearance** tab.
  
3. To validate each individual field using logic also add a class from below:  
  
  `first-req`  
  `last-req`  
  `email-req`  
  `question-req`  
  
    **Example**: *First-Name* field will have `form-req first-req` in the **Custom CSS Class** option.
  
4. Save, and add form to page.
  
---
  
### Note
- You may need to edit the css of the cover button `#form-button-cover` to fit over the gravity forms button, and style as you please to fit with your site design.
  
- GFV won't act if you don't have the classes added to the form fields. No need to remove the script if you don't want it to do anything.
  
### Options
You can customize some string vars that display to the user. They're at the top of `script.js`, you can guess by their names:
`var buttonSendingText = 'Sending...';`
`var validationErrorText = 'Please complete all required fields';`

### To-Do
1. 'Cover button' div and 'validation text' div are added after `#gform_wrapper_1` which will act on all Gravity forms at the moment. Need if statement somewhere in case you don't want to use GFV.
2. Add support for other inputs like **number** , **checkbox**, as well as **select**

### License
Use it, break it, complain, wtvr.
