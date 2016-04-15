
# Gravity Forms Validation 
  
    
On form submit the page reload is ugly, slow by nature, and confusing on mobile. This is my solution to make submissions simpler for the user while offering assitive UI. Currently supports **single-line**, **paragraph**, and **email** fields only.
  
>*I use this all the time at work and thought I'd put it up in case anyone else wants to implement it or just mess around.*
  
  
### What?
  
| Original with refresh | On-Page Validation |
| --- | --- |
|   ![Original Form](https://nicfontaine.com/images/web_form_validation_gif_02.gif)   |     ![GFV](https://nicfontaine.com/images/web_form_validation_gif_01.gif)   |
  
### Prerequisites
1. [JQuery](https://developers.google.com/speed/libraries/#jquery), if it's not included in your theme already.
2. [Font Awesome Icons](http://fontawesome.io/get-started/).

### Installation
1. Copy `script.js` contents into your `footer.php` after `</body>`.
2. Copy `style.css` contents into your css file or plugin.

### Usage
1. Create form fields as either **Single-Line Text** or **Paragraph Text**.
  
2. Each field you want GFV to validate needs `gfv-req` in the **Custom CSS Class** field under the **Appearance** tab.
  
3. To validate each individual field using logic also add a class from below:  
  
  `gfv-name`  
  `gfv-question`  
  `gfv-email`  
  
    **Example**: *First-Name* field will have `gfv-req gfv-name` in the **Custom CSS Class** option.
  
4. Save, and add form to page.
  
---
  
### Options
- You can customize some string vars that display to the user. They're at the top of `script.js`, you can guess by their names:
```javascript
var buttonSendingText = 'Sending...';  
var validationErrorText = 'Please complete all required fields';
```
  
- You might want to change the error text style. This is at the top of the CSS - `#gfv-error-text`
  
- You can define your own "valid button" styles with `.gfv-button-valid` - currently is just has a box-shadow.
  
### Note
  
- GFV won't act if you don't have the classes added to the form fields. No need to remove the script if you don't want it to do anything.

### To-Do
1. Add support for other inputs like **number** , **checkbox**, as well as **select**

### More
Check out my website at [nicfontaine.com](https://nicfontaine.com)  
Twitter: [@ngpfontaine](https://twitter.com/ngpfontaine)

### License
Use it, break it, complain, wtvr.
