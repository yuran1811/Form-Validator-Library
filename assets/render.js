const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const main = $('.main');
const DATA_FROM_LOCAL = JSON.parse(localStorage.getItem('data'));

const rerender = (data) => {
  localStorage.setItem('data', JSON.stringify(data));

  const html = `
	<div class="info__container">
		<div class="info__item info__name">
			<span class="info__title">Your name:</span>
			<div class="info__data">${data.fullname}</div>
		</div>
		<div class="info__item info__email">
			<span class="info__title">Your email:</span>
			<div class="info__data">${data.email}</div>
		</div>
		<div class="info__item info__password">
			<span class="info__title">Your password:</span>
			<div class="info__data">${data.password}</div>
		</div>

		<button>Clear Data</button>
	</div>`;
  main.innerHTML = html;

  const clearBtn = $('button');
  clearBtn.onclick = () => {
    localStorage.clear();
    render();
  };
};
const render = () => {
  const form1 = {
    name: 'register-form',
    method: 'POST',
    action: '',

    heading: 'SIGN UP',
    description: 'Demo usage of Validator lib',
    elements: [
      {
        name: 'Full name',
        id: 'fullname',
        type: 'text',
        placeholder: 'Ex: Yuran',
        rules: 'required',
      },
      {
        name: 'Email',
        id: 'email',
        type: 'text',
        placeholder: 'Ex: email@domain.com',
        rules: 'required|email',
      },
      {
        name: 'Password',
        id: 'password',
        type: 'password',
        placeholder: 'Type your password',
        rules: 'required|min:6',
      },
      {
        name: 'Confirm your password',
        id: 'password_confirmation"',
        type: 'password',
        placeholder: 'Confirm your password',
        rules: 'required|confirmed',
      },
    ],
    submitTitle: 'Sign Up',
  };

  const eleHTML = form1.elements
    .map(
      (item) => `
		<div class="form-group">
			<label for="${item.id}" class="form-label">${item.name}</label>
			<input
				class="form-control"
				id="${item.id}"
				name="${item.id}"
				type="${item.type}"
				placeholder="${item.placeholder}"
				rules="${item.rules}"
			/>
			<span class="form-message"></span>
		</div>`
    )
    .join('');
  const htmls = `
	<form action="" method="${form1.method}" class="form" id="${form1.name}">
		<h3 class="heading">${form1.heading}</h3>
		<p class="desc">${form1.description}</p>
		<div class="spacer"></div>
		${eleHTML}
		<button class="form-submit">${form1.submitTitle}</button>
	</form>`;
  main.innerHTML = htmls;
};

if (DATA_FROM_LOCAL) rerender(DATA_FROM_LOCAL);
else render();
