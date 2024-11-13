import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "validation/signupValidation";
import { registerUser } from "State/userActions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import styles from "./SignUpForm.module.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;
    dispatch(registerUser.STARTED({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <label className={styles.label}>First Name</label>
        <input className={styles.input} {...register("firstName")} />
        {errors.firstName && (
          <p className={styles.errorMessage}>{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label className={styles.label}>Last Name</label>
        <input className={styles.input} {...register("lastName")} />
        {errors.lastName && (
          <p className={styles.errorMessage}>{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label className={styles.label}>Email</label>
        <input className={styles.input} {...register("email")} />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className={styles.label}>Confirm Password</label>
        <input
          className={styles.input}
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className={styles.errorMessage}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button type="submit" className={styles.button} disabled={!isValid}>
        Submit
      </button>

      <div className={styles.link}>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
