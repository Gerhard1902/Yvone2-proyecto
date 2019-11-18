import React from 'react';
import Regalo from '../../assets/regalo2.jpg';
import Image from '../Image/Image';
import Card from '../Cards/Card';

const regalo =(props)=>(
    <div>
        <Image link={Regalo} text="Catálogo de regalos" button="Categorías"/>
        <Card imagen={Regalo}></Card>
    </div>
);

export default regalo;