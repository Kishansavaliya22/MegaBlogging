import { Button, Form, Input, Select, Splitter, Upload, message } from "antd";
import React from "react";
import TextEditor from "../component/TextEditor";
import { PlusOutlined } from "@ant-design/icons";
import appwriteDBService from "../appwrite/appwriteDBService";

const PostForm = ({ title = "", slug = "", content }) => {
  const [form] = Form.useForm();
  const uploadHandler = async (options) => {
    const { file, onSuccess, onError, onProgress } = options;

    console.log(options);

    try {
      // Appwrite doesn’t provide native progress callback,
      // so we simulate progress manually
      onProgress?.({ percent: 20 });

      const result = await appwriteDBService.uploadFile(file);
      console.log(result);

      onProgress?.({ percent: 100 });
      onSuccess?.(result);
      message.success("Upload successful!");
    } catch (err) {
      onError?.(err);
      message.error("Upload failed!");
    }
  };

  const formHandler = (values) => {
    console.log(values);
  };

  return (
    <Form onFinish={formHandler} className="w-full" form={form} name="postform">
      <Splitter>
        <Splitter.Panel defaultSize="70%" className="p-2">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required!" }]}
          >
            <Input value={title} />
          </Form.Item>
          <Form.Item label="Slug" name="slug">
            <Input value={slug} />
          </Form.Item>
          <Form.Item label="Status" name="status" initialValue="Active">
            <Select
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
            />
          </Form.Item>
          <TextEditor form={form} defaultValue={content} />
        </Splitter.Panel>
        <Splitter.Panel className="p-2">
          <Form.Item
            label="Upload"
            valuePropName="featuredimage"
            rules={[{ required: true, message: "Image is required!" }]}
          >
            <Upload action={uploadHandler} listType="picture-card">
              <button type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </Splitter.Panel>
      </Splitter>
      <Form.Item className="justify-items-center p-5">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
