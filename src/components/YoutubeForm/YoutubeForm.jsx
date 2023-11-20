import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import "./YoutubeForm.css";

let renderCount = 0;
const YoutubeForm = () => {
  renderCount++;

  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumber: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: Date.now(),
    },
  });

  // const { register, control, handleSubmit, formState,getValues } = form;

  const {
    errors,
    dirtyFields,
    touchedFields,
    isDirty,
    isValid,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
    submitCount,
  } = formState;

  // console.log({ isValid, isDirty });
  console.log({ isSubmitSuccessful, isSubmitted, isSubmitting, submitCount });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control: control,
  });

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  const onError = (errors) => {
    console.log({ errors });
  };

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset("email", {
        keepDirty: true,
      });
    }
  }, [isSubmitSuccessful, reset]);

  const handleGetValues = () => {
    console.log(getValues("username", "age"));
  };

  const handleSetValue = () => {
    setValue("channel", "bilal", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  return (
    <>
      {`Render Count is ${renderCount}`}
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is Required",
                },
                validate: {
                  notAdmin: (fieldValue) => {
                    return (
                      fieldValue !== "admin@example.com" ||
                      "Enter a different Email Address"
                    );
                  },
                },
              })}
            />
            <p className="error">{errors.username?.message}</p>
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                // pattern: {
                //   value: "^[w-.]+@([w-]+.)+[w-]{2,4}$",
                //   message: "Email is Required",
                // },
                validate: {
                  notAdmin: (fieldValue) => {
                    return (
                      fieldValue !== "admin@example.com" ||
                      "Enter a different Email Address"
                    );
                  },
                  EmailExists: async (fieldValue) => {
                    const response = await fetch(
                      `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                    );
                    const data = response.json();
                    return data.length == 0 || "Email already exists";
                  },
                },
              })}
            />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <input
              type="text"
              id="channel"
              {...register("channel", {
                required: {
                  value: true,
                  message: "Channel is Required",
                },
              })}
            />
            <p className="error">{errors.channel?.message}</p>
          </div>
          <div className="form-control">
            <label htmlFor="twitter">Twitter</label>
            <input
              type="text"
              id="twitter"
              {...register("social.twitter", {
                required: {
                  value: true,
                  message: "Enter a valid value",
                },
                disabled: watch("channel") ? "" : true,
              })}
            />
            <p className="error">{errors.social?.twitter?.message}</p>
          </div>
          <div className="form-control">
            <label htmlFor="facebook">Facebook</label>
            <input
              type="text"
              id="facebook"
              {...register("social.facebook", {
                required: {
                  value: true,
                  message: "Enter a valid value",
                },
              })}
            />
            <p className="error">{errors.social?.facebook?.message}</p>
          </div>
          {/* <div className="form-control">
            <label htmlFor="primary-phone">Primary Phone Number</label>
            <input
              type="text"
              id="primary-phone"
              {...register("phoneNumber.0", {
                required: {
                  value: true,
                  message: "Enter a valid value",
                },
              })}
            />
            <p className="error">{errors.phoneNumber?.[0]?.message}</p>
          </div>
          <div className="form-control">
            <label htmlFor="secondary">Secondary Phone Number</label>
            <input
              type="text"
              id="secondary"
              {...register("phoneNumber.1", {
                required: {
                  value: true,
                  message: "Enter a valid value",
                },
              })}
            />
            <p className="error">{errors.phoneNumber?.[1]?.message}</p>
          </div> */}

          {/* <div>
            <label htmlFor="phNumbers">List Of Numbers</label>
            <div>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <input
                    type="text"
                    key={field.id}
                    {...register(`phNumbers.${index}.number`)}
                  />
                  {index > 0 && (
                    <button
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => append({ number: "" })}>Add Number</button>
            </div>
          </div> */}

          <div className="form-control">
            <label htmlFor="age">age</label>
            <input
              type="number"
              id="age"
              {...register("age", {
                valueAsNumber: true,
                validate: {
                  positiveNumber: (value) =>
                    value >= 0 || "Age must be a positive number",
                },
              })}
            />
            <p className="error">{errors.age?.message}</p>
          </div>

          <div className="form-control">
            <label htmlFor="dob">dob</label>
            <input
              type="date"
              id="dob"
              {...register("dob", {
                valueAsDate: true,
                validate: {
                  required: (value) =>
                    value !== null || "Date of birth is required",
                },
              })}
            />
            <p className="error">{errors.dob?.message}</p>
          </div>

          <button disabled={!isDirty || !isValid || isSubmitting}>
            Submit
          </button>
          <button onClick={handleGetValues}>Get Values</button>

          <button onClick={handleSetValue}>Set Value</button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};

export default YoutubeForm;
