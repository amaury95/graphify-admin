import { Form } from "antd";
import { Element } from "types/schema";
import FormInputs from "./components/FormInputs";
import { useEffect } from "react";

// Map Types
// string => Input
// int => Num Input
// bytes => Image
// enum (options) => Radio or Select depending on number of options
// mesage => Form

// Map Kind
// list => add elements of type
// map => add elemnts of {key: type, value: type2}

const formStyle: React.CSSProperties = { maxWidth: 600, minWidth: 400 };

interface CreateNewFormProps {
  schema: Element;
  form: any;
}

export default function CreateNewForm({ schema, form }: CreateNewFormProps) {

  useEffect(() => {
    console.log(schema)
  }, [schema])
  
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={formStyle}
      autoComplete="off"
      // onFinish={() => {
      //   onValuesChange(JSON.stringify(form.getFieldsValue(), null, 2));
      // }}
    >
      {/* fields */}
      <FormInputs schema={schema} />

      {/* stepper for one ofs */}
      {/* <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}

    </Form>
  );
}
