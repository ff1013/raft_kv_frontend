import React from 'react';
import './App.css'
import { Button, Flex } from 'antd';

function Home() {
    return (
    <>
        <h1>基于Raft协议的分布式KV存储系统</h1>
        <Flex gap="large" wrap="wrap" justify='center'>
            <Button type="primary" size="large" onClick={() => {window.location.href='/raft'}} >Raft算法动画演示</Button>
            <Button type="primary" size="large" onClick={() => {window.location.href='/kvStore'}}>KV存储系统</Button>
        </Flex>
    </>
    )
}

export default Home;