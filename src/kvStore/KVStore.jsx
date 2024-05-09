import axios from 'axios';
import { Button, Flex, Input, notification } from 'antd';
import React, { useState } from 'react';
import "./KVStore.css"
// 6.824 raft：
// 1、lab2: raft --- 选举、日志同步、持久化、快照
// 2、lab3: kv存储
// 3、lab4: 分片，均衡  

// 考虑设计页面包括：
// 1、针对选举：对选举过程进行模拟测试：正常、Leader挂掉重新选举、选举如何判断
// 2、节点日志、储存情况查看
// 3、kv存储系统：put新增或修改、get查看、append附加、del删除 // 已完成简单交互、界面待优化 // 删除待完成


// 进一步优化：
// 1、集群管理：加入节点、删除节点 // 暂未实现

// http请求get查看
function getHttp(key, setValue) {
    axios.get('http://localhost:12100/' + key)
        .then(response => {
            // 成功则设置value值
            setValue(response.data)
            if (/\S/.test(response.data)) {
                notification.success({
                    message: '成功',
                    description: '成功获取到值',
                });
            } else {
                notification.info({
                    message: '提示',
                    description: '数据库中不存在查询的key-value',
                });
            }
        })
        .catch(error => {
            notification.error({
                message: '失败',
                description: '获取key的value错误:', error,
            });
        });
}

// http请求Post新增（修改）
function getHttpPost(key, value) {
    axios.post('http://localhost:12100/' + key, value)
        .then(response => {
            notification.success({
                message: '成功',
                description: '成功修改键值',
            });
        })
        .catch(error => {
            notification.error({
                message: '失败',
                description: '修改键值失败', error,
            });
        });
}
// http请求Put附加
function getHttpPut(key, value) {
    axios.put('http://localhost:12100/' + key, value)
        .then(response => {
            notification.success({
                message: '成功',
                description: '成功附加键值',
            });
        })
        .catch(error => {
            notification.error({
                message: '失败',
                description: '附加键值失败', error
            });
        });
}
// http请求delete删除
function getHttpDelete(key) {
    axios.delete('http://localhost:12100/' + key)
        .then(response => {
            notification.success({
                message: '成功',
                description: '成功删除键值',
            });
        })
        .catch(error => {
            notification.error({
                message: '失败',
                description: '删除键值失败', error
            });
        });
}

function useInputChange(initialValue) {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return [value, handleChange];
}

function KVStore() {
    const [key, keyChange] = useInputChange('');
    const [value, setValue] = useState('');
    const [newKey, newKeyChange] = useInputChange('');
    const [newValue, newValueChange] = useInputChange('');
    const [deleteKey, deleteKeyChange] = useInputChange('');
    const [appendKey, appendKeyChange] = useInputChange('');
    const [appendValue, appendValueChange] = useInputChange('');

    return (
        <>
            <h1>KV存储系统</h1>
            <Flex className="flex-container" gap="large" wrap="wrap" justify='center'>
                {/* 功能1：Get */}
                <div className="input-container">
                    <Input className="flex-item" onChange={keyChange} placeholder='请输入要查询的key' />
                    <Input className="flex-item" readOnly value={value} placeholder='查询到的value' />
                    <Button className="flex-item" type="primary" size="large" onClick={() => { getHttp(key, setValue) }} >Get</Button>
                </div>
                {/* 功能2：Put */}
                <div className="input-container">
                    <Input className="flex-item" onChange={newKeyChange} placeholder='请输入要修改的key' />
                    <Input className="flex-item" onChange={newValueChange} placeholder='修改后的value' />
                    <Button className="flex-item" type="primary" size="large" onClick={() => { getHttpPost(newKey, newValue) }} >Put</Button>
                </div>
                {/* 功能3：Append */}
                <div className="input-container">
                    <Input className="flex-item" onChange={appendKeyChange} placeholder='请输入要附加value的key' />
                    <Input className="flex-item" onChange={appendValueChange} placeholder='附加到原值后的value' />
                    <Button className="flex-item" type="primary" size="large" onClick={() => { getHttpPut(appendKey, appendValue) }} >Append</Button>
                </div>
                {/* 功能4：Delete */}
                <div className="input-container">
                    <Input className="flex-item" onChange={deleteKeyChange} placeholder='请输入要删除的key' />
                    <Button className="flex-item" type="primary" size="large" onClick={() => { getHttpDelete(deleteKey) }} >delete</Button>
                </div>
            </Flex>
        </>
    )
}

export default KVStore

