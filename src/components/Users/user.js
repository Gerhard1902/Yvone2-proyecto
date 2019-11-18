import React from 'react';
import Regalo from '../../assets/santa.jpg';
import Image from '../Image2/Image';
import Card from '../Cards/Card';

const usuarios =(props)=>(
    <div>
        <Image link={Regalo} text="Lista de usuarios"/>
        <Card imagen={Regalo}></Card>
    </div>
);

export default usuarios;