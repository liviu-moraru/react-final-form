/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import { alpha, hyphen, InputField, Radio, space, ToolTip } from "dfs-ui-components";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const InputFieldAdapter = ({ input, meta, ...rest }) => (
  <InputField
    {...input}
    {...rest}
    
    onChangeCallback={(event, formSection) => input.onChange(event.target.value)}
    errorMessages={meta.error && meta.touched && wasSubmitted ? [meta.error] : []}
  />
)
var wasSubmitted = false;
const App = () => {
  const onSubmit = async values => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };
  const myHandleSubmit = (event, hs) => {
    wasSubmitted = true;
    hs(event);
  };
  return (
    <Styles>
      <h1>React Final Form - Simple Example</h1>
      <a
        href="https://final-form.org/react"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read Docs
      </a>
      <Form
        validate={values => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "Required";
          }
          if (!values.lastName) {
            errors.lastName = "Required";
          }
          return errors;
        }}
        onSubmit={onSubmit}
        initialValues={{
          stooge: "larry",
          employed: false,
          firstName: "Alexis",
          favoriteColor: "#ff0000",
          toppings: ["ham", "chicken"],
          sauces: ["ketchup", "mustard"]
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={(event, hs) => myHandleSubmit(event, handleSubmit)}>
            <div>
              <label>First Name</label>
              <Field name="firstName">
                {({ input, meta }) => (
                  <InputField
                  {...input}
                  showLabel={false}
                  maxLength={10}
                  allowedRules={[{ rule: alpha }, { rule: hyphen }, { rule: space }]}
                  onChangeCallback={(event, formSection) => input.onChange(event.target.value)}
                  errorMessages={meta.error && meta.touched && wasSubmitted ? [meta.error] : []}
                />
                )}
              </Field>
            </div>
            <div>
              <label>Last Name</label>
              <Field id="lastName" name="lastName"
                component={InputFieldAdapter} 
                hintText="Last Name"
                floatingLabelText="Last Name" 
                showLabel={false}
                maxLength={10}
                allowedRules={[{ rule: alpha }, { rule: hyphen }, { rule: space }]}
                >
              </Field>
            </div>
            <div>
              <label>Employed</label>
              <Field name="employed" component="input" type="checkbox" />
            </div>
            <div>
              <label>Favorite Color</label>
              <Field name="favoriteColor" component="select">
                <option />
                <option value="#ff0000">❤️ Red</option>
                <option value="#00ff00">💚 Green</option>
                <option value="#0000ff">💙 Blue</option>
              </Field>
            </div>
            <div>
              <label>Toppings</label>
              <Field name="toppings" component="select" multiple>
                <option value="chicken">🐓 Chicken</option>
                <option value="ham">🐷 Ham</option>
                <option value="mushrooms">🍄 Mushrooms</option>
                <option value="cheese">🧀 Cheese</option>
                <option value="tuna">🐟 Tuna</option>
                <option value="pineapple">🍍 Pineapple</option>
              </Field>
            </div>
            <div>
              <label>Sauces</label>
              <div>
                <label>
                  <Field
                    name="sauces"
                    component="input"
                    type="checkbox"
                    value="ketchup"
                  />{" "}
                  Ketchup
                </label>
                <label>
                  <Field
                    name="sauces"
                    component="input"
                    type="checkbox"
                    value="mustard"
                  />{" "}
                  Mustard
                </label>
                <label>
                  <Field
                    name="sauces"
                    component="input"
                    type="checkbox"
                    value="mayonnaise"
                  />{" "}
                  Mayonnaise
                </label>
                <label>
                  <Field
                    name="sauces"
                    component="input"
                    type="checkbox"
                    value="guacamole"
                  />{" "}
                  Guacamole 🥑
                </label>
              </div>
            </div>
            <div>
              <label>Best Stooge</label>
              <div>
                <label>
                  <Field
                    name="stooge"
                    component="input"
                    type="radio"
                    value="larry"
                  />{" "}
                  Larry
                </label>
                <label>
                  <Field
                    name="stooge"
                    component="input"
                    type="radio"
                    value="moe"
                  />{" "}
                  Moe
                </label>
                <label>
                  <Field
                    name="stooge"
                    component="input"
                    type="radio"
                    value="curly"
                  />{" "}
                  Curly
                </label>
              </div>
            </div>
            <div>
              <label>Notes</label>
              <Field name="notes" component="textarea" placeholder="Notes" />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Styles>
  );
};

export default App;
