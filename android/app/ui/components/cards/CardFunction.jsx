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
    date = 0,
    occupiedSeats = '0',
    onPress,
    onPressBtnDelete,
    onPressBtnEdit,
}) {
    date = new Date(date);
    const items = [
        {
            description: 'FECHA',
            value: (("0" + date.getUTCDate()).slice(-2) + "/" + ("0"+(date.getUTCMonth()+1)).slice(-2)),
        },
        {
            description: 'HORA',
            value: (("0" + date.getUTCHours()).slice(-2) + ":" + ("0" + date.getUTCMinutes()).slice(-2)),
        },
        {
            description: 'ASIENTOS OCUPADOS',
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
