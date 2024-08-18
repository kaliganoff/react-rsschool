import { useRef } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { FormsSlice } from "../../store/reducers/FormsSlice";
import { useNavigate } from "react-router-dom";

function UncontrolledPage() {
  const formRef = useRef(null);
  const { saveUncontrolled } = FormsSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    dispatch(saveUncontrolled(formValues));
    navigate("/");
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} ref={formRef}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />
        <label htmlFor="age">Age</label>
        <input type="number" name="age" />
        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <label htmlFor="password2">Repeat password</label>
        <input type="password" name="password2" />
        <label htmlFor="tc">I agree to terms and conditions</label>
        <input type="checkbox" name="tc" />
        <button>Submit</button>
      </form>
    </>
  );
}

export default UncontrolledPage;
