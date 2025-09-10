import React, { Component } from "react";
import { Modal, Form, Input, Select } from "antd";
import { FormInstance } from 'antd/lib/form';
import { roleList } from "@/config/const";
import CutImage from "@/components/cut_image";

interface IProps {
    formData?: { [key: string]: any };
    onOk: (formPayload: any) => void;
    onCancel: () => void;
}

interface IState { }

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};


export default class AddModal extends Component<IProps, IState> {

    state = {
        userType: 1,
        imgList1: [],
        imgList2: [],
        imgList3: [],
    }

    componentDidMount(): void {
        const { formData } = this.props;
        // if (formData.pic) {
        //     // 处理图片
        //     formData.fileList = [{
        //         uid: 0,
        //         name: '',
        //         status: "done",
        //         url: current.pic,
        //         original: true,
        //     }]
        //     this.setState({
        //         fileList: formData.pic ? formData.fileList : []
        //     })
        // }
    }

    public formRef = React.createRef<FormInstance>();

    public onFinish = () => {
        this.formRef.current?.validateFields().then((res: any) => {
            this.props.onOk(res);
        })
    };


    handleTypeChange = (value: any) => {
        console.log(value)
        this.setState({ userType: value })
    }

    private get FromItemConfigs() {
        const { userType, imgList1, imgList2, imgList3 } = this.state
        const base = [{
            name: 'nickName',
            label: `用户名`,
            initialValue: null,
            rules: [{ required: true, message: '请输入用户名' }],
            JSXElementConfig: {
                props: {
                    placeholder: '请输入用户名',
                },
                JSX: <Input />
            }
        }, {
            name: 'password',
            label: `密码`,
            initialValue: null,
            rules: [{ required: true, message: '请输入密码' }],
            JSXElementConfig: {
                props: {
                    placeholder: '请输入密码',
                },
                JSX: <Input />
            }
        }, {
            name: 'userType',
            label: '用户类型',
            initialValue: 1,
            rules: [{ required: true, message: '请选择用户类型' }],
            JSXElementConfig: {
                props: {
                    placeholder: "请选择用户类型",
                    options: roleList,
                    onChange: this.handleTypeChange
                },
                JSX: <Select />,
            }
        }]
        const list1 = [{
            name: 'belongCompany',
            label: '归属公司',
            initialValue: null,
            rules: [{ required: true, message: '请选择归属公司' }],
            JSXElementConfig: {
                props: {
                    placeholder: "请选择归属公司",
                    options: roleList,
                    onChange: this.handleTypeChange
                },
                JSX: <Select />,
            }
        }, {
            name: 'nickName',
            label: `姓名`,
            initialValue: null,
            rules: [{ required: true, message: '请输入用户名' }],
            JSXElementConfig: {
                props: {
                    placeholder: '请输入用户名',
                },
                JSX: <Input />
            }
        }, {
            name: 'mobile',
            label: `电话`,
            initialValue: null,
            rules: [{ required: true, message: '请输入电话' }],
            JSXElementConfig: {
                props: {
                    placeholder: '请输入电话',
                },
                JSX: <Input />
            }
        }, {
            name: 'email',
            label: `邮箱`,
            initialValue: null,
            rules: [{ required: true, message: '请输入邮箱' }],
            JSXElementConfig: {
                props: {
                    placeholder: '请输入邮箱',
                },
                JSX: <Input />
            }
        }]
        const list2 = [{
            name: 'companyName',
            label: `公司名称`,
            initialValue: null,
            rules: [{ required: true, message: '请输入公司名称' }],
            JSXElementConfig: {
                props: {
                    placeholder: '请输入公司名称',
                },
                JSX: <Input />
            }
        }, {
            name: 'png1',
            label: `营业执照`,
            initialValue: null,
            JSXElementConfig: {
                JSX: <CutImage
                    label=''
                    name="fileList"
                    fileList={imgList1}
                    imageType={["image/jpg", "image/jpeg", "image/png"]}
                    onChange={(value: any) => {
                        const { fileList } = value;
                        this.setState({
                            imgList1: fileList,
                        });
                    }}
                    sizeLimit={2}
                    extra="图片类型png、jpg,大小上限2M"
                    form={this.formRef}
                    rules={[{ required: true, message: '请上传营业执照' }]}
                />
            }
        }, {
            name: 'png2',
            label: `法人身份证正面`,
            initialValue: null,
            JSXElementConfig: {
                JSX: <CutImage
                    label=''
                    name="fileList"
                    fileList={imgList2}
                    imageType={["image/jpg", "image/jpeg", "image/png"]}
                    onChange={(value: any) => {
                        const { fileList } = value;
                        this.setState({
                            imgList2: fileList,
                        });
                    }}
                    sizeLimit={2}
                    extra="图片类型png、jpg,大小上限2M"
                    form={this.formRef}
                    rules={[{ required: true, message: '请上传法人身份证正面' }]}
                />
            }
        }, {
            name: 'png3',
            label: `法人身份证反面`,
            initialValue: null,
            JSXElementConfig: {
                JSX: <CutImage
                    label=''
                    name="fileList"
                    fileList={imgList3}
                    imageType={["image/jpg", "image/jpeg", "image/png"]}
                    onChange={(value: any) => {
                        const { fileList } = value;
                        this.setState({
                            imgList3: fileList,
                        });
                    }}
                    sizeLimit={2}
                    extra="图片类型png、jpg,大小上限2M"
                    form={this.formRef}
                    rules={[{ required: true, message: '请上传法人身份证反面' }]}
                />
            }
        }]
        return [...base, ...(userType === 2 ? list1 : list2)]
    }

    public render() {

        const { onCancel, formData } = this.props;
        return (
            <Modal
                destroyOnClose={true}
                title="添加用户"
                visible={true}
                onOk={this.onFinish}
                onCancel={onCancel}
                width={800}
            >
                <Form {...layout} ref={this.formRef}>
                    {this.FromItemConfigs.map(itemConfig => {
                        const { JSXElementConfig, ...FormItemConfig } = itemConfig;
                        FormItemConfig.initialValue = FormItemConfig.initialValue || formData && formData[FormItemConfig.name];
                        return (
                            <Form.Item key={itemConfig.name} {...FormItemConfig}>
                                {
                                    React.cloneElement(JSXElementConfig.JSX, JSXElementConfig.props)
                                }
                            </Form.Item>
                        )
                    })}
                </Form>
            </Modal>
        )
    }
}