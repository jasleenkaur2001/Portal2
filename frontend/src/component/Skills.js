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
import img from '../images/download.png';
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../lib/FileUploadInput";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import { AppBar, Toolbar } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
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
    } else {
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
    splitScreen: {
        padding: "60px 60px",
        display: "flex",
        flexDirection: "row",
    },
    left: {
        width: "50%",
    },
    right: {
        width: "50%",
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

    return ( <
        AppBar position = "static" >
        <
        Paper align = "center"  style={{
           backgroundImage: `url(${img})`, 
          }}>
        <
        Typography variant = "h2" > Skills < /Typography>  < /
        Paper >


        <
        div className = { classes.splitScreen } >
        <
        Grid className = { classes.left }
        container direction = "column"
        alignItems = "center" >
        <
        Grid item >
        <
        Typography variant = "h2" > My Skills < /Typography> < /
        Grid >




        <
        Grid item >
        
        <Grid item>
            {SkillsDetails.skills.map((skill) => (
              <Chip label={skill} style={{ marginRight: "3px" , textAlign: "center" ,fontSize: 17,padding :'5px', }} />
            ))}
          </Grid>

        < /Grid >
        <
        /Grid>


        <
        Grid className = { classes.right }
        container direction = "column"
        alignItems = "center" >
        <
        Typography variant = "h2" > Skills you can learn < /Typography> <
        Grid item > {
            jobs.length > 0 ? ( <
                Typography variant = "h4" > ❖{ printReqSkills(SkillsDetails.skills, jobs) } <
                /Typography>
            ) : ( <
                Typography variant = "h4"
                style = {
                    { textAlign: "center" }
                } >
                No jobs found <
                /Typography>
            )
        }

        <
        /Grid >  < /
        Grid >
        <
        /div> < /
        AppBar >

    );
};

export default Skills;