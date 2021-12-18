function Validator(formSelector) {
	const select = (child, par = document) => par.querySelector(child);
	const selectAll = (child, par = document) => par.querySelectorAll(child);

	const formEle = select(formSelector);
	if (!formEle) {
		console.error('Invalid selector. Please check the form selector');
		return {};
	}

	let formRules = {};
	let validatorRules = {
		required(value) {
			return value ? undefined : `Please fill this field!`;
		},
		email(value) {
			const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value)
				? undefined
				: `Please fill this field as an email address!`;
		},
		min(minValue) {
			return function (value) {
				return value.length >= minValue
					? undefined
					: `Please fill at least ${minValue} characters!`;
			};
		},
		max(maxValue) {
			return function (value) {
				return value.length <= maxValue
					? undefined
					: `Please fill at most ${maxValue} characters!`;
			};
		},
	};

	const handleValidate = (e, input = e.target) => {
		const thisRules = formRules[e.target.name];
		const formGr = input.closest('.form-group');
		if (!formGr) return;

		let errMes;
		let isErr = thisRules.some(
			(ruleFunc) => (errMes = ruleFunc(e.target.value))
		);

		const formMes = select('.form-message', formGr);
		if (isErr) {
			formGr.classList.add('invalid');
			formMes.innerText = errMes;
		} else {
			formGr.classList.remove('invalid');
			formMes.innerText = '';
		}

		return !isErr;
	};
	const handleOnInput = (e, input = e.target) => {
		const formGr = input.closest('.form-group');
		if (!formGr) return;

		const formMes = select('.form-message', formGr);
		formGr.classList.toggle('invalid', 0);
		formMes.innerText = '';
	};

	const inputs = selectAll('input[name][rules]', formEle);
	inputs.forEach((input) => {
		const rules = input.getAttribute('rules').split('|');
		rules.forEach((rule) => {
			let ruleInfo = [];
			let ruleFunc = validatorRules[rule];

			if (rule.includes(':')) {
				ruleInfo = rule.split(':');
				rule = ruleInfo[0];
				ruleFunc = validatorRules[rule](ruleInfo[1]);
			}

			if (Array.isArray(formRules[input.name])) {
				formRules[input.name].push(ruleFunc);
			} else {
				formRules[input.name] = [ruleFunc];
			}
		});

		input.onblur = handleValidate;
		input.oninput = handleOnInput;
	});

	formEle.onsubmit = (e) => {
		e.preventDefault();

		let isValid = true;
		inputs.forEach((input) => {
			if (!handleValidate({ target: input })) isValid = false;
		});

		if (isValid) {
			if (typeof this.onSubmit === 'function') {
				let enableInputs = selectAll('[name]', formEle);
				let values = [...enableInputs].reduce((values, input) => {
					switch (input.type) {
						case 'radio':
							values[input.name] = select(
								`input[name=${input.name}`,
								formEle
							).value;
							break;
						case 'checkbox':
							if (!input.matches(':checked')) {
								values[input.name] = '';
								return values;
							}
							if (!Array.isArray(values[input.name])) {
								values[input.name] = [];
							}
							values[input.name].push(input.value);
							break;
						case 'file':
							values[input.name] = input.files;
							break;
						default:
							values[input.name] = input.value;
					}
					return values;
				}, {});
				this.onSubmit(values);
			} else formEle.submit();
		}
	};
}
