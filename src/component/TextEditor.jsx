import { Form } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const TextEditor = ({ form, defaultValue = "" }) => {
  return (
    <Form.Item
      name="content"
      label="content"
      rules={[{ required: true, message: "Content is required!" }]}
      valuePropName="value"
      getValueFromEvent={(content) => content}
    >
      <Editor
        apiKey="o2an1t5znarzhan9wt5d5ugh1djbq0onnb1vreb2qnfvr6yg"
        initialValue={defaultValue}
        init={{
          height: 300,
          menubar: false,

          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={(content) => {
          form.setFieldsValue({ content });
        }}
      />
    </Form.Item>
  );
};

export default TextEditor;
