import React from 'react';
import Card from './Card';

/**
 * 
 * @param {String} name - Nombre de la película que se expone.
 * @param {String} date - Fecha de la función.
 * @param {String} occupiedSeats - Cantidad de asientos ocupados.
 * @param {Function} onPress - Función que controla el accionar al pulsar la card.
 * @param {Function} onPressBtnDelete - Función que controla el accionar al pulsar el boton de eliminar.
 * @param {Function} onPressBtnEdit - Función que controla el accionar al pulsar el boton de editar.
 * @returns 
 */
export default function CardFunction({
    name = '',
    date = '',
    hour= '',
    occupiedSeats = '0',
    onPress,
    onPressBtnDelete,
    onPressBtnEdit,
}) {
    const items = [
        {
            description: 'Fecha',
            value: date,
        },
        {
            description: 'Hora',
            value: hour,
        },
        {
            description: 'Asientos Ocupados',
            value: occupiedSeats,
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
