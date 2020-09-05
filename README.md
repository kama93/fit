Fit app
=======

This project is named Fit app, it was build mainly with SpoonacularAPI, front-end was build using React library, React router and Redux and back-end with Node.js (server-side) and PostgreSQL database. I used some other features like bootstrap, highcharts, AOS for animation, heropatterns and also emails. Website was build based on Tailwind form. 

Landing page (when user is not sign in) client can find: 	- 	BMI (body mass calculator) after clicking on component there is pop up where user can do calculation after filling form
	-	There is similar component to check required caloric intake- there is also pop up after click on component and form that needs to be fill on to get calculation (its giving 2 different parameters- base caloric intake and full daily one based on active level of user)
	-	the last component with air condition title- checking user location and giving information about today air quality
	-	in the bottom there is a form that is sending email and its sending real email throughout emails (please don’t use it to contact this as I put random generated email on emailjs website and I don’t check it), but its working you can check code
	-	there is Navbar- with logo that sending user back to main page and also sign and registration links
	-	rest of the page is example how this website can looks like, information was taken from NHS website

Landing page (when user is sign in) client can find:
	-	all of the components that it was already mansion, but after sign in all the calculation (like BMI and caloric intake are send to database, every time user log and click on this components client can check his past results, after clicking recheck it come back to form window
	-	there is one more pop up for user after log in- appears after clicking on bottle - on pop up there is a button to add ”250 mls” after clicking there would be bottle appear on the screen (max 4 bottles) to achieved 2l water a day, number of bottles are also remember and they are reset every day
	- in the Navbar-  there is sign out and some other features like:
		. dinner idea- after clicking on this link its sending user to new page- where can he get random dinner idea, depends if user add wine paring it appears or not
		.fridge check- in this page user write what’s ingredients want to use (max of 5, but can be less), after fetch website giving 4 proposals which are accordions- it can check ingredients and instruction after clicking on the title
		.weekly diet- after clicking this one user will get meal plan, all of meal names are also links to websites with ingredients and cooking instructions, meal plan can be printed (in print mode only table would appear)
		.progress tracking- after checking that user can check progress on the graph- base on BMI and weight

There are also sign in and registration sides:
	-	user can sign in with google or Facebook or simply filling form, there are some validation requirements
	-	user can also remember all information to eser signin in the future

There is special user with information settle on database that can be sign in to check some of this app features (like tracking component):
Email: `k@gmail.com`
Password: `k`
