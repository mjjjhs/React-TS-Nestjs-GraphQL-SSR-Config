import css from "styled-jsx/css";
import {Colors} from "../enums/styleVariables";

export const errorStyle = css`
  .errorContainer {
    width: 100%;
    padding-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .title {
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${Colors.black};
    margin: 28px 0 10px;
  }
  
  .description {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: ${Colors.lightGrey};
    margin-bottom: 30px;
  }
`;
