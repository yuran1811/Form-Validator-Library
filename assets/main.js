const _$ = document.querySelector.bind(document);
const _$$ = document.querySelectorAll.bind(document);

function Validator(option) {
	const formElement = _$(option.form);
	if (formElement) {
		option.rules.forEach((rule) => {
			const inputElement = formElement.querySelector(rule.element);
			if (inputElement) {
				inputElement.onblur = () => {
					let error = rule.validate(inputElement);
					console.log(error);
				};
			}
		});
	}
}
Validator.isRequired = (element) => ({
	element: element,
	validate(value) {
		return value.trim() ? undefined : 'Please fill this field';
	},
});
Validator.isEmail = (element) => {};
