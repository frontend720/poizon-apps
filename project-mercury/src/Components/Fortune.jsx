/* eslint-disable react/prop-types */
import { Image, Heading, Body, StatsContainer, FlexContainer } from "../StyleSheet";

function Fortune(props) {
  return (
    <FlexContainer
    padding="150px"
    justify="space-between"
      // style={{
      //   display: "flex",
      //   justifyContent: "space-between",
      //   padding: "150px",
      // }}
    >
      <Image dimensions="350px" image={props.img} />
      <div className="destination_container" style={{ width: "450px" }}>
        <Heading size="100px">{props.name}</Heading>
        <Body
          style={{ padding: "45px 0px" }}
          size="18px"
          height="32px"
          color=" #D0D6F9"
          width="400px"
        >
          {props.description}
        </Body>
        <hr style={{borderWidth: .25}} />
        <StatsContainer>
          <div>
            <Body width="auto" padding="28px 0px 12px 0px">AVG. DISTANCE</Body>
            <Heading size="28px">{props.distance}</Heading>
          </div>
          <div>
            <Body width="auto" padding="28px 0px 12px 0px">EST. TRAVEL TIME</Body>
            <Heading size="28px">{props.time}</Heading>
          </div>
        </StatsContainer>
      </div>
    </FlexContainer>
  );
}

export default Fortune;
