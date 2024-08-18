import { useForm } from "react-hook-form";
import { FormsSlice } from "../../store/reducers/FormsSlice";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";

function ControlledPage() {
  const { register, handleSubmit, getValues } = useForm();
  const { saveControlled } = FormsSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          data.file = await getBase64(getValues("file")[0]);
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
        <label htmlFor="gender">Gender</label>
        <select {...register("gender")} id="">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="tc">I agree to terms and conditions</label>
        <input type="checkbox" {...register("tc")} />
        <input type="file" {...register("file")} />
        <button>Submit</button>
      </form>
    </>
  );
}

export default ControlledPage;
