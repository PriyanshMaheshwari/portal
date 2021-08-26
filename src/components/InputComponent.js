import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core/";

export const InputComponent = (props) => {
  switch (props.fieldData.type) {
    case Boolean:
      return (
        <FormControl fullWidth={true}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.notificationDetails[props.fieldData.name]}
                onChange={(obj) => props.onChangeHandler(obj,props.fieldData.type)}
                id={props.fieldData.name}
              />
            }
            label={props.fieldData.name}
          />
        </FormControl>
      );

    default:
      return (
        <FormControl fullWidth={true} required={props.fieldData.required}>
          <InputLabel htmlFor={props.fieldData.name}>
            {props.fieldData.name}
          </InputLabel>
          <Input
            id={props.fieldData.name}
            aria-describedby="my-helper-text"
            error={props.fieldData.error}
            value={props.notificationDetails[props.fieldData.name]}
            onChange={(obj) => props.onChangeHandler(obj,props.fieldData.type)}
            autoFocus={props.fieldData.autoFocus}
          />
          {props.fieldData.formHelperText !== "" && (
            <FormHelperText id="my-helper-text">
              {props.fieldData.formHelperText}
            </FormHelperText>
          )}
        </FormControl>
      );
  }
};
