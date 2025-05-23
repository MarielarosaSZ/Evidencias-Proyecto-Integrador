function Stats(props) {
    return (
        <div>
            <h2>Estadísticas</h2>
            <p>Productos totales: {props.total}</p>
            <p>Precio máximo: {props.max}</p>
            <p>Precio mínimo: {props.min}</p>
            <p>Stock máximo: {props.maxs}</p>
            <p>Stock mínimo: {props.mins}</p>
        </div>
    );
}

export default Stats;
