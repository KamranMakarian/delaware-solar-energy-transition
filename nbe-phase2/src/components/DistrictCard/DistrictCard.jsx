import { Card } from "@chakra-ui/react";

function DistrictCard(props) {
    return (
        <Card>
        <h1>{props.districtName}</h1>
        <p>{props.districtData}</p>
        </Card>
    );
    }