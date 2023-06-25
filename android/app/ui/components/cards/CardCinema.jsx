import React from 'react';
import Card from './Card';

/**
 * 
 * @param {{ title: String }} props - whether the toggle is open or not
 * @param {String} description - Texto bajo el titulo.
 * @param {String} rooms - Cant de salas.
 * @param {String} actives - Cant de salas activas.
 * @returns 
 */
export default function CardCinema({
    title = '',
    description = '',
    actives = '0',
    rooms = '0',
    onPressBtnDelete = () => { },
    onPressBtnEdit = () => { },
}) {
    const items = [
        {
            value: description,
        },
        {
            description: 'Salas Activas',
            value: actives,
        },
        {
            description: 'Salas Totales',
            value: rooms,
        },
    ];

    return (
        <Card
            items={items}
            title={title}
            showSideButtons={true}
            onPressBtnDelete={onPressBtnDelete}
            onPressBtnEdit={onPressBtnEdit}
        />
    );
}
