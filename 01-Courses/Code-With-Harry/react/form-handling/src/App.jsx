import { useState } from 'react'
import { useForm } from "react-hook-form"
import './App.css'

function App() {
  const {
    // register function is used to connect your form inputs to the form's state management and can also enforce rules.
    register,
    // handleSubmit is a function provided by react hook form is as its name suggests used to handle the form submition
    handleSubmit,
    // set error is used to create custom errors by the user
    setError,
    // formState provides information about the current state of your form including errors and submition status
    formState: { errors, isSubmitting },

  } = useForm()

  function delay(d) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, d * 1000)
    })
  }

  const onSubmit = async (data) => {
    // await delay(2) // Simulating network delays
    console.log(data)

    let res = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let response = await res.json()
    console.log(response.message)

    // custom errors

    // if (data.username !== "harry") {
    //   setError("myForm", { message: "Your form is not in good order due to incorrect credentials" })
    // }
    // if (data.username === "Rohan") {
    //   setError("blocked", { message: `User ${data.username} has been blocked by this site` })
    // }
  }

  return (
    <>
      <div className="container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder='username'
            {...register(
              "username",
              {
                required: { value: true, message: "This value is required" },
                minLength: { value: 3, message: "Minimum length is 3" },
                maxLength: { value: 8, message: "Maximum length is 8" }

              })} />
          {errors.username && <div>{errors.username.message}</div>}
          <br />
          <input type="password" placeholder='password' {...register("password")} />
          <br />
          <button disabled={isSubmitting} type="submit">Submit</button>
          {isSubmitting ? <div className='loading'>Loading...</div> : ""}
          {/* {errors.myForm && <div>{errors.myForm.message}</div>}
          {errors.blocked && <div>{errors.blocked.message}</div>} */}
        </form>
      </div>
    </>
  )
}

export default App
