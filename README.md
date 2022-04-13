# This Form Validator Library is used to validate the form

## Source code [**here**](assets/yr_validator.js)

### #1: Get Started

The form will look like this:

```html
<form class="form-container">
	<div class="form-group">
		<input type="" rules="" />
		<span class="form-message"></span>
	</div>

	<div class="form-group">
		<input type="" rules="" />
		<span class="form-message"></span>
	</div>
</form>
```

Link this library

```html
<script src="https://cdn.jsdelivr.net/gh/yuran1811/Form-Validator-Library@main/assets/yr_validator.js"></script>
```

Importing

```js
let registForm = new Validator('#your_formID');

// Use this if you don't want the form submit as default
registForm.onSubmit = (data) => console.log(data);
```

> **_Note:_** The span tag has class "form-message" contains the error message when the input is not matched the rules

### #2: Usage

The input type can be any (text, checkbox, etc.)

The input rules will include these options:

```html
<!-- required: is used when the input field is mandatory -->
<input type="text" rules="required" />
```

```html
<!-- email: is used to check if the input value is an email address -->
<input type="text" rules="email" />
```

```html
<!-- min, max: are used to check if the input values have at least / at most any value -->
<input type="password" rules="min:6" />
<input type="password" rules="max:6" />
```

```html
<!-- confirmed: is used to confirm password -->
<input type="password" rules="confirmed" />
```

> **_Note:_** to apply more options for input rules, use "|" to split them all

```html
<input type="password" rules="required|min:6" />
```
