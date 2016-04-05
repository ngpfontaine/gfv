
# On Page Gravity Forms Required Validation
The page reload is ugly, slow by nature, and confusing on mobile. This is my solution to make submissions simpler for the user while offering assitive UI.
### Prerequisites
1. JQuery (I assume you're using wordpress so you should be good).
2. [Font Awesome Icons](http://fontawesome.io/).

### Installation
1. copy `script.js` contents into your footer.php after </body>.
2. copy `style.css` contents into your css file or plugin.
3. `page.php` shows 2 options for your form code setup - php, or wordpress page.

### Usage
1. Create form fields as either Single-Line Text (names, email) or Paragraph Text (questions).
2. Under the 'Appearance' tab each required field you want GFV to act on needs `form-req` in the 'Custom CSS Class' field.
3. To validate each individual field using logic also add a class from below:
  `first-req`
  `last-req`
  `email-req`
  `question-req`
4. Save form and add it to either a Wordpress page or a php file, and include the two divs in the page.php.
5. Run it.

### To-Do
1. Need to add `page.php` contents w/ JS after gravity forms' button, so you don't need to paste it in.

### Credits
TODO: Write credits

### License
Use it, break it, wtvr.
