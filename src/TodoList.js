export default function TodoList(props){
    return (
            <section>
                <h1>Дела</h1>
                <table className="table is-hoverable is-fullwidth">
                    <tbody>
                        {
                            props.list.map( item => (
                                                    <tr key={item.key}>
                                                        <td>
                                                            <span title={item.desc}>
                                                                {item.done && <del>{item.title}</del>}
                                                            </span>
                                                            <span title={item.desc}>
                                                                {!item.done && item.title}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button className="button is-success" title="Пометить, как сделанное" disabled={item.done}> &#9745; </button>
                                                        </td>
                                                        <td>
                                                            <button className="button is-danger" title="Удалить" disabled={item.done}> &#9746; </button>
                                                        </td>
                                                    </tr>
                                                    ) 
                                            )
                        }
                    </tbody>
                </table>
            </section>
        )
}