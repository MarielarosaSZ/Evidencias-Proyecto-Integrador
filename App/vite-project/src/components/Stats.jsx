function Stats(props) {
    return (
        <div>
            <h2>Estadísticas</h2>
            <p>Productos totales: {props.total}</p>
            <h3>PRECIOS</h3>
            <p>Precio máximo: {props.max}</p>
            <p>Precio mínimo: {props.min}</p>
            <p>Precio Promedio: {props.prom}</p>
            <h3>STOCK</h3>
            <p>Stock máximo: {props.maxS}</p>
            <p>Stock mínimo: {props.minS}</p>
            <p>Stock Promedio: {props.promS}</p>
        </div>
    );
}

export default Stats;
