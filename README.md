
# On-Page Required Validation for Gravity Forms
The page reload is ugly, slow by nature, and confusing on mobile. This is my solution to make submissions simpler for the user while offering assitive UI.
### Prerequisites
1. JQuery (I assume you're using wordpress so you should be good).
2. [Font Awesome Icons](http://fontawesome.io/) linked within `<head>`

### Installation
1. Copy `script.js` contents into your `footer.php` after `</body>`.
2. Copy `style.css` contents into your css file or plugin.
3. Copy one option from `page.php` for your form code setup - php, or wordpress page shortcode.

### Usage
1. Create form fields as either **Single-Line Text** or **Paragraph Text**.
2. Each required field you want GFV to act on needs `form-req` in the **Custom CSS Class** field under the **Appearance** tab
3. To validate each individual field using logic also add a class from below:  
  `first-req`  
  `last-req`  
  `email-req`  
  `question-req`  
4. Save form and add it to either a Wordpress page via **shortcode** or a php file, and include the two divs in the page.php.
5. Run it.

### Note
- You may need to edit the css of the cover button `#form-button-cover` to fit over the gravity forms button, and style as you please to fit with your site design.

### To-Do
1. Need to add `page.php` contents w/ JS after gravity forms' button, so you don't need to paste it in.

### Credits
TODO: Write credits

### License
Use it, break it, wtvr.
