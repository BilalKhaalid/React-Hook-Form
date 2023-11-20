import { DevTool } from "@hookform/devtools";
import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const MuiLoginForm = () => {
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  const { errors } = formState;

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={500} ml="15px">
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
        <DevTool control={control} />
      </form>
    </>
  );
};

export default MuiLoginForm;
