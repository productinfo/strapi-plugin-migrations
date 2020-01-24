import styled from 'styled-components';
import {colors, ViewContainer, sizes} from 'strapi-helper-plugin';

const Wrapper = styled(ViewContainer)`
  background-color: ${colors.leftMenu.mediumGrey};
  .button-secondary {
    &:hover {
      background-color: #ffffff !important;
      box-shadow: 0 0 0 #fff;
    }
  }
  .button-submit {
    min-width: 140px;
  }
  .add-button {
    line-height: 30px;
    svg {
      height: 11px;
      width: 11px;
      vertical-align: initial;
    }
  }
`;

export default Wrapper;
