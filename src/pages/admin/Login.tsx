import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import Background from '../../assets/img/bg.jpg';
import { useLoginHook } from "./hooks/useLoginHook";

export const Login: React.FC = () => {

    const { form, onFinish } = useLoginHook();

    return (
        <div className="flex w-full h-full p-4" style={{ background: "#1F2127" }}>
            <div className="flex flex-col items-center justify-center w-2/5 overflow-hidden">
                <h1 className="flex flex-col items-center justify-center text-3xl font-bold text-center text-white">
                    <a href="/">TaskTrack</a>
                    <span className="text-4xl font-bold text-blue-500 w-64 text-center mt-6">
                        Faça Login com sua conta
                    </span>
                </h1>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="flex flex-col mt-16 w-72 items-center justify-center overflow-hidden"
                >
                    <Form.Item
                        name="email"
                        label={<span className="font-bold text-white">Email</span>}
                        rules={[
                            { required: true, type: 'email', message: "Email é necessario!" },
                        ]}
                        className="w-full"
                    >
                        <Input
                            //prefix={<Form.Item.Icon type="mail" />}
                            placeholder="Email"
                            className="w-full rounded-full px-4"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<span className="font-bold text-white">Senha</span>}
                        rules={[
                            { required: true, type: 'string', message: "Senha é necessaria!" },
                        ]}
                        className="w-full"
                    >
                        <Input.Password
                            //prefix={<Form.Item.Icon type="lock" />}
                            type="password"
                            placeholder="Senha"
                            className="w-full rounded-full px-4"
                        />
                    </Form.Item>
                    <Form.Item className="w-full">
                        <Button htmlType="submit" type="primary" className="rounded-full w-full h-9 mt-2">Entrar</Button>
                    </ Form.Item>
                    <Form.Item className="w-full">
                        <Form.Item><Checkbox className="text-white">Lembre-me</Checkbox></Form.Item>
                        <a href="#" className="flex items-center justify-center text-sm text-blue-500 hover:text-blue-600">Esqueceu a senha</a>
                        <span className="flex items-center justify-center text-sm text-slate-500 mt-4">Ainda não possui uma conta? <a href="/register" className="text-blue-500 hover:text-blue-600"> Clique aqui!</a></span>
                    </ Form.Item>
                </Form>
            </div>
            <div className="flex flex-col w-3/5 bg-white rounded-3xl object-cover">
                <img src={Background} style={{ width: "100%", height: "100%" }} className="rounded-3xl" />
            </div>
        </div>
    );
}