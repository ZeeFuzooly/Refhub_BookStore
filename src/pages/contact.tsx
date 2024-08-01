import {
  Box,
  Container,
  Flex,
  Title,
  Text,
  Anchor,
  Paper,
} from "@mantine/core";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <Box style={{ padding: "2rem" }}>
      <Container>
        <Title order={2} style={{ textAlign: "center", marginBottom: "1rem" }}>
          Contact Us
        </Title>

        <Paper shadow="xs" style={{ marginBottom: "2rem" }}>
          <Title order={3} style={{ textAlign: "center" }}>
            Get in Touch
          </Title>
          <Flex direction="column" align="center" style={{ marginTop: "1rem" }}>
            <Text size="lg" style={{ marginBottom: "0.5rem" }}>
              <FaPhone size={18} style={{ marginRight: "0.5rem" }} />
              +1 (123) 456-7890
            </Text>
            <Text size="lg" style={{ marginBottom: "0.5rem" }}>
              <FaEnvelope size={18} style={{ marginRight: "0.5rem" }} />
              contact@example.com
            </Text>
            <Text size="lg">
              <FaMapMarkerAlt size={18} style={{ marginRight: "0.5rem" }} />
              123 Book St, Library City, LI 45678
            </Text>
          </Flex>
        </Paper>

        <Paper shadow="xs">
          <Title order={3} style={{ textAlign: "center" }}>
            Our Location
          </Title>
          <Box style={{ marginTop: "1rem" }}>
            <iframe
              width="100%"
              height="400"
              style={{ border: "0" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?q=123+Book+St,+Library+City,+LI+45678&key=YOUR_GOOGLE_MAPS_API_KEY"
            ></iframe>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactUs;
