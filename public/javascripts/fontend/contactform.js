function isValidEmail(strEmail) {
      var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(strEmail);
    }

    document.addEventListener("DOMContentLoaded", function () {
      const txtname = document.getElementById("txtname");
      const txtemail = document.getElementById("txtemail");
      const txtphone = document.getElementById("txtphone");
      const txtcompany = document.getElementById("txtcompany");
      const txtsubject = document.getElementById("txtsubject");
      const checkButton = document.getElementById("check-button");

           

      // Sự kiện input và blur cho txtname
      txtname.addEventListener("input", validateName);
      txtname.addEventListener("blur", validateName);

      // Hàm validate cho txtname
      function validateName() {
        const txtnameValue = txtname.value.trim();
        if (txtnameValue.length == 0) {
          txtname.style.border = "1px solid red";
          document.getElementById('nameerr').innerHTML = "This field is required.";
        } else {
          txtname.style.border = "1px solid #D0D0D0";
          document.getElementById('nameerr').innerHTML = "";
        }
      }

      // Sự kiện input và blur cho txtemail
      txtemail.addEventListener("input", validateEmail);
      txtemail.addEventListener("blur", validateEmail);

      // Hàm validate cho txtemail
      function validateEmail() {
        const txtemailValue = txtemail.value.trim();
        if (txtemailValue.length == 0) {
          txtemail.style.border = "1px solid red";
          document.getElementById('emailerr').innerHTML = "This field is required.";
        } else {
          if (isValidEmail(txtemailValue)) {
            txtemail.style.border = "1px solid #D0D0D0";
            document.getElementById('emailerr').innerHTML = "";
          } else {
            txtemail.style.border = "1px solid red";
            document.getElementById('emailerr').innerHTML = "Please type your email.";
          }
        }
      }

      // Sự kiện input và blur cho txtphone
      txtphone.addEventListener("input", validatePhone);
      txtphone.addEventListener("blur", validatePhone);

      // Hàm validate cho txtphone
      function validatePhone() {
        const txtphoneValue = txtphone.value.trim();
        if (txtphoneValue.length == 0) {
          txtphone.style.border = "1px solid red";
          document.getElementById('phoneerr').innerHTML = "This field is required.";
        } else {
          txtphone.style.border = "1px solid #D0D0D0";
          document.getElementById('phoneerr').innerHTML = "";
        }
      }

      // Sự kiện input và blur cho txtcompany
      txtcompany.addEventListener("input", validateCompany);
      txtcompany.addEventListener("blur", validateCompany);

      // Hàm validate cho txtcompany
      function validateCompany() {
        const txtcompanyValue = txtcompany.value.trim();
        if (txtcompanyValue.length == 0) {
          txtcompany.style.border = "1px solid red";
          document.getElementById('companyerr').innerHTML = "This field is required.";
        } else {
          txtcompany.style.border = "1px solid #D0D0D0";
          document.getElementById('companyerr').innerHTML = "";
        }
      }
      // Sự kiện input và blur cho txtsubject
      txtsubject.addEventListener("input", validateSubject);
      txtsubject.addEventListener("blur", validateSubject);

      // Hàm validate cho txtsubject
      function validateSubject() {
        const txtsubjectValue = txtsubject.value.trim();
        if (txtsubjectValue.length == 0) {
          txtsubject.style.border = "1px solid red";
          document.getElementById('subjecterr').innerHTML = "This field is required.";
        } else {
          txtsubject.style.border = "1px solid #D0D0D0";
          document.getElementById('subjecterr').innerHTML = "";
        }
      }






      //  click event for Submit button
      checkButton.addEventListener("click", function () {
        var countClick = 0;
        const txtnameValue = txtname.value.trim();
        const txtemailValue = txtemail.value.trim();
        const txtphoneValue = txtphone.value.trim();
        const txtcompanyValue = txtcompany.value.trim();
        const txtsubjectValue = txtsubject.value.trim();

        // Check txtname
        if (txtnameValue.length == 0) {
          txtname.style.border = "1px solid red";
          document.getElementById('nameerr').innerHTML = "This field is required.";
          countClick += 1;
        } else {
          txtname.style.border = "1px solid #D0D0D0";
          document.getElementById('nameerr').innerHTML = "";
        }

        // Check txtemail
        if (txtemailValue.length == 0) {
          txtemail.style.border = "1px solid red";
          document.getElementById('emailerr').innerHTML = "This field is required.";
          countClick += 1;
        } else {
          if (isValidEmail(txtemailValue)) {
            txtemail.style.border = "1px solid #D0D0D0";
            document.getElementById('emailerr').innerHTML = "";
          } else {
            txtemail.style.border = "1px solid red";
            document.getElementById('emailerr').innerHTML = "Please type your email.";
            countClick += 1;
          }
        }

        // Check txtphone
        if (txtphoneValue.length == 0) {
          txtphone.style.border = "1px solid red";
          document.getElementById('phoneerr').innerHTML = "This field is required.";
          countClick += 1;
        } else {
          txtphone.style.border = "1px solid #D0D0D0";
          document.getElementById('phoneerr').innerHTML = "";
        }

        // Check txtcompany
        if (txtcompanyValue.length == 0) {
          txtcompany.style.border = "1px solid red";
          document.getElementById('companyerr').innerHTML = "This field is required.";
          countClick += 1;
        } else {
          txtcompany.style.border = "1px solid #D0D0D0";
          document.getElementById('companyerr').innerHTML = "";
        }

        // Check txtsubject
        if (txtsubjectValue.length == 0) {
          txtsubject.style.border = "1px solid red";
          document.getElementById('subjecterr').innerHTML = "This field is required.";
          countClick += 1;
        } else {
          txtsubject.style.border = "1px solid #D0D0D0";
          document.getElementById('subjecterr').innerHTML = "";
        }

        // submit form
        if (countClick == 0) {
          document.fcontact.submit();
        }
      });

    });