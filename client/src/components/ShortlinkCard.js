import {
    Card,
    CardBody,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import { useState } from 'react';

const ShortlinkCard = ({ urlInit = '', shortlinkInit = '', handleSubmit }) => {
    const [url, setUrl] = useState(urlInit);
    const [shortlink, setShortlinkl] = useState(shortlinkInit);

    return (
        <Card size="sm" variant="outline" style={{ width: "100%" }}>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <Wrap justify="space-around" align="center">
                        <WrapItem w="40%">
                            <FormControl>
                                <VStack style={{ width: "100%" }} align="start" spacing="0.25">
                                    <FormLabel><Text align='right'>Shortlink</Text></FormLabel>
                                    <Input type='text' placeholder='short-site' value={shortlink} onChange={e => setShortlinkl(e.target.value)} />
                                </VStack>
                            </FormControl>
                        </WrapItem>
                        <WrapItem w="40%">
                            <FormControl>
                                <VStack style={{ width: "100%" }} align="start" spacing="0.25">
                                    <FormLabel>URL</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children='https://' />
                                        <Input type='text' placeholder='myverylongsitelink.com' value={url} onChange={e => setUrl(e.target.value)} />
                                    </InputGroup>
                                </VStack>
                            </FormControl>
                        </WrapItem>
                    </Wrap>
                    <Input type="submit" hidden />
                </form>
            </CardBody>
        </Card>
    );
};

export default ShortlinkCard;