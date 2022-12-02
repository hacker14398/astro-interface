import styled from "styled-components";
import { Dialog } from "@mui/material";

const MenuWrapper = styled(Dialog)`
  &&& {
     background-color: rgba(0, 0, 0, 0.2);
     backdrop-filter: blur(20px);
     -webkit-backdrop-filter: blur(20px);
    .MuiPaper-root {
      background: transparent;
    }
    .MuiDialog-paper {
      margin: 0;
      overflow: hidden;
    }
    .MuiDialog-paperWidthSm {
      max-width: none;
    }
    .MuiPaper-rounded {
      border-radius: 0;
    }
    .css-1t1j96h-MuiPaper-root-MuiDialog-paper{
      box-shadow:none;
    }
    &:focus {
      outline: none;
    }
  }
`;

export default MenuWrapper;
