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

At the end of body, add this code to Validate the form

```html
<script src="./assets/yr_validator.js"></script>
<script>
	let registForm = new Validator('#your_formID');

	// Use this if you don't want the form submit as default
	registForm.onSubmit = (data) => console.log(data);
</script>
```

**_Note:_** The span with class "form-message" will conatain the error message when the input is not matched the rules

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

**_Note:_** to use more option for an input rules, use "|" to split them all

```html
<input type="password" rules="required|min:6" />
```
