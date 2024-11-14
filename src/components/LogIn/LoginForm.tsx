import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "validation/loginValidation";
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
    mode: "all",
  });

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.user?.isAuthenticated ?? false
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;

    dispatch(loginUser.STARTED({ email, password }));
  };

  return (
    <div className={styles.loginForm_body}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm_form}>
        <div>
          <label className={styles.loginForm_label}>Email</label>
          <input className={styles.loginForm_input} {...register("email")} />
          {errors.email && (
            <p className={styles.loginForm_errorMessage}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className={styles.loginForm_label}>Password</label>
          <input
            className={styles.loginForm_input}
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.loginForm_errorMessage}>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={styles.loginForm_button}
          disabled={!isValid}
        >
          Submit
        </button>

        <div className={styles.loginForm_signupLink}>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
