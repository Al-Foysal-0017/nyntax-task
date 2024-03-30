Proper Documentation:
---------------------


Here, to run this code on your PC, firstly clone the code from the Git repository.

Then, for installing the required Node modules, use the following command in the terminal:
```
npm i
```

To run this project, use the following command:
```
npm run dev
```
or,
```
yarn dev
```

This project is built using React.js. It is a simple project, so I did not use TypeScript, Redux, or Next.js. I created it using React.js and Tailwind CSS.
There are a total of 4 pages in this project:
1. Home Page
2. Car List Page
3. Booking Page
4. Invoice Page
Additionally, there is a simple Navbar and Footer on every page. The website is responsive.



<br><br><br>
1. For the Home Page:
----------------------
 It serves as a landing page with several sections such as- the hero section, about-us section, testimonial section, and contact section.

<br><br><br>
2. For the Cars Page:
----------------------
It fetches car details from this link: "https://exam-server-7c41747804bf.herokuapp.com/carsList" and displays relevant information such as car details, hourly rates, daily rates, and weekly rates.

<br><br><br>
3. For the Booking Page:
-------------------------
The Booking Page contains 4 forms: Reservation Details, Vehicle Information, Customer Information, and Additional Charges. The programming is done nicely for the Pickup Date and Return Date fields. There is also a total charges calculator for instant user input. If a user fills all the required fields, they can proceed to the invoice page; otherwise, an error is shown on a toast notification.

<br><br><br>
4. For the Invoice Page:
-------------------------
The Invoice Page displays the full details of the booking and the total cost. It also provides two buttons for printing or downloading the invoice form."