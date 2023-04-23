import {
    Box,
    Divider,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import ShortlinkCard from '../components/ShortlinkCard';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                await fetch("http://localhost:80/")
                    .then(res => res.json())
                    .then(res => setData(res));
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);



    const handleUpdate = e => {
        e.preventDefault();
        console.log(e);
    };

    const handleCreate = async e => {
        e.preventDefault();

        try {
            const result = await fetch("http://localhost:80/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    shortlink: e.target[0].value,
                    url: e.target[1].value
                })
            }).then(res => res.json());

            setData([result, ...data]);
            e.target.reset();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box margin="1rem">
            <VStack spacing="0.75rem">
                <ShortlinkCard handleSubmit={handleCreate} />
                <Divider borderColor='gray' />
                {data.map(record =>
                    <ShortlinkCard urlInit={record.url} shortlinkInit={record.shortlink} handleSubmit={handleUpdate} key={record.id} />
                )}
            </VStack>
        </Box >
    );
};

export default Home;