import { createTheme } from "@mui/material";
import { Shadows } from "@mui/material/styles/shadows";

const theme = createTheme({
    typography: {
        h1: { fontSize: 42, fontWeight: 'bold' },
        h2: { fontSize: 36, fontWeight: 'bold' },
        h3: { fontSize: 30, fontWeight: 'bold' },
        h4: { fontSize: 24, fontWeight: 'bold' },
        h5: { fontSize: 20, fontWeight: 'bold' },
        h6: { fontSize: 18, fontWeight: 'bold' },
        button: {
            textTransform: "none",
            fontWeight: 600
        }
    },
    palette: {
        primary: {
            // light?: string;
            main: "#00F2C3",
            // dark?: string;
            contrastText: "#FFFFFF"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                disableElevation: true
            }
        }
    }
    
    
});

export default theme