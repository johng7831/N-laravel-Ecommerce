import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {login} = useContext(AdminAuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

   const navigate = useNavigate();



  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("result", result);

      if (res.status === 200) {
        const adminiinfo = {
            token : result.token,
            id: result.id,
            name: result.name,
        }
        localStorage.setItem("adminInfo", JSON.stringify(adminiinfo));
        login(adminiinfo);
        navigate("/admin/dashboard");
        toast.success("Login successful!");


      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
        </label>
        {errors.email && <p>{errors.email.message}</p>}

        <label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
        </label>
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
