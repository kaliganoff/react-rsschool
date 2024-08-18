import { useForm } from "react-hook-form";
import { FormsSlice } from "../../store/reducers/FormsSlice";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validationSchema } from "../../validation/validation";

function ControlledPage() {
  const { register, handleSubmit, getValues } = useForm();
  const { saveControlled } = FormsSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formState] = useState(getValues());

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
          const isValid = await validationSchema.isValid(data);
          if (isValid && data.password === data.password2) {
            dispatch(saveControlled(data));
            navigate("/");
          } else {
            alert("Not valid or passwords don't match");
          }
        })}
      >
        <label htmlFor="name">Name</label>
        <input type="text" value={formState.name} {...register("name")} />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          value={formState.age}
          min="0"
          {...register("age")}
        />
        <label htmlFor="email">E-mail</label>
        <input type="email" value={formState.email} {...register("email")} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={formState.password}
          {...register("password")}
        />
        <label htmlFor="password2">Repeat password</label>
        <input
          type="password"
          value={formState.password2}
          {...register("password2")}
        />
        <label htmlFor="gender">Gender</label>
        <select value={formState.gender} {...register("gender")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="tc">I agree to terms and conditions</label>
        <input checked={formState.tc} type="checkbox" {...register("tc")} />
        <input type="file" value={formState.file} {...register("file")} />
        <datalist id="countries">
          <option value="UK"></option>
          <option value="USA"></option>
          <option value="Japan"></option>
          <option value="China"></option>
          <option value="Russia"></option>
        </datalist>
        <input
          type="text"
          list="countries"
          {...register("country")}
          value={formState.country}
        />
        <button disabled={!validationSchema.isValid(formState)}>Submit</button>
      </form>
    </>
  );
}

export default ControlledPage;
