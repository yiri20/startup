How to pull/push connecting a Git repository to local computer.
I have learned the structure of web server and how to set it up through aws, and the difference between http and https in terms of security and port. 
Also I have learned how important and comfortable the caddy is.

I learned how to code HTML by using live server extention through VS Code so that I can see the change whenever I update a little tiny thing. Learned how to create a code for link by using <a href></a>. Learned How to deploy so that I can add a website with a subdomain to my server.
How to use CSS through Bootstrap in my development environment.
Use of class for text location
Use of <style>
Set background color by using bg-
.text-reset (boostrap)  
font size change in style
font-weight 
adding a caption to the photo using <figure> and <figcaption>
<br>
In the following code, what does the link element do? <br>
The <link> element links external resources, typically used to link CSS files to the HTML document. <be>
<br>
In the following code, what does a div tag do?<br>
The <div> tag is a block-level container used to group elements and apply styles or layout properties.<br>
<br>
In the following code, what is the difference between the #title and .grid selector?<br>
#title targets an element with the specific id="title", while .grid targets all elements with the class class="grid".<br>
<br>
In the following code, what is the difference between padding and margin?<br>
Padding is the space between the content and the element's border, while margin is the space outside the element's border.<br>
<br>
Given this HTML and this CSS how will the images be displayed using flex?<br>
Depending on the CSS flex properties (justify-content, align-items, etc.), the images will be laid out according to the defined flexbox rules.<br>
<br>
What does the following padding CSS do?<br>
The CSS padding property adds space inside the element’s border, around the content. The specific padding values determine how much space is added to each side.<br>
<br>
What does the following code using arrow syntax function declaration do?<br>
Arrow function syntax defines a function. If used in an expression, it will return the output of the function body.<br>
<br>
What does the following code using map with an array output?<br>
The map() function returns a new array with the results of applying the callback function to each element of the array.<br>
<br>
What does the following code output using getElementByID and addEventListener?<br>
getElementById selects an element by its ID, and addEventListener attaches an event handler to respond to a specified event (like a click).<br>
<br>
What does the following line of Javascript do using a # selector?<br>
The #selector in JavaScript selects an element by its id. For example, document.querySelector("#id") selects the element with id="id".<br>
<br>
Which of the following are true? (mark all that are true about the DOM)<br>
Likely answers involve the nature of the DOM as a tree structure, the ability to modify it with JavaScript, and its representation of the HTML document.<br>
<br>
By default, the HTML span element has a default CSS display property value of:<br>
Inline (display: inline;).<br>
<br>
How would you use CSS to change all the div elements to have a background color of red?<br>
<br>
css<br>
코드 복사<br>
div {<br>
  background-color: red;<br>
}<br>
How would you display an image with a hyperlink in HTML?<br>
<br>
html<br>
<br>
<a href="URL"><img src="image.jpg" alt="description"></a><br>
In the CSS box model, what is the ordering of the box layers starting at the inside and working out?<br>
Content → Padding → Border → Margin.<br>
<br>
Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?<br>
Apply a class or ID to "trouble" and set the text color to green using CSS:<br>
<br>
html<br>
<br>
<span id="trouble">trouble</span>double<br>
css<br>
<br>
#trouble {<br>
  color: green;<br>
}<br>
What will the following code output when executed using a for loop and console.log?<br>
It depends on the code provided, but typically a for loop iterates through a set of values and prints them using console.log().<br>
<br>
How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?<br>
<br>
javascript<br>
<br>
document.getElementById("byu").style.color = "green";<br>
What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?<br>
<br>
Paragraph: <p><br>
Ordered list: <ol><br>
Unordered list: <ul><br>
Second level heading: <h2><br>
First level heading: <h1><br>
Third level heading: <h3><br>
How do you declare the document type to be html?<br>
<!DOCTYPE html><br>
<br>
What is valid javascript syntax for if, else, for, while, switch statements?<br>
Examples:<br>
<br>
if statement:<br>
javascript<br>
<br>
if (condition) { }<br>
else { }<br>
for loop:<br>
javascript<br>
<br>
for (let i = 0; i < limit; i++) { }<br>
while loop:<br>
javascript<br>
<br>
while (condition) { }<br>
switch statement:<br>
javascript<br>
<br>
switch(expression) { case value: break; }<br>
What is the correct syntax for creating a javascript object?<br>
<br>
javascript<br>
<br>
let obj = {<br>
  key: value,<br>
  method: function() { }<br>
};<br>
Is it possible to add new properties to javascript objects?<br>
Yes, you can dynamically add new properties to an object.<br>
<br>
If you want to include JavaScript on an HTML page, which tag do you use?<br>
<script><br>
<br>
Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?<br>
<br>
javascript<br>
<br>
document.getElementById("animal").textContent = "crow";<br>
Which of the following correctly describes JSON?<br>
JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate.<br>
<br>
What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo do?<br>
<br>
chmod: Change file permissions.<br>
pwd: Print working directory.<br>
cd: Change directory.<br>
ls: List files.<br>
vim, nano: Text editors.<br>
mkdir: Make a new directory.<br>
mv: Move or rename files.<br>
rm: Remove files or directories.<br>
man: Show manual for a command.<br>
ssh: Secure shell for remote login.<br>
ps: Display running processes.<br>
wget: Download files from the web.<br>
sudo: Execute a command as a superuser.<br>
Which of the following console command creates a remote shell session?<br>
ssh<br>
<br>
Which of the following is true when the -la parameter is specified for the ls console command?<br>
It shows all files, including hidden ones, with detailed information.<br>
<br>
Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?<br>
<br>
click is the top-level domain.<br>
bozo is the root domain.<br>
banana.fruit are subdomains.<br>
Is a web certificate necessary to use HTTPS?<br>
Yes.<br>
<br>
Can a DNS A record point to an IP address or another A record?<br>
Yes, a DNS A record can point to an IP address.<br>
<br>
Port 443, 80, 22 is reserved for which protocol?<br>
<br>
443: HTTPS<br>
80: HTTP<br>
22: SSH<br>
What will the following code using Promises output when executed?<br>
It depends on the promise code provided, but typically promises either resolve successfully or reject with an error.<br>
