import { useForm } from "react-hook-form";
import { FormsSlice } from "../../store/reducers/FormsSlice";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";

function ControlledPage() {
  const { register, handleSubmit } = useForm();
  const { saveControlled } = FormsSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(saveControlled(data));
          navigate("/");
        })}
      >
        <label htmlFor="name">Name</label>
        <input type="text" {...register("name")} />
        <label htmlFor="age">Age</label>
        <input type="number" {...register("age")} />
        <label htmlFor="email">E-mail</label>
        <input type="email" {...register("email")} />
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} />
        <label htmlFor="password2">Repeat password</label>
        <input type="password" {...register("password2")} />
        <label htmlFor="tc">I agree to terms and conditions</label>
        <input type="checkbox" {...register("tc")} />
        <button>Submit</button>
      </form>
    </>
  );
}

export default ControlledPage;
