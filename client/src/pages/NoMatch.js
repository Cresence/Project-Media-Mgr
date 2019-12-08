import React from "react";
import { Col, Row, Container } from "../components/Grid";

const styles = {
  text: {
    textAlign: "center",
    color: "#fff",
    marginTop: "150px"
  }
}

function NoMatch() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
            <h1 style={styles.text}>404 Page Not Found</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
