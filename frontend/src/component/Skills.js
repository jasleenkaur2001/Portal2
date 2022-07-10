import { useContext, useEffect, useState } from "react";
import {
  Button,
  Chip,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../lib/FileUploadInput";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
const printReqSkills = (props1, props2) => {
  var allSkills = new Set();
  var reqSkills = new Set();
  for (var i = 0; i < props1.length; i++) {
    for (var j = 0; j < props2.length; j++) {
      var flag = false;
      for (var z = 0; z < props2[j].skillsets.length; z++) {
        var one = props1[i];
        one = one.toLowerCase().trim();
        var two = props2[j].skillsets[z];
        two = two.toLowerCase().trim();
        if (one.localeCompare(two) === 0) {
          flag = true;
        }
        allSkills.add(two);

      }
      if (flag === true) {
        for (var z = 0; z < props2[j].skillsets.length; z++) {
          var two = props2[j].skillsets[z];
          two = two.toLowerCase().trim();
          reqSkills.add(two);
        }
      }
    }
  }
 
  for (var i = 0; i < props1.length; i++) {
    allSkills.delete(props1[i].toLowerCase().trim());
    reqSkills.delete(props1[i].toLowerCase().trim());
  }
  if ((reqSkills.size === 0)) {
    // all skills  
    var length = allSkills.length;
    var skil = "";

    allSkills.forEach(element => {
     skil += element.toUpperCase() + "      " 
    });
    console.log(skil);
    return skil;
  }
  else {
    // req skills

    var length = reqSkills.length;
    var skil = "";

    reqSkills.forEach(element => {
      skil += element.toUpperCase() + "     " 
     });
     console.log(skil);
    return skil;
  }
};

const printSkills = (props) => {
  var length = props.length;
  var skil = "";

  for (var i = 0; i < length; i++) {
    skil += props[i] + "     ";
  }
  return skil;
}
const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "30px",
  },
}));


const Skills = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [SkillsDetails, setSkillsDetails] = useState({
    name: "",
    experience: [],
    skills: [],
    resume: "",
    Skills: "",
  });
  const handleInput = (key, value) => {
    setSkillsDetails({
      ...SkillsDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSkillsDetails(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
    let address = apiList.jobs;
    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setJobs(
          response.data.filter((obj) => {
            const today = new Date();
            const deadline = new Date(obj.deadline);
            return deadline > today;
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
      // style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item>
          <Typography variant="h2">Skills</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="column"
        alignItems="left"
      >
        <Grid item xs>
          <Grid container direction="column" alignItems="center" spacing={3}>
            <Typography variant="h3"> My Skills</Typography>
            <Typography variant="h5" style={{textAlign: "center"}}>{printSkills(SkillsDetails.skills)}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Typography variant="h3"> Skills you can learn</Typography>
          <Grid
            container
            item
            xs
            direction="column"
            alignItems="stretch"
            justify="center"
          >
            {jobs.length > 0 ? (
              <Typography variant="h5" style={{textAlign: "center"}}>
                {printReqSkills(SkillsDetails.skills, jobs)}
              </Typography>
            ) : (
              <Typography variant="h5" style={{ textAlign: "center" }}>
                No jobs found
              </Typography>
            )}

          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Skills;