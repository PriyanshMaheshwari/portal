import "../styles/App.css";
import React from "react";
import FormComponent from "../components/FormComponent";
import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "../store/notificationslice";
import { notificationSchema } from "../constants/schemas";

function NotificationForm() {
  const dispatch = useDispatch();
  const fieldDetails = useSelector((state) => state.notification);

  const setValue = (field, value) => {
    dispatch(
      notificationActions.setField({
        field,
        value,
      })
    );
  };

  return (
    <FormComponent
      fieldDetails={fieldDetails}
      setValue={setValue}
      schema={notificationSchema}
      api={"http://localhost:8000/api/notification/add"}
    />
  );
}

export default NotificationForm;
