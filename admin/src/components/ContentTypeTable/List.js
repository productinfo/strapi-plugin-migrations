import styled from 'styled-components';

import {colors} from 'strapi-helper-plugin';

const List = styled.ul`
  height:auto;
  margin-bottom: 0;
  padding-left: 0;
  // max-height: 251px;
  overflow-y: scroll;
  li {
    position: relative;
    margin-bottom: 2px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  a {
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    height: 52px;
    border-radius: 2px;
    &::before {
      content: '•';
      position: absolute;
      top: calc(50% - 2px);
      left: 15px;
      font-weight: bold;
      display: block;
      width: 0.5em;
      height: 0.5em;
      color: ${colors.leftMenu.darkGrey};
      line-height: 5px;
      font-size: 10px;
    }
    p {
      color: ${colors.leftMenu.black};
      font-size: 13px;
      line-height: 34px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
    }
    Checkbox {
       
    }
    &.active {
      background-color: #e9eaeb;
      p {
        font-weight: 600;
      }
      &::before {
        color: ${colors.leftMenu.black};
      }
    }
    &:hover {
      text-decoration: none;
    }
  }
`;

export default List;