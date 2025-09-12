import React, { Component } from "react";
import { Modal, Form, Input, Select } from "antd";
import { FormInstance } from 'antd/lib/form';
import { getModelList } from "@/utils/token";

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
    }

    public formRef = React.createRef<FormInstance>();

    public onFinish = () => {
        this.formRef.current?.validateFields().then((res: any) => {
            res.models = res.models.join(',');
            this.props.onOk(res);
        })
    };


    handleTypeChange = (value: any) => {
        console.log(value)
        this.setState({ userType: value })
    }

    private get FromItemConfigs() {
        const authList = getModelList().map((item) => ({ label: item.modelAlias, value: item.modelAlias }))
        const base = [{
            name: 'models',
            label: '选择模型',
            initialValue: 1,
            rules: [{ required: true, message: '请选择选择模型' }],
            JSXElementConfig: {
                props: {
                    placeholder: "请选择授权模型",
                    options: authList,
                    mode: 'multiple'
                },
                JSX: <Select />,
            }
        }]
        return base
    }

    public render() {

        const { onCancel, formData } = this.props;
        return (
            <Modal
                destroyOnClose={true}
                title="授权"
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