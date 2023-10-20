/* eslint-disable react/prop-types */
import { Image, Heading, Body, StatsContainer } from "../StyleSheet";

function Fortune(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "150px",
      }}
    >
      <Image dimensions="350px" image={props.img} />
      <div style={{ width: "450px" }}>
        <Heading size="100px">{props.name}</Heading>
        <Body
          style={{ padding: "45px 0px" }}
          size="18px"
          height="32px"
          color=" #D0D6F9"
        >
          {props.description}
        </Body>
        <hr style={{borderWidth: .25}} />
        <StatsContainer>
          <div>
            <Body padding="28px 0px 12px 0px">AVG. DISTANCE</Body>
            <Heading size="28px">{props.distance}</Heading>
          </div>
          <div>
            <Body padding="28px 0px 12px 0px">EST. TRAVEL TIME</Body>
            <Heading size="28px">{props.time}</Heading>
          </div>
        </StatsContainer>
      </div>
    </div>
  );
}

export default Fortune;
