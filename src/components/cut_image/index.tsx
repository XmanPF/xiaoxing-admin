import React, { useState } from 'react';
import { Upload, Form,message } from 'antd';
import { getToken } from '@/utils/token.ts';
import { upload } from '@/apis/job';


interface IProps {
  name: string
  label: string
  form: any
  rules?: any
  fileList?: Array<any>
  sizeLimit?: number
  onChange?: (value:any) => void
  [key:string]:any
}

const ImgCut: React.FC<IProps> = (props) => {
  const { name, label, rules, fileList = [], onChange = () =>{}, imageType, sizeLimit=1,changeName,disabled=false,extra,gifLimit=2,isResetFileName=false } = props

  const onPreview = async (file:any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const normFile = (e:any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  
  const onBeforeUpload = async (file:any) => {
    const typeLimit = ["image/jpg","image/jpeg","image/png"]; 
    const isJpgOrPng = imageType ? imageType.includes(file.type) : typeLimit.includes(file.type);
    if (!isJpgOrPng) {
      message.error(imageType ? "上传失败，图片格式错误！" : "只能上传 JPG/JPEG/PNG 文件!");
      return Upload.LIST_IGNORE;
    }

    const size = file.type === "image/gif" ? gifLimit : sizeLimit;
    const isLt1M = file.size / 1024 / 1024 < (1 * size);
    if (!isLt1M) {
      message.error(size === 1  ? "图片大小必须小于 1MB!" : '上传失败，图片过大！');
      return Upload.LIST_IGNORE;
    }
    return Promise.resolve(file)
  }

  const uploadImage = async (options:any) => {
    console.log(fileList)
    const { onSuccess, onError, file } = options;

    try {
      const res= await upload({file});

      onSuccess(res,file);
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
      // const list = fileList.filter((item:any)=>item.status === 'done')
      // setFileList(list)
      // formRef.current?.setFieldsValue({[name]: list});
    }
  };

  return (
    <Form.Item
      initialValue={fileList}
      name={name}
      label={label}
      valuePropName="fileList"
      getValueFromEvent={normFile}
      extra={extra}
      rules={rules}>
        <Upload
          headers={{token: getToken()}}
          customRequest={uploadImage}
          listType="picture-card"
          onChange={onChange}
          beforeUpload={onBeforeUpload}
          onPreview={onPreview}
          disabled={disabled}
        >
          {fileList.length < 1 && '+ 上传'}
        </Upload>
    </Form.Item>
  );
};

export default ImgCut;