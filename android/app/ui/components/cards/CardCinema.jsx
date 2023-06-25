import React from 'react';
import Card from './Card';

/**
 * 
 * @param {String} name - Nombre del cine.
 * @param {String} address - Dirección del cine.
 * @param {String} rooms - Cantidad de salas total.
 * @param {String} activeRooms - Cantidad de salas activas.
 * @param {Function} onPressBtnDelete - Función que controla el accionar al pulsar el boton de eliminar.
 * @param {Function} onPressBtnEdit - Función que controla el accionar al pulsar el boton de editar.
 * @returns 
 */
export default function CardCinema({
    name = '',
    address = '',
    rooms = '0',
    activeRooms = '0',
    onPressBtnDelete = () => { },
    onPressBtnEdit = () => { },
}) {
    const items = [
        {
            value: address,
        },
        {
            description: 'Salas Activas',
            value: activeRooms,
        },
        {
            description: 'Salas Totales',
            value: rooms,
        },
    ];

    return (
        <Card
            items={items}
            title={name}
            showSideButtons={true}
            onPressBtnDelete={onPressBtnDelete}
            onPressBtnEdit={onPressBtnEdit}
        />
    );
}
