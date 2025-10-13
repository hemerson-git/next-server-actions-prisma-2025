"use client";
import { useEffect, useState } from "react";

import { sendPromptToGemini } from "@/lib/gemini";
import { createBlogPost } from "@/server/admin/blogPostsService";
import { useBlogAdminStore } from "@/stores/blogAdminStore";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Space,
  Spin,
  theme,
  Tooltip,
} from "antd";
import { FormProps } from "antd/lib";
import { useLocale, useTranslations } from "next-intl";
import { ThunderboltOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill-new";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type FieldType = {
  title: string;
  subtitle: string;
  slug: string;
  body: string;
};

const NewBlogPost = ({ open, setOpen }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { blogSelected } = useBlogAdminStore();

  const newPostTranslations = useTranslations("NewBlogPost");
  const formTranslations = useTranslations("Form");
  const commonTranslations = useTranslations("Common");
  const errorsTranslations = useTranslations("Errors");

  const locale = useLocale();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const onClose = () => setOpen(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const response = await sendPromptToGemini({
      prompt: `
        Escreva um post para um blog, o tema deve ser relacionado as configurações/tema do blog: ${blogSelected?.title}; ${blogSelected?.subtitle}. Crie sempre algo diferente e não repita, na lingua ${locale}, porém responda no formato JSON.
        Siga esse exemplo e respeite as regras abaixo:
        {
          "title": "Título do post (max. 100 caracteres)",
          "subtitle": "Descrição do post (max. 191 caracteres)",
          "slug": "Slug do blog (max. 191 caracteres, siga o regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/)",
          "body": "Conteúdo do post (Use HTML para formatar o conteúdo - Não use markdown)",
        }
      `,
    });

    form.setFieldsValue(response);
    setIsLoading(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!blogSelected) return;

    setIsLoading(true);
    const blogPost = await createBlogPost({
      data: { ...values, blogId: blogSelected.id },
    });

    if (blogPost?.error) {
      message.error(errorsTranslations(`blog/${blogPost.error}`));
      return;
    }

    message.success(newPostTranslations("success"));
    setOpen(false);
  };

  useEffect(() => {
    form.resetFields();
  }, [blogSelected]);

  return (
    <Drawer
      title={newPostTranslations("title")}
      width={720}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Tooltip title={newPostTranslations("ai_tooltip")} className="mr-2">
            <Button type="text" onClick={handleGenerate}>
              <ThunderboltOutlined
                classID="text-xl"
                style={{ color: colorPrimary }}
              />
            </Button>
          </Tooltip>
          <Button onClick={onClose}>{commonTranslations("cancel")}</Button>
          <Button type="primary" onClick={form.submit} loading={isLoading}>
            {commonTranslations("save")}
          </Button>
        </Space>
      }
    >
      <Spin spinning={isLoading}>
        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item<FieldType>
                name="title"
                label={formTranslations("title_label")}
                rules={[{ required: true, max: 100 }]}
              >
                <Input
                  showCount
                  maxLength={100}
                  placeholder="Ex: Publicação X"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item<FieldType>
                name="subtitle"
                label={formTranslations("subtitle_label")}
                rules={[{ max: 191 }]}
              >
                <Input
                  showCount
                  placeholder="Ex: Uma publicação de teste"
                  maxLength={191}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item<FieldType>
                name="slug"
                label={formTranslations("slug_label")}
                rules={[
                  {
                    required: true,
                    max: 191,
                    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  },
                ]}
              >
                <Input
                  showCount
                  maxLength={60}
                  addonBefore={"/"}
                  placeholder="Ex: publicacao-x"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item<FieldType>
                name="body"
                label={formTranslations("body_label")}
                rules={[{ required: true }]}
              >
                <ReactQuill
                  theme="snow"
                  value={form.getFieldValue("body")}
                  onChange={(value) => form.setFieldsValue({ body: value })}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default NewBlogPost;
