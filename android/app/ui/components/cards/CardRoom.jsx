import React from 'react';
import Card from './Card';

/**
 * 
 * @param {String} name - Nombre de la sala.
 * @param {String} state - Estado de la sala.
 * @param {String} seatings - Cantidad de asientos totales.
 * @param {Function} onPressBtnDelete - Función que controla el accionar al pulsar el boton de eliminar.
 * @param {Function} onPressBtnEdit - Función que controla el accionar al pulsar el boton de editar.
 * @returns 
 */
export default function CardRoom({
    name = '',
    state = '',
    seatings = '0',
    onPressBtnDelete = () => { },
    onPressBtnEdit = () => { },
}) {
    const items = [
        {
            description: 'ESTADO',
            value: state,
        },
        {
            description: 'ASIENTOS TOTALES',
            value: seatings,
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
