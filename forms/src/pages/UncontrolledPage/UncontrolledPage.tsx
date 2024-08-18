import { useRef } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { FormsSlice } from "../../store/reducers/FormsSlice";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../../validation/validation";

interface FormValues {
  name: FormDataEntryValue,
  file: string | ArrayBuffer | null
}

function UncontrolledPage() {
  const formRef = useRef(null);
  const fileRef = useRef(null);
  const { saveUncontrolled } = FormsSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function getBase64(file: Blob): Promise<string | ArrayBuffer | null> {
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

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues: FormValues = { name: '', file: ''};
    formData.forEach((value, key) => {
      formValues[key as keyof FormValues] = value;
    });
    formValues["file"] = await getBase64(fileRef.current.files[0]);
    const isValid = await validationSchema.isValid(formValues);
    if (isValid && formValues.password === formValues.password2) {
      dispatch(saveUncontrolled(formValues));
      navigate("/");
    } else {
      alert("Not valid or passwords don't match");
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} ref={formRef}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />
        <label htmlFor="age">Age</label>
        <input type="number" min="0" name="age" />
        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <label htmlFor="password2">Repeat password</label>
        <input type="password" name="password2" />
        <label htmlFor="gender">Gender</label>
        <select name="gender" id="">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="tc">I agree to terms and conditions</label>
        <input type="checkbox" name="tc" />
        <input type="file" name="file" ref={fileRef} />
        <datalist id="countries">
          <option value="UK"></option>
          <option value="USA"></option>
          <option value="Japan"></option>
          <option value="China"></option>
          <option value="Russia"></option>
        </datalist>
        <input type="text" list="countries" name="country" />
        <button>Submit</button>
      </form>
    </>
  );
}

export default UncontrolledPage;
