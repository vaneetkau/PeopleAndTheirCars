import { useParams, Link } from "react-router-dom";
import { List, Card } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_CARS } from '../queries'

const getStyles = () => ({
    card: {
        width: '450px',
        backgroundColor: 'grey',
        color: "white",
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
    }
})

const ShowPage = () => {
    const { id } = useParams();

    const styles = getStyles();

    const { loading, error, data } = useQuery(GET_CARS, {
        variables: { personId: id }
    });

    if (loading)
        return 'Loading..';
    if (error)
        return `Error! ${error.message}`;

    return (
        <>
            <div style={styles.list}>
                <Link to='/' ><h1>Back to Home</h1></Link>
            </div>
            <List grid={{ gutter: 16, column: 1 }} style={styles.list}>
                {data.personCars.map(({ id, make, model, price, year }) => (
                    <List.Item key={id}>
                        <Card title={make} style={styles.card}>
                            <p>Model: {model}</p>
                            <p>Make: {make}</p>
                            <p>Year: {year}</p>
                            <p>Price: ${price}</p>
                        </Card>
                    </List.Item>
                ))}
            </List>
        </>
    )
}

export default ShowPage;