const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const main = $('.main');

const form1 = {
	name: 'register-form',
	method: 'POST',
	action: '',

	heading: 'SIGN UP',
	description: 'Have Great Time With Us!!!',
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

const eleHTML = form1.elements.map(
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
);
const htmls = `
	<form action="" method="${form1.method}" class="form" id="${form1.name}">
		<h3 class="heading">${form1.heading}</h3>
		<p class="desc">${form1.description}</p>
		<div class="spacer"></div>
		${eleHTML}
		<button class="form-submit">${form1.submitTitle}</button>
	</form>`;
main.innerHTML = htmls;
