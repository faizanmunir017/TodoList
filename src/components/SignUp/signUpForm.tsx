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
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
        <div>
          <label className={styles.signupLabel}>First Name</label>
          <input className={styles.signupInput} {...register("firstName")} />
          {errors.firstName && (
            <p className={styles.signupErrorMessage}>
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className={styles.signupLabel}>Last Name</label>
          <input className={styles.signupInput} {...register("lastName")} />
          {errors.lastName && (
            <p className={styles.signupErrorMessage}>
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label className={styles.signupLabel}>Email</label>
          <input className={styles.signupInput} {...register("email")} />
          {errors.email && (
            <p className={styles.signupErrorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className={styles.signupLabel}>Password</label>
          <input
            className={styles.signupInput}
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.signupErrorMessage}>
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className={styles.signupLabel}>Confirm Password</label>
          <input
            className={styles.signupInput}
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={styles.signupErrorMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={styles.signupButton}
          disabled={!isValid}
        >
          Submit
        </button>

        <div className={styles.signupLink}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
