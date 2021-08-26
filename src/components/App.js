import "../styles/App.css";
import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "../store/notificationslice";
import { Button } from "@material-ui/core/";
import { notificationSchema } from "../constants/schemas";
import React, { useState } from "react";
import { InputComponent } from "./InputComponent";

function App() {
  const dispatch = useDispatch();
  const notificationDetails = useSelector((state) => state.notification);
  const [focus, setFocus] = useState("title");
  const [zeroSubmission, setZeroSubmission] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = () => {
    for(const field in notificationSchema){
      if(notificationSchema[field].required && notificationDetails[field]==="") return false;
    }

    return true;
  }

  const verify = (formFields) => {
    let f = true;
    for (let i = 0;i<formFields.length;i++) {
      if (formFields[i].required && notificationDetails[formFields[i].name]==="") {
        formFields[i].error = true;
        formFields[i].formHelperText = "The given field is required.";
      } 
      else if (formFields[i].type === String) {
        if (formFields[i].minlength > notificationDetails[formFields[i].name].length) {
          formFields[i].error = true;
          formFields[i].formHelperText = `The ${formFields[i].name} should be of atleast ${formFields[i].minlength} length`;
        }
        if (formFields[i].maxlength < notificationDetails[formFields[i].name].length) {
          formFields[i].error = true;
          formFields[i].formHelperText = `The ${formFields[i].name} should not exceed length of ${formFields[i].minlength}`;
        }
      }

      if (formFields[i].error) {
        if (f) {
          if(submitted){
            setFocus(formFields[i].name);
            setSubmitted(false);
          }
          f = false;
        }
      }
    }
    if (f) return true;
  };

  const getFormFields = () => {
    let formFields = [];
    for (const field in notificationSchema) {
      const extendedField = { ...notificationSchema[field] };
      extendedField.error = false;
      extendedField.formHelperText = "";
      extendedField.name = field;
      extendedField.autoFocus = false;
      if (focus === field) {
        extendedField.autoFocus = true;
      }
      formFields.push(extendedField);
    }
    if (!zeroSubmission) verify(formFields);
    return formFields;
  }

  const styles = {
    margin: "10px",
    width: "500px",
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isCorrect()) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationDetails),
      };
      const response = await fetch(
        "http://localhost:8000/api/notification/add",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      setZeroSubmission(true);
    } else {
      setZeroSubmission(false);
      setSubmitted(true);
    }
  };

  const onChangeHandler = (object, type) => {
    let value = object.target.value;
    if (type === Boolean) value = object.target.checked;
    dispatch(
      notificationActions.setField({
        field: object.target.id,
        value,
      })
    );
    setFocus(object.target.id);
  };
  
  return (
    <React.Fragment>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {getFormFields().map((fieldData) => {
          return (
            <div style={styles} key={Math.random()}>
              <InputComponent
                fieldData={fieldData}
                onChangeHandler={onChangeHandler}
                notificationDetails={notificationDetails}
              />
            </div>
          );
        })}
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
}

export default App;
