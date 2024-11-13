import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../validation/loginValidation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "State/store";
import styles from "./LoginForm.module.css";

import { loginUser } from "State/userActions";

import { Link, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.user?.isAuthenticated ?? false
  );

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated, navigating to todos...");
      navigate("/todos");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    const { email, password } = data;

    dispatch(loginUser({ email, password }));
    console.log("Login successfull :");

    // navigate("/todos");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

      <button type="submit" className={styles.button} disabled={!isValid}>
        Submit
      </button>

      <div className={styles.signupLink}>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
