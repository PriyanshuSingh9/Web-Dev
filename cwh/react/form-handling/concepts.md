# Concepts Used

## Libraries
- **react-hook-form**: Performant, flexible and extensible forms with easy-to-use validation.

## Core Concepts
- **useForm**: Custom hook to manage forms with ease.
- **register**: Connects inputs to form state and validation rules.
  - "register function is used to connect your form inputs to the form's state management and can also enforce rules."
- **handleSubmit**: Handles form submission.
  - "handleSubmit is a function provided by react hook form is as its name suggests used to handle the form submition"
- **setError**: Manages custom errors.
  - "set error is used to create custom errors by the user"
- **formState**: access to form state info like `errors` and `isSubmitting`.
  - "formState provides information about the current state of your form including errors and submition status"

## Implementation Details

### Setup and Validation (`App.jsx`)
Using `register` to apply validation rules directly to the input element.
```javascript
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm()

const onSubmit = async (data) => {
  console.log(data)
  // Simulate API call
}

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input 
      type="text" 
      placeholder='username'
      {...register("username", {
        required: { value: true, message: "This value is required" },
        minLength: { value: 3, message: "Minimum length is 3" },
        maxLength: { value: 8, message: "Maximum length is 8" }
      })} 
    />
    {errors.username && <div>{errors.username.message}</div>}
    
    <button disabled={isSubmitting} type="submit">Submit</button>
  </form>
)
```