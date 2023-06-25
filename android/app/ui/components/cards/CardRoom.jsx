import React from 'react';
import Card from './Card';

/**
 * 
 * @param {String} name - Nombre de la sala.
 * @param {String} state - Estado de la sala.
 * @param {String} seats - Cantidad de asientos totales.
 * @param {Function} onPress - Función que controla el accionar al pulsar la card.
 * @param {Function} onPressBtnDelete - Función que controla el accionar al pulsar el boton de eliminar.
 * @param {Function} onPressBtnEdit - Función que controla el accionar al pulsar el boton de editar.
 * @returns 
 */
export default function CardRoom({
    name = '',
    state = '',
    seats = '0',
    onPress,
    onPressBtnDelete,
    onPressBtnEdit,
}) {
    const items = [
        {
            description: 'ESTADO',
            value: state,
        },
        {
            description: 'ASIENTOS TOTALES',
            value: seats,
        },
    ];

    return (
        <Card
            items={items}
            title={name}
            showSideButtons={true}
            onPress={onPress}
            onPressBtnDelete={onPressBtnDelete}
            onPressBtnEdit={onPressBtnEdit}
        />
    );
}
