import * as React from "react";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  components: {
    JoySelect:{
      styleOverrides:{
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'secondary' && {
            color: theme.vars.palette.text.tertiary,
            backgroundColor: theme.vars.palette.neutral.darkChannel,
          }),
        }),
      }
    },
    JoyOption:{
      styleOverrides:{
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'o2' && {
            color: theme.vars.palette.text.secondary,
            backgroundColor: theme.vars.palette.neutral.darkChannel,
          }),
        }),
      }
    },
  },
});


export default function SelectBasic() {

 
  
  return (
    <CssVarsProvider theme={theme}>
      <Select color="secondary" defaultValue="Settings">
        <Option color="o2" value="Logout">Logout</Option>
      </Select>
    </CssVarsProvider>
    
  );
}

