import { Typography } from "@mui/material";
import styled from "styled-components";
import Certik from "../../assets/audit1.svg";
import Quill from "../../assets/audit2.png";

const Wrapper = styled.div`
  &&& {
    position: relative;
    overflow-x: hidden;
  }
`;
const SubWrapper = styled.div`
  &&& {
    display: flex;
    width: 100%;
    height: 780px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
   display: grid;
   width: 100%;
   height: 880px;
    `};
  }
`;
const Left = styled.div`
  &&& {
    width: 50%;
    height: 780px;
    background: #00a576;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    height: 440px;
     `};
  }
`;
const Right = styled.div`
  &&& {
    width: 50%;
    height: 780px;
    background: #d9f1ea;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    height: 440px;
     `};
  }
`;
const Head = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;
  }
`;
const Head2 = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    color: #00a576;
  }
`;
const ContentFlex = styled.div`
  &&& {
    display: flex;
    justify-content: space-around;
    margin-top: 80px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    display: grid;
    margin-top: 65px;
    grid-gap: 50px;
     `};
  }
`;
const FlexBox = styled.div`
  &&& {
    display: grid;
    place-content: center;
  }
`;
const Bold = styled.div`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;
  }
`;
const Content = styled.div`
  &&& {
    display: grid;
    margin-top: 35%;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    display: grid;
    margin-top: 15%;
     `};
  }
`;
const Below = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    text-align: center;
    text-transform: uppercase;

    color: #ffffff;
  }
`;
const AuditLogo = styled.img`
  &&& {
    width: 200px;
    height: 52px;
  }
`;
const BelowLinks = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    text-align: center;
    text-decoration-line: underline;

    color: #00a576;
  }
`;

function ScreenFive() {
  return (
    <Wrapper>
      <SubWrapper>
        <Left>
          <Content>
            <Head>Yoda in Numbers</Head>
            <ContentFlex>
              <FlexBox>
                <Bold>350+</Bold>
                <Below>Markets Created</Below>
              </FlexBox>
              <FlexBox>
                <Bold>$10,000+</Bold>
                <Below>Predicted Amount</Below>
              </FlexBox>
            </ContentFlex>
          </Content>
        </Left>
        <Right>
          <Content>
            <Head2>Audit completion</Head2>
            <ContentFlex>
              <FlexBox>
                <AuditLogo src={Quill} />
                <BelowLinks
                  onClick={() =>
                    window.open(
                      "https://github.com/Quillhash/Audit_Reports/blob/master/Yoda_NFT_Prediction_Smart_Contract_Audit_Report_QuillAudits.pdf",
                      "_blank"
                    )
                  }
                >
                  View Report
                </BelowLinks>
              </FlexBox>
              <FlexBox>
                <AuditLogo src={Certik} />
                <BelowLinks
                  onClick={() =>
                    window.open(
                      "https://www.certik.com/projects/yoda",
                      "_blank"
                    )
                  }
                >
                  View Report
                </BelowLinks>
              </FlexBox>
            </ContentFlex>
          </Content>
        </Right>
      </SubWrapper>
    </Wrapper>
  );
}

export default ScreenFive;
