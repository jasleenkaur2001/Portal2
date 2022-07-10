import { Grid, Typography } from "@material-ui/core";
import background from '../images/vmware-cloud.jpg';
 import Navbar from './Navbar.js';
 import {
     makeStyles,
     Paper
 } from "@material-ui/core";

 const styles = {
     paperContainer: {
         width: '100%',
         backgroundImage: `url(${background})`,
         opacity: 0.75,
     }
 };

 const text = {
     headline: {
         fontWeight: 'bold',
         fontStyle: 'italic',
         fontSize: 70,
         marginTop: 0,
         width: 450,
         height: 300,
         justifyContent: 'center',
         alignItems: 'center',
     }
 };
const Welcome = (props) => {
  return (
   <div style = { styles.paperContainer } >
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2"><strong>Welcome to Portal</strong></Typography>
      </Grid>
    </Grid>
    </div>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
