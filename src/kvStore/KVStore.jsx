import axios from 'axios';
import { Button, Flex, Input } from 'antd';
import React, { useState } from 'react';

// 6.824 raft：
// 1、lab2: raft --- 选举、日志同步、持久化、快照
// 2、lab3: kv存储
// 3、lab4: 分片，均衡  

// 考虑设计页面包括：
// 1、针对选举：对选举过程进行模拟测试：正常、Leader挂掉重新选举、选举如何判断
// 2、
// 、节点日志、储存情况查看
// 3、kv存储系统：put新增、get查看、mod修改、del删除 // 已完成简单交互、界面待优化


// 进一步优化：
// 1、集群管理：加入节点、删除节点 // 暂未实现


// http请求get查看
function getHttp(key, setValue) {
    axios.get('http://localhost:12100/' + key)
        .then(response => {
            // 成功则设置value值
            setValue(response.data)
        })
        .catch(error => {
            console.error("获取key的value错误", error);
        });
}

// http请求Put新增（修改）
function getHttpPut(key, value) {
    axios.put('http://localhost:12100/' + key, value)
        .then(response => {
            console.log("新增key的value成功，", key, ":", value);
        })
        .catch(error => {
            console.error("新增key的value错误", error);
        });
}
// http请求delete删除
function getHttpDelete(key) {
    axios.delete('http://localhost:12100/' + key)
        .then(response => {
            console.log("删除key成功");
        })
        .catch(error => {
            console.error("删除key失败", error);
        });
}


function KVStore() {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');
    const [deleteKey, setDeleteKey] = useState('');

    const keyChange = (e) => {
        setKey(e.target.value);
    };
    const newKeyChange = (e) => {
        setNewKey(e.target.value);
    };
    const newValueChange = (e) => {
        setNewValue(e.target.value);
    };
    const deleteKeyChange = (e) => {
        setDeleteKey(e.target.value);
    };

    return (
        <>
            <h1>KV存储系统</h1>
            <Flex gap="large" wrap="wrap" justify='center'>
                <Input onChange={keyChange} placeholder='请输入要查询的key' />
                <Input value={value} placeholder='查询到的value' />
                <Button type="primary" size="large" onClick={() => { getHttp(key, setValue) }} >读取Get请求</Button>
                <Input onChange={newKeyChange} placeholder='请输入要新增的key' />
                <Input onChange={newValueChange} placeholder='对应的value' />
                <Button type="primary" size="large" onClick={() => { getHttpPut(newKey, newValue) }} >新增Put请求</Button>
                <Input onChange={deleteKeyChange} placeholder='请输入要删除的key' />
                <Button type="primary" size="large" onClick={() => { getHttpDelete(deleteKey) }} >删除delete请求</Button>
            </Flex>
        </>
    )
}

export default KVStore