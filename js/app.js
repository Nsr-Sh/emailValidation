// select elements

const form = document.querySelector("#email-form"),
  sendBtn = document.querySelector("#sendBtn"),
  resetBtn = document.querySelector("#resetBtn"),
  loader = document.querySelector("#loaders img");

// ------------------------------------
// events:
form.addEventListener("focusout", validation);
form.addEventListener("submit", submitted);
resetBtn.addEventListener("click", resetForm);

// Title:validation
// function asli check kardane valid boodane maghadire inputha
function validation(e) {
  // select kardane fieldhaye morede nazar
  if (e.target.parentElement.classList.contains("input-field")) {
    const field = e.target;
    // if is not empty
    if (field.value !== "") {
      if (field.type === "email") {
        checkValidMail(field) ? valid(field) : invalid(field);
      } else {
        valid(field);
      }
    } else {
      // is empty
      invalid(field);
    }
    // active sendBtn
    activeBtn();
  }

  // Title:valid
  //  classe valid be element
  function valid(el) {
    el.classList.remove("invalid");
    el.classList.add("valid");
  }

  // Title:invalid
  // dadane classe invalid be element
  function invalid(el) {
    el.classList.remove("valid");
    el.classList.add("invalid");
  }
}

// Title:active send button
//bad az sabz shodane hameye inputha buttone send faal mishavad
function activeBtn() {
  const validFields = document.querySelectorAll(".valid");
  if (validFields.length === form.querySelectorAll(".input-field").length) {
    sendBtn.removeAttribute("disabled");
  } else {
    sendBtn.setAttribute("disabled", true);
  }
}

// Title:reset button
//reset kardane form
function resetForm() {
  form.reset();
  loader.style.display = "none";
}

// Title:validation email
// check kardane sahih boodane emaile vared shode
// vorodi: mail
// khoroji:agar sahih bood =>true
function checkValidMail(mail) {
  // hazfe spacehaye aval va akhar
  mail = mail.value.trim();
  // mail = mail.trim();
  // fasele beineshan nabashad
  if (mail.indexOf(" ") != -1) return false;
  // hadeaghal yek '.' dashte bashad
  if (mail.indexOf(".") == -1) return false;
  const splitArray = mail.split("@");
  // faghat yek @ dashte bashad
  // va @ aval ya akhar nabashad
  if (splitArray.length !== 2 || splitArray.indexOf("") != -1) return false;
  // user@domain
  const user = splitArray[0];
  const domain = splitArray[1];
  // user hadeaksar 64 char
  if (user.length > 64) return false;
  // domain hadeaksar 253 char
  if (domain.length > 253) return false;
  //aval va akhar user va domain '.' nabashad
  if (user[0] == "." || domain[0] == ".") return false;
  // chand '.' poshte sare ham nabashad
  if (user.split(".").indexOf("") != -1 || domain.split(".").indexOf("") != -1)
    return false;
  //  domain hadeaksar 2 '.' dashte bashad va
  if (domain.split(".").length > 3) return false;
  // dar domain (tld) bad az '.' hadeaghal 2 kalame( faght alephba) bashad
  const tld = domain.split(".").splice(1);
  let flag = true;
  tld.forEach((item) => {
    if (item.length < 2 || !checkAlphabet(item)) {
      flag = false;
    }
  });
  if (flag === false) return false;
  else {
    return true;
  }
}

// Title:check Alphabet
// check kardane inke yek ebarat faghat az horof tashkil shode bashad
// (faghede adad va alaem bashad)
// vorodi: ebarat
// khoroji:agar tamaman horof bood  =>true
//ex: gdf=>true  , c0=>false ,  f$g=>false
function checkAlphabet(char) {
  let check;
  for (let i = 0; i < char.length; i++) {
    if (char[i].toUpperCase() !== char[i].toLowerCase()) {
      // is alphabet
      check = true;
      // is not alphabet
    } else return false;
  }
  return check;
}

// // Title:submitted
// namayeshe gifha bad az submit shodane form
function submitted() {
  loader.src = "img/spinner.gif";
  loader.style.display = "block";
  const timer = setTimeout(
    (item) => (item.src = "img/mail2.gif"),
    2000,
    loader
  );

  const timer2 = setTimeout(
    (item) => (item.src = "img/mail2.jpg"),
    3500,
    loader
  );
}
